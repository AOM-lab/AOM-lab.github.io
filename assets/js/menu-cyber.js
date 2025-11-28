/* ============================================================
   SIDEBAR: RASTRO VERTICAL → SLIDE + PANEL HACIA ABAJO
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("sidebarNav");
  const triggerSection = document.getElementById("sobre-mi");

  if (!panel || !triggerSection) return;

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
});
