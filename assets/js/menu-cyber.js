/* ============================================================
   MENÚ CYBER-LINE
   - Scroll suave
   - Sección activa
   - Tope superior dinámico alineado con "Sobre mí"
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("cyberMenu");
  const links = document.querySelectorAll(".cyber-link");
  const sections = [...links].map(link => {
    const id = link.getAttribute("href");
    return document.querySelector(id);
  });

  if (!menu || !links.length) return;

  /* ------------------------------
     Scroll suave al hacer clic
     ------------------------------ */
  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerOffset = 90; // margen para que no se pegue al borde
      const rect = target.getBoundingClientRect();
      const offsetPosition = rect.top + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  /* ------------------------------------------------------
     Tope superior dinámico: alinea el menú con el título
     "Sobre mí" en escritorio y nunca sube más de ahí.
     ------------------------------------------------------ */

  function updateMenuTop() {
    // Solo aplicamos en escritorio; en móvil manda el CSS
    if (window.innerWidth < 981) {
      menu.style.top = "";
      return;
    }

    const title = document.getElementById("sobre-mi-title") || document.querySelector("#sobre-mi h2");
    if (!title) return;

    const rect = title.getBoundingClientRect();
    const offset = 0; // píxeles extra por debajo del título si quieres
    const top = rect.top + offset;

    menu.style.top = `${top}px`;
  }

  window.addEventListener("load", updateMenuTop);
  window.addEventListener("resize", updateMenuTop);
  // pequeño timeout por si hay fuentes/cargas que mueven el layout
  setTimeout(updateMenuTop, 300);


  /* ------------------------------------------------------
     Detector de sección actual (IntersectionObserver)
     ------------------------------------------------------ */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`.cyber-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, {
    root: null,
    rootMargin: "-45% 0px -45% 0px", // activa cuando la sección está en la zona central
    threshold: 0,
  });

  sections.forEach(section => {
    if (section) observer.observe(section);
  });
});
