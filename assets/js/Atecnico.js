document.addEventListener('DOMContentLoaded', () => {
    /* --- CONFIGURACIÓN --- */
    const TECH_DISPLAY_LIMIT = 6;
    const techGrid = document.getElementById("tech-grid");
    
    // Si no existe la sección, no ejecutamos nada
    if (!techGrid) return;

    const filterBtns = document.querySelectorAll('#dominio-tecnico .filter-btn');
    const allTechCards = Array.from(document.querySelectorAll('.tech-card'));
    const loadMoreTechBtn = document.getElementById('load-more-tech-btn');
    const remainingTechCount = document.getElementById('remaining-tech-count');

    let currentTechFilter = 'all';

    /* --- LÓGICA DE FILTRADO Y VISIBILIDAD --- */
    function renderTechCards(limitResult = true) {
        let visibleCount = 0;
        let hiddenCount = 0;

        allTechCards.forEach(card => {
            // Limpiar clases previas
            card.classList.remove('hidden');

            // ¿Coincide con el filtro actual?
            const match = (currentTechFilter === 'all' || card.dataset.category === currentTechFilter);

            if (match) {
                // Si limitamos resultados, ocultamos los que pasen del límite
                if (limitResult && visibleCount >= TECH_DISPLAY_LIMIT) {
                    card.classList.add('hidden');
                    hiddenCount++;
                }
                // Si entra en el límite, simplemente se muestra (no hacemos nada, está visible por defecto)
                visibleCount++;
            } else {
                // Si no coincide con el filtro, se oculta
                card.classList.add('hidden');
            }
        });

        // Actualizar botón "Mostrar más"
        if (hiddenCount > 0) {
            remainingTechCount.textContent = `+${hiddenCount}`;
            loadMoreTechBtn.disabled = false;
            loadMoreTechBtn.style.opacity = "1";
            loadMoreTechBtn.style.cursor = "pointer";
            loadMoreTechBtn.style.display = "flex"; 
        } else {
            remainingTechCount.textContent = '';
            loadMoreTechBtn.disabled = true;
            loadMoreTechBtn.style.opacity = "0"; 
            loadMoreTechBtn.style.cursor = "default";
        }
    }

    /* --- TRANSICIÓN DE FILTROS --- */
    function applyTechFilter(newFilter) {
        if (currentTechFilter === newFilter) return;
        currentTechFilter = newFilter;

        // Pequeño parpadeo en el grid para notar el cambio
        techGrid.style.opacity = "0.5";
        
        setTimeout(() => {
            renderTechCards(true); // Reset al límite inicial
            techGrid.style.opacity = "1";
        }, 200);
    }

    /* --- LISTENERS --- */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Gestión de botones activos
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            applyTechFilter(btn.dataset.filter);
        });
    });

    if (loadMoreTechBtn) {
        loadMoreTechBtn.addEventListener('click', () => {
            renderTechCards(false); // False = No limitar, mostrar todos
            loadMoreTechBtn.disabled = true;
            loadMoreTechBtn.style.opacity = "0";
        });
    }

    // Ejecutar al inicio
    renderTechCards(true);
});
    // Inicialización
    renderTechCards(true);
});
