/* =========================================
   LÓGICA DEL CARRUSEL DE ARTÍCULOS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('art-track');
    const filterBtns = document.querySelectorAll('.art-filter-btn');
    const searchInput = document.getElementById('artSearch');
    const btnPrev = document.getElementById('art-prev');
    const btnNext = document.getElementById('art-next');

    if (!track) return;

    // DATOS DE EJEMPLO
    const articles = [
        {
            id: 1,
            title: "Post-Mortem: Análisis del Incidente CrowdStrike",
            excerpt: "Desglose técnico de cómo una actualización de kernel driver en Falcon Sensor causó un BSOD global. Lecciones sobre ring-0 y testing.",
            image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80",
            category: "security",
            tag: "INCIDENT RESPONSE",
            date: "24 JUL 2024",
            readTime: "12 MIN"
        },
        {
            id: 2,
            title: "Hardening de Servidores Linux (RHEL 9) con Ansible",
            excerpt: "Automatización de la guía CIS Benchmark nivel 2 mediante roles de Ansible. Configuración de SELinux, SSH y Auditd.",
            image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
            category: "sysadmin",
            tag: "HARDENING",
            date: "15 JUN 2024",
            readTime: "8 MIN"
        },
        {
            id: 3,
            title: "Despliegue de K8s Cluster con Terraform en AWS",
            excerpt: "Infraestructura como Código (IaC) para levantar un clúster EKS seguro, con VPCs privadas y gestión de secretos.",
            image: "https://images.unsplash.com/photo-1667372393119-c85c020799a3?auto=format&fit=crop&w=800&q=80",
            category: "devops",
            tag: "CLOUD NATIVE",
            date: "02 MAY 2024",
            readTime: "15 MIN"
        },
        {
            id: 4,
            title: "Pentesting Active Directory: Kerberoasting",
            excerpt: "Técnicas ofensivas para extraer y crackear tickets de servicio (TGS) en entornos Windows Server mal configurados.",
            image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=800&q=80",
            category: "security",
            tag: "RED TEAM",
            date: "10 ABR 2024",
            readTime: "10 MIN"
        },
        {
            id: 5,
            title: "Monitorización 360º con Prometheus y Grafana",
            excerpt: "Implementación de stack de observabilidad para microservicios. Creación de alertas inteligentes y dashboards.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            category: "devops",
            tag: "OBSERVABILITY",
            date: "22 MAR 2024",
            readTime: "7 MIN"
        }
    ];

    let currentFilter = 'all';
    let currentSearch = '';

    function renderArticles() {
        track.innerHTML = '';
        
        const filtered = articles.filter(art => {
            const matchesCategory = currentFilter === 'all' || art.category === currentFilter;
            const matchesSearch = art.title.toLowerCase().includes(currentSearch) || 
                                  art.excerpt.toLowerCase().includes(currentSearch) ||
                                  art.tag.toLowerCase().includes(currentSearch);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            track.innerHTML = `<div style="color:#64748b; padding:40px; width:100%; text-align:center;">// NO_DATA_FOUND</div>`;
            return;
        }

        filtered.forEach((art, index) => {
            const card = document.createElement('article');
            card.className = 'art-card';
            card.setAttribute('data-category', art.category);
            
            card.style.opacity = '0';
            card.style.animation = `fadeIn 0.4s ease forwards ${index * 0.05}s`;
            
            card.innerHTML = `
                <div class="art-img-box">
                    <img src="${art.image}" alt="${art.title}" class="art-img" loading="lazy">
                    <span class="art-badge">${art.tag}</span>
                </div>
                <div class="art-content">
                    <div class="art-meta">
                        <span>// ${art.date}</span>
                        <span>⏱ ${art.readTime}</span>
                    </div>
                    <h3 class="art-title">${highlightText(art.title, currentSearch)}</h3>
                    <p class="art-excerpt">${highlightText(art.excerpt, currentSearch)}</p>
                    <a href="#" class="art-link">
                        Leer más <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            `;
            track.appendChild(card);
        });
    }

    function highlightText(text, term) {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<span style="color:#ff9f1a; background:rgba(255,159,26,0.1);">$1</span>');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            track.style.opacity = '0';
            setTimeout(() => {
                renderArticles();
                track.style.opacity = '1';
                track.scrollLeft = 0; 
            }, 200);
        });
    });

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        renderArticles(); 
    });

    // Ajuste de scroll: Calcular el ancho real de tarjeta + gap
    btnPrev.addEventListener('click', () => {
        const cardWidth = track.querySelector('.art-card').offsetWidth;
        const gap = 20; // El gap definido en CSS
        track.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        const cardWidth = track.querySelector('.art-card').offsetWidth;
        const gap = 20;
        track.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
    });

    renderArticles();
});
