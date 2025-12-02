/* ===============================
   MAPA VISUAL (Motor Gráfico)
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURACIÓN Y DATOS ---
    const container = document.getElementById('networkContainer');
    const canvas = document.getElementById('networkCanvas');
    const world = document.getElementById('networkNodes');
    
    // Colores por rama
    const COLORS = {
        root: '#ff9f1a',        // Naranja AOM
        teoria: '#8b5cf6',      // Violeta
        portafolio: '#22c55e',  // Verde
        casos: '#ef4444',       // Rojo
        laboratorio: '#06b6d4', // Cyan
        proyectos: '#ec4899'    // Rosa
    };

    // LA ESTRUCTURA COMPLETA (Según tus instrucciones)
    const rawData = {
        id: 'root', name: 'Knowledge Vault', type: 'root', color: COLORS.root, icon: 'fa-solid fa-brain',
        children: [
            // RAMA 1: TEORÍA
            {
                id: 'teoria', name: 'Teoría', color: COLORS.teoria, icon: 'fa-solid fa-book',
                children: [
                    { 
                        name: 'Ciberseguridad (Com.)', 
                        children: Array(6).fill().map((_,i) => ({ 
                            name: ['Análisis de vulnerabilidades', 'Arquitecturas seguras', 'Gestión de identidades', 'Seguridad virtualizada', 'Defensa Cloud', 'Automatización seguridad'][i],
                            children: Array(6).fill().map((_,j) => ({ name: `N3: ${['Explotación servicios', 'Hardening aplicado', 'Detección logs', 'Análisis estático', 'Respuesta incidentes', 'Correlación eventos'][j]}` }))
                        }))
                    },
                    { 
                        name: 'Admin. Sistemas', 
                        children: Array(6).fill().map((_,i) => ({ 
                            name: ['Análisis de vulnerabilidades', 'Arquitecturas seguras', 'Gestión de identidades', 'Seguridad virtualizada', 'Defensa Cloud', 'Automatización seguridad'][i], // Usando mismos placeholders L2 por simplicidad, edita si quieres variar
                            children: Array(6).fill().map((_,j) => ({ name: `N3: ${['Explotación servicios', 'Hardening aplicado', 'Detección logs', 'Análisis estático', 'Respuesta incidentes', 'Correlación eventos'][j]}` }))
                        }))
                    },
                    { 
                        name: 'Programación', 
                        children: Array(6).fill().map((_,i) => ({ 
                            name: ['Análisis de vulnerabilidades', 'Arquitecturas seguras', 'Gestión de identidades', 'Seguridad virtualizada', 'Defensa Cloud', 'Automatización seguridad'][i],
                            children: Array(6).fill().map((_,j) => ({ name: `N3: ${['Explotación servicios', 'Hardening aplicado', 'Detección logs', 'Análisis estático', 'Respuesta incidentes', 'Correlación eventos'][j]}` }))
                        }))
                    }
                ]
            },
            // RAMA 2: PORTAFOLIO
            {
                id: 'portafolio', name: 'Portafolio', color: COLORS.portafolio, icon: 'fa-solid fa-briefcase',
                children: [
                    {
                        name: 'Ciberseguridad',
                        children: Array(6).fill().map((_,i) => ({
                            name: ['Redacción técnica', 'Despliegues seguros', 'Gestión infra.', 'Análisis riesgos', 'Formación interna', 'Implementaciones reales'][i],
                            children: Array(6).fill().map((_,j) => ({ name: `Bitácora proyecto #${j+1} aplicado` }))
                        }))
                    },
                    {
                        name: 'Admin. Sistemas',
                        children: Array(6).fill().map((_,i) => ({
                            name: ['Redacción técnica', 'Despliegues seguros', 'Gestión infra.', 'Análisis riesgos', 'Formación interna', 'Implementaciones reales'][i],
                            children: Array(6).fill().map((_,j) => ({ name: `Bitácora proyecto #${j+1} aplicado` }))
                        }))
                    }
                ]
            },
            // RAMA 3: CASOS PÚBLICOS
            {
                id: 'casos', name: 'Casos Públicos', color: COLORS.casos, icon: 'fa-solid fa-newspaper',
                children: [
                    { name: 'Ciberseguridad', children: Array(5).fill().map((_,i) => ({ name: `Caso práctico documentado #${i+1}` })) },
                    { name: 'Sistemas', children: Array(5).fill().map((_,i) => ({ name: `Caso práctico documentado #${i+1}` })) }
                ]
            },
            // RAMA 4: LABORATORIO
            {
                id: 'laboratorio', name: 'Laboratorio', color: COLORS.laboratorio, icon: 'fa-solid fa-flask',
                children: [
                    { name: 'WebGoat', children: Array(5).fill().map((_,i) => ({ name: `Experimento guiado #${i+1}` })) },
                    { name: 'TryHackMe', children: Array(5).fill().map((_,i) => ({ name: `Experimento guiado #${i+1}` })) }
                ]
            },
            // RAMA 5: PROYECTOS
            {
                id: 'proyectos', name: 'Proyectos', color: COLORS.proyectos, icon: 'fa-solid fa-rocket',
                children: [
                    { 
                        name: 'Raptureward', 
                        children: [
                            { name: 'Documentación estructurada' },
                            { name: 'Área de descargas y versiones' }
                        ] 
                    }
                ]
            }
        ]
    };

    // --- 2. MOTOR GRÁFICO ---
    let nodes = [];
    let activeNodeId = 'root'; // Quién está iluminado
    let camera = { x: 0, y: 0, zoom: 0.8 }; // Cámara inicial
    let ctx;

    // Configuración de radios (distancia del centro)
    const RADII = [0, 250, 500, 800]; 

    function init() {
        if (!container || !canvas || !world) return;
        ctx = canvas.getContext('2d');
        
        // 1. Construir nodos (Matemáticas polares)
        buildGraph(rawData);
        
        // 2. Renderizar en el DOM
        renderDOM();
        
        // 3. Loop de animación (Canvas líneas)
        resize();
        window.addEventListener('resize', resize);
        requestAnimationFrame(drawLines);
        
        // 4. Centrar
        focusNode('root');
        
        // Botón reset
        document.getElementById('mapReset')?.addEventListener('click', () => focusNode('root'));
    }

    function buildGraph(data) {
        let idCounter = 0;
        
        function traverse(node, level, parent, startAngle, endAngle) {
            const myId = node.id || `n_${idCounter++}`;
            const color = node.color || parent.color;
            
            // Calcular posición
            let x = 0, y = 0;
            let myAngle = (startAngle + endAngle) / 2;
            
            if (level > 0) {
                const r = RADII[level];
                // Ajuste aleatorio ligero para que no sea una línea recta perfecta (más orgánico)
                const jitter = (Math.random() - 0.5) * 0.1; 
                myAngle += jitter; 
                x = Math.cos(myAngle) * r;
                y = Math.sin(myAngle) * r;
            }

            const newNode = {
                id: myId,
                name: node.name,
                level: level,
                color: color,
                icon: node.icon || (level === 3 ? 'fa-solid fa-file-lines' : 'fa-solid fa-folder'),
                x: x, 
                y: y,
                parent: parent,
                childrenIds: []
            };
            
            nodes.push(newNode);
            if(parent) parent.childrenIds.push(myId);

            // Procesar hijos
            if (node.children && node.children.length > 0) {
                const step = (endAngle - startAngle) / node.children.length;
                node.children.forEach((child, i) => {
                    const s = startAngle + i * step;
                    const e = s + step;
                    traverse(child, level + 1, newNode, s, e);
                });
            }
        }

        // Raíz
        traverse(data, 0, null, 0, Math.PI * 2);
    }

    function renderDOM() {
        world.innerHTML = '';
        nodes.forEach(node => {
            const el = document.createElement('div');
            el.className = 'map-node';
            el.dataset.id = node.id;
            el.dataset.level = node.level;
            
            // Estilos inline para posición y color
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
            el.style.setProperty('--node-color', node.color);
            
            // Convertir hex a rgb para sombras (simple hack)
            // Para producción, idealmente convertir hex a rgb real
            el.style.setProperty('--node-rgb', '255, 159, 26'); // Fallback naranja

            el.innerHTML = `
                <div class="node-body">
                    <i class="node-icon ${node.icon}"></i>
                </div>
                <span class="node-label">${node.name}</span>
            `;

            // Click Event
            el.onclick = (e) => {
                e.stopPropagation(); // Evitar drag del world
                focusNode(node.id);
            };

            world.appendChild(el);
        });
    }

    function focusNode(targetId) {
        activeNodeId = targetId;
        const target = nodes.find(n => n.id === targetId);
        if(!target) return;

        // 1. Actualizar Clases CSS (Active / Dimmed)
        // Lógica: Iluminar el nodo, sus ancestros y sus hijos directos.
        const activeSet = new Set();
        
        // Añadir el target
        activeSet.add(target.id);
        
        // Añadir ancestros (hacia arriba)
        let curr = target;
        while(curr.parent) {
            activeSet.add(curr.parent.id);
            curr = curr.parent;
        }
        
        // Añadir hijos (hacia abajo)
        if (target.childrenIds) {
            target.childrenIds.forEach(id => activeSet.add(id));
        }

        // Aplicar clases
        const domNodes = document.querySelectorAll('.map-node');
        domNodes.forEach(el => {
            const id = el.dataset.id;
            el.classList.remove('active', 'dimmed');
            
            if (activeSet.has(id)) {
                el.classList.add('active');
            } else {
                el.classList.add('dimmed');
            }
        });

        // 2. Mover Cámara
        // Queremos que el target esté en el centro, o un poco a la izquierda.
        // En la pantalla, el centro es 0,0 (relativo al world).
        // Queremos mover el world para que target.x esté en el centro.
        // Transform = translate(-target.x, -target.y)
        
        // Zoom: Nivel 0 = 0.8, Nivel 3 = 1.5
        const targetZoom = 0.8 + (target.level * 0.3);
        
        // Ajuste para que la rama activa quede visible a la izquierda (offset)
        const offsetX = target.level > 0 ? window.innerWidth * 0.15 : 0; 

        world.style.transform = `translate(calc(50% - ${target.x}px + ${offsetX}px), calc(50% - ${target.y}px)) scale(${targetZoom})`;
        
        // Guardar estado para el canvas
        camera = { x: target.x, y: target.y, zoom: targetZoom };
    }

    function drawLines() {
        // Limpiar canvas
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Necesitamos simular la transformación CSS en el Canvas para que coincidan
        // Esto es complejo porque el CSS usa transition.
        // Truco visual: Dibujamos líneas estáticas relativas al centro de la pantalla
        // calculando donde "deberían" estar los nodos.
        
        // Para esta versión 100% visual sin librerías pesadas, 
        // vamos a usar SVG dinámico o simplemente dejar que el canvas renderice
        // las líneas calculando la posición proyectada.
        
        // SIMPLIFICACIÓN PRO:
        // Como la animación CSS es compleja de replicar frame a frame en Canvas sin lags,
        // usaremos un truco: las líneas son parte del "World" en el DOM si usamos SVG.
        // PERO, tú pediste rendimiento.
        
        // Vamos a calcular la matriz de transformación actual del div .network-world
        const style = window.getComputedStyle(world);
        const matrix = new DOMMatrix(style.transform);
        
        ctx.save();
        // Aplicar la misma transformación que tiene el div
        ctx.translate(canvas.width/2, canvas.height/2); // Centro pantalla
        ctx.translate(matrix.e - canvas.width/2, matrix.f - canvas.height/2); // Traslación CSS
        ctx.scale(matrix.a, matrix.d); // Escala CSS
        
        // Dibujar conexiones
        ctx.lineWidth = 2;
        nodes.forEach(node => {
            if (node.parent) {
                const parent = nodes.find(n => n.id === node.parent.id);
                
                // ¿Está activa la línea?
                // Si ambos nodos NO están 'dimmed', la línea brilla
                const nodeEl = document.querySelector(`.map-node[data-id="${node.id}"]`);
                const isDimmed = nodeEl && nodeEl.classList.contains('dimmed');
                
                ctx.beginPath();
                ctx.moveTo(parent.x, parent.y);
                ctx.lineTo(node.x, node.y);
                
                if (isDimmed) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                } else {
                    ctx.strokeStyle = node.color; // Color de la rama
                }
                
                ctx.stroke();
            }
        });
        
        ctx.restore();
        requestAnimationFrame(drawLines);
    }

    function resize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    // Arrancar
    init();
});
