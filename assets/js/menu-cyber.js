/* ============================================================
   MENÚ BRAZO MECÁNICO — PREMIUM FINAL
   - Botón integrado en el módulo de pared
   - Se cierra automáticamente cuando el hero es visible
   - Se abre automáticamente cuando el hero sale de pantalla
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // Solo escritorio
  if (window.innerWidth < 981) return;

  // ===== HTML DEL SISTEMA =====
  const armHTML = `
    <div class="arm-system" id="armSystem">
      
      <!-- Módulo de pared con botón integrado -->
      <div class="wall-mount">
        <div class="mount-indicators">
          <div class="indicator"></div>
          <div class="indicator"></div>
          <div class="indicator"></div>
        </div>
        
        <button class="arm-toggle-btn" id="armToggleBtn" aria-label="Menú de navegación">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        
        <div class="mount-line"></div>
        
        <span class="arm-hint"><kbd>M</kbd></span>
      </div>

      <!-- Brazo 1 -->
      <div class="arm-1" id="arm1">
        <div class="energy-line" id="energy1"></div>
        <div class="joint" id="joint">
          <!-- Brazo 2 -->
          <div class="arm-2" id="arm2">
            <div class="energy-line" id="energy2"></div>
            <div class="projector" id="projector">
              <div class="beam" id="beam"></div>
              
              <!-- Panel del menú -->
              <nav class="menu-panel" id="menuPanel" aria-label="Navegación rápida">
                <div class="panel-header">
                  <div class="status-dot"></div>
                  <div class="header-text">
                    <div class="header-title">Panel rápido</div>
                    <div class="header-subtitle">Navegación del sitio</div>
                  </div>
                </div>

                <div class="menu-group">Perfil</div>
                <ul class="menu-list">
                  <li>
                    <a href="#sobre-mi" class="menu-item" data-section="sobre-mi">
                      <div class="item-icon"><i class="fa-solid fa-user"></i></div>
                      <span class="item-label">Sobre mí</span>
                    </a>
                  </li>
                  <li>
                    <a href="#especialidades" class="menu-item" data-section="especialidades">
                      <div class="item-icon"><i class="fa-solid fa-bullseye"></i></div>
                      <span class="item-label">Especialidades</span>
                    </a>
                  </li>
                  <li>
                    <a href="#investigacion" class="menu-item" data-section="investigacion">
                      <div class="item-icon"><i class="fa-solid fa-flask"></i></div>
                      <span class="item-label">Investigación</span>
                    </a>
                  </li>
                </ul>

                <div class="menu-group">Contenido</div>
                <ul class="menu-list">
                  <li>
                    <a href="#tools" class="menu-item" data-section="tools">
                      <div class="item-icon"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                      <span class="item-label">Herramientas</span>
                    </a>
                  </li>
                  <li>
                    <a href="#site-graph" class="menu-item" data-section="site-graph">
                      <div class="item-icon"><i class="fa-solid fa-diagram-project"></i></div>
                      <span class="item-label">Mapa visual</span>
                    </a>
                  </li>
                  <li>
                    <a href="#contact" class="menu-item" data-section="contact">
                      <div class="item-icon"><i class="fa-solid fa-envelope"></i></div>
                      <span class="item-label">Contacto</span>
                    </a>
                  </li>
                </ul>

                <div class="panel-footer">
                  <div class="footer-status">
                    <i class="fa-solid fa-circle-check"></i>
                    Online
                  </div>
                  <span class="footer-time" id="footerTime">--:--</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', armHTML);

  // ===== ELEMENTOS =====
  const armSystem = document.getElementById('armSystem');
  const arm1 = document.getElementById('arm1');
  const arm2 = document.getElementById('arm2');
  const joint = document.getElementById('joint');
  const energy1 = document.getElementById('energy1');
  const energy2 = document.getElementById('energy2');
  const projector = document.getElementById('projector');
  const beam = document.getElementById('beam');
  const menuPanel = document.getElementById('menuPanel');
  const toggleBtn = document.getElementById('armToggleBtn');
  const footerTime = document.getElementById('footerTime');
  const menuItems = document.querySelectorAll('.menu-panel .menu-item');

  // ===== DETECTAR HERO =====
  // Buscar el contenedor hero-wrap o el h1 del título
  const heroElement = document.querySelector('.hero-wrap') || 
                      document.querySelector('.hero') || 
                      document.querySelector('#home') ||
                      document.querySelector('h1');

  let isOpen = false;
  let isAnimating = false;
  let lastHeroVisible = true;
  let manualOverride = false; // Para controlar si el usuario ha interactuado manualmente

  // ===== UTILIDADES =====
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function updateTime() {
    if (footerTime) {
      const now = new Date();
      footerTime.textContent = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
  }
  setInterval(updateTime, 1000);
  updateTime();

  // ===== ANIMACIÓN DESPLIEGUE =====
  async function deploy() {
    if (isAnimating || isOpen) return;
    isAnimating = true;
    isOpen = true;
    toggleBtn.classList.add('active');
    armSystem.classList.add('deployed');

    // Brazo 1 se despliega
    arm1.style.transition = 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)';
    arm1.style.transform = 'translateY(-50%) rotate(0deg)';

    await sleep(550);
    
    // Pulso de energía en brazo 1
    energy1.style.transition = 'width 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
    energy1.style.width = 'calc(100% - 30px)';

    await sleep(450);

    // Joint se activa
    joint.classList.add('active');

    await sleep(250);

    // Brazo 2 se despliega
    arm2.style.transition = 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
    arm2.style.transform = 'translateY(-50%) rotate(0deg)';

    await sleep(650);
    
    // Pulso de energía en brazo 2
    energy2.style.transition = 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
    energy2.style.width = 'calc(100% - 30px)';

    await sleep(600);

    // Proyector aparece
    projector.classList.add('active');

    await sleep(450);

    // Haz de proyección
    beam.style.height = '25px';

    await sleep(300);

    // Menú aparece
    menuPanel.classList.add('active');

    await sleep(500);
    isAnimating = false;
  }

  // ===== ANIMACIÓN RETRACCIÓN =====
  async function retract() {
    if (isAnimating || !isOpen) return;
    isAnimating = true;
    isOpen = false;
    toggleBtn.classList.remove('active');
    armSystem.classList.remove('deployed');

    // Menú desaparece
    menuPanel.style.transition = 'all 0.35s cubic-bezier(0.55, 0, 1, 0.45)';
    menuPanel.classList.remove('active');

    await sleep(280);

    // Haz se retrae
    beam.style.height = '0';

    await sleep(200);

    // Proyector desaparece
    projector.classList.remove('active');

    await sleep(280);

    // Energía brazo 2 se apaga
    energy2.style.transition = 'width 0.4s ease-out';
    energy2.style.width = '0';

    await sleep(250);

    // Brazo 2 se pliega hacia ARRIBA
    arm2.style.transition = 'transform 0.9s cubic-bezier(0.55, 0, 1, 0.45)';
    arm2.style.transform = 'translateY(-50%) rotate(90deg)';

    await sleep(500);

    // Joint se desactiva
    joint.classList.remove('active');

    // Energía brazo 1 se apaga
    energy1.style.transition = 'width 0.4s ease-out';
    energy1.style.width = '0';

    await sleep(300);

    // Brazo 1 se pliega
    arm1.style.transition = 'transform 0.9s cubic-bezier(0.55, 0, 1, 0.45)';
    arm1.style.transform = 'translateY(-50%) rotate(90deg)';

    await sleep(850);
    
    menuPanel.style.transition = '';
    isAnimating = false;
  }

  function toggle() {
    manualOverride = true; // El usuario ha interactuado manualmente
    
    // Resetear el override después de 3 segundos para volver al comportamiento automático
    setTimeout(() => {
      manualOverride = false;
    }, 3000);
    
    if (isOpen) {
      retract();
    } else {
      deploy();
    }
  }

  // ===== EVENTOS =====
  toggleBtn.addEventListener('click', toggle);

  document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyM' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      toggle();
    }
  });

  // ===== SCROLL SUAVE =====
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetId = item.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      
      item.style.background = 'rgba(255, 159, 26, 0.12)';
      setTimeout(() => item.style.background = '', 200);

      const offset = -100;
      const top = target.getBoundingClientRect().top + window.scrollY + offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ===== SECCIÓN ACTIVA =====
  const sections = ['sobre-mi', 'especialidades', 'investigacion', 'tools', 'site-graph', 'contact'];

  function updateActiveSection() {
    const scrollPos = window.scrollY + 250;
    let current = null;

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        if (scrollPos >= top && scrollPos < bottom) {
          current = id;
          break;
        }
      }
    }

    menuItems.forEach(item => {
      const section = item.getAttribute('data-section');
      item.classList.toggle('active', section === current);
    });
  }

  // ===== LÓGICA APERTURA/CIERRE AUTOMÁTICO =====
  function checkHeroVisibility() {
    if (!heroElement || manualOverride) return;

    const rect = heroElement.getBoundingClientRect();
    
    // El hero está "fuera de cámara" cuando su parte inferior está por encima del viewport
    // Usamos un pequeño margen para que se active un poco antes
    const heroIsVisible = rect.bottom > 50;

    // Solo actuar si cambió el estado
    if (heroIsVisible !== lastHeroVisible) {
      lastHeroVisible = heroIsVisible;

      if (heroIsVisible) {
        // El hero es visible → cerrar menú automáticamente
        if (isOpen && !isAnimating) {
          retract();
        }
      } else {
        // El hero ya no es visible (salió arriba) → abrir menú automáticamente
        if (!isOpen && !isAnimating) {
          deploy();
        }
      }
    }
  }

  // ===== INICIALIZACIÓN =====
  if (heroElement) {
    const rect = heroElement.getBoundingClientRect();
    lastHeroVisible = rect.bottom > 50;
    
    // Si al cargar ya estamos debajo del hero, abrir el menú
    if (!lastHeroVisible) {
      setTimeout(deploy, 500);
    }
  }

  updateActiveSection();

  // ===== SCROLL LISTENER =====
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkHeroVisibility();
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ===== RESIZE =====
  window.addEventListener('resize', () => {
    if (window.innerWidth < 981) {
      armSystem.style.display = 'none';
    } else {
      armSystem.style.display = '';
    }
  });

});
