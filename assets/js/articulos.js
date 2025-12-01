/* LÓGICA DEL CARRUSEL DE ARTÍCULOS */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('art-track');
    const filterBtns = document.querySelectorAll('.art-filter-btn');
    const btnPrev = document.getElementById('art-prev');
    const btnNext = document.getElementById('art-next');

    if (!track) return;

    const articles = [
        {
            id: 1,
            title: "Hardening de Servidores Linux con CIS Benchmarks",
            excerpt: "Guía práctica para asegurar servidores Ubuntu en producción. Aplicación de normativas de seguridad y cierre de puertos.",
            // Imagen nueva y fiable
            image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80",
            category: "teoria",
            tag: "HARDENING",
            badgeClass: "badge-red",
            date: "28 NOV",
            readTime: "8 MIN"
        },
        {
            id: 2,
            title: "Laboratorio Active Directory: Ataque y Defensa",
            excerpt: "Despliegue de un entorno AD vulnerable para prácticas de Red Team. Kerberoasting, DCSync y mitigaciones.",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
            category: "portafolio",
            tag: "RED TEAM",
            badgeClass: "badge-blue",
            date: "15 NOV",
            readTime: "12 MIN"
        },
        {
            id: 3,
            title: "Análisis Forense de Memoria Volátil (RAM)",
            excerpt: "Uso de Volatility para extraer artefactos de un volcado de memoria tras un incidente de ransomware.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
            category: "portafolio",
            tag: "FORENSICS",
            badgeClass: "badge-purple",
            date: "02 NOV",
            readTime: "15 MIN"
        },
        {
            id: 4,
            title: "Pipeline DevSecOps con Jenkins y SonarQube",
            excerpt: "Integración de análisis estático de código (SAST) en un pipeline de CI/CD para detectar vulnerabilidades.",
            image: "https://images.unsplash.com/photo-1607799275518-d580e8105d86?w=800&q=80",
            category: "teoria",
            tag: "DEVSECOPS",
            badgeClass: "badge-green",
            date: "20 OCT",
            readTime: "6 MIN"
        },
        {
            id: 5,
            title: "Arquitectura Zero Trust: Más allá del Perímetro",
            excerpt: "Principios fundamentales de Zero Trust. Por qué 'confiar pero verificar' ya no es suficiente.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
            category: "teoria",
            tag: "ARCH",
            badgeClass: "badge-red",
            date: "10 OCT",
            readTime: "10 MIN"
        }
    ];

    function renderArticles(filter = 'all') {
        track.innerHTML = '';
        
        const filtered = filter === 'all' 
            ? articles 
            : articles.filter(a => a.category === filter);

        if (filtered.length === 0) {
            track.innerHTML = `<div class="art-empty">No hay registros en esta categoría.</div>`;
            return;
        }

        filtered.forEach((art, index) => {
            const card = document.createElement('article');
            card.className = 'art-card';
            // Aquí es donde se aplica la animación definida en el CSS
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0'; // Empieza invisible
            
            card.innerHTML = `
                <div class="art-img-box">
                    <img src="${art.image}" alt="${art.title}" class="art-img" loading="lazy">
                    <span class="art-badge ${art.badgeClass}">${art.tag}</span>
                </div>
                <div class="art-content">
                    <div class="art-meta">
                        <span>// ${art.date}</span>
                        <span>${art.readTime}</span>
                    </div>
                    <h3 class="art-title">${art.title}</h3>
                    <p class="art-excerpt">${art.excerpt}</p>
                    <a href="#" class="art-read-btn">
                        READ_LOG <i class="fa-solid fa-arrow-right-long"></i>
                    </a>
                </div>
            `;
            track.appendChild(card);
        });
    }

    /* Eventos Filtros */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            track.style.opacity = '0';
            track.style.transition = 'opacity 0.2s';
            setTimeout(() => {
                renderArticles(filter);
                track.scrollLeft = 0;
                track.style.opacity = '1';
            }, 200);
        });
    });

    /* Controles Scroll */
    btnPrev.addEventListener('click', () => {
        const itemWidth = track.querySelector('.art-card').offsetWidth + 24;
        track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        const itemWidth = track.querySelector('.art-card').offsetWidth + 24;
        track.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });

    // Init
    renderArticles('all');
});
