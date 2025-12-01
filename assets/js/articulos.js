/* LÓGICA DEL CARRUSEL DE ARTÍCULOS */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('art-track');
    const filterBtns = document.querySelectorAll('.art-filter-btn');
    const btnPrev = document.getElementById('art-prev');
    const btnNext = document.getElementById('art-next');

    if (!track) return;

    /* --- 1. DATOS (Imágenes High-Tech) --- */
    const articles = [
        {
            id: 1,
            title: "Hardening de Servidores Linux con CIS Benchmarks",
            excerpt: "Guía práctica para asegurar servidores Ubuntu en producción. Aplicación de normativas de seguridad y cierre de puertos.",
            // Imagen: Server Rack
            image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "teoria",
            tag: "HARDENING",
            date: "28 NOV",
            readTime: "8 MIN"
        },
        {
            id: 2,
            title: "Laboratorio Active Directory: Ataque y Defensa",
            excerpt: "Despliegue de un entorno AD vulnerable para prácticas de Red Team. Kerberoasting, DCSync y mitigaciones.",
            // Imagen: Code Screen
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "portafolio",
            tag: "RED TEAM",
            date: "15 NOV",
            readTime: "12 MIN"
        },
        {
            id: 3,
            title: "Análisis Forense de Memoria Volátil (RAM)",
            excerpt: "Uso de Volatility para extraer artefactos de un volcado de memoria tras un incidente de ransomware.",
            // Imagen: Binary Data
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "portafolio",
            tag: "FORENSICS",
            date: "02 NOV",
            readTime: "15 MIN"
        },
        {
            id: 4,
            title: "Pipeline DevSecOps con Jenkins y SonarQube",
            excerpt: "Integración de análisis estático de código (SAST) en un pipeline de CI/CD para detectar vulnerabilidades.",
            // Imagen: DevOps
            image: "https://images.unsplash.com/photo-1607799275518-d580e8105d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "teoria",
            tag: "DEVSECOPS",
            date: "20 OCT",
            readTime: "6 MIN"
        },
        {
            id: 5,
            title: "Arquitectura Zero Trust: Más allá del Perímetro",
            excerpt: "Principios fundamentales de Zero Trust. Por qué 'confiar pero verificar' ya no es suficiente.",
            // Imagen: Network Abstract
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "teoria",
            tag: "ARCH",
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
            // Animación de entrada escalonada
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0';
            
            card.innerHTML = `
                <div class="art-img-box">
                    <img src="${art.image}" alt="${art.title}" class="art-img" loading="lazy">
                    <span class="art-badge">${art.tag}</span>
                </div>
                <div class="art-content">
                    <div class="art-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${art.date}</span>
                        <span><i class="fa-regular fa-clock"></i> ${art.readTime}</span>
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
            setTimeout(() => {
                renderArticles(filter);
                track.scrollLeft = 0;
                track.style.opacity = '1';
            }, 200);
        });
    });

    /* Controles Scroll */
    btnPrev.addEventListener('click', () => {
        // Scroll de una tarjeta completa + gap
        track.scrollBy({ left: -380, behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        track.scrollBy({ left: 380, behavior: 'smooth' });
    });

    // Init
    renderArticles('all');
});
