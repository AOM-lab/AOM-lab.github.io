/* EFECTO SPOTLIGHT PARA ESPECIALIDADES */
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById("spec-grid-pro");
    if (!grid) return;

    grid.addEventListener('mousemove', (e) => {
        // Optimización con requestAnimationFrame
        window.requestAnimationFrame(() => {
            const cards = grid.querySelectorAll('.spec-card-pro');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });
        });
    });
});
