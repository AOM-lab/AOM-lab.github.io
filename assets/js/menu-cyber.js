/*
   MENÚ CYBER-LINE — JS
   Detecta sección activa + scroll suave + mejora UX
*/

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".cyber-link");
  const sections = [...links].map(link => {
    const id = link.getAttribute("href");
    return document.querySelector(id);
  });

  /* Scroll suave */
  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 40,
          behavior: "smooth",
        });
      }
    });
  });

  /* Resalta el item activo al hacer scroll */
  const activateOnScroll = () => {
    let scrollPos = window.scrollY + 200;

    sections.forEach((section, index) => {
      if (!section) return;

      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        links.forEach(l => l.classList.remove("active"));
        links[index].classList.add("active");
      }
    });
  };

  activateOnScroll();
  window.addEventListener("scroll", activateOnScroll);
});
