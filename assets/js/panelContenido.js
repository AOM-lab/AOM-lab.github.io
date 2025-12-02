/* ===============================
   LÓGICA DEL EXPLORADOR (TABLA DE CONTENIDO)
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

    /* --- DATOS (Estructura del Vault) --- */
    // Definimos como global para que el mapa pueda usarlo
    window.vaultData = {
        id: 'root',
        name: 'Knowledge Vault',
        type: 'folder',
        children: [
          {
            id: 'teoria', name: 'Teoría y Conceptos', type: 'folder', category: 'teoria',
            children: [
              { id: 'teoria-redes', name: 'Redes y Comunicaciones', type: 'folder', category: 'teoria',
                children: [
                  { id: 't-r-1', name: 'Modelo OSI', type: 'file', fileType: 'doc', category: 'teoria' },
                  { id: 't-r-2', name: 'Protocolos TCP/IP', type: 'file', fileType: 'doc', category: 'teoria' },
                  { id: 't-r-3', name: 'Subnetting y VLSM', type: 'file', fileType: 'doc', category: 'teoria' },
                  { id: 't-r-4', name: 'DNS y DHCP', type: 'file', fileType: 'doc', category: 'teoria' },
                ]},
              { id: 'teoria-so', name: 'Sistemas Operativos', type: 'folder', category: 'teoria',
                children: [
                  { id: 't-so-1', name: 'Gestión de Procesos', type: 'file', fileType: 'doc', category: 'teoria' },
                  { id: 't-so-2', name: 'Sistemas de Archivos', type: 'file', fileType: 'doc', category: 'teoria' },
                  { id: 't-so-3', name: 'Memoria Virtual', type: 'file', fileType: 'doc', category: 'teoria' },
                ]},
              { id: 'teoria-bd', name: 'Bases de Datos', type: 'folder', category: 'teoria',
                children: [
                  { id: 't-bd-1', name: 'Modelo Relacional', type: 'file', fileType: 'doc', category: 'teoria' },
                  { id: 't-bd-2', name: 'Normalización', type: 'file', fileType: 'doc', category: 'teoria' },
                  { id: 't-bd-3', name: 'SQL Avanzado', type: 'file', fileType: 'doc', category: 'teoria' },
                ]}
            ]
          },
          {
            id: 'ciberseguridad', name: 'Ciberseguridad', type: 'folder', category: 'ciberseguridad',
            children: [
              { id: 'ciber-hardening', name: 'Hardening', type: 'folder', category: 'ciberseguridad',
                children: [
                  { id: 'c-h-1', name: 'CIS Linux', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
                  { id: 'c-h-2', name: 'CIS Windows', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
                  { id: 'c-h-3', name: 'Bastionado Servidores', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                  { id: 'c-h-4', name: 'Configuración SSH', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                ]},
              { id: 'ciber-incidentes', name: 'Respuesta Incidentes', type: 'folder', category: 'ciberseguridad',
                children: [
                  { id: 'c-i-1', name: 'Playbook Ransomware', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                  { id: 'c-i-2', name: 'Análisis de Malware', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                  { id: 'c-i-3', name: 'Forensia Digital', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
                ]},
              { id: 'ciber-pentest', name: 'Pentesting', type: 'folder', category: 'ciberseguridad',
                children: [
                  { id: 'c-p-1', name: 'Metodología OWASP', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
                  { id: 'c-p-2', name: 'Reconocimiento', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                  { id: 'c-p-3', name: 'Explotación Web', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                ]},
              { id: 'ciber-normativas', name: 'Normativas', type: 'folder', category: 'ciberseguridad',
                children: [
                  { id: 'c-n-1', name: 'ENS', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
                  { id: 'c-n-2', name: 'ISO 27001', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
                  { id: 'c-n-3', name: 'GDPR / LOPD', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                ]}
            ]
          },
          {
            id: 'programacion', name: 'Programación', type: 'folder', category: 'programacion',
            children: [
              { id: 'prog-python', name: 'Python', type: 'folder', category: 'programacion',
                children: [
                  { id: 'p-py-1', name: 'Fundamentos', type: 'file', fileType: 'doc', category: 'programacion' },
                  { id: 'p-py-2', name: 'Automatización', type: 'file', fileType: 'code', category: 'programacion' },
                  { id: 'p-py-3', name: 'APIs y Requests', type: 'file', fileType: 'doc', category: 'programacion' },
                ]},
              { id: 'prog-bash', name: 'Bash Scripting', type: 'folder', category: 'programacion',
                children: [
                  { id: 'p-b-1', name: 'Comandos', type: 'file', fileType: 'doc', category: 'programacion' },
                  { id: 'p-b-2', name: 'Scripts Backup', type: 'file', fileType: 'code', category: 'programacion' },
                  { id: 'p-b-3', name: 'Cron Jobs', type: 'file', fileType: 'doc', category: 'programacion' },
                ]},
              { id: 'prog-sql', name: 'SQL', type: 'folder', category: 'programacion',
                children: [
                  { id: 'p-sql-1', name: 'Queries', type: 'file', fileType: 'code', category: 'programacion' },
                  { id: 'p-sql-2', name: 'Procedimientos', type: 'file', fileType: 'doc', category: 'programacion' },
                ]}
            ]
          },
          {
            id: 'sistemas', name: 'Administración Sistemas', type: 'folder', category: 'sistemas',
            children: [
              { id: 'sys-linux', name: 'Linux', type: 'folder', category: 'sistemas',
                children: [
                  { id: 's-l-1', name: 'RHEL/Debian', type: 'file', fileType: 'doc', category: 'sistemas' },
                  { id: 's-l-2', name: 'Systemd', type: 'file', fileType: 'doc', category: 'sistemas' },
                  { id: 's-l-3', name: 'LVM y RAID', type: 'file', fileType: 'doc', category: 'sistemas' },
                  { id: 's-l-4', name: 'SELinux', type: 'file', fileType: 'doc', category: 'sistemas' },
                ]},
              { id: 'sys-windows', name: 'Windows Server', type: 'folder', category: 'sistemas',
                children: [
                  { id: 's-w-1', name: 'Active Directory', type: 'file', fileType: 'doc', category: 'sistemas' },
                  { id: 's-w-2', name: 'GPOs', type: 'file', fileType: 'doc', category: 'sistemas' },
                  { id: 's-w-3', name: 'PowerShell', type: 'file', fileType: 'code', category: 'sistemas' },
                ]},
              { id: 'sys-cloud', name: 'Cloud', type: 'folder', category: 'sistemas',
                children: [
                  { id: 's-c-1', name: 'AWS', type: 'file', fileType: 'doc', category: 'sistemas' },
                  { id: 's-c-2', name: 'Docker', type: 'file', fileType: 'doc', category: 'sistemas' },
                  { id: 's-c-3', name: 'Kubernetes', type: 'file', fileType: 'doc', category: 'sistemas' },
                ]}
            ]
          },
          {
            id: 'fundamentos', name: 'Fundamentos', type: 'folder', category: 'fundamentos',
            children: [
              { id: 'fund-hardware', name: 'Hardware', type: 'folder', category: 'fundamentos',
                children: [
                  { id: 'f-h-1', name: 'Arquitectura', type: 'file', fileType: 'doc', category: 'fundamentos' },
                  { id: 'f-h-2', name: 'Componentes', type: 'file', fileType: 'doc', category: 'fundamentos' },
                ]},
              { id: 'fund-software', name: 'Software', type: 'folder', category: 'fundamentos',
                children: [
                  { id: 'f-s-1', name: 'Ciclo de Vida', type: 'file', fileType: 'doc', category: 'fundamentos' },
                  { id: 'f-s-2', name: 'Metodologías', type: 'file', fileType: 'doc', category: 'fundamentos' },
                ]}
            ]
          },
          {
            id: 'proyectos', name: 'Proyectos', type: 'folder', category: 'proyectos',
            children: [
              { id: 'proy-personal', name: 'Personales', type: 'folder', category: 'proyectos',
                children: [
                  { id: 'pp-1', name: 'Homelab', type: 'file', fileType: 'doc', category: 'proyectos' },
                  { id: 'pp-2', name: 'Portfolio', type: 'file', fileType: 'doc', category: 'proyectos' },
                  { id: 'pp-3', name: 'Scripts', type: 'file', fileType: 'code', category: 'proyectos' },
                ]},
              { id: 'proy-academico', name: 'Académicos', type: 'folder', category: 'proyectos',
                children: [
                  { id: 'pa-1', name: 'TFM Ciberseguridad', type: 'file', fileType: 'pdf', category: 'proyectos' },
                  { id: 'pa-2', name: 'Proyecto ASIR', type: 'file', fileType: 'pdf', category: 'proyectos' },
                ]}
            ]
          },
          {
            id: 'laboratorio', name: 'Laboratorio', type: 'folder', category: 'laboratorio',
            children: [
              { id: 'lab-ctf', name: 'CTF y Retos', type: 'folder', category: 'laboratorio',
                children: [
                  { id: 'l-c-1', name: 'HackTheBox', type: 'file', fileType: 'doc', category: 'laboratorio' },
                  { id: 'l-c-2', name: 'TryHackMe', type: 'file', fileType: 'doc', category: 'laboratorio' },
                  { id: 'l-c-3', name: 'VulnHub', type: 'file', fileType: 'doc', category: 'laboratorio' },
                ]},
              { id: 'lab-sandbox', name: 'Sandbox', type: 'folder', category: 'laboratorio',
                children: [
                  { id: 'l-s-1', name: 'AD Vulnerable', type: 'file', fileType: 'doc', category: 'laboratorio' },
                  { id: 'l-s-2', name: 'DVWA', type: 'file', fileType: 'doc', category: 'laboratorio' },
                ]}
            ]
          }
        ]
      };

    let currentPath = ['root'];
    let searchQuery = '';
    let allItems = [];

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
            const childCount = isFolder ? (item.children?.length || 0) : null;
            
            html += `<div class="vault-card ${isFolder ? 'is-folder' : 'is-file'}" data-id="${item.id}" data-category="${item.category || ''}">
                <div class="card-icon"><i class="${icon}"></i></div>
                <div class="card-title">${item.name}</div>
                <div class="card-meta">
                    <span class="card-type"><i class="${icon}"></i>${typeName}</span>
                    ${childCount !== null ? `<span class="card-count">${childCount}</span>` : ''}
                </div>
            </div>`;
        });
        
        html += '</div>';
        vaultContent.innerHTML = html;
        
        vaultContent.querySelectorAll('.vault-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.dataset.action === 'back') goBack();
                else {
                    const item = findNodeById(window.vaultData, card.dataset.id);
                    if (item?.type === 'folder') navigateTo([...currentPath, card.dataset.id]);
                    // Aquí puedes añadir el else para manejar clicks en archivos (ej. abrir modal)
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
                    navigateTo(item?.type === 'folder' ? path : path.slice(0, -1));
                    clearSearch();
                }
            });
        });
    }

    function renderTree() {
        if (!vaultTree) return;
        
        function renderNode(node) {
            const hasChildren = node.children?.some(c => c.type === 'folder');
            const isInPath = currentPath.includes(node.id);
            const isActive = currentPath[currentPath.length - 1] === node.id;
            const childCount = node.children?.length || 0;
            
            let html = `<li class="tree-item ${hasChildren ? 'has-children' : ''} ${isInPath ? 'expanded' : ''}" data-id="${node.id}" data-category="${node.category || ''}">
                <div class="tree-item-header ${isActive ? 'active' : ''}">
                    <span class="tree-toggle"><i class="fa-solid fa-chevron-right"></i></span>
                    <span class="tree-icon"><i class="${getIcon(node)}"></i></span>
                    <span class="tree-label">${node.name}</span>
                    ${childCount > 0 ? `<span class="tree-count">${childCount}</span>` : ''}
                </div>`;
            
            if (hasChildren) {
                html += '<ul class="tree-children">';
                node.children.filter(c => c.type === 'folder').forEach(child => html += renderNode(child));
                html += '</ul>';
            }
            return html + '</li>';
        }
        
        let html = '<ul class="tree-root">';
        window.vaultData.children.forEach(child => html += renderNode(child));
        html += '</ul>';
        vaultTree.innerHTML = html;
        
        vaultTree.querySelectorAll('.tree-item-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.closest('.tree-item');
                // Si tiene hijos, expandir/contraer visualmente
                if (item.classList.contains('has-children')) {
                    item.classList.toggle('expanded');
                }
                // Navegar a la carpeta
                navigateTo(buildPathToNode(item.dataset.id));
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
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        render();
    }

    function goBack() {
        if (currentPath.length > 1) {
            currentPath = currentPath.slice(0, -1);
            render();
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

        // Evento personalizado para avisar a mapa.js que renderice el canvas si es necesario
        if (view === 'network') {
            window.dispatchEvent(new CustomEvent('initNetworkMap'));
        }
    }

    // --- INICIALIZACIÓN ---
    function init() {
        allItems = flattenData(window.vaultData);
        renderStats();
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
        
        // Asegurarnos de empezar en explorador
        switchView('explorer');
    }

    init();
});
