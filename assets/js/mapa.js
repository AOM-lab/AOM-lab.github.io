/* ======================================================
   LÓGICA DEL MAPA VISUAL (NETWORK GRAPH - CHART.JS)
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const networkCanvas = document.getElementById('networkCanvas');
    
    // Verificación de seguridad: Si no hay canvas o no se han cargado los datos principales, no hacemos nada.
    if (!networkCanvas || !window.knowledgeData) {
        console.warn('Network Graph: Canvas not found or data not loaded via panelContenido.js');
        return;
    }

    let networkChart = null;

    function initNetworkGraph() {
        const ctx = networkCanvas.getContext('2d');
        const { nodes, edges } = processDataForGraph(window.knowledgeData);

        // Configuración de Chart.js (Tipo 'graph' requiere el plugin chartjs-chart-graph)
        const config = {
            type: 'graph',
            data: {
                labels: nodes.map(n => n.label),
                datasets: [{
                    label: 'Knowledge Graph',
                    data: nodes,
                    edges: edges,
                    backgroundColor: nodes.map(n => n.color),
                    borderColor: nodes.map(n => n.borderColor),
                    borderWidth: 1,
                    pointRadius: nodes.map(n => n.size),
                    pointHoverRadius: nodes.map(n => n.size + 4),
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 20
                },
                plugins: {
                    legend: { display: false }, // Usamos nuestra propia leyenda HTML
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const node = context.raw;
                                return `${node.label} (${node.nodeType === 'folder' ? 'Área/Carpeta' : 'Recurso'})`;
                            }
                        }
                    },
                    // Configuración del layout de fuerza dirigido (force-directed)
                    graph: {
                        layout: {
                            algorithm: 'force-directed',
                            edgeLength: 100,
                            padding: 50,
                            springConstant: 0.05,
                            damping: 0.09
                        }
                    }
                },
                scales: {
                    x: { display: false, ticks: { display: false }, grid: { display: false } },
                    y: { display: false, ticks: { display: false }, grid: { display: false } }
                },
                interaction: {
                    hover: true
                },
                // Evento de click en nodos
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const nodeIndex = elements[0].index;
                        const nodeData = nodes[nodeIndex];
                        alert(`Explorando nodo: ${nodeData.label}\nTipo: ${nodeData.nodeType}`);
                        // Aquí se podría conectar para volver al explorador y abrir la carpeta
                    }
                }
            }
        };

        if (networkChart) networkChart.destroy();
        // Asume que Chart.js y el plugin de grafo ya están cargados en el HTML principal
        if (typeof Chart !== 'undefined') {
             networkChart = new Chart(ctx, config);
        } else {
             console.error('Chart.js library not loaded.');
             networkCanvas.innerHTML = '<p style="text-align:center; padding: 20px; color: #ef4444;">Error: Chart.js no está cargado.</p>';
        }
    }

    // Procesar los datos jerárquicos a formato plano (nodos y aristas) para el grafo
    function processDataForGraph(data) {
        let nodes = [];
        let edges = [];
        let idCounter = 0;

        // Nodo central raíz (invisible o decorativo)
        const rootId = 'root_hub';
        nodes.push({
            id: rootId,
            label: 'AO · Knowledge Hub',
            color: '#ffffff',
            borderColor: 'rgba(255,255,255,0.5)',
            size: 25,
            nodeType: 'root'
        });

        function traverse(items, parentId) {
            items.forEach(item => {
                const nodeId = item.id || `node_${idCounter++}`;
                
                // Determinar estilo según tipo
                const isFolder = item.type === 'folder';
                const color = item.color || (isFolder ? '#ff9f1a' : '#64748b');
                // Los archivos son más pequeños y transparentes
                const bgColor = isFolder ? color : `${color}99`; 
                const borderColor = isFolder ? 'rgba(255,255,255,0.8)' : color;
                const size = isFolder ? (item.children ? 18 : 14) : 8;

                // Añadir nodo
                nodes.push({
                    id: nodeId,
                    label: item.name,
                    color: bgColor,
                    borderColor: borderColor,
                    size: size,
                    nodeType: item.type,
                    dataRef: item // Referencia al objeto original por si acaso
                });

                // Añadir arista (conexión con el padre)
                edges.push({
                    source: parentId,
                    target: nodeId,
                    borderColor: isFolder ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    borderWidth: isFolder ? 2 : 1
                });

                // Recursividad para hijos
                if (item.children) {
                    traverse(item.children, nodeId);
                }
            });
        }

        // Empezar a recorrer desde la raíz
        traverse(data, rootId);

        return { nodes, edges };
    }

    // Inicializar el grafo una vez que el DOM esté listo y los datos existan
    initNetworkGraph();

    // Escuchar el redimensionamiento de la ventana para ajustar el canvas
    window.addEventListener('resize', () => {
        if (networkChart && document.getElementById('networkView').classList.contains('active')) {
            networkChart.resize();
        }
    });
});
