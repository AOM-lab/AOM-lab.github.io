/* =========================================
   NAV DATA - Estructura de Navegación
   ========================================= */

// Helper para generar artículos de ejemplo
const generateArticles = (base, count = 12) => 
  Array.from({ length: count }, (_, i) => ({
    label: `${base} · Artículo ${i + 1}`,
    href: "#"
  }));

const NAV_TREE = [
  // ═══════════════════════════════════════
  // TEORÍA Y CONCEPTOS (Dropdown multinivel)
  // ═══════════════════════════════════════
  {
    label: "Teoría y Conceptos",
    icon: "theory", // Icono de libro/documentación
    children: [
      {
        label: "Ciberseguridad",
        href: "#",
        children: [
          { label: "Análisis Forense", href: "#", children: generateArticles("Forense") },
          { label: "Respuesta a Incidentes", href: "#", children: generateArticles("Incidentes") },
          { label: "Threat Intelligence", href: "#", children: generateArticles("Threat Intel") }
        ]
      },
      {
        label: "Sistemas",
        href: "#",
        children: [
          { label: "Redes y Protocolos", href: "#", children: generateArticles("Redes") },
          { label: "Arquitectura", href: "#", children: generateArticles("Arquitectura") },
          { label: "Virtualización", href: "#", children: generateArticles("Virtualización") }
        ]
      },
      {
        label: "Casos Curiosos",
        href: "#",
        children: [
          { label: "Incidentes Históricos", href: "#", children: generateArticles("Historia") },
          { label: "Análisis de Malware", href: "#", children: generateArticles("Malware") }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════
  // PORTAFOLIO (Mega-menú con panel lateral)
  // ═══════════════════════════════════════
  {
    label: "Portafolio",
    icon: "folder",
    sticky: true, // Activa el panel lateral paginado
    children: [
      {
        label: "Ciberseguridad",
        href: "/portafolio/ciberseguridad/",
        children: [
          { label: "Análisis Forense", href: "#", children: generateArticles("Análisis Forense") },
          { label: "DevSecOps", href: "#", children: generateArticles("DevSecOps") },
          { label: "Documentación e Informes", href: "#", children: generateArticles("Docs e Informes") },
          { label: "Puesta en Producción Segura", href: "#", children: generateArticles("Producción Segura") },
          { label: "Respuesta a Incidentes", href: "#", children: generateArticles("Respuesta Incidentes") },
          { label: "Seguridad en Redes", href: "#", children: generateArticles("Seguridad Redes") },
          { label: "Seguridad de Sistemas", href: "#", children: generateArticles("Seguridad Sistemas") }
        ]
      },
      {
        label: "Sistemas",
        href: "/portafolio/sistemas/",
        children: [
          { label: "Linux", href: "#", children: generateArticles("Linux") },
          { label: "Windows Server", href: "#", children: generateArticles("Windows") },
          { label: "Automatización", href: "#", children: generateArticles("Automatización") },
          { label: "Cloud & AWS", href: "#", children: generateArticles("Cloud") }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════
  // PROYECTOS (Dropdown simple)
  // ═══════════════════════════════════════
  {
    label: "Proyectos",
    icon: "lab",
    children: [
      {
        label: "Laboratorio",
        href: "/laboratorio/",
        children: [
          { label: "TryHackMe", href: "#", children: generateArticles("THM") },
          { label: "HackTheBox", href: "#", children: generateArticles("HTB") },
          { label: "VulnHub", href: "#", children: generateArticles("VulnHub") }
        ]
      },
      {
        label: "Herramientas Propias",
        href: "#",
        children: [
          { label: "Scripts & Tools", href: "#", children: generateArticles("Scripts") },
          { label: "Automatizaciones", href: "#", children: generateArticles("Auto") }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════
  // CONTACTO (Link directo)
  // ═══════════════════════════════════════
  {
    label: "Contacto",
    href: "/contacto/",
    icon: "contact"
  }
];

// Exportar para uso en nav.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NAV_TREE };
}
