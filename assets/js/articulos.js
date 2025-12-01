/* LÓGICA DEL CARRUSEL DE ARTÍCULOS */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('art-track');
    const filterBtns = document.querySelectorAll('.art-filter-btn');
    const btnPrev = document.getElementById('art-prev');
    const btnNext = document.getElementById('art-next');

    if (!track) return;

    /* --- 1. DATOS DE ARTÍCULOS --- */
    // category: 'teoria' o 'portafolio'
    // tag: 'ciberseguridad', 'sistemas', 'redes', etc.
    const articles = [
        {
            id: 1,
            title: "Hardening de Servidores Linux con CIS Benchmarks",
            excerpt: "Guía práctica paso a paso para asegurar un servidor Ubuntu en producción aplicando las normativas del Center for Internet Security.",
            image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop",
            category: "teoria",
            tag: "Ciberseguridad",
            badgeClass: "badge-red",
            date: "28 Nov 2024",
            readTime: "8 min"
        },
        {
            id: 2,
            title: "Despliegue de Laboratorio AD en VirtualBox",
            excerpt: "Cómo montar un entorno de Directorio Activo completo con Windows Server 2019 para prácticas de pentesting y administración.",
            image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1000&auto=format&fit=crop",
            category: "portafolio",
            tag: "Sistemas",
            badgeClass: "badge-blue",
            date: "15 Nov 2024",
            readTime: "12 min"
        },
        {
            id: 3,
            title: "Análisis Forense: Caso Ransomware",
            excerpt: "Investigación post-mortem de un ataque simulado. Extracción de evidencias de memoria volátil y análisis de logs.",
            image: "https://images.unsplash.com/photo-1563206767-5b1d97289374?q=80&w=1000&auto=format&fit=crop",
            category: "portafolio",
            tag: "Blue Team",
            badgeClass: "badge-purple",
            date: "02 Nov 2024",
            readTime: "15 min"
        },
        {
            id: 4,
            title: "Automatización de Backups con Bash y AWS S3",
            excerpt: "Scripting avanzado para automatizar copias de seguridad de bases de datos y subida cifrada a la nube.",
            image: "https://images.unsplash.com/photo-1607799275518-d580e8105d86?q=80&w=1000&auto=format&fit=crop",
            category: "teoria",
            tag: "DevOps",
            badgeClass: "badge-green",
            date: "20 Oct 2024",
            readTime: "6 min"
        },
        {
            id: 5,
            title: "Entendiendo Zero Trust Architecture",
            excerpt: "Por qué el modelo de seguridad perimetral tradicional ha muerto y cómo implementar principios de confianza cero.",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop",
            category: "teoria",
            tag: "Arquitectura",
            badgeClass: "badge-red",
            date: "10 Oct 2024",
            readTime: "10 min"
        }
    ];

    /* --- 2. RENDER --- */
    function renderArticles(filter = 'all') {
        track.innerHTML = '';
        
        const filtered = filter === 'all' 
            ? articles 
            : articles.filter(a => a.category === filter);

        if (filtered.length === 0) {
            track.innerHTML = `
                <div class="art-empty">
                    <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>No hay artículos en esta categoría aún.</p>
                </div>`;
            return;
        }

        filtered.forEach(art => {
            const card = document.createElement('article');
            card.className = 'art-card';
            card.innerHTML = `
                <div class="art-img-box">
                    <img src="${art.image}" alt="${art.title}" class="art-img" loading="lazy">
                    <span class="art-badge ${art.badgeClass}">${art.tag}</span>
                </div>
                <div class="art-content">
                    <div class="art-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${art.date}</span>
                        <span><i class="fa-regular fa-clock"></i> ${art.readTime}</span>
                    </div>
                    <h3 class="art-title">${art.title}</h3>
                    <p class="art-excerpt">${art.excerpt}</p>
                    <a href="#" class="art-read-btn">Leer Artículo <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;
            track.appendChild(card);
        });
    }

    /* --- 3. EVENTOS FILTROS --- */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Active
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Lógica
            const filter = btn.dataset.filter;
            
            // Animación de salida (opcional, simple)
            track.style.opacity = '0';
            setTimeout(() => {
                renderArticles(filter);
                track.style.opacity = '1';
                track.scrollLeft = 0; // Volver al inicio
            }, 200);
        });
    });

    /* --- 4. CONTROLES CARRUSEL --- */
    btnPrev.addEventListener('click', () => {
        const cardWidth = 350 + 24; // Ancho tarjeta + gap
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        const cardWidth = 350 + 24;
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    // Init
    renderArticles('all');
});
