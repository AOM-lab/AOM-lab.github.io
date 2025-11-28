/* ============================================================
   SIDEBAR: RASTRO VERTICAL → SLIDE + PANEL HACIA ABAJO
   + SCROLL SUAVE PARA ENLACES #anchor
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* --------- LÓGICA DEL PANEL LATERAL ---------- */

  const panel = document.getElementById("sidebarNav");
  const triggerSection = document.getElementById("sobre-mi");

  if (panel && triggerSection) {
    const OPEN_OFFSET = 140; // punto en el que quieres que se abra

    function updatePanel() {
      const rect = triggerSection.getBoundingClientRect();

      if (rect.top <= OPEN_OFFSET) {
        // Hemos bajado lo suficiente -> deslizar + abrir
        panel.classList.add("is-open");
      } else {
        // Estamos por encima de "Sobre mí" -> solo rastro fino
        panel.classList.remove("is-open");
      }
    }

    // Ejecutar al cargar por si entras ya scrolleado
    updatePanel();

    // Actualizar en scroll (optimizado)
    window.addEventListener(
      "scroll",
      () => requestAnimationFrame(updatePanel),
      { passive: true }
    );
  }

  /* --------- SCROLL SUAVE GLOBAL ---------- */

  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      // Distancia desde el borde superior (ajústalo si hace falta)
      const offset = -20;

      const top = target.getBoundingClientRect().top + window.scrollY + offset;

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    });
  });
});
