/* ===============================
   MAPA VISUAL PRO (Motor Gráfico Radial)
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('initNetworkMap', initMap);

    let nodes = [];
    const container = document.getElementById('networkContainer');
    const world = document.getElementById('networkNodes');
    const canvas = document.getElementById('networkCanvas');
    let ctx;
    
    // Configuración Radial
    const CENTER_X = 2000; // Centro del mundo virtual (4000x4000)
    const CENTER_Y = 2000;
    const RADII = [0, 350, 600, 850]; // Distancias de los anillos (N0, N1, N2, N3)

    function initMap() {
        if (!world || !window.knowledgeData) return;
        
        ctx = canvas.getContext('2d');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        // 1. Construir Nodos
        buildNodes();
        
        // 2. Renderizar DOM
        renderDOM();
        
        // 3. Centrar cámara
        focusNode('root');
        
        // 4. Iniciar loop de líneas
        requestAnimationFrame(drawConnections);
    }

    function buildNodes() {
        nodes = [];
        let idCounter = 0;

        // Nodo Raíz
        nodes.push({
            id: 'root', name: 'Knowledge Vault', level: 0,
            x: CENTER_X, y: CENTER_Y, color: '#ff9f1a', icon: 'fa-solid fa-brain'
        });

        // Función recursiva para posicionar hijos en abanico
        function processLevel(items, parent, startAngle, endAngle, level) {
            if (!items || items.length === 0) return;

            const totalArc = endAngle - startAngle;
            const step = totalArc / items.length;

            items.forEach((item, i) => {
                // Ángulo medio del sector
                const angle = startAngle + (i * step) + (step / 2);
                const radius = RADII[level];
                
                // Posición polar -> cartesiana
                const x = CENTER_X + Math.cos(angle) * radius;
                const y = CENTER_Y + Math.sin(angle) * radius;

                const newNode = {
                    id: item.id || `n_${idCounter++}`,
                    name: item.name,
                    level: level,
                    x: x, y: y,
                    parent: parent,
                    color: item.color || parent.color, // Hereda color
                    icon: item.icon || (level === 3 ? 'fa-solid fa-file' : 'fa-solid fa-folder'),
                    isFile: level === 3 // Nivel 3 son archivos finales
                };

                nodes.push(newNode);

                // Procesar hijos (restringiendo el ángulo al sector del padre)
                if (item.children) {
                    const subStart = startAngle + (i * step);
                    const subEnd = subStart + step;
                    processLevel(item.children, newNode, subStart, subEnd, level + 1);
                }
            });
        }

        // Empezar Nivel 1 (360 grados completos)
        processLevel(window.knowledgeData, nodes[0], 0, Math.PI * 2, 1);
    }

    function renderDOM() {
        world.innerHTML = '';
        nodes.forEach(node => {
            const el = document.createElement('div');
            el.className = `map-node level-${node.level} ${node.isFile ? 'is-file' : ''}`;
            el.dataset.id = node.id;
            
            // Posición
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
            
            // Variables CSS
            el.style.setProperty('--node-color', node.color);
            
            // HTML Interno
            el.innerHTML = `
                <div class="node-circle">
                    <i class="node-icon ${node.icon}"></i>
                </div>
                ${!node.isFile ? `<div class="node-label">${node.name}</div>` : ''}
                ${node.isFile ? `<div class="node-label file-label">${node.name}</div>` : ''}
            `;

            // Click
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

        // 1. Efecto visual (Dimming)
        const activeIds = new Set([target.id]);
        
        // Hacia arriba (padres)
        let curr = target;
        while (curr.parent) {
            activeIds.add(curr.parent.id);
            curr = curr.parent;
        }
        // Hacia abajo (hijos directos)
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

        // 2. Cámara
        const zoom = target.level === 0 ? 0.6 : (target.level === 1 ? 1 : 1.5);
        const containerW = container.offsetWidth;
        const containerH = container.offsetHeight;
        
        // Centrar el nodo objetivo
        const tx = (containerW / 2) - (target.x * zoom);
        const ty = (containerH / 2) - (target.y * zoom);

        world.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
        
        // Guardar para canvas
        window.mapCamera = { tx, ty, zoom };
    }

    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!window.mapCamera) return requestAnimationFrame(drawConnections);
        const { tx, ty, zoom } = window.mapCamera;

        ctx.lineWidth = 2;
        
        nodes.forEach(node => {
            if (node.parent) {
                const parent = node.parent;
                
                // Proyectar coordenadas
                const x1 = parent.x * zoom + tx;
                const y1 = parent.y * zoom + ty;
                const x2 = node.x * zoom + tx;
                const y2 = node.y * zoom + ty;

                // Si el nodo está "dimmed" (oscuro en el DOM), la línea también
                const el = document.querySelector(`.map-node[data-id="${node.id}"]`);
                const isDimmed = el && el.classList.contains('dimmed');

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                
                if (isDimmed) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
                } else {
                    ctx.strokeStyle = node.color; // Color de la rama
                    ctx.globalAlpha = 0.5;
                }
                
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        });

        requestAnimationFrame(drawConnections);
    }
});
