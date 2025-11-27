/* ============================================================
   PANEL LATERAL ANIMADO (STEALTH → EXPAND)
   - Aparece como barra fina
   - Al pasar "Sobre mí" se despliega suavemente
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("sidebarNav");
  const triggerSection = document.getElementById("sobre-mi");

  if (!panel || !triggerSection) return;

  // Empezamos en modo "barra colapsada"
  panel.classList.add("is-collapsed");

  // Punto exacto donde el panel debe abrirse
  const OPEN_OFFSET = 120; // puedes afinarlo (100–160 es lo profesional)

  function updatePanel() {
    const rect = triggerSection.getBoundingClientRect();

    // Cuando la parte superior de "Sobre mí" está suficientemente arriba
    if (rect.top <= OPEN_OFFSET) {
      panel.classList.remove("is-collapsed");
      panel.classList.add("is-open");
    } else {
      panel.classList.add("is-collapsed");
      panel.classList.remove("is-open");
    }
  }

  // Ejecutar al cargar
  updatePanel();

  // Optimizado con requestAnimationFrame
  window.addEventListener(
    "scroll",
    () => requestAnimationFrame(updatePanel),
    { passive: true }
  );
});

