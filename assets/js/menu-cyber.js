/* ============================================================
   SIDEBAR: RASTRO → BARRA → PANEL (VERTICAL → HORIZONTAL → MENÚ)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("sidebarNav");
  const triggerSection = document.getElementById("sobre-mi");

  if (!panel || !triggerSection) return;

  // Punto donde quieres que empiece a abrirse el menú
  const OPEN_OFFSET = 140; // píxeles desde la parte superior del viewport

  function updatePanel() {
    const rect = triggerSection.getBoundingClientRect();

    if (rect.top <= OPEN_OFFSET) {
      // Hemos bajado lo suficiente: el rastro se coloca y se abre el panel
      panel.classList.add("is-open");
    } else {
      // Volvemos arriba: sólo se ve el rastro vertical
      panel.classList.remove("is-open");
    }
  }

  // Ejecutar al cargar (por si entras ya scrolleado)
  updatePanel();

  // Actualizar en scroll (optimizado)
  window.addEventListener(
    "scroll",
    () => window.requestAnimationFrame(updatePanel),
    { passive: true }
  );
});
