/* ============================================================
   PANEL LATERAL ANIMADO — SLIDE IN + EXPAND
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("sidebarNav");
  const triggerSection = document.getElementById("sobre-mi");

  if (!panel || !triggerSection) return;

  // Barra fina inicial
  panel.classList.remove("is-open");

  const OPEN_OFFSET = 140;  // cuando debe activarse

  function updatePanel() {
    const rect = triggerSection.getBoundingClientRect();

    if (rect.top <= OPEN_OFFSET) {
      panel.classList.add("is-open");
    } else {
      panel.classList.remove("is-open");
    }
  }

  updatePanel();

  window.addEventListener(
    "scroll",
    () => requestAnimationFrame(updatePanel),
    { passive: true }
  );
});
