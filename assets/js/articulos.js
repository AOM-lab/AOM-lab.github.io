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
            excerpt: "Guía práctica paso a paso para asegurar un servidor Ubuntu en producción aplicando las normativas del Center for Internet Security.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Chip
            category: "teoria",
            tag: "HARDENING",
            badgeClass: "badge-red",
            date: "28 NOV",
            readTime: "8 MIN"
        },
        {
            id: 2,
            title: "Despliegue de Laboratorio AD en VirtualBox",
            excerpt: "Cómo montar un entorno de Directorio Activo completo con Windows Server 2019 para prácticas de pentesting y administración.",
            image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80", // Server room
            category: "portafolio",
            tag: "LABS",
            badgeClass: "badge-blue",
            date: "15 NOV",
            readTime: "12 MIN"
        },
        {
            id: 3,
            title: "Análisis Forense: Caso Ransomware",
            excerpt: "Investigación post-mortem de un ataque simulado. Extracción de evidencias de memoria volátil y análisis de logs.",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Matrix code
            category: "portafolio",
            tag: "FORENSICS",
            badgeClass: "badge-purple",
            date: "02 NOV",
            readTime: "15 MIN"
        },
        {
            id: 4,
            title: "Automatización de Backups con Bash y AWS S3",
            excerpt: "Scripting avanzado para automatizar copias de seguridad de bases de datos y subida cifrada a la nube.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", // Network globe
            category: "teoria",
            tag: "DEVOPS",
            badgeClass: "badge-green",
            date: "20 OCT",
            readTime: "6 MIN"
        },
        {
            id: 5,
            title: "Entendiendo Zero Trust Architecture",
            excerpt: "Por qué el modelo de seguridad perimetral tradicional ha muerto y cómo implementar principios de confianza cero.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Cyber lock
            category: "teoria",
            tag: "THEORY",
            badgeClass: "badge-red",
            date: "10 OCT",
            readTime: "10 MIN"
        }
    ];

    function renderArticles(filter = 'all') {
        track.innerHTML = '';
        const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);

        if (filtered.length === 0) {
            track.innerHTML = `<div class="art-empty"><p>No hay artículos.</p></div>`;
            return;
        }

        filtered.forEach((art, index) => {
            const card = document.createElement('article');
            card.className = 'art-card';
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0';
            
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
                    <a href="#" class="art-read-btn">LEER ARTÍCULO <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;
            track.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            track.style.opacity = '0';
            setTimeout(() => {
                renderArticles(filter);
                track.style.opacity = '1';
                track.scrollLeft = 0; 
            }, 200);
        });
    });

    btnPrev.addEventListener('click', () => {
        const cardWidth = track.querySelector('.art-card').offsetWidth + 24;
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        const cardWidth = track.querySelector('.art-card').offsetWidth + 24;
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    renderArticles('all');
});
