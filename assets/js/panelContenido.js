/* ===============================
   LÓGICA DEL EXPLORADOR PRO
   (Gestión de Estado: Max 2 Accordions FIFO + Toggle Cerrar)
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const btnExplorer = document.getElementById('btnExplorer');
    const btnNetwork = document.getElementById('btnNetwork');
    const explorerView = document.getElementById('explorerView');
    const networkView = document.getElementById('networkView');
    
    const vaultTree = document.getElementById('vaultTree');
    const vaultBreadcrumb = document.getElementById('vaultBreadcrumb');
    const vaultContent = document.getElementById('vaultContent');
    const searchInput = document.getElementById('vaultSearch');

    const statsTotal = document.getElementById('statTotal');
    const statsFolders = document.getElementById('statFolders');
    const statsFiles = document.getElementById('statFiles');

    // ESTADO DE NAVEGACIÓN
    let currentPath = ['root'];
    let searchQuery = '';
    let allItems = [];
    
    // COLA DE CARPETAS ABIERTAS (FIFO - Max 2)
    let expandedQueue = []; 

    /* --- DATOS (Estructura del Vault - 4 Pilares) --- */
    window.vaultData = {
        id: 'root',
        name: 'Knowledge Vault',
        type: 'folder',
        children: [
          // 1. TEORÍA
          {
            id: 'teoria', name: 'Teoría y Conceptos', type: 'folder', category: 'teoria',
            children: [
              { id: 'area-ciber', name: 'Área Ciberseguridad', type: 'folder', category: 'teoria',
                children: [
                    { id: 'c-h-1', name: 'Hardening CIS', type: 'file', fileType: 'pdf', category: 'teoria' },
                    { id: 'c-p-1', name: 'Metodología OWASP', type: 'file', fileType: 'pdf', category: 'teoria' },
                    { id: 'c-n-1', name: 'Normativa ENS/ISO', type: 'file', fileType: 'pdf', category: 'teoria' }
                ]},
              { id: 'area-sys', name: 'Área Sistemas', type: 'folder', category: 'teoria',
                children: [
                    { id: 's-l-1', name: 'Admin Linux RHEL', type: 'file', fileType: 'doc', category: 'teoria' },
                    { id: 's-w-1', name: 'Windows Server & AD', type: 'file', fileType: 'doc', category: 'teoria' },
                    { id: 's-c-1', name: 'Arquitectura Cloud', type: 'file', fileType: 'doc', category: 'teoria' }
                ]},
              { id: 'area-dev', name: 'Área Programación', type: 'folder', category: 'teoria',
                children: [
                    { id: 'p-py-1', name: 'Python for Security', type: 'file', fileType: 'code', category: 'teoria' },
                    { id: 'p-b-1', name: 'Bash Scripting', type: 'file', fileType: 'code', category: 'teoria' }
                ]}
            ]
          },

          // 2. PORTAFOLIO
          {
            id: 'portafolio', name: 'Portafolio', type: 'folder', category: 'portafolio',
            children: [
              // Subcarpeta Placeholder 1
              { id: 'port-ph-1', name: 'Placeholder', type: 'folder', category: 'portafolio',
                children: [
                    { id: 'pp-1-1', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'portafolio' },
                    { id: 'pp-1-2', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'portafolio' },
                    { id: 'pp-1-3', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'portafolio' }
                ]
              },
              // Subcarpeta Placeholder 2
              { id: 'port-ph-2', name: 'Placeholder', type: 'folder', category: 'portafolio',
                children: [
                    { id: 'pp-2-1', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'portafolio' },
                    { id: 'pp-2-2', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'portafolio' },
                    { id: 'pp-2-3', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'portafolio' }
                ]
              }
            ]
          },

          // 3. LABORATORIO
          {
            id: 'laboratorio', name: 'Laboratorio', type: 'folder', category: 'laboratorio',
            children: [
              { id: 'lab-ctf', name: 'Writeups CTF', type: 'folder', category: 'laboratorio',
                children: [
                    { id: 'l-htb', name: 'HackTheBox Reports', type: 'file', fileType: 'doc', category: 'laboratorio' },
                    { id: 'l-thm', name: 'TryHackMe Path', type: 'file', fileType: 'doc', category: 'laboratorio' }
                ]},
              { id: 'lab-pentest', name: 'Pentesting Activo', type: 'folder', category: 'laboratorio',
                children: [
                    { id: 'l-p-1', name: 'Auditoría Wifi', type: 'file', fileType: 'doc', category: 'laboratorio' },
                    { id: 'l-p-2', name: 'Análisis Vulnerabilidades', type: 'file', fileType: 'pdf', category: 'laboratorio' }
                ]}
            ]
          },

          // 4. CASOS REALES
          {
            id: 'casos-reales', name: 'Casos Reales', type: 'folder', category: 'casos',
            children: [
               // Subcarpeta Placeholder 1
               { id: 'casos-ph-1', name: 'Placeholder', type: 'folder', category: 'casos',
                children: [
                    { id: 'cp-1-1', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'casos' },
                    { id: 'cp-1-2', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'casos' },
                    { id: 'cp-1-3', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'casos' }
                ]
              },
              // Subcarpeta Placeholder 2
              { id: 'casos-ph-2', name: 'Placeholder', type: 'folder', category: 'casos',
                children: [
                    { id: 'cp-2-1', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'casos' },
                    { id: 'cp-2-2', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'casos' },
                    { id: 'cp-2-3', name: 'Placeholder', type: 'file', fileType: 'doc', category: 'casos' }
                ]
              }
            ]
          }
        ]
      };

    // ===== UTILIDADES =====
    function flattenData(node, path = []) {
        const items = [];
        const currentPathArray = [...path, node.id];
        
        if (node.id !== 'root') {
            items.push({ ...node, path: currentPathArray, pathNames: getPathNames(currentPathArray) });
        }
        
        if (node.children) {
            node.children.forEach(child => items.push(...flattenData(child, currentPathArray)));
        }
        return items;
    }

    function getPathNames(pathArray) {
        const names = [];
        let current = window.vaultData;
        for (let i = 1; i < pathArray.length; i++) {
            const found = findNodeById(current, pathArray[i]);
            if (found) { names.push(found.name); current = found; }
        }
        return names;
    }

    function findNodeById(node, id) {
        if (node.id === id) return node;
        if (node.children) {
            for (const child of node.children) {
                const found = findNodeById(child, id);
                if (found) return found;
            }
        }
        return null;
    }

    function getCurrentNode() {
        let node = window.vaultData;
        for (let i = 1; i < currentPath.length; i++) {
            const child = node.children?.find(c => c.id === currentPath[i]);
            if (child) node = child;
        }
        return node;
    }

    function countItems(node) {
        let folders = 0, files = 0;
        function count(n) {
            if (n.type === 'folder') { folders++; n.children?.forEach(count); }
            else { files++; }
        }
        node.children?.forEach(count);
        return { folders, files, total: folders + files };
    }

    function getIcon(item) {
        if (item.type === 'folder') return 'fa-solid fa-folder';
        switch (item.fileType) {
            case 'pdf': return 'fa-solid fa-file-pdf';
            case 'doc': return 'fa-solid fa-file-lines';
            case 'code': return 'fa-solid fa-file-code';
            default: return 'fa-solid fa-file';
        }
    }

    function getTypeName(item) {
        if (item.type === 'folder') return 'Carpeta';
        switch (item.fileType) {
            case 'pdf': return 'PDF';
            case 'doc': return 'Documento';
            case 'code': return 'Código';
            default: return 'Archivo';
        }
    }

    // ===== GESTIÓN DE LA COLA DE EXPANSIÓN (FIFO - MAX 2) =====
    function updateExpandedQueue(folderId) {
        // 1. Si ya está en la cola, no hacemos nada
        if (expandedQueue.includes(folderId)) return;

        // 2. Agregamos el nuevo folder
        expandedQueue.push(folderId);

        // 3. Si superamos el límite de 2, sacamos el más antiguo (FIFO)
        if (expandedQueue.length > 2) {
            expandedQueue.shift(); 
        }
    }
    
    function isNodeExpanded(nodeId) {
        return expandedQueue.includes(nodeId) || currentPath.includes(nodeId);
    }

    // ===== RENDERIZADO =====
    function renderStats() {
        const counts = countItems(window.vaultData);
        if (statsTotal) statsTotal.textContent = counts.total;
        if (statsFolders) statsFolders.textContent = counts.folders;
        if (statsFiles) statsFiles.textContent = counts.files;
    }

    function renderBreadcrumb() {
        if (!vaultBreadcrumb) return;
        let html = `<div class="breadcrumb-item" data-path="root"><i class="fa-solid fa-house breadcrumb-home"></i><span>Inicio</span></div>`;
        let pathSoFar = ['root'];
        
        for (let i = 1; i < currentPath.length; i++) {
            pathSoFar.push(currentPath[i]);
            const node = findNodeById(window.vaultData, currentPath[i]);
            const isLast = i === currentPath.length - 1;
            html += `<i class="fa-solid fa-chevron-right breadcrumb-separator"></i>`;
            html += `<div class="breadcrumb-item ${isLast ? 'current' : ''}" data-path="${pathSoFar.join(',')}">${node?.name || currentPath[i]}</div>`;
        }
        
        vaultBreadcrumb.innerHTML = html;
        vaultBreadcrumb.querySelectorAll('.breadcrumb-item:not(.current)').forEach(item => {
            item.addEventListener('click', () => navigateTo(item.dataset.path.split(',')));
        });
    }

    function renderContent() {
        if (!vaultContent) return;
        const node = getCurrentNode();
        const items = node.children || [];
        
        if (items.length === 0) {
            vaultContent.innerHTML = `<div class="vault-empty"><i class="fa-solid fa-folder-open"></i><div class="vault-empty-title">Carpeta vacía</div></div>`;
            return;
        }
        
        let html = '<div class="content-grid">';
        if (currentPath.length > 1) {
            html += `<div class="vault-card back-card" data-action="back"><div class="card-icon"><i class="fa-solid fa-arrow-left"></i></div><div class="card-title">Volver</div><div class="card-meta"><span class="card-type"><i class="fa-solid fa-level-up-alt"></i>Anterior</span></div></div>`;
        }
        
        items.forEach(item => {
            const icon = getIcon(item);
            const typeName = getTypeName(item);
            const isFolder = item.type === 'folder';
            const childCount = isFolder ? (countItems(item).total) : null;
            
            html += `<div class="vault-card ${isFolder ? 'is-folder' : 'is-file'}" data-id="${item.id}" data-category="${item.category || ''}">
                <div class="card-icon"><i class="${icon}"></i></div>
                <div class="card-title">${item.name}</div>
                <div class="card-meta">
                    <span class="card-type"><i class="${icon}"></i>${typeName}</span>
                    ${childCount !== null && childCount > 0 ? `<span class="card-count">${childCount}</span>` : ''}
                </div>
            </div>`;
        });
        
        html += '</div>';
        vaultContent.innerHTML = html;
        
        // --- MANEJADOR DE CLICS ---
        vaultContent.querySelectorAll('.vault-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.dataset.action === 'back') {
                    goBack();
                } else {
                    const item = findNodeById(window.vaultData, card.dataset.id);
                    
                    if (item?.type === 'folder') {
                        // SI ES CARPETA: NAVEGAMOS
                        if (window.vaultData.children.some(c => c.id === item.id)) {
                             updateExpandedQueue(item.id);
                        }
                        navigateTo([...currentPath, card.dataset.id]);
                    }
                    // SI ES ARCHIVO: NO HACEMOS NADA
                }
            });
        });
    }

    function renderSearchResults(results) {
        if (!vaultContent) return;
        let html = `<div class="search-results-header"><span class="search-results-count"><strong>${results.length}</strong> resultado${results.length !== 1 ? 's' : ''}</span><button class="search-clear" id="clearSearch"><i class="fa-solid fa-times"></i> Limpiar</button></div>`;
        
        if (results.length === 0) {
            html += `<div class="vault-empty"><i class="fa-solid fa-search"></i><div class="vault-empty-title">Sin resultados</div></div>`;
        } else {
            html += '<div class="content-grid" style="padding:20px;">';
            results.forEach(item => {
                const icon = getIcon(item);
                const highlighted = item.name.replace(new RegExp(`(${searchQuery})`, 'gi'), '<span class="highlight">$1</span>');
                
                html += `<div class="vault-card ${item.type === 'folder' ? 'is-folder' : 'is-file'}" data-id="${item.id}" data-path="${item.path.join(',')}" data-category="${item.category || ''}">
                    <div class="card-icon"><i class="${icon}"></i></div>
                    <div class="card-title">${highlighted}</div>
                    <div class="card-path"><i class="fa-solid fa-folder"></i>${item.pathNames.slice(0, -1).join(' > ') || 'Inicio'}</div>
                </div>`;
            });
            html += '</div>';
        }
        
        vaultContent.innerHTML = html;
        document.getElementById('clearSearch')?.addEventListener('click', clearSearch);
        
        vaultContent.querySelectorAll('.vault-card').forEach(card => {
            card.addEventListener('click', () => {
                const path = card.dataset.path?.split(',');
                if (path) {
                    const item = findNodeById(window.vaultData, card.dataset.id);
                    // Solo navegamos si es carpeta
                    if (item?.type === 'folder') {
                        navigateTo(path);
                    }
                    clearSearch();
                }
            });
        });
    }

    // --- RENDERIZADO DEL ÁRBOL LATERAL ---
    function renderTree() {
        if (!vaultTree) return;
        
        function renderNode(node) {
            const hasChildren = node.children?.some(c => c.type === 'folder' || c.type === 'file');
            const shouldBeExpanded = isNodeExpanded(node.id);
            const isActive = currentPath[currentPath.length - 1] === node.id;
            
            // Usamos countItems para mostrar el total (archivos + carpetas)
            const counts = countItems(node);
            const displayCount = counts.total;
            
            let html = `<li class="tree-item ${hasChildren ? 'has-children' : ''} ${shouldBeExpanded ? 'expanded' : ''}" data-id="${node.id}" data-category="${node.category || ''}">
                <div class="tree-item-header ${isActive ? 'active' : ''}">
                    <span class="tree-toggle"><i class="fa-solid fa-chevron-right"></i></span>
                    <span class="tree-icon"><i class="${getIcon(node)}"></i></span>
                    <span class="tree-label">${node.name}</span>
                    ${displayCount > 0 ? `<span class="tree-count">${displayCount}</span>` : ''}
                </div>`;
            
            if (hasChildren) {
                html += '<ul class="tree-children">';
                // Mostramos todo (Carpetas y Archivos) en el árbol
                node.children.forEach(child => html += renderNode(child));
                html += '</ul>';
            }
            return html + '</li>';
        }
        
        let html = '<ul class="tree-root">';
        window.vaultData.children.forEach(child => html += renderNode(child));
        html += '</ul>';
        vaultTree.innerHTML = html;
        
        // EVENTOS DEL ÁRBOL (CORREGIDO TOGGLE)
        vaultTree.querySelectorAll('.tree-item-header').forEach(header => {
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = header.closest('.tree-item');
                const nodeId = item.dataset.id;
                const nodeData = findNodeById(window.vaultData, nodeId);

                // Si es un archivo, no hacemos nada
                if (nodeData && nodeData.type !== 'folder') {
                    return;
                }

                // --- LÓGICA DE TOGGLE Y FIFO ---
                const isTopLevel = window.vaultData.children.some(c => c.id === nodeId);
                
                if (isTopLevel) {
                    if (expandedQueue.includes(nodeId)) {
                        // SI YA ESTÁ ABIERTO -> LO CERRAMOS
                        // 1. Lo quitamos de la cola
                        expandedQueue = expandedQueue.filter(id => id !== nodeId);
                        // 2. Navegamos al 'root' para simular que se ha cerrado la vista
                        navigateTo(['root']);
                        return; // IMPORTANTE: Paramos aquí para no volver a entrar
                    } else {
                        // SI ESTÁ CERRADO -> LO ABRIMOS
                        updateExpandedQueue(nodeId);
                    }
                }
                
                // Navegación estándar (para abrir)
                navigateTo(buildPathToNode(nodeId));
            });
        });
    }

    // --- LOGICA AUXILIAR ---
    function buildPathToNode(targetId) {
        function search(node, path) {
            if (node.id === targetId) return [...path, node.id];
            if (node.children) {
                for (const child of node.children) {
                    const res = search(child, [...path, node.id]);
                    if (res) return res;
                }
            }
            return null;
        }
        return search(window.vaultData, []) || ['root'];
    }

    function navigateTo(path) {
        currentPath = path;
        
        // Sincronizar navegación por breadcrumbs/cards con la cola
        if (path.length > 1) {
            const topLevelId = path[1];
            if (window.vaultData.children.some(c => c.id === topLevelId)) {
                // Solo añadir si no está ya (para no alterar el orden FIFO innecesariamente)
                 updateExpandedQueue(topLevelId);
            }
        }

        searchQuery = '';
        if (searchInput) searchInput.value = '';
        render();
    }

    function goBack() {
        if (currentPath.length > 1) {
            currentPath = currentPath.slice(0, -1);
            navigateTo(currentPath);
        }
    }

    function search(query) {
        searchQuery = query.toLowerCase().trim();
        if (!searchQuery) {
            render();
            return;
        }
        renderSearchResults(allItems.filter(item => item.name.toLowerCase().includes(searchQuery)));
    }

    function clearSearch() {
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        render();
    }

    function render() {
        renderBreadcrumb();
        renderContent();
        renderTree();
    }

    function switchView(view) {
        btnExplorer?.classList.toggle('active', view === 'explorer');
        btnNetwork?.classList.toggle('active', view === 'network');
        
        explorerView?.classList.toggle('active', view === 'explorer');
        networkView?.classList.toggle('active', view === 'network');

        if (view === 'network') {
            window.dispatchEvent(new CustomEvent('initNetworkMap'));
        }
    }

    // --- INICIALIZACIÓN ---
    function init() {
        allItems = flattenData(window.vaultData);
        renderStats();
        
        if (currentPath.length > 1) {
            updateExpandedQueue(currentPath[1]);
        }

        render();
        
        let searchTimeout;
        searchInput?.addEventListener('input', e => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => search(e.target.value), 200);
        });

        if (btnExplorer && btnNetwork) {
            btnExplorer.addEventListener('click', () => switchView('explorer'));
            btnNetwork.addEventListener('click', () => switchView('network'));
        }
        
        switchView('explorer');
    }

    init();
});
