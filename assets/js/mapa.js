/* LÓGICA DEL CYBER-ARCHIVE */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('explorer-grid');
    const pathBar = document.getElementById('explorer-path');
    
    if (!container) return;

    /* --- DATOS (Tu estructura) --- */
    const knowledgeBase = {
        name: "root",
        type: "folder",
        children: [
            {
                name: "Teoría_y_Fundamentos",
                icon: "fa-solid fa-book-journal-whills",
                type: "folder",
                perms: "drwxr-xr-x", // Detalle técnico
                children: [
                    {
                        name: "Ciberseguridad",
                        icon: "fa-solid fa-shield-halved",
                        type: "folder",
                        perms: "drwxr-xr-x",
                        children: [
                            { name: "Guía_Hacking_Ético.pdf", type: "file", size: "2.4MB" },
                            { name: "Protocolos_Respuesta.md", type: "file", size: "14KB" },
                            { name: "Legislación_TIC.pdf", type: "file", size: "850KB" }
                        ]
                    },
                    {
                        name: "Sistemas_Redes",
                        icon: "fa-solid fa-server",
                        type: "folder",
                        perms: "drwxr-xr-x",
                        children: [
                            { name: "Hardening_Linux_v2.md", type: "file", size: "12KB" },
                            { name: "Arquitectura_AD.png", type: "file", size: "4.1MB" }
                        ]
                    }
                ]
            },
            {
                name: "Portafolio_Proyectos",
                icon: "fa-solid fa-rocket",
                type: "folder",
                perms: "drwxr-xr-x",
                children: [
                    { name: "Lab_Kubernetes_Cluster", type: "folder", children: [] },
                    { name: "Auditoría_Web_Reporte.pdf", type: "file", size: "15MB" }
                ]
            },
            {
                name: "Investigaciones",
                icon: "fa-solid fa-microscope",
                type: "folder",
                perms: "dr--r--r--", // Read only ;)
                children: [
                    { name: "Analisis_Malware.log", type: "file", size: "56KB" },
                    { name: "CrowdStrike_PostMortem.md", type: "file", size: "8KB" }
                ]
            }
        ]
    };

    /* --- ESTADO --- */
    let currentFolder = knowledgeBase;
    let pathStack = [knowledgeBase];

    /* --- RENDER --- */
    function render() {
        // 1. Barra de Dirección (Estilo Terminal)
        let pathHTML = `<span class="path-root">root@server:</span>`;
        pathStack.forEach((folder, index) => {
            if (index > 0) {
                pathHTML += `<span class="path-sep">/</span><span class="path-current">${folder.name}</span>`;
            } else {
                pathHTML += `<span class="path-sep">~</span>`;
            }
        });
        pathBar.innerHTML = pathHTML;

        // 2. Grid de Contenido
        container.innerHTML = '';

        // Botón Atrás
        if (pathStack.length > 1) {
            const backRow = document.createElement('div');
            backRow.className = 'back-row';
            backRow.innerHTML = `<div class="back-btn"><i class="fa-solid fa-level-up-alt"></i> .. (Parent Directory)</div>`;
            backRow.onclick = () => {
                pathStack.pop();
                currentFolder = pathStack[pathStack.length - 1];
                render();
            };
            container.appendChild(backRow);
        }

        // Items
        if (currentFolder.children && currentFolder.children.length > 0) {
            currentFolder.children.forEach(item => {
                const card = document.createElement('div');
                card.className = 'node-card';
                
                // Icono
                let icon = item.icon || (item.type === 'folder' ? 'fa-solid fa-folder' : 'fa-regular fa-file-code');
                
                // Metadatos técnicos (Fake)
                const meta1 = item.type === 'folder' ? 'DIR' : 'FILE';
                const meta2 = item.type === 'folder' ? (item.perms || 'drwxr-xr-x') : (item.size || '1KB');

                card.innerHTML = `
                    <div class="node-icon-box"><i class="${icon}"></i></div>
                    <div class="node-info">
                        <div class="node-title">${item.name}</div>
                        <div class="node-meta">
                            <span>${meta1}</span>
                            <span>${meta2}</span>
                        </div>
                    </div>
                `;

                card.onclick = () => {
                    if (item.type === 'folder') {
                        pathStack.push(item);
                        currentFolder = item;
                        render();
                    } else {
                        alert(`ACCESSING FILE: ${item.name}`);
                    }
                };

                container.appendChild(card);
            });
        } else {
            container.innerHTML = `<div class="explorer-empty">// DIRECTORY EMPTY</div>`;
        }
    }

    render();
});
