/* ============================================================
   MENÚ CYBER-LINE LATERAL — Scroll suave + sección activa
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll(".cyber-link");
  const sections = [...links].map(link => {
    const id = link.getAttribute("href");
    return document.querySelector(id);
  });

  /* ------------------------------
     SCROLL SUAVE AL HACER CLIC
     ------------------------------ */
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;

      /* Ajuste fino para no pegar el título al borde superior */
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });


  /* ------------------------------------------------------
     DETECTOR DE SECCIÓN ACTUAL (IntersectionObserver)
     ------------------------------------------------------ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;

      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`.cyber-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, {
    root: null,
    rootMargin: "-45% 0px -45% 0px",  // detecta la sección cuando entra al centro de la pantalla
    threshold: 0
  });

  sections.forEach(section => {
    if (section) observer.observe(section);
  });

});
