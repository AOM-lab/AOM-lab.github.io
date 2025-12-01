/* LÓGICA DEL KNOWLEDGE VAULT (SISTEMA DE ARCHIVOS) */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Capturamos los elementos del HTML
    const container = document.getElementById('explorer-grid');
    const pathContainer = document.getElementById('explorer-breadcrumbs');
    const searchInput = document.getElementById('vault-search');
    
    // Elementos de estadísticas
    const statTotal = document.getElementById('stat-total');
    const statFolders = document.getElementById('stat-folders');

    // Si no encuentra el contenedor, paramos para no dar error
    if (!container) return;

    /* --- 2. BASE DE DATOS (Tu estructura de carpetas) --- */
    const fileSystem = {
        name: "root",
        type: "folder",
        children: [
            {
                name: "01_Teoría_Fundamentos",
                icon: "fa-solid fa-book",
                desc: "Protocolos, Redes y Sistemas.",
                type: "folder",
                children: [
                    {
                        name: "Ciberseguridad",
                        icon: "fa-solid fa-shield-halved",
                        desc: "Defensa y Ataque.",
                        type: "folder",
                        children: [
                            { name: "Blue Team Ops", icon: "fa-solid fa-user-shield", type: "folder", children: [
                                { name: "Análisis de Logs.md", type: "file" },
                                { name: "SIEM_Setup.pdf", type: "file" }
                            ]},
                            { name: "Red Team Tactics", icon: "fa-solid fa-bug", type: "folder", children: [] },
                            { name: "OWASP_Top_10_2025.pdf", type: "file" }
                        ]
                    },
                    {
                        name: "Sistemas",
                        icon: "fa-solid fa-server",
                        type: "folder",
                        children: [
                            { name: "Linux_Hardening_Guide.md", type: "file" },
                            { name: "Windows_AD_Security.md", type: "file" }
                        ]
                    }
                ]
            },
            {
                name: "02_Portafolio_Proyectos",
                icon: "fa-solid fa-briefcase",
                desc: "Implementaciones reales.",
                type: "folder",
                children: [
                    { name: "Despliegue_Kubernetes.pdf", type: "file" },
                    { name: "Auditoria_Empresa_X.pdf", type: "file" }
                ]
            },
            {
                name: "03_Artículos_Públicos",
                icon: "fa-solid fa-newspaper",
                desc: "Publicaciones y análisis.",
                type: "folder",
                children: [
                    { name: "Analisis_CrowdStrike_Crash.md", type: "file" },
                    { name: "Zero_Trust_Architecture.md", type: "file" }
                ]
            }
        ]
    };

    /* --- 3. ESTADO DEL SISTEMA --- */
    let currentDir = fileSystem; // Carpeta actual
    let pathHistory = [fileSystem]; // Historial para volver atrás
    let allFilesCache = []; // Para el buscador global

    /* --- 4. FUNCIÓN: INDEXAR Y CONTAR (Telemetría) --- */
    function indexSystem(node) {
        let fileCount = 0;
        let folderCount = 0;

        if (node.children) {
            node.children.forEach(child => {
                if (child.type === 'file') {
                    fileCount++;
                    allFilesCache.push(child);
                } else {
                    folderCount++;
                    const subCounts = indexSystem(child);
                    fileCount += subCounts.files;
                    folderCount += subCounts.folders;
                    child.totalItems = subCounts.total; // Guardamos el dato en la carpeta
                }
            });
        }
        // Devolvemos la suma total de esta rama
        return { files: fileCount, folders: folderCount, total: fileCount + folderCount };
    }

    // Ejecutamos el conteo inicial y actualizamos el HTML
    const stats = indexSystem(fileSystem);
    if(statTotal) statTotal.textContent = stats.total;
    if(statFolders) statFolders.textContent = stats.folders;


    /* --- 5. FUNCIÓN PRINCIPAL: PINTAR EN PANTALLA (Render) --- */
    function render(isSearch = false, searchResults = []) {
        container.innerHTML = ''; // Limpiamos la pantalla

        // MODO BÚSQUEDA
        if (isSearch) {
            pathContainer.innerHTML = `<span class="crumb-root">~/search-results</span>`;
            
            if (searchResults.length === 0) {
                container.innerHTML = `<div class="vault-message">No se encontraron archivos que coincidan con "${searchInput.value}"</div>`;
                return;
            }
            searchResults.forEach(file => createCard(file));
            return;
        }

        // MODO NAVEGACIÓN NORMAL
        updateBreadcrumbs(); // Actualizamos la barra de ruta

        // Botón "Subir Nivel" (si no estamos en la raíz)
        if (pathHistory.length > 1) {
            const backRow = document.createElement('div');
            backRow.className = 'back-btn-row';
            backRow.innerHTML = `<div class="back-btn"><i class="fa-solid fa-arrow-turn-up"></i> Subir nivel</div>`;
            backRow.onclick = () => {
                pathHistory.pop();
                currentDir = pathHistory[pathHistory.length - 1];
                render();
            };
            container.appendChild(backRow);
        }

        // Pintar las carpetas/archivos
        if (currentDir.children && currentDir.children.length > 0) {
            currentDir.children.forEach(item => createCard(item));
        } else {
            container.innerHTML = `<div class="vault-message">[ Directorio Vacío ]</div>`;
        }
    }

    /* --- AUXILIAR: CREAR TARJETA --- */
    function createCard(item) {
        const card = document.createElement('div');
        card.className = `node-card ${item.type}`;
        
        // Elegir icono
        let icon = item.icon;
        if (!icon) {
            icon = item.type === 'folder' ? 'fa-solid fa-folder' : 'fa-regular fa-file-code';
        }

        // Badge de cantidad (solo para carpetas)
        const countBadge = item.type === 'folder' ? `<span class="node-count">${item.totalItems || 0} items</span>` : '';

        card.innerHTML = `
            ${countBadge}
            <i class="${icon} node-icon"></i>
            <div class="node-title">${item.name}</div>
            ${item.desc ? `<div class="node-desc">${item.desc}</div>` : ''}
        `;

        // Click en la tarjeta
        card.onclick = () => {
            if (item.type === 'folder') {
                pathHistory.push(item);
                currentDir = item;
                searchInput.value = ''; // Limpiar buscador al entrar
                render();
            } else {
                alert(`Abriendo archivo: ${item.name}`);
            }
        };

        container.appendChild(card);
    }

    /* --- AUXILIAR: BARRA DE RUTA (Breadcrumbs) --- */
    function updateBreadcrumbs() {
        let html = `<span class="crumb-root" id="root-crumb">~/root</span>`;
        
        pathHistory.forEach((dir, index) => {
            if (index > 0) { // Saltamos root
                const isLast = index === pathHistory.length - 1;
                html += ` <span class="crumb-sep">/</span> <span class="${isLast ? 'crumb-current' : 'crumb-item'}" data-idx="${index}">${dir.name}</span>`;
            }
        });
        pathContainer.innerHTML = html;

        // Eventos para hacer click en la ruta
        const crumbs = pathContainer.querySelectorAll('.crumb-item');
        crumbs.forEach(c => {
            c.onclick = () => {
                const idx = parseInt(c.dataset.idx);
                pathHistory = pathHistory.slice(0, idx + 1);
                currentDir = pathHistory[pathHistory.length - 1];
                render();
            };
        });
        
        // Evento para volver al inicio
        const rootBtn = document.getElementById('root-crumb');
        if(rootBtn) {
            rootBtn.onclick = () => {
                pathHistory = [fileSystem];
                currentDir = fileSystem;
                render();
            }
        }
    }

    /* --- 6. EVENTOS DEL BUSCADOR --- */
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length > 0) {
            const results = allFilesCache.filter(file => file.name.toLowerCase().includes(query));
            render(true, results);
        } else {
            render(); // Volver a vista normal
        }
    });

    // ¡ARRANCAR!
    render();
});
