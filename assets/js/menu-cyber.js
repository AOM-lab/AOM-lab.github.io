/* ============================================================
   MENÚ BRAZO MECÁNICO CYBER
   - Aparece al llegar a la sección "Sobre mí"
   - Animación de despliegue del brazo robótico
   - Panel de navegación con scroll suave
   - Detección de sección activa
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ===== Solo ejecutar en escritorio =====
  if (window.innerWidth < 981) return;

  // ===== CREAR EL HTML DEL BRAZO MECÁNICO =====
  const armHTML = `
    <!-- Sistema del brazo mecánico -->
    <div class="arm-system" id="armSystem">
      <!-- Módulo de pared -->
      <div class="wall-mount">
        <div class="mount-indicators">
          <div class="indicator"></div>
          <div class="indicator amber"></div>
          <div class="indicator"></div>
        </div>
      </div>

      <!-- BRAZO 1 -->
      <div class="arm-1" id="arm1">
        <div class="energy-line" id="energy1"></div>
        
        <!-- JOINT con BRAZO 2 dentro -->
        <div class="joint" id="joint">
          <div class="arm-2" id="arm2">
            <div class="energy-line" id="energy2"></div>
            
            <!-- PROYECTOR -->
            <div class="projector" id="projector">
              <div class="beam" id="beam"></div>
              
              <!-- PANEL DEL MENÚ -->
              <nav class="menu-panel" id="menuPanel" aria-label="Panel de navegación rápida">
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
                      <div class="item-icon">
                        <i class="fa-solid fa-user"></i>
                      </div>
                      <span class="item-label">Sobre mí</span>
                    </a>
                  </li>
                  <li>
                    <a href="#especialidades" class="menu-item" data-section="especialidades">
                      <div class="item-icon">
                        <i class="fa-solid fa-bullseye"></i>
                      </div>
                      <span class="item-label">Especialidades</span>
                    </a>
                  </li>
                  <li>
                    <a href="#investigacion" class="menu-item" data-section="investigacion">
                      <div class="item-icon">
                        <i class="fa-solid fa-flask"></i>
                      </div>
                      <span class="item-label">Investigación</span>
                    </a>
                  </li>
                </ul>

                <div class="menu-group">Contenido</div>
                <ul class="menu-list">
                  <li>
                    <a href="#tools" class="menu-item" data-section="tools">
                      <div class="item-icon">
                        <i class="fa-solid fa-screwdriver-wrench"></i>
                      </div>
                      <span class="item-label">Herramientas</span>
                    </a>
                  </li>
                  <li>
                    <a href="#site-graph" class="menu-item" data-section="site-graph">
                      <div class="item-icon">
                        <i class="fa-solid fa-diagram-project"></i>
                      </div>
                      <span class="item-label">Mapa visual</span>
                    </a>
                  </li>
                  <li>
                    <a href="#contact" class="menu-item" data-section="contact">
                      <div class="item-icon">
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                      <span class="item-label">Contacto</span>
                    </a>
                  </li>
                </ul>

                <div class="panel-footer">
                  <div class="footer-status">
                    <i class="fa-solid fa-check-circle"></i>
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

    <!-- Botón toggle -->
    <button class="arm-toggle-btn" id="armToggleBtn" aria-label="Abrir menú de navegación">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <span class="arm-hint">Pulsa <kbd>M</kbd></span>
  `;

  // Insertar el HTML en el body
  document.body.insertAdjacentHTML('beforeend', armHTML);

  // ===== REFERENCIAS A ELEMENTOS =====
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
  const armHint = document.querySelector('.arm-hint');
  const footerTime = document.getElementById('footerTime');

  let isOpen = false;
  let isAnimating = false;
  let isVisible = false;

  // ===== ACTUALIZAR HORA =====
  function updateTime() {
    const now = new Date();
    if (footerTime) {
      footerTime.textContent = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
  }
  setInterval(updateTime, 1000);
  updateTime();

  // ===== UTILIDAD SLEEP =====
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ===== MOSTRAR/OCULTAR SISTEMA =====
  function showSystem() {
    if (isVisible) return;
    isVisible = true;
    armSystem.classList.add('visible');
    toggleBtn.classList.add('visible');
    armHint.classList.add('visible');
  }

  function hideSystem() {
    if (!isVisible || isOpen) return;
    isVisible = false;
    armSystem.classList.remove('visible');
    toggleBtn.classList.remove('visible');
    armHint.classList.remove('visible');
  }

  // ===== ANIMACIÓN DE DESPLIEGUE =====
  async function deploy() {
    if (isAnimating || isOpen) return;
    isAnimating = true;
    isOpen = true;
    toggleBtn.classList.add('active');

    // FASE 1: Brazo 1 se despliega (1 segundo)
    arm1.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    arm1.style.transform = 'translateY(-50%) rotate(0deg)';

    await sleep(500);
    
    // Energía en brazo 1
    energy1.style.transition = 'width 0.8s ease-out';
    energy1.style.width = 'calc(100% - 35px)';

    await sleep(500);

    // FASE 2: Joint se activa
    joint.classList.add('active');

    // FASE 3: Brazo 2 se despliega hacia la izquierda (1.2 segundos)
    await sleep(200);
    arm2.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    arm2.style.transform = 'translateY(-50%) rotate(0deg)';

    await sleep(600);
    
    // Energía en brazo 2
    energy2.style.transition = 'width 0.8s ease-out';
    energy2.style.width = 'calc(100% - 28px)';

    // FASE 4: Proyector aparece
    await sleep(700);
    projector.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease';
    projector.classList.add('active');

    // FASE 5: Haz de proyección
    await sleep(400);
    beam.style.transition = 'height 0.4s ease-out';
    beam.style.height = '15px';

    // FASE 6: Menú aparece
    await sleep(300);
    menuPanel.style.transition = 'opacity 0.4s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
    menuPanel.classList.add('active');

    await sleep(500);
    isAnimating = false;
  }

  // ===== ANIMACIÓN DE RETRACCIÓN =====
  async function retract() {
    if (isAnimating || !isOpen) return;
    isAnimating = true;
    isOpen = false;
    toggleBtn.classList.remove('active');

    // FASE 1: Menú desaparece
    menuPanel.style.transition = 'opacity 0.3s ease, transform 0.4s ease';
    menuPanel.classList.remove('active');

    await sleep(300);

    // FASE 2: Haz se retrae
    beam.style.transition = 'height 0.25s ease';
    beam.style.height = '0';

    await sleep(200);

    // FASE 3: Proyector desaparece
    projector.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    projector.classList.remove('active');

    await sleep(250);

    // FASE 4: Energía brazo 2
    energy2.style.transition = 'width 0.4s ease';
    energy2.style.width = '0';

    await sleep(200);

    // FASE 5: Brazo 2 se pliega
    arm2.style.transition = 'transform 0.9s cubic-bezier(0.55, 0.06, 0.68, 0.19)';
    arm2.style.transform = 'translateY(-50%) rotate(-90deg)';

    await sleep(500);

    // FASE 6: Joint se desactiva
    joint.classList.remove('active');

    // FASE 7: Energía brazo 1
    energy1.style.transition = 'width 0.4s ease';
    energy1.style.width = '0';

    await sleep(300);

    // FASE 8: Brazo 1 se pliega
    arm1.style.transition = 'transform 0.9s cubic-bezier(0.55, 0.06, 0.68, 0.19)';
    arm1.style.transform = 'translateY(-50%) rotate(90deg)';

    await sleep(900);
    isAnimating = false;
  }

  // ===== TOGGLE =====
  function toggle() {
    if (isOpen) {
      retract();
    } else {
      deploy();
    }
  }

  // ===== EVENT LISTENERS =====
  toggleBtn.addEventListener('click', toggle);

  // Tecla M para toggle
  document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyM' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      // No activar si estamos escribiendo en un input
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') return;
      // Solo si el sistema es visible
      if (!isVisible) return;
      e.preventDefault();
      toggle();
    }
  });

  // ===== SCROLL SUAVE PARA ENLACES =====
  const menuItems = document.querySelectorAll('.menu-panel .menu-item');

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetId = item.getAttribute('href');
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      // Efecto visual de click
      item.style.background = 'rgba(255,159,26,0.15)';
      setTimeout(() => item.style.background = '', 150);

      // Scroll suave
      const offset = -80;
      const top = target.getBoundingClientRect().top + window.scrollY + offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });

  // ===== DETECCIÓN DE SECCIÓN ACTIVA =====
  const sections = [
    'sobre-mi',
    'especialidades',
    'investigacion',
    'tools',
    'site-graph',
    'contact'
  ];

  function updateActiveSection() {
    const scrollPos = window.scrollY + 200;

    let currentSection = null;

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          currentSection = sectionId;
          break;
        }
      }
    }

    // Actualizar clase active en los items del menú
    menuItems.forEach(item => {
      const itemSection = item.getAttribute('data-section');
      if (itemSection === currentSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // ===== VISIBILIDAD Y AUTO-DESPLIEGUE AL LLEGAR A "SOBRE MÍ" =====
  const triggerSection = document.getElementById('sobre-mi');
  const SHOW_OFFSET = 300; // Mostrar cuando "sobre-mi" está a 300px del top
  let hasAutoDeployed = false;

  function checkVisibilityAndDeploy() {
    if (!triggerSection) return;

    const rect = triggerSection.getBoundingClientRect();

    // Mostrar el sistema cuando llegamos cerca de "sobre-mi"
    if (rect.top <= SHOW_OFFSET) {
      showSystem();
      
      // Auto-desplegar solo una vez
      if (!hasAutoDeployed && !isOpen && !isAnimating) {
        hasAutoDeployed = true;
        // Pequeño delay para que se vea el sistema antes de desplegar
        setTimeout(() => {
          deploy();
        }, 300);
      }
    } else {
      // Ocultar si volvemos arriba (solo si está cerrado)
      if (!isOpen) {
        hideSystem();
        hasAutoDeployed = false;
      }
    }
  }

  // Ejecutar al cargar
  checkVisibilityAndDeploy();
  updateActiveSection();

  // Actualizar en scroll
  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      checkVisibilityAndDeploy();
      updateActiveSection();
    });
  }, { passive: true });

});
