/* ======================================================
   PANEL DE CONTENIDO (EXPLORADOR) & DATOS GLOBALES
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM (Elementos comunes)
    const btnExplorer = document.getElementById('btnExplorer');
    const btnNetwork = document.getElementById('btnNetwork');
    const explorerView = document.getElementById('explorerView');
    const networkView = document.getElementById('networkView');
    const vaultSearch = document.getElementById('vaultSearch');
    
    // Referencias al DOM (Específicos del Explorador)
    const vaultTree = document.getElementById('vaultTree');
    const vaultBreadcrumb = document.getElementById('vaultBreadcrumb');
    const vaultContent = document.getElementById('vaultContent');

    // Stats Elements
    const statTotalEl = document.getElementById('statTotal');
    const statFoldersEl = document.getElementById('statFolders');
    const statFilesEl = document.getElementById('statFiles');

    /* --- 1. BASE DE DATOS GLOBAL (Accesible por window) --- */
    // Definimos los datos en el objeto global 'window' para que mapa.js pueda leerlos.
    window.knowledgeData = [
        {
            id: "teoria", name: "Teoría y Fundamentos", type: "folder", icon: "fa-solid fa-book-journal-whills", color: "#ff9f1a",
            children: [
                {
                    id: "ciberseguridad", name: "Ciberseguridad", type: "folder", icon: "fa-solid fa-shield-halved", color: "#ef4444",
                    children: [
                        { id: "hacking_etico", name: "Hacking Ético (Metodologías)", type: "file", fmt: "PDF", size: "2.4 MB", date: "2024-11-01" },
                        { id: "blue_team_ops", name: "Blue Team Ops & Defensa", type: "file", fmt: "MD", size: "15 KB", date: "2024-10-20" },
                        { id: "normativas", name: "Normativas (ISO/NIST)", type: "file", fmt: "PDF", size: "1.1 MB", date: "2024-09-15" }
                    ]
                },
                {
                    id: "sistemas_redes", name: "Sistemas y Redes", type: "folder", icon: "fa-solid fa-server", color: "#3b82f6",
                    children: [
                        { id: "linux_hard", name: "Hardening Linux Servers", type: "file", fmt: "MD", size: "45 KB", date: "2024-11-10" },
                        { id: "win_ad", name: "Windows Active Directory Arch", type: "file", fmt: "PDF", size: "3.5 MB", date: "2024-10-05" },
                        { id: "net_protocols", name: "Protocolos de Red a fondo", type: "file", fmt: "MD", size: "22 KB", date: "2024-08-20" }
                    ]
                },
                 {
                    id: "programacion", name: "Programación & Scripting", type: "folder", icon: "fa-solid fa-code", color: "#22c55e",
                    children: [
                         { id: "python_sec", name: "Python for Security", type: "file", fmt: "PY", size: "8 KB", date: "2024-11-15" },
                         { id: "bash_auto", name: "Automatización con Bash", type: "file", fmt: "SH", size: "5 KB", date: "2024-10-25" }
                    ]
                }
            ]
        },
        {
            id: "portafolio", name: "Portafolio de Proyectos", type: "folder", icon: "fa-solid fa-briefcase", color: "#a855f7",
            children: [
                {
                    id: "proyectos_impl", name: "Implementaciones", type: "folder", icon: "fa-solid fa-rocket", color: "#a855f7",
                    children: [
                        { id: "k8s_cluster", name: "Despliegue Cluster K8s", type: "file", fmt: "PDF", size: "5.2 MB", date: "2024-11-20" },
                        { id: "cloud_mig", name: "Migración a AWS segura", type: "file", fmt: "PDF", size: "4.1 MB", date: "2024-09-30" }
                    ]
                },
                 {
                    id: "casos_estudio", name: "Casos de Estudio", type: "folder", icon: "fa-solid fa-magnifying-glass-chart", color: "#eab308",
                    children: [
                         { id: "forense_ransom", name: "Análisis Forense Ransomware", type: "file", fmt: "MD", size: "120 KB", date: "2024-11-05" }
                    ]
                }
            ]
        },
        {
             id: "laboratorio", name: "Laboratorio Personal", type: "folder", icon: "fa-solid fa-flask", color: "#06b6d4",
             children: [
                 { id: "homelab_setup", name: "Setup del Homelab (Proxmox)", type: "file", fmt: "MD", size: "18 KB", date: "2024-10-12" },
                 { id: "vuln_box", name: "Máquina Vulnerable Custom", type: "file", fmt: "OVA", size: "1.5 GB", date: "2024-09-01" }
             ]
        }
    ];

    /* --- 2. LÓGICA COMPARTIDA (Toggles, Search, Stats) --- */
    
    // Event Listeners para los botones de vista
    btnExplorer.addEventListener('click', () => switchView('explorer'));
    btnNetwork.addEventListener('click', () => switchView('network'));

    function switchView(viewName) {
        if (viewName === 'explorer') {
            btnExplorer.classList.add('active');
            btnNetwork.classList.remove('active');
            explorerView.classList.add('active');
            networkView.classList.remove('active');
        } else {
            btnNetwork.classList.add('active');
            btnExplorer.classList.remove('active');
            networkView.classList.add('active');
            explorerView.classList.remove('active');
             // Disparar evento de resize para que Chart.js se ajuste si estaba oculto
            window.dispatchEvent(new Event('resize'));
        }
    }

    // Buscador Global (Afecta principalmente al explorador)
    vaultSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 1) {
             // Si estamos en vista de red, cambiamos a explorador para mostrar resultados
            if (!explorerView.classList.contains('active')) {
                switchView('explorer');
            }
            renderSearchResults(query);
        } else if (query.length === 0) {
             // Resetear vista si se borra la búsqueda
             renderFolderContent(currentFolder);
        }
    });

    // Cálculo de estadísticas
    function updateVaultStats() {
        let files = 0;
        let folders = 0;

        function traverse(nodes) {
            nodes.forEach(node => {
                if (node.type === 'folder') {
                    folders++;
                    if (node.children) traverse(node.children);
                } else {
                    files++;
                }
            });
        }

        traverse(window.knowledgeData);
        statTotalEl.textContent = files + folders;
        statFoldersEl.textContent = folders;
        statFilesEl.textContent = files;
    }

    /* --- 3. LÓGICA DEL EXPLORADOR (Tree & Table) --- */
    let currentPath = [];
    let currentFolder = null;
    let flatSearchIndex = []; // Índice plano para búsquedas rápidas

    function initExplorer() {
        // Construir índice plano para búsquedas
        buildFlatIndex(window.knowledgeData);
        // Renderizar estado inicial
        renderTree(window.knowledgeData, vaultTree);
        navigateToFolder(window.knowledgeData[0]); // Empezar en la primera carpeta
        updateVaultStats();
    }

    // --- Funciones de Navegación y Renderizado ---

    // Navegar a una carpeta específica
    function navigateToFolder(folderNode) {
        currentFolder = folderNode;
        
        // Actualizar path (simplificado para este ejemplo, asume profundidad 1 o 2)
        updatePathStack(folderNode);

        renderBreadcrumb();
        renderFolderContent(folderNode);
        
        // Actualizar estado activo en el árbol lateral
        document.querySelectorAll('.vault-tree-item').forEach(item => item.classList.remove('active'));
        const activeTreeItem = document.querySelector(`.vault-tree-item[data-id="${folderNode.id}"]`);
        if(activeTreeItem) activeTreeItem.classList.add('active');
        
        // Limpiar buscador
        vaultSearch.value = '';
    }

    // Actualizar la pila de navegación (breadcrumbs)
    function updatePathStack(targetNode) {
        // Lógica simple para reconstruir el path. En un sistema real sería más complejo.
        currentPath = [];
        
        // Buscar el nodo raíz
        const root = window.knowledgeData.find(r => r.id === targetNode.id || r.children?.some(c => c.id === targetNode.id || c.children?.some(gc => gc.id === targetNode.id)));
        
        if(root) {
            currentPath.push(root);
            if(root.id !== targetNode.id) {
                 const sub = root.children?.find(c => c.id === targetNode.id || c.children?.some(gc => gc.id === targetNode.id));
                 if(sub) {
                     currentPath.push(sub);
                     if(sub.id !== targetNode.id) {
                         currentPath.push(targetNode);
                     }
                 }
            }
        }
    }

    // Renderizar Árbol Lateral (Recursivo)
    function renderTree(nodes, container, level = 0) {
        nodes.forEach(node => {
            if (node.type === 'folder') {
                const item = document.createElement('div');
                item.className = 'vault-tree-item';
                item.style.paddingLeft = `${level * 12 + 8}px`;
                item.dataset.id = node.id;
                item.innerHTML = `<i class="${node.icon}" style="color:${node.color}"></i> ${node.name}`;
                
                item.onclick = (e) => {
                    e.stopPropagation();
                    navigateToFolder(node);
                };
                
                container.appendChild(item);
                if (node.children) {
                    renderTree(node.children, container, level + 1);
                }
            }
        });
    }

    // Renderizar Breadcrumbs
    function renderBreadcrumb() {
        let html = '';
        currentPath.forEach((node, index) => {
            const isLast = index === currentPath.length - 1;
            html += `<span class="bread-item ${isLast ? 'bread-current' : ''}" data-id="${node.id}">${node.name}</span>`;
            if (!isLast) html += '<span class="bread-sep">/</span>';
        });
        vaultBreadcrumb.innerHTML = html || 'Root';

        // Añadir clicks a los breadcrumbs
        vaultBreadcrumb.querySelectorAll('.bread-item:not(.bread-current)').forEach(item => {
           item.onclick = () => {
               const nodeId = item.dataset.id;
               // Buscar el nodo en el índice plano
               const targetNode = flatSearchIndex.find(n => n.id === nodeId && n.type === 'folder');
               if(targetNode) navigateToFolder(targetNode);
           }
        });
    }

    // Renderizar Contenido de la Tabla
    function renderFolderContent(folderNode) {
        let html = `
            <table class="vault-table">
                <thead>
                    <tr>
                        <th class="col-icon"></th>
                        <th class="col-name">Nombre</th>
                        <th class="col-type">Tipo</th>
                        <th class="col-date">Fecha</th>
                        <th class="col-size">Tamaño</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Botón "Subir Nivel" si no estamos en la raíz absoluta (simplificado)
        if (currentPath.length > 1) {
            html += `
                <tr class="up-level-row">
                    <td class="col-icon"><i class="fa-solid fa-turn-up"></i></td>
                    <td class="col-name" colspan="4">.. (Subir un nivel)</td>
                </tr>
            `;
        }

        if (folderNode.children && folderNode.children.length > 0) {
            folderNode.children.forEach(child => {
                const icon = getIcon(child);
                const typeLabel = child.type === 'folder' ? 'Carpeta' : child.fmt;
                
                html += `
                    <tr class="vault-row" data-id="${child.id}" data-type="${child.type}">
                        <td class="col-icon"><i class="${icon.class}" style="color:${icon.color}"></i></td>
                        <td class="col-name">${child.name}</td>
                        <td class="col-type"><span class="type-badge">${typeLabel}</span></td>
                        <td class="col-date">${formatDate(child.date)}</td>
                        <td class="col-size">${child.size || '--'}</td>
                    </tr>
                `;
            });
        } else {
            html += `<tr><td colspan="5" class="vault-empty">Carpeta vacía</td></tr>`;
        }

        html += `</tbody></table>`;
        vaultContent.innerHTML = html;

        // Eventos de click en filas
        vaultContent.querySelectorAll('.vault-row, .up-level-row').forEach(row => {
            row.onclick = () => {
                if(row.classList.contains('up-level-row')) {
                    // Volver al padre
                    if(currentPath.length > 1) {
                        navigateToFolder(currentPath[currentPath.length - 2]);
                    }
                } else {
                    const type = row.dataset.type;
                    const id = row.dataset.id;
                    const node = flatSearchIndex.find(n => n.id === id);
                    
                    if (type === 'folder') {
                        navigateToFolder(node);
                    } else {
                        // Simular apertura de archivo
                        alert(`Abriendo documento: ${node.name}\nFormato: ${node.fmt}`);
                    }
                }
            };
        });
    }

    // --- Funciones de Búsqueda y Utilidades ---

    // Construir índice plano recursivamente
    function buildFlatIndex(nodes) {
        nodes.forEach(node => {
            flatSearchIndex.push(node);
            if (node.children) buildFlatIndex(node.children);
        });
    }

    // Renderizar resultados de búsqueda
    function renderSearchResults(query) {
        const results = flatSearchIndex.filter(node => 
            node.name.toLowerCase().includes(query) && node.type === 'file'
        );

        vaultBreadcrumb.innerHTML = `<span class="bread-current">Resultados de búsqueda: "${query}"</span>`;
        
        let html = `
            <table class="vault-table">
                <thead>
                   <tr><th class="col-icon"></th><th class="col-name">Nombre</th><th class="col-type">Ubicación</th></tr>
                </thead>
                <tbody>
        `;

        if (results.length > 0) {
            results.forEach(res => {
                 const icon = getIcon(res);
                 // Intentar encontrar el padre para mostrar ubicación (simplificado)
                 let parentName = "Raíz";
                 const parent = flatSearchIndex.find(p => p.children?.some(c => c.id === res.id));
                 if(parent) parentName = parent.name;

                 html += `
                    <tr class="vault-row" data-id="${res.id}" data-type="file">
                        <td class="col-icon"><i class="${icon.class}" style="color:${icon.color}"></i></td>
                        <td class="col-name">${res.name}</td>
                         <td class="col-type"><span class="type-badge">${parentName}</span></td>
                    </tr>
                `;
            });
        } else {
             html += `<tr><td colspan="3" class="vault-empty">No se encontraron coincidencias.</td></tr>`;
        }
        
        html += `</tbody></table>`;
        vaultContent.innerHTML = html;

         // Eventos de click en resultados
         vaultContent.querySelectorAll('.vault-row').forEach(row => {
            row.onclick = () => {
                const id = row.dataset.id;
                const node = flatSearchIndex.find(n => n.id === id);
                alert(`Abriendo desde búsqueda: ${node.name}`);
            }
         });
    }

    // Helpers de formato
    function getIcon(node) {
        if (node.type === 'folder') return { class: node.icon || 'fa-solid fa-folder', color: node.color || '#94a3b8' };
        if (node.fmt === 'PDF') return { class: 'fa-regular fa-file-pdf', color: '#e74c3c' };
        if (node.fmt === 'MD' || node.fmt === 'TXT') return { class: 'fa-regular fa-file-lines', color: '#94a3b8' };
        if (node.fmt === 'PY' || node.fmt === 'SH' || node.fmt === 'JS') return { class: 'fa-regular fa-file-code', color: '#22c55e' };
        if (node.fmt === 'OVA' || node.fmt === 'ZIP') return { class: 'fa-regular fa-file-zipper', color: '#f1c40f' };
        return { class: 'fa-regular fa-file', color: '#64748b' };
    }

    function formatDate(dateStr) {
        if(!dateStr) return '--';
        return dateStr; // Se podría usar una librería de fechas aquí
    }

    // ======================================================
    // INICIALIZACIÓN DEL PANEL
    // ======================================================
    // Solo inicializamos el explorador aquí. El mapa se inicia en su propio archivo.
    initExplorer();
});
