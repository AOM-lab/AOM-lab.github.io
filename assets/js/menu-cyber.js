/* ============================================================
   MENÚ BRAZO MECÁNICO — PREMIUM FINAL
   Posición dinámica: centrado cuando plegado, arriba al desplegar
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  if (window.innerWidth < 981) return;

  // ===== HTML =====
  const armHTML = `
    <div class="arm-system" id="armSystem">
      
      <div class="wall-mount">
        <div class="mount-indicators">
          <div class="indicator"></div>
          <div class="indicator"></div>
          <div class="indicator"></div>
        </div>
      </div>

      <div class="arm-1" id="arm1">
        <div class="energy-line" id="energy1"></div>
        
        <!-- Interruptor mecánico tipo switch -->
        <button class="arm-toggle-btn" id="armToggleBtn" aria-label="Toggle menú">
          <div class="switch-track"></div>
          <div class="switch-knob"></div>
        </button>
        
        <div class="joint" id="joint">
          <!-- Contenedor de partículas -->
          <div class="particles-container" id="particles">
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
          </div>
          
          <div class="arm-2" id="arm2">
            <div class="energy-line" id="energy2"></div>
            <div class="projector" id="projector">
              <div class="beam" id="beam"></div>
              
              <nav class="menu-panel" id="menuPanel">
                <div class="panel-header">
                  <div class="status-dot"></div>
                  <div class="header-text">
                    <div class="header-title">Panel rápido</div>
                    <div class="header-subtitle">Navegación</div>
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

  const heroWrap = document.querySelector('.hero-wrap') || document.querySelector('.hero') || document.querySelector('#home');

  let isOpen = false;
  let isAnimating = false;
  let wasAtTop = true;

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

  // ===== EFECTO CHISPAS =====
  function triggerSparks() {
    joint.classList.add('sparking');
    setTimeout(() => {
      joint.classList.remove('sparking');
    }, 800);
  }

  // ===== DESPLIEGUE =====
  async function deploy() {
    if (isAnimating || isOpen) return;
    isAnimating = true;
    isOpen = true;
    toggleBtn.classList.add('active');
    
    // Añadir clase deployed PRIMERO para que suba mientras se despliega
    armSystem.classList.add('deployed');

    arm1.style.transition = 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)';
    arm1.style.transform = 'translateY(-50%) rotate(0deg)';

    await sleep(500);
    
    energy1.style.transition = 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
    energy1.style.width = 'calc(100% - 55px)';

    await sleep(400);

    joint.classList.add('active');
    triggerSparks();

    await sleep(200);

    arm2.style.transition = 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)';
    arm2.style.transform = 'translateY(-50%) rotate(0deg)';

    await sleep(600);
    
    energy2.style.transition = 'width 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
    energy2.style.width = 'calc(100% - 26px)';

    await sleep(500);

    projector.classList.add('active');

    await sleep(400);

    beam.style.height = '20px';

    await sleep(250);

    menuPanel.classList.add('active');

    await sleep(400);
    isAnimating = false;
  }

  // ===== RETRACCIÓN =====
  async function retract() {
    if (isAnimating || !isOpen) return;
    isAnimating = true;
    isOpen = false;
    toggleBtn.classList.remove('active');

    menuPanel.style.transition = 'all 0.3s cubic-bezier(0.55, 0, 1, 0.45)';
    menuPanel.classList.remove('active');

    await sleep(250);

    beam.style.height = '0';

    await sleep(180);

    projector.classList.remove('active');

    await sleep(250);

    energy2.style.transition = 'width 0.35s ease-out';
    energy2.style.width = '0';

    await sleep(220);

    arm2.style.transition = 'transform 0.8s cubic-bezier(0.55, 0, 1, 0.45)';
    arm2.style.transform = 'translateY(-50%) rotate(90deg)';

    await sleep(450);

    triggerSparks();
    joint.classList.remove('active');

    energy1.style.transition = 'width 0.35s ease-out';
    energy1.style.width = '0';

    await sleep(280);

    arm1.style.transition = 'transform 0.8s cubic-bezier(0.55, 0, 1, 0.45)';
    arm1.style.transform = 'translateY(-50%) rotate(90deg)';

    // Quitar clase deployed al FINAL para que baje al centro
    await sleep(400);
    armSystem.classList.remove('deployed');

    await sleep(350);
    
    menuPanel.style.transition = '';
    isAnimating = false;
  }

  function toggle() {
    if (isOpen) {
      retract();
    } else {
      deploy();
    }
  }

  // ===== EVENTOS =====
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

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

  // ===== LÓGICA AUTO OPEN/CLOSE =====
  function checkScrollPosition() {
    const scrollY = window.scrollY;
    const isAtTop = scrollY < 150;
    
    let heroIsOut = false;
    if (heroWrap) {
      const rect = heroWrap.getBoundingClientRect();
      heroIsOut = rect.bottom < 0;
    } else {
      heroIsOut = scrollY > 400;
    }

    if (isAtTop && isOpen && !isAnimating) {
      retract();
      wasAtTop = true;
    }
    else if (heroIsOut && !isOpen && !isAnimating && wasAtTop) {
      deploy();
      wasAtTop = false;
    }
    else if (isAtTop) {
      wasAtTop = true;
    }
  }

  // ===== INIT =====
  const initialScrollY = window.scrollY;
  wasAtTop = initialScrollY < 150;
  
  if (!wasAtTop) {
    let heroIsOut = false;
    if (heroWrap) {
      const rect = heroWrap.getBoundingClientRect();
      heroIsOut = rect.bottom < 0;
    } else {
      heroIsOut = initialScrollY > 400;
    }
    
    if (heroIsOut) {
      setTimeout(deploy, 500);
    }
  }

  updateActiveSection();

  // ===== SCROLL LISTENER =====
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScrollPosition();
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
