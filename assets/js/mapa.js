/* ===============================
   MAPA VISUAL PRO (Motor Gráfico Radial)
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
    // Escuchar evento personalizado
    window.addEventListener('initNetworkMap', () => {
        console.log("Evento initNetworkMap recibido. Intentando iniciar...");
        initMap();
    });

    let nodes = [];
    const container = document.getElementById('networkContainer');
    const world = document.getElementById('networkNodes');
    const canvas = document.getElementById('networkCanvas');
    let ctx;
    let initialized = false;
    
    // Configuración Radial
    const CENTER_X = 2000; 
    const CENTER_Y = 2000;
    const RADII = [0, 350, 600, 850]; 

    // 1. OBSERVER: Detecta cuando la pestaña deja de estar oculta (display: none)
    if (container) {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                // Solo si tiene dimensiones reales (es visible)
                if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
                    if (!initialized || nodes.length === 0) {
                        console.log("Contenedor visible detectado. Iniciando mapa...");
                        initMap();
                    } else {
                        // Si ya existe, solo recentramos la cámara por si cambió el tamaño
                        focusNode('root');
                    }
                }
            }
        });
        resizeObserver.observe(container);
    }

    function initMap() {
        // Chequeo de seguridad de datos
        if (!window.knowledgeData) {
            console.error("❌ Error: window.knowledgeData no existe. Verifica que graph-data.js se ha cargado.");
            return;
        }
        if (!world || !canvas) return;
        
        // Chequeo de visibilidad (evita errores de coordenadas si la pestaña está oculta)
        if (container.offsetWidth === 0 || container.offsetHeight === 0) {
            console.warn("⚠️ El contenedor tiene ancho 0. Esperando a que sea visible.");
            return;
        }

        console.log("✅ Iniciando renderizado del mapa con", window.knowledgeData.length, "categorías raíz.");

        ctx = canvas.getContext('2d');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        world.innerHTML = '';
        nodes = [];

        buildNodes();
        renderDOM();
        
        // Pequeño delay para asegurar que el DOM pintó antes de calcular centro
        setTimeout(() => {
            focusNode('root');
            initialized = true;
        }, 50);
        
        if (!window.isLooping) {
            window.isLooping = true;
            requestAnimationFrame(drawConnections);
        }
    }

    function buildNodes() {
        let idCounter = 0;

        // Nodo Raíz
        nodes.push({
            id: 'root', name: 'Knowledge Vault', level: 0,
            x: CENTER_X, y: CENTER_Y, color: '#ff9f1a', icon: 'fa-solid fa-brain'
        });

        function processLevel(items, parent, startAngle, endAngle, level) {
            if (!items || items.length === 0) return;

            const totalArc = endAngle - startAngle;
            const step = totalArc / items.length;

            items.forEach((item, i) => {
                const angle = startAngle + (i * step) + (step / 2);
                const radius = RADII[level];
                
                const x = CENTER_X + Math.cos(angle) * radius;
                const y = CENTER_Y + Math.sin(angle) * radius;

                const newNode = {
                    id: item.id || `n_${idCounter++}`,
                    name: item.name,
                    level: level,
                    x: x, y: y,
                    parent: parent,
                    color: item.color || parent.color, 
                    icon: item.icon || (level === 3 ? 'fa-solid fa-file' : 'fa-solid fa-folder'),
                    isFile: level === 3 
                };

                nodes.push(newNode);

                if (item.children) {
                    const subStart = startAngle + (i * step);
                    const subEnd = subStart + step;
                    processLevel(item.children, newNode, subStart, subEnd, level + 1);
                }
            });
        }

        processLevel(window.knowledgeData, nodes[0], 0, Math.PI * 2, 1);
    }

    function renderDOM() {
        world.innerHTML = '';
        nodes.forEach(node => {
            const el = document.createElement('div');
            
            // --- CORRECCIÓN CLAVE ---
            // Añadimos 'node-root' explícitamente si es nivel 0 para que el CSS lo pille
            let className = `map-node node-level-${node.level} ${node.isFile ? 'is-file' : ''}`;
            if (node.level === 0) className += ' node-root'; 
            
            el.className = className;
            
            // Categorías para colores
            if (node.level === 1) {
                const category = node.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                el.dataset.category = category;
            } else if (node.parent && node.parent.level >= 1) {
                const parentEl = document.querySelector(`.map-node[data-id="${node.parent.id}"]`);
                if (parentEl) el.dataset.category = parentEl.dataset.category;
            }

            el.dataset.id = node.id;
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
            el.style.setProperty('--node-color', node.color);
            
            el.innerHTML = `
                <div class="node-circle">
                    <i class="node-icon ${node.icon}"></i>
                </div>
                ${!node.isFile ? `<div class="node-label">${node.name}</div>` : ''}
                ${node.isFile ? `<div class="node-label file-label">${node.name}</div>` : ''}
            `;

            el.onclick = (e) => {
                e.stopPropagation();
                focusNode(node.id);
            };

            world.appendChild(el);
        });
    }

    function focusNode(targetId) {
        const target = nodes.find(n => n.id === targetId);
        if (!target) return;

        const activeIds = new Set([target.id]);
        let curr = target;
        while (curr.parent) {
            activeIds.add(curr.parent.id);
            curr = curr.parent;
        }
        nodes.filter(n => n.parent === target).forEach(c => activeIds.add(c.id));

        document.querySelectorAll('.map-node').forEach(el => {
            if (activeIds.has(el.dataset.id)) {
                el.classList.remove('dimmed');
                el.classList.add('active');
            } else {
                el.classList.add('dimmed');
                el.classList.remove('active');
            }
        });

        // Calculamos Zoom y Centro
        const zoom = target.level === 0 ? 0.6 : (target.level === 1 ? 1 : 1.5);
        const containerW = container.offsetWidth;
        const containerH = container.offsetHeight;
        
        // Si el container mide 0, paramos para evitar poner coordenadas infinitas
        if (containerW === 0) return;

        const tx = (containerW / 2) - (target.x * zoom);
        const ty = (containerH / 2) - (target.y * zoom);

        world.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
        window.mapCamera = { tx, ty, zoom };
    }

    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!window.mapCamera) {
            requestAnimationFrame(drawConnections);
            return;
        }

        const { tx, ty, zoom } = window.mapCamera;
        ctx.lineWidth = 2;
        
        nodes.forEach(node => {
            if (node.parent) {
                const parent = node.parent;
                const x1 = parent.x * zoom + tx;
                const y1 = parent.y * zoom + ty;
                const x2 = node.x * zoom + tx;
                const y2 = node.y * zoom + ty;

                const el = document.querySelector(`.map-node[data-id="${node.id}"]`);
                const isDimmed = el && el.classList.contains('dimmed');

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                
                if (isDimmed) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                } else {
                    ctx.strokeStyle = node.color || '#fff'; 
                    ctx.globalAlpha = 0.3;
                }
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        });
        requestAnimationFrame(drawConnections);
    }
});
