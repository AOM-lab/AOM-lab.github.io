document.addEventListener('DOMContentLoaded', () => {
    /* --- CONFIGURACIÓN --- */
    const TECH_DISPLAY_LIMIT = 6;
    const techGrid = document.getElementById("tech-grid");
    
    // Si no existe la sección, no ejecutamos nada para evitar errores
    if (!techGrid) return;

    const filterBtns = document.querySelectorAll('#dominio-tecnico .filter-btn');
    const allTechCards = Array.from(document.querySelectorAll('.tech-card'));
    const loadMoreTechBtn = document.getElementById('load-more-tech-btn');
    const remainingTechCount = document.getElementById('remaining-tech-count');

    let currentTechFilter = 'all';

    /* --- LÓGICA DE RENDERIZADO (TURBO MODE) --- */
    function renderTechCards(limitResult = true) {
        let visibleCount = 0;
        let hiddenCount = 0;

        allTechCards.forEach(card => {
            // Limpiar clases de estado previo
            card.classList.remove('visible', 'hidden');
            card.style.animationDelay = '0s';

            // Comprobar filtro
            const match = (currentTechFilter === 'all' || card.dataset.category === currentTechFilter);

            if (match) {
                // Lógica de límite
                if (limitResult && visibleCount >= TECH_DISPLAY_LIMIT) {
                    card.classList.add('hidden');
                    hiddenCount++;
                } else {
                    // Animación Turbo: 0.03s delay para cascada ultra-rapida
                    card.style.animationDelay = `${visibleCount * 0.03}s`;
                    card.classList.add('visible');
                }
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Actualizar botón "Mostrar más"
        if (hiddenCount > 0) {
            remainingTechCount.textContent = `+${hiddenCount}`;
            loadMoreTechBtn.disabled = false;
            loadMoreTechBtn.style.opacity = "1";
            loadMoreTechBtn.style.cursor = "pointer";
        } else {
            remainingTechCount.textContent = '';
            loadMoreTechBtn.disabled = true;
            loadMoreTechBtn.style.opacity = "0.5";
            loadMoreTechBtn.style.cursor = "default";
        }
    }

    /* --- TRANSICIÓN DE FILTROS (STAGE WIPE) --- */
    function applyTechFilter(newFilter) {
        if (currentTechFilter === newFilter) return;
        currentTechFilter = newFilter;

        // 1. Ocultar grid
        techGrid.classList.add('changing');

        // 2. Esperar transición CSS (300ms)
        setTimeout(() => {
            // 3. Reordenar DOM
            renderTechCards(true); // Reset al límite 6
            // 4. Mostrar grid
            techGrid.classList.remove('changing');
        }, 300);
    }

    /* --- EVENT LISTENERS --- */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyTechFilter(btn.dataset.filter);
        });
    });

    if (loadMoreTechBtn) {
        loadMoreTechBtn.addEventListener('click', () => {
            renderTechCards(false); // Mostrar todos sin límite
            loadMoreTechBtn.disabled = true;
        });
    }

    /* --- SPOTLIGHT EFFECT --- */
    let tMouseX = 0, tMouseY = 0, tIsMouseMoving = false;

    techGrid.addEventListener('mousemove', (e) => {
        tMouseX = e.clientX; 
        tMouseY = e.clientY;
        
        if (!tIsMouseMoving) {
            window.requestAnimationFrame(() => {
                const visibleCards = document.querySelectorAll('.tech-card.visible');
                visibleCards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty("--mouse-x", `${tMouseX - rect.left}px`);
                    card.style.setProperty("--mouse-y", `${tMouseY - rect.top}px`);
                });
                tIsMouseMoving = false;
            });
            tIsMouseMoving = true;
        }
    });

    // Inicialización
    renderTechCards(true);
});
