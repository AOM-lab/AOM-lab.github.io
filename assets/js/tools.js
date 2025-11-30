/* Generador del ARSENAL TECNOLÓGICO 
   Convierte el contenedor #tools-pro en un Dashboard Interactivo
*/

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('tools-pro');
    if (!root) return;

    /* --- BASE DE DATOS DE HERRAMIENTAS --- */
    // Puedes añadir más aquí fácilmente
    const tools = [
        { name: "Ansible",   cat: "linux",   icon: "fa-brands fa-redhat" },
        { name: "Docker",    cat: "multi",   icon: "fa-brands fa-docker" },
        { name: "Kali",      cat: "linux",   icon: "fa-solid fa-terminal" },
        { name: "Burp Suite",cat: "windows", icon: "fa-solid fa-bug" },
        { name: "Metasploit",cat: "linux",   icon: "fa-solid fa-skull-crossbones" },
        { name: "OpenVAS",   cat: "linux",   icon: "fa-solid fa-shield-halved" },
        { name: "Wireshark", cat: "windows", icon: "fa-solid fa-wave-square" },
        { name: "pfSense",   cat: "linux",   icon: "fa-solid fa-network-wired" },
        { name: "ZAP Proxy", cat: "multi",   icon: "fa-solid fa-bolt" },
        { name: "Terraform", cat: "linux",   icon: "fa-solid fa-cubes" },
        { name: "Nessus",    cat: "windows", icon: "fa-solid fa-spider" },
        { name: "Git",       cat: "multi",   icon: "fa-brands fa-git-alt" }
    ];

    /* --- BASE DE DATOS DE LENGUAJES --- */
    // Nivel del 1 al 3 (donde 3 es experto)
    const languages = [
        { name: "Python",     icon: "fa-brands fa-python", level: 3 },
        { name: "Bash",       icon: "fa-solid fa-terminal", level: 3 },
        { name: "PowerShell", icon: "fa-brands fa-windows", level: 2 },
        { name: "SQL",        icon: "fa-solid fa-database", level: 2 },
        { name: "JavaScript", icon: "fa-brands fa-js",     level: 1 },
        { name: "HTML/CSS",   icon: "fa-solid fa-code",    level: 2 }
    ];

    /* --- CONSTRUCCIÓN DE LA INTERFAZ (HTML) --- */
    root.innerHTML = `
        <h2 class="section-title">
           <i class="fa-solid fa-microchip"></i> Herramientas y Stack
        </h2>
        
        <div class="tech-layout">
            <div class="left-panel">
                
                <div class="search-bar-wrapper">
                    <span class="terminal-prompt">root@lab:~/tools# grep</span>
                    <input type="text" id="tech-search" class="search-input" placeholder="buscar..." autocomplete="off">
                </div>

                <div class="filters-row">
                    <button class="filter-chip active" data-filter="all">ALL</button>
                    <button class="filter-chip" data-filter="linux">LINUX</button>
                    <button class="filter-chip" data-filter="windows">WINDOWS</button>
                    <button class="filter-chip" data-filter="multi">MULTI</button>
                </div>

                <div class="tools-grid" id="tools-grid-container">
                    </div>
            </div>

            <aside class="right-panel">
                <div class="stack-panel">
                    <div class="panel-title">
                        <i class="fa-solid fa-code"></i> Core Stack
                    </div>
                    <div class="lang-list" id="lang-list-container">
                        </div>
                </div>
            </aside>
        </div>
    `;

    /* --- REFERENCIAS --- */
    const gridContainer = document.getElementById('tools-grid-container');
    const langContainer = document.getElementById('lang-list-container');
    const searchInput = document.getElementById('tech-search');
    const filterChips = document.querySelectorAll('.filter-chip');

    let currentFilter = 'all';

    /* --- FUNCIÓN RENDER HERRAMIENTAS --- */
    function renderTools(searchTerm = '') {
        gridContainer.innerHTML = ''; // Limpiar
        
        const term = searchTerm.toLowerCase();

        tools.forEach((tool, index) => {
            // Lógica de filtrado
            const matchesFilter = currentFilter === 'all' || tool.cat === currentFilter;
            const matchesSearch = tool.name.toLowerCase().includes(term);

            if (matchesFilter && matchesSearch) {
                const card = document.createElement('div');
                card.className = 'tool-card animate-in';
                // Delay escalonado para efecto visual chulo
                card.style.animationDelay = `${index * 0.05}s`;
                
                let tagClass = '';
                if (tool.cat === 'linux') tagClass = 'tag-green';
                else if (tool.cat === 'windows') tagClass = 'tag-blue';
                else tagClass = 'tag-orange'; // multi

                // 2. Insertamos el HTML usando esa clase nueva
                card.innerHTML = `
                    <i class="${tool.icon} tool-icon"></i>
                    <span class="tool-name">${tool.name}</span>
                    <span class="tool-tag ${tagClass}">${tool.cat}</span>
                `;
            }
        });

        // Mensaje si no hay resultados
        if (gridContainer.children.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:20px; color:#64748b; font-family:'Source Code Pro'">
                    // No matches found
                </div>`;
        }
    }

    /* --- FUNCIÓN RENDER LENGUAJES --- */
    function renderLanguages() {
        langContainer.innerHTML = languages.map(lang => {
            // Generar los 3 puntos de nivel
            let dotsHTML = '';
            for(let i=1; i<=3; i++) {
                const isActive = i <= lang.level ? 'active' : '';
                dotsHTML += `<span class="dot ${isActive}"></span>`;
            }

            return `
                <div class="lang-row">
                    <div class="lang-info">
                        <i class="${lang.icon}"></i> ${lang.name}
                    </div>
                    <div class="level-dots" title="Nivel ${lang.level}/3">
                        ${dotsHTML}
                    </div>
                </div>
            `;
        }).join('');
    }

    /* --- EVENTOS --- */
    
    // 1. Buscador
    searchInput.addEventListener('input', (e) => {
        renderTools(e.target.value);
    });

    // 2. Filtros
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // UI
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Lógica
            currentFilter = chip.dataset.filter;
            renderTools(searchInput.value);
        });
    });

    /* --- INICIALIZACIÓN --- */
    renderTools();
    renderLanguages();
});
