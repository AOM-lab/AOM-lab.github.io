/* LÓGICA DEL KNOWLEDGE HUB (Sencillo y Profesional) */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hub-grid');
    const breadcrumbs = document.getElementById('hub-breadcrumbs');
    const backBtnContainer = document.getElementById('hub-back-container');
    
    if (!container) return;

    /* --- DATOS (Tu estructura) --- */
    const knowledgeBase = {
        name: "Inicio",
        type: "folder",
        children: [
            {
                name: "Teoría y Fundamentos",
                icon: "fa-solid fa-book-journal-whills",
                desc: "Documentación técnica sobre protocolos, redes y sistemas operativos.",
                type: "folder",
                children: [
                    {
                        name: "Ciberseguridad",
                        icon: "fa-solid fa-shield-halved",
                        desc: "Blue Team, Red Team, Metodologías y Normativas.",
                        type: "folder",
                        children: [
                            { name: "Hacking Ético - Guía.pdf", desc: "Metodología de pentesting", type: "file" },
                            { name: "Gestión de Incidentes.md", desc: "Playbooks de respuesta", type: "file" }
                        ]
                    },
                    {
                        name: "Sistemas & Redes",
                        icon: "fa-solid fa-server",
                        desc: "Administración Linux/Windows y arquitectura de redes.",
                        type: "folder",
                        children: [
                            { name: "Linux Hardening.pdf", desc: "Guía de aseguramiento", type: "file" },
                            { name: "Directorio Activo.md", desc: "Estructura y seguridad", type: "file" }
                        ]
                    }
                ]
            },
            {
                name: "Portafolio de Proyectos",
                icon: "fa-solid fa-rocket",
                desc: "Casos prácticos, despliegues reales y laboratorios.",
                type: "folder",
                children: [
                    { name: "Laboratorio K8s", icon: "fa-solid fa-cubes", desc: "Cluster local", type: "file" },
                    { name: "Auditoría Web", icon: "fa-solid fa-globe", desc: "Informe anonimizado", type: "file" }
                ]
            },
            {
                name: "Artículos y Notas",
                icon: "fa-regular fa-newspaper",
                desc: "Investigaciones personales y curiosidades técnicas.",
                type: "folder",
                children: [
                    { name: "Análisis CrowdStrike", type: "file", desc: "Post-mortem del incidente" },
                    { name: "Zero Trust 101", type: "file", desc: "Introducción al concepto" }
                ]
            }
        ]
    };

    /* --- ESTADO --- */
    let currentFolder = knowledgeBase;
    let pathStack = [knowledgeBase];

    /* --- UTILIDAD: CONTAR ITEMS --- */
    function countItems(node) {
        if (!node.children) return 0;
        return node.children.length;
    }

    /* --- RENDER --- */
    function render() {
        container.innerHTML = '';
        
        // 1. Breadcrumbs
        let crumbsHTML = '';
        pathStack.forEach((folder, index) => {
            const isLast = index === pathStack.length - 1;
            crumbsHTML += `
                <div class="crumb-item ${isLast ? 'crumb-current' : ''}" onclick="navigateTo(${index})">
                    ${index === 0 ? '<i class="fa-solid fa-house"></i>' : ''} 
                    ${folder.name}
                </div>
                ${!isLast ? '<span class="crumb-sep">/</span>' : ''}
            `;
        });
        breadcrumbs.innerHTML = crumbsHTML;

        // 2. Botón Atrás
        backBtnContainer.innerHTML = '';
        if (pathStack.length > 1) {
            const backBtn = document.createElement('button');
            backBtn.className = 'back-btn';
            backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Volver`;
            backBtn.onclick = () => {
                pathStack.pop();
                currentFolder = pathStack[pathStack.length - 1];
                render();
            };
            backBtnContainer.appendChild(backBtn);
        }

        // 3. Grid de Contenido
        if (currentFolder.children && currentFolder.children.length > 0) {
            currentFolder.children.forEach(item => {
                const card = document.createElement('div');
                card.className = `hub-card ${item.type === 'file' ? 'is-file' : ''}`;
                
                // Iconos por defecto
                let icon = item.icon || (item.type === 'folder' ? 'fa-solid fa-folder' : 'fa-regular fa-file-lines');
                
                // Badge
                const count = countItems(item);
                const badge = item.type === 'folder' ? `<span class="card-badge">${count} items</span>` : '';

                card.innerHTML = `
                    <div class="card-top">
                        <div class="card-icon"><i class="${icon}"></i></div>
                        ${badge}
                    </div>
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-desc">${item.desc || 'Documento técnico'}</p>
                `;

                card.onclick = () => {
                    if (item.type === 'folder') {
                        pathStack.push(item);
                        currentFolder = item;
                        render();
                    } else {
                        alert(`Abriendo documento: ${item.name}`);
                        // window.open(item.link, '_blank');
                    }
                };

                container.appendChild(card);
            });
        } else {
            container.innerHTML = `<div class="hub-empty">Carpeta vacía</div>`;
        }
        
        // Exponer función al objeto window para el onclick del breadcrumb
        window.navigateTo = (index) => {
            pathStack = pathStack.slice(0, index + 1);
            currentFolder = pathStack[pathStack.length - 1];
            render();
        };
    }

    render();
});
