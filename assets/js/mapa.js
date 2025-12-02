/* ===============================
   MAPA VISUAL PRO (Motor Gráfico Radial)
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
    // Escuchar evento de cambio de vista para iniciar
    window.addEventListener('initNetworkMap', initMap);

    // Si el usuario recarga y la vista activa es network, iniciamos
    if(document.getElementById('networkView')?.classList.contains('active')) {
        setTimeout(initMap, 100);
    }

    let nodes = [];
    let activeNodeId = 'root';
    let canvas, ctx;
    let animationFrameId;
    
    // Configuración del Mundo Virtual
    const CENTER_X = 2000; 
    const CENTER_Y = 2000;
    const RADII = [0, 280, 550, 800]; // Distancias de los anillos

    function initMap() {
        const container = document.getElementById('networkContainer');
        const world = document.getElementById('networkNodes');
        canvas = document.getElementById('networkCanvas');
        
        if (!container || !canvas || !world || !window.knowledgeData) return;

        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 1. Construir Nodos (si no existen ya)
        if(nodes.length === 0) {
            buildNodes();
            renderDOM(world);
        }
        
        // 2. Centrar cámara
        focusNode('root');
        
        // 3. Iniciar loop de líneas
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        drawConnections();

        // Botón Reset
        document.getElementById('mapReset')?.addEventListener('click', () => focusNode('root'));
    }

    function resizeCanvas() {
        const container = document.getElementById('networkContainer');
        if(container) {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }
    }

    function buildNodes() {
        nodes = [];
        let idCounter = 0;
        
        // --- NODO RAÍZ ---
        nodes.push({
            id: 'root', name: 'Knowledge Vault', level: 0,
            x: CENTER_X, y: CENTER_Y, color: '#ff9f1a', icon: 'fa-solid fa-brain'
        });

        // --- PROCESAMIENTO RECURSIVO (Abanico) ---
        function processLevel(items, parent, startAngle, endAngle, level) {
            if (!items || items.length === 0) return;

            const totalArc = endAngle - startAngle;
            const step = totalArc / items.length;

            items.forEach((item, i) => {
                // Ángulo medio del sector
                const angle = startAngle + (i * step) + (step / 2);
                const radius = RADII[level] || (RADII[level-1] + 200);
                
                // Coordenadas
                const x = CENTER_X + Math.cos(angle) * radius;
                const y = CENTER_Y + Math.sin(angle) * radius;

                // Determinar icono y tipo
                let icon = item.icon;
                if (!icon) {
                    icon = item.type === 'folder' ? 'fa-solid fa-folder' : 'fa-solid fa-file';
                }

                // Determinar color (hereda del padre si no tiene)
                const color = item.color || parent.color;

                const newNode = {
                    id: item.id || `n_${idCounter++}`,
                    name: item.name,
                    level: level,
                    x: x, y: y,
                    parent: parent,
                    color: color,
                    icon: icon,
                    isFile: item.type === 'file',
                    category: item.category || parent.category
                };

                nodes.push(newNode);

                // Hijos (restringiendo ángulo)
                if (item.children) {
                    const subStart = startAngle + (i * step);
                    const subEnd = subStart + step;
                    processLevel(item.children, newNode, subStart, subEnd, level + 1);
                }
            });
        }

        // Arrancar Nivel 1 (360 grados)
        // window.knowledgeData es el array de categorías principales
        processLevel(window.knowledgeData, nodes[0], 0, Math.PI * 2, 1);
    }

    function renderDOM(world) {
        world.innerHTML = '';
        nodes.forEach(node => {
            const el = document.createElement('div');
            
            // Clases
            let cls = `map-node`;
            if (node.level === 0) cls += ' node-root';
            else if (node.isFile) cls += ' node-file level-3';
            else cls += ` node-level-${node.level}`;

            el.className = cls;
            el.dataset.id = node.id;
            if (node.category) el.dataset.category = node.category;
            
            // Posición
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
            
            // Variables CSS
            el.style.setProperty('--node-color', node.color);
            
            // Convertir Hex a RGB para sombras (simple)
            // (Esto es un helper visual, idealmente vendría calculado)
            el.style.setProperty('--node-rgb', hexToRgb(node.color));

            // Contenido HTML
            if (node.level === 0) {
                el.innerHTML = `<i class="node-icon ${node.icon}"></i><div class="node-label">${node.name}</div><div class="node-sublabel">Interactive Graph</div>`;
            } else if (node.isFile) {
                // Archivo: solo punto pequeño
            } else {
                el.innerHTML = `<i class="node-icon ${node.icon}"></i><div class="node-label">${node.name}</div>`;
            }

            // Evento Click (Foco)
            el.onclick = (e) => {
                e.stopPropagation();
                focusNode(node.id);
            };

            world.appendChild(el);
        });
    }

    function focusNode(targetId) {
        activeNodeId = targetId;
        const target = nodes.find(n => n.id === targetId);
        if (!target) return;

        // 1. Calcular qué nodos mostrar (Active / Dimmed)
        const activeIds = new Set([target.id]);
        
        // Ancestros
        let curr = target;
        while (curr.parent) {
            activeIds.add(curr.parent.id);
            curr = curr.parent;
        }
        // Hijos directos
        nodes.filter(n => n.parent === target).forEach(c => activeIds.add(c.id));

        // Aplicar clases
        document.querySelectorAll('.map-node').forEach(el => {
            if (activeIds.has(el.dataset.id)) {
                el.classList.remove('dimmed');
                el.classList.add('active');
            } else {
                el.classList.add('dimmed');
                el.classList.remove('active');
            }
        });

        // 2. Mover Cámara (Transform CSS)
        const world = document.getElementById('networkNodes');
        const container = document.getElementById('networkContainer');
        
        // Zoom dinámico según nivel
        let zoom = 0.65; // Root view
        if (target.level === 1) zoom = 1.2;
        if (target.level >= 2) zoom = 1.8;

        // Centrar nodo en pantalla
        const tx = (container.offsetWidth / 2) - (target.x * zoom);
        const ty = (container.offsetHeight / 2) - (target.y * zoom);

        world.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
        
        // Guardar datos para el canvas
        window.mapCamera = { tx, ty, zoom };
    }

    function drawConnections() {
        // Loop de animación
        if (!window.mapCamera) {
            requestAnimationFrame(drawConnections);
            return;
        }

        const { tx, ty, zoom } = window.mapCamera;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';

        nodes.forEach(node => {
            if (node.parent) {
                const parent = node.parent; // Es el objeto referencia
                
                // ¿Está activa esta conexión?
                // Solo si ambos nodos NO están dimmed
                const nodeEl = document.querySelector(`.map-node[data-id="${node.id}"]`);
                const parentEl = document.querySelector(`.map-node[data-id="${parent.id}"]`);
                
                const isDimmed = nodeEl?.classList.contains('dimmed') || parentEl?.classList.contains('dimmed');

                // Proyectar coordenadas
                const x1 = parent.x * zoom + tx;
                const y1 = parent.y * zoom + ty;
                const x2 = node.x * zoom + tx;
                const y2 = node.y * zoom + ty;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                if (isDimmed) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
                    ctx.lineWidth = 1;
                } else {
                    ctx.strokeStyle = node.color;
                    ctx.lineWidth = node.level === 1 ? 3 : (node.level === 2 ? 2 : 1);
                    ctx.globalAlpha = 0.4;
                }
                
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        });

        requestAnimationFrame(drawConnections);
    }

    // Helper Hex a RGB
    function hexToRgb(hex) {
        if(!hex) return '255, 255, 255';
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }
});
