/* ===============================
   KNOWLEDGE VAULT — MAPA INMERSIVO
   Sistema de navegación por niveles con cámara
   =============================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== DATOS DEL VAULT =====
  const vaultData = {
    id: 'root',
    name: 'Knowledge Vault',
    type: 'folder',
    children: [
      {
        id: 'teoria', name: 'Teoría y Conceptos', type: 'folder', category: 'teoria',
        children: [
          { id: 'teoria-redes', name: 'Redes y Comunicaciones', type: 'folder', category: 'teoria',
            children: [
              { id: 't-r-1', name: 'Modelo OSI', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-r-2', name: 'Protocolos TCP/IP', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-r-3', name: 'Subnetting VLSM', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-r-4', name: 'DNS y DHCP', type: 'file', fileType: 'doc', category: 'teoria' },
            ]},
          { id: 'teoria-so', name: 'Sistemas Operativos', type: 'folder', category: 'teoria',
            children: [
              { id: 't-so-1', name: 'Gestión Procesos', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-so-2', name: 'Sistemas Archivos', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-so-3', name: 'Memoria Virtual', type: 'file', fileType: 'doc', category: 'teoria' },
            ]},
          { id: 'teoria-bd', name: 'Bases de Datos', type: 'folder', category: 'teoria',
            children: [
              { id: 't-bd-1', name: 'Modelo Relacional', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-bd-2', name: 'Normalización', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-bd-3', name: 'SQL Avanzado', type: 'file', fileType: 'doc', category: 'teoria' },
            ]}
        ]
      },
      {
        id: 'ciberseguridad', name: 'Ciberseguridad', type: 'folder', category: 'ciberseguridad',
        children: [
          { id: 'ciber-hardening', name: 'Hardening', type: 'folder', category: 'ciberseguridad',
            children: [
              { id: 'c-h-1', name: 'CIS Linux', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-h-2', name: 'CIS Windows', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-h-3', name: 'Bastionado', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-h-4', name: 'SSH Seguro', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
            ]},
          { id: 'ciber-incidentes', name: 'Respuesta Incidentes', type: 'folder', category: 'ciberseguridad',
            children: [
              { id: 'c-i-1', name: 'Playbook Ransomware', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-i-2', name: 'Análisis Malware', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-i-3', name: 'Forensia Digital', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'ciber-forense', name: 'Análisis Forense', type: 'folder', category: 'ciberseguridad',
                children: [
                  { id: 'c-f-1', name: 'Adquisición Evidencias', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                  { id: 'c-f-2', name: 'Cadena Custodia', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                  { id: 'c-f-3', name: 'Herramientas', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
                ]}
            ]},
          { id: 'ciber-pentest', name: 'Pentesting', type: 'folder', category: 'ciberseguridad',
            children: [
              { id: 'c-p-1', name: 'OWASP', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-p-2', name: 'Reconocimiento', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-p-3', name: 'Explotación Web', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-p-4', name: 'Post-Explotación', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
            ]},
          { id: 'ciber-normativas', name: 'Normativas', type: 'folder', category: 'ciberseguridad',
            children: [
              { id: 'c-n-1', name: 'ENS', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-n-2', name: 'ISO 27001', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-n-3', name: 'GDPR LOPD', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
            ]}
        ]
      },
      {
        id: 'programacion', name: 'Programación', type: 'folder', category: 'programacion',
        children: [
          { id: 'prog-python', name: 'Python', type: 'folder', category: 'programacion',
            children: [
              { id: 'p-py-1', name: 'Fundamentos', type: 'file', fileType: 'doc', category: 'programacion' },
              { id: 'p-py-2', name: 'Automatización', type: 'file', fileType: 'code', category: 'programacion' },
              { id: 'p-py-3', name: 'APIs Requests', type: 'file', fileType: 'doc', category: 'programacion' },
              { id: 'p-py-4', name: 'Web Scraping', type: 'file', fileType: 'code', category: 'programacion' },
            ]},
          { id: 'prog-bash', name: 'Bash Scripting', type: 'folder', category: 'programacion',
            children: [
              { id: 'p-b-1', name: 'Comandos', type: 'file', fileType: 'doc', category: 'programacion' },
              { id: 'p-b-2', name: 'Scripts Backup', type: 'file', fileType: 'code', category: 'programacion' },
              { id: 'p-b-3', name: 'Cron Jobs', type: 'file', fileType: 'doc', category: 'programacion' },
            ]},
          { id: 'prog-sql', name: 'SQL', type: 'folder', category: 'programacion',
            children: [
              { id: 'p-sql-1', name: 'Queries', type: 'file', fileType: 'code', category: 'programacion' },
              { id: 'p-sql-2', name: 'Procedimientos', type: 'file', fileType: 'doc', category: 'programacion' },
            ]},
          { id: 'prog-web', name: 'Desarrollo Web', type: 'folder', category: 'programacion',
            children: [
              { id: 'p-w-1', name: 'HTML CSS', type: 'file', fileType: 'doc', category: 'programacion' },
              { id: 'p-w-2', name: 'JavaScript', type: 'file', fileType: 'doc', category: 'programacion' },
            ]}
        ]
      },
      {
        id: 'sistemas', name: 'Administración Sistemas', type: 'folder', category: 'sistemas',
        children: [
          { id: 'sys-linux', name: 'Linux', type: 'folder', category: 'sistemas',
            children: [
              { id: 's-l-1', name: 'RHEL Debian', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-l-2', name: 'Systemd', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-l-3', name: 'LVM RAID', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-l-4', name: 'SELinux', type: 'file', fileType: 'doc', category: 'sistemas' },
            ]},
          { id: 'sys-windows', name: 'Windows Server', type: 'folder', category: 'sistemas',
            children: [
              { id: 's-w-1', name: 'Active Directory', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-w-2', name: 'GPOs', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-w-3', name: 'PowerShell', type: 'file', fileType: 'code', category: 'sistemas' },
            ]},
          { id: 'sys-cloud', name: 'Cloud', type: 'folder', category: 'sistemas',
            children: [
              { id: 's-c-1', name: 'AWS', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-c-2', name: 'Docker', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-c-3', name: 'Kubernetes', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-c-4', name: 'Terraform', type: 'file', fileType: 'doc', category: 'sistemas' },
            ]},
          { id: 'sys-monitoring', name: 'Monitorización', type: 'folder', category: 'sistemas',
            children: [
              { id: 's-m-1', name: 'Zabbix Nagios', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-m-2', name: 'ELK Stack', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-m-3', name: 'Grafana', type: 'file', fileType: 'doc', category: 'sistemas' },
            ]}
        ]
      },
      {
        id: 'fundamentos', name: 'Fundamentos', type: 'folder', category: 'fundamentos',
        children: [
          { id: 'fund-hardware', name: 'Hardware', type: 'folder', category: 'fundamentos',
            children: [
              { id: 'f-h-1', name: 'Arquitectura', type: 'file', fileType: 'doc', category: 'fundamentos' },
              { id: 'f-h-2', name: 'Componentes', type: 'file', fileType: 'doc', category: 'fundamentos' },
            ]},
          { id: 'fund-software', name: 'Software', type: 'folder', category: 'fundamentos',
            children: [
              { id: 'f-s-1', name: 'Ciclo Vida', type: 'file', fileType: 'doc', category: 'fundamentos' },
              { id: 'f-s-2', name: 'Metodologías', type: 'file', fileType: 'doc', category: 'fundamentos' },
            ]},
          { id: 'f-algo', name: 'Algoritmos', type: 'file', fileType: 'doc', category: 'fundamentos' },
          { id: 'f-logica', name: 'Lógica', type: 'file', fileType: 'doc', category: 'fundamentos' },
        ]
      },
      {
        id: 'proyectos', name: 'Proyectos', type: 'folder', category: 'proyectos',
        children: [
          { id: 'proy-personal', name: 'Personales', type: 'folder', category: 'proyectos',
            children: [
              { id: 'pp-1', name: 'Homelab', type: 'file', fileType: 'doc', category: 'proyectos' },
              { id: 'pp-2', name: 'Portfolio', type: 'file', fileType: 'doc', category: 'proyectos' },
              { id: 'pp-3', name: 'Scripts Auto', type: 'file', fileType: 'code', category: 'proyectos' },
            ]},
          { id: 'proy-academico', name: 'Académicos', type: 'folder', category: 'proyectos',
            children: [
              { id: 'pa-1', name: 'TFM Ciber', type: 'file', fileType: 'pdf', category: 'proyectos' },
              { id: 'pa-2', name: 'Proyecto ASIR', type: 'file', fileType: 'pdf', category: 'proyectos' },
            ]}
        ]
      },
      {
        id: 'laboratorio', name: 'Laboratorio', type: 'folder', category: 'laboratorio',
        children: [
          { id: 'lab-ctf', name: 'CTF Retos', type: 'folder', category: 'laboratorio',
            children: [
              { id: 'l-c-1', name: 'HackTheBox', type: 'file', fileType: 'doc', category: 'laboratorio' },
              { id: 'l-c-2', name: 'TryHackMe', type: 'file', fileType: 'doc', category: 'laboratorio' },
              { id: 'l-c-3', name: 'VulnHub', type: 'file', fileType: 'doc', category: 'laboratorio' },
            ]},
          { id: 'lab-sandbox', name: 'Sandbox', type: 'folder', category: 'laboratorio',
            children: [
              { id: 'l-s-1', name: 'AD Vulnerable', type: 'file', fileType: 'doc', category: 'laboratorio' },
              { id: 'l-s-2', name: 'DVWA', type: 'file', fileType: 'doc', category: 'laboratorio' },
              { id: 'l-s-3', name: 'Metasploitable', type: 'file', fileType: 'doc', category: 'laboratorio' },
            ]},
          { id: 'l-tools', name: 'Herramientas', type: 'file', fileType: 'doc', category: 'laboratorio' },
        ]
      }
    ]
  };

  // ===== ESTADO =====
  let currentPath = ['root'];
  let searchQuery = '';
  let allItems = [];
  let currentView = 'explorer';
  
  // Estado del mapa
  let mapNodes = [];
  let camera = { x: 0, y: 0, zoom: 1 };
  let focusedNodeId = 'root';
  let canvas, ctx, minimapCanvas, minimapCtx;
  let animationId;
  const WORLD_SIZE = 4000;
  const WORLD_CENTER = WORLD_SIZE / 2;

  // ===== ELEMENTOS DOM =====
  const searchInput = document.getElementById('vaultSearch');
  const breadcrumbContainer = document.getElementById('vaultBreadcrumb');
  const contentContainer = document.getElementById('vaultContent');
  const treeContainer = document.getElementById('vaultTree');
  const statsTotal = document.getElementById('statTotal');
  const statsFolders = document.getElementById('statFolders');
  const statsFiles = document.getElementById('statFiles');
  const explorerView = document.getElementById('explorerView');
  const networkView = document.getElementById('networkView');
  const btnExplorer = document.getElementById('btnExplorer');
  const btnNetwork = document.getElementById('btnNetwork');

  // ===== UTILIDADES =====
  function flattenData(node, path = []) {
    const items = [];
    const currentPathArray = [...path, node.id];
    if (node.id !== 'root') {
      items.push({ ...node, path: currentPathArray, pathNames: getPathNames(currentPathArray) });
    }
    if (node.children) {
      node.children.forEach(child => items.push(...flattenData(child, currentPathArray)));
    }
    return items;
  }

  function getPathNames(pathArray) {
    const names = [];
    let current = vaultData;
    for (let i = 1; i < pathArray.length; i++) {
      const found = findNodeById(current, pathArray[i]);
      if (found) { names.push(found.name); current = found; }
    }
    return names;
  }

  function findNodeById(node, id) {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeById(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  function getCurrentNode() {
    let node = vaultData;
    for (let i = 1; i < currentPath.length; i++) {
      const child = node.children?.find(c => c.id === currentPath[i]);
      if (child) node = child;
    }
    return node;
  }

  function countItems(node) {
    let folders = 0, files = 0;
    function count(n) {
      if (n.type === 'folder') { folders++; n.children?.forEach(count); }
      else { files++; }
    }
    if (node.children) node.children.forEach(count);
    return { folders, files, total: folders + files };
  }

  function getIcon(item) {
    if (item.type === 'folder') return 'fa-solid fa-folder';
    switch (item.fileType) {
      case 'pdf': return 'fa-solid fa-file-pdf';
      case 'doc': return 'fa-solid fa-file-lines';
      case 'code': return 'fa-solid fa-file-code';
      default: return 'fa-solid fa-file';
    }
  }

  function getTypeName(item) {
    if (item.type === 'folder') return 'Carpeta';
    switch (item.fileType) {
      case 'pdf': return 'PDF';
      case 'doc': return 'Documento';
      case 'code': return 'Código';
      default: return 'Archivo';
    }
  }

  function getCategoryIcon(cat) {
    const icons = { teoria: 'fa-solid fa-book', ciberseguridad: 'fa-solid fa-shield-halved', programacion: 'fa-solid fa-code', sistemas: 'fa-solid fa-server', fundamentos: 'fa-solid fa-microchip', proyectos: 'fa-solid fa-rocket', laboratorio: 'fa-solid fa-flask' };
    return icons[cat] || 'fa-solid fa-folder';
  }

  // ===== RENDER EXPLORER =====
  function renderStats() {
    const counts = countItems(vaultData);
    if (statsTotal) statsTotal.textContent = counts.total;
    if (statsFolders) statsFolders.textContent = counts.folders;
    if (statsFiles) statsFiles.textContent = counts.files;
  }

  function renderBreadcrumb() {
    if (!breadcrumbContainer) return;
    let html = `<div class="breadcrumb-item" data-path="root"><i class="fa-solid fa-house breadcrumb-home"></i><span>Inicio</span></div>`;
    let pathSoFar = ['root'];
    for (let i = 1; i < currentPath.length; i++) {
      pathSoFar.push(currentPath[i]);
      const node = findNodeById(vaultData, currentPath[i]);
      const isLast = i === currentPath.length - 1;
      html += `<i class="fa-solid fa-chevron-right breadcrumb-separator"></i><div class="breadcrumb-item ${isLast ? 'current' : ''}" data-path="${pathSoFar.join(',')}">${node?.name || currentPath[i]}</div>`;
    }
    breadcrumbContainer.innerHTML = html;
    breadcrumbContainer.querySelectorAll('.breadcrumb-item:not(.current)').forEach(item => {
      item.addEventListener('click', () => navigateTo(item.dataset.path.split(',')));
    });
  }

  function renderContent() {
    if (!contentContainer) return;
    const node = getCurrentNode();
    const items = node.children || [];
    if (items.length === 0) {
      contentContainer.innerHTML = `<div class="vault-empty"><i class="fa-solid fa-folder-open"></i><div class="vault-empty-title">Carpeta vacía</div></div>`;
      return;
    }
    let html = '<div class="content-grid">';
    if (currentPath.length > 1) {
      html += `<div class="vault-card back-card" data-action="back"><div class="card-icon"><i class="fa-solid fa-arrow-left"></i></div><div class="card-title">Volver</div><div class="card-meta"><span class="card-type">Anterior</span></div></div>`;
    }
    items.forEach(item => {
      const icon = getIcon(item);
      const isFolder = item.type === 'folder';
      const childCount = isFolder ? (item.children?.length || 0) : null;
      html += `<div class="vault-card ${isFolder ? 'is-folder' : 'is-file'}" data-id="${item.id}" data-category="${item.category || ''}"><div class="card-icon"><i class="${icon}"></i></div><div class="card-title">${item.name}</div><div class="card-meta"><span class="card-type"><i class="${icon}"></i>${getTypeName(item)}</span>${childCount !== null ? `<span class="card-count">${childCount}</span>` : ''}</div></div>`;
    });
    html += '</div>';
    contentContainer.innerHTML = html;
    contentContainer.querySelectorAll('.vault-card').forEach(card => {
      card.addEventListener('click', () => {
        if (card.dataset.action === 'back') goBack();
        else {
          const item = findNodeById(vaultData, card.dataset.id);
          if (item?.type === 'folder') navigateTo([...currentPath, card.dataset.id]);
        }
      });
    });
  }

  function renderSearchResults(results) {
    if (!contentContainer) return;
    let html = `<div class="search-results-header"><span class="search-results-count"><strong>${results.length}</strong> resultados</span><button class="search-clear" id="clearSearch"><i class="fa-solid fa-times"></i> Limpiar</button></div>`;
    if (results.length === 0) {
      html += `<div class="vault-empty"><i class="fa-solid fa-search"></i><div class="vault-empty-title">Sin resultados</div></div>`;
    } else {
      html += '<div class="content-grid" style="padding:20px;">';
      results.forEach(item => {
        const icon = getIcon(item);
        const highlighted = item.name.replace(new RegExp(`(${searchQuery})`, 'gi'), '<span class="highlight">$1</span>');
        html += `<div class="vault-card ${item.type === 'folder' ? 'is-folder' : 'is-file'}" data-id="${item.id}" data-path="${item.path.join(',')}" data-category="${item.category || ''}"><div class="card-icon"><i class="${icon}"></i></div><div class="card-title">${highlighted}</div><div class="card-path"><i class="fa-solid fa-folder"></i>${item.pathNames.slice(0, -1).join(' > ') || 'Inicio'}</div></div>`;
      });
      html += '</div>';
    }
    contentContainer.innerHTML = html;
    document.getElementById('clearSearch')?.addEventListener('click', clearSearch);
    contentContainer.querySelectorAll('.vault-card').forEach(card => {
      card.addEventListener('click', () => {
        const path = card.dataset.path?.split(',');
        if (path) {
          const item = findNodeById(vaultData, card.dataset.id);
          navigateTo(item?.type === 'folder' ? path : path.slice(0, -1));
          clearSearch();
        }
      });
    });
  }

  function renderTree() {
    if (!treeContainer) return;
    function renderNode(node) {
      const hasChildren = node.children?.some(c => c.type === 'folder');
      const isInPath = currentPath.includes(node.id);
      const isActive = currentPath[currentPath.length - 1] === node.id;
      const childCount = node.children?.length || 0;
      let html = `<li class="tree-item ${hasChildren ? 'has-children' : ''} ${isInPath ? 'expanded' : ''}" data-id="${node.id}" data-category="${node.category || ''}"><div class="tree-item-header ${isActive ? 'active' : ''}"><span class="tree-toggle"><i class="fa-solid fa-chevron-right"></i></span><span class="tree-icon"><i class="${getIcon(node)}"></i></span><span class="tree-label">${node.name}</span>${childCount > 0 ? `<span class="tree-count">${childCount}</span>` : ''}</div>`;
      if (hasChildren) {
        html += '<ul class="tree-children">';
        node.children.filter(c => c.type === 'folder').forEach(child => html += renderNode(child));
        html += '</ul>';
      }
      return html + '</li>';
    }
    let html = '<ul class="tree-root">';
    vaultData.children.forEach(child => html += renderNode(child));
    html += '</ul>';
    treeContainer.innerHTML = html;
    treeContainer.querySelectorAll('.tree-item-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.tree-item');
        if (item.classList.contains('has-children')) item.classList.toggle('expanded');
        navigateTo(buildPathToNode(item.dataset.id));
      });
    });
  }

  function buildPathToNode(targetId) {
    function search(node, path) {
      if (node.id === targetId) return [...path, node.id];
      if (node.children) {
        for (const child of node.children) {
          const result = search(child, [...path, node.id]);
          if (result) return result;
        }
      }
      return null;
    }
    return search(vaultData, []) || ['root'];
  }

  function navigateTo(path) { currentPath = path; searchQuery = ''; if (searchInput) searchInput.value = ''; render(); }
  function goBack() { if (currentPath.length > 1) { currentPath = currentPath.slice(0, -1); render(); } }
  function search(query) { searchQuery = query.toLowerCase().trim(); if (!searchQuery) { render(); return; } renderSearchResults(allItems.filter(item => item.name.toLowerCase().includes(searchQuery))); }
  function clearSearch() { searchQuery = ''; if (searchInput) searchInput.value = ''; render(); }
  function render() { renderBreadcrumb(); renderContent(); renderTree(); }

  // ============================================
  // MAPA INMERSIVO CON CÁMARA
  // ============================================

  function initMap() {
    canvas = document.getElementById('networkCanvas');
    minimapCanvas = document.getElementById('minimapCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    if (minimapCanvas) minimapCtx = minimapCanvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', () => { resizeCanvas(); if (currentView === 'network') { buildMap(); renderMap(); } });
    
    buildMap();
    renderMap();
    focusOn('root', false);
    animate();
  }

  function resizeCanvas() {
    const container = document.getElementById('networkContainer');
    if (!container || !canvas) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    if (minimapCanvas) { minimapCanvas.width = 160; minimapCanvas.height = 160; }
  }

  function buildMap() {
    mapNodes = [];
    const angles = {};
    
    // Root
    mapNodes.push({ id: 'root', x: WORLD_CENTER, y: WORLD_CENTER, level: 0, data: vaultData, parent: null });
    
    // Nivel 1 - Categorías
    const cats = vaultData.children;
    const angleStep1 = (Math.PI * 2) / cats.length;
    const radius1 = 350;
    
    cats.forEach((cat, i) => {
      const angle = angleStep1 * i - Math.PI / 2;
      angles[cat.id] = angle;
      mapNodes.push({
        id: cat.id,
        x: WORLD_CENTER + Math.cos(angle) * radius1,
        y: WORLD_CENTER + Math.sin(angle) * radius1,
        level: 1,
        data: cat,
        parent: 'root',
        category: cat.category
      });
      
      // Nivel 2 - Subcategorías
      if (cat.children) {
        const subs = cat.children.filter(c => c.type === 'folder');
        const files = cat.children.filter(c => c.type === 'file');
        const radius2 = 200;
        const spreadAngle = Math.PI * 0.6;
        const startAngle = angle - spreadAngle / 2;
        
        subs.forEach((sub, j) => {
          const subAngle = subs.length > 1 ? startAngle + (spreadAngle / (subs.length - 1)) * j : angle;
          angles[sub.id] = subAngle;
          mapNodes.push({
            id: sub.id,
            x: WORLD_CENTER + Math.cos(angle) * radius1 + Math.cos(subAngle) * radius2,
            y: WORLD_CENTER + Math.sin(angle) * radius1 + Math.sin(subAngle) * radius2,
            level: 2,
            data: sub,
            parent: cat.id,
            category: cat.category
          });
          
          // Nivel 3
          if (sub.children) {
            const level3 = sub.children.filter(c => c.type === 'folder');
            const level3Files = sub.children.filter(c => c.type === 'file');
            const radius3 = 120;
            const spread3 = Math.PI * 0.5;
            const start3 = subAngle - spread3 / 2;
            
            level3.forEach((l3, k) => {
              const l3Angle = level3.length > 1 ? start3 + (spread3 / (level3.length - 1)) * k : subAngle;
              const parentNode = mapNodes.find(n => n.id === sub.id);
              mapNodes.push({
                id: l3.id,
                x: parentNode.x + Math.cos(l3Angle) * radius3,
                y: parentNode.y + Math.sin(l3Angle) * radius3,
                level: 3,
                data: l3,
                parent: sub.id,
                category: cat.category
              });
            });
            
            // Archivos nivel 3
            const fileRadius3 = 80;
            level3Files.forEach((file, k) => {
              const fAngle = subAngle + (k - level3Files.length / 2) * 0.3;
              const parentNode = mapNodes.find(n => n.id === sub.id);
              mapNodes.push({
                id: file.id,
                x: parentNode.x + Math.cos(fAngle) * fileRadius3,
                y: parentNode.y + Math.sin(fAngle) * fileRadius3,
                level: 3,
                data: file,
                parent: sub.id,
                category: cat.category,
                isFile: true
              });
            });
          }
        });
        
        // Archivos directos de categoría
        const fileRadius = 150;
        files.forEach((file, k) => {
          const fAngle = angle + Math.PI + (k - files.length / 2) * 0.25;
          mapNodes.push({
            id: file.id,
            x: WORLD_CENTER + Math.cos(angle) * radius1 + Math.cos(fAngle) * fileRadius,
            y: WORLD_CENTER + Math.sin(angle) * radius1 + Math.sin(fAngle) * fileRadius,
            level: 2,
            data: file,
            parent: cat.id,
            category: cat.category,
            isFile: true
          });
        });
      }
    });
  }

  function renderMap() {
    const world = document.getElementById('networkWorld');
    if (!world) return;
    
    let html = '';
    mapNodes.forEach((node, idx) => {
      const data = node.data;
      const icon = node.level === 0 ? 'fa-solid fa-brain' : (node.isFile ? getIcon(data) : getCategoryIcon(node.category));
      const counts = node.data.type === 'folder' ? countItems(node.data) : null;
      
      let nodeClass = 'map-node';
      if (node.level === 0) nodeClass += ' node-root';
      else if (node.isFile) nodeClass += ' node-file';
      else nodeClass += ` node-level-${node.level}`;
      
      let label = data.name;
      if (node.level >= 2 && label.length > 12) label = label.substring(0, 11) + '…';
      
      html += `<div class="${nodeClass}" data-id="${node.id}" data-category="${node.category || ''}" data-level="${node.level}" style="left:${node.x}px;top:${node.y}px;">`;
      html += `<i class="node-icon ${icon}"></i>`;
      if (!node.isFile || node.level < 3) {
        html += `<span class="node-label">${label}</span>`;
      }
      if (node.level === 0) {
        html += `<span class="node-sublabel">Vault</span>`;
      } else if (counts && node.level <= 2) {
        html += `<span class="node-count">${counts.total} items</span>`;
      }
      html += '</div>';
    });
    
    world.innerHTML = html;
    
    // Event listeners
    world.querySelectorAll('.map-node').forEach(el => {
      el.addEventListener('click', handleNodeClick);
      el.addEventListener('mouseenter', handleNodeHover);
      el.addEventListener('mouseleave', hideTooltip);
    });
    
    updateNodeVisibility();
  }

  function handleNodeClick(e) {
    const el = e.currentTarget;
    const nodeId = el.dataset.id;
    const node = mapNodes.find(n => n.id === nodeId);
    if (!node) return;
    
    if (node.data.type === 'folder' && node.data.children?.length > 0) {
      focusOn(nodeId);
    }
  }

  function focusOn(nodeId, animate = true) {
    focusedNodeId = nodeId;
    const node = mapNodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Calcular zoom según nivel
    let zoom = 1;
    if (node.level === 0) zoom = 1;
    else if (node.level === 1) zoom = 1.8;
    else if (node.level === 2) zoom = 2.5;
    else zoom = 3;
    
    camera.x = node.x;
    camera.y = node.y;
    camera.zoom = zoom;
    
    updateCamera(animate);
    updateNodeVisibility();
    updateMapBreadcrumb();
    updateBackButton();
  }

  function updateCamera(animate = true) {
    const world = document.getElementById('networkWorld');
    const container = document.getElementById('networkContainer');
    if (!world || !container) return;
    
    const offsetX = container.offsetWidth / 2;
    const offsetY = container.offsetHeight / 2;
    
    const tx = -camera.x * camera.zoom + offsetX;
    const ty = -camera.y * camera.zoom + offsetY;
    
    world.style.transition = animate ? 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
    world.style.transform = `translate(${tx}px, ${ty}px) scale(${camera.zoom})`;
    
    updateMinimap();
  }

  function updateNodeVisibility() {
    const focusedNode = mapNodes.find(n => n.id === focusedNodeId);
    if (!focusedNode) return;
    
    // Obtener path al nodo enfocado
    const focusPath = [];
    let current = focusedNode;
    while (current) {
      focusPath.unshift(current.id);
      current = mapNodes.find(n => n.id === current.parent);
    }
    
    document.querySelectorAll('.map-node').forEach(el => {
      const nodeId = el.dataset.id;
      const node = mapNodes.find(n => n.id === nodeId);
      if (!node) return;
      
      el.classList.remove('focused', 'dimmed', 'semi-visible', 'hidden');
      
      // Nodo enfocado
      if (nodeId === focusedNodeId) {
        el.classList.add('focused');
        return;
      }
      
      // Está en el path hacia el nodo enfocado (ancestros)
      if (focusPath.includes(nodeId)) {
        el.classList.add('semi-visible');
        return;
      }
      
      // Es hijo directo del nodo enfocado
      if (node.parent === focusedNodeId) {
        return; // Visible normal
      }
      
      // Es nieto (hijo de hijo)
      const parent = mapNodes.find(n => n.id === node.parent);
      if (parent && parent.parent === focusedNodeId) {
        el.classList.add('semi-visible');
        return;
      }
      
      // Está muy lejos
      const distance = Math.sqrt(Math.pow(node.x - focusedNode.x, 2) + Math.pow(node.y - focusedNode.y, 2));
      const maxVisible = 600 / camera.zoom;
      
      if (distance > maxVisible * 1.5) {
        el.classList.add('hidden');
      } else if (distance > maxVisible) {
        el.classList.add('dimmed');
      } else {
        el.classList.add('semi-visible');
      }
    });
  }

  function updateMapBreadcrumb() {
    const breadcrumb = document.getElementById('mapBreadcrumb');
    if (!breadcrumb) return;
    
    const path = [];
    let current = mapNodes.find(n => n.id === focusedNodeId);
    while (current) {
      path.unshift(current);
      current = mapNodes.find(n => n.id === current.parent);
    }
    
    let html = '';
    path.forEach((node, i) => {
      const isLast = i === path.length - 1;
      if (i > 0) html += '<span class="map-crumb-sep"><i class="fa-solid fa-chevron-right"></i></span>';
      html += `<span class="map-crumb ${isLast ? 'current' : ''}" data-id="${node.id}">${node.level === 0 ? 'Inicio' : node.data.name}</span>`;
    });
    
    breadcrumb.innerHTML = html;
    
    breadcrumb.querySelectorAll('.map-crumb:not(.current)').forEach(el => {
      el.addEventListener('click', () => focusOn(el.dataset.id));
    });
  }

  function updateBackButton() {
    const btn = document.getElementById('mapBackBtn');
    if (!btn) return;
    
    const focusedNode = mapNodes.find(n => n.id === focusedNodeId);
    btn.disabled = !focusedNode || focusedNode.level === 0;
  }

  function goBackMap() {
    const focusedNode = mapNodes.find(n => n.id === focusedNodeId);
    if (focusedNode && focusedNode.parent) {
      focusOn(focusedNode.parent);
    }
  }

  function handleNodeHover(e) {
    const el = e.currentTarget;
    const node = mapNodes.find(n => n.id === el.dataset.id);
    if (!node) return;
    
    const tooltip = document.getElementById('mapTooltip');
    if (!tooltip) return;
    
    const counts = node.data.type === 'folder' ? countItems(node.data) : null;
    const icon = node.level === 0 ? 'fa-solid fa-brain' : (node.isFile ? getIcon(node.data) : getCategoryIcon(node.category));
    
    tooltip.innerHTML = `
      <div class="tooltip-header">
        <i class="tooltip-icon ${icon}" style="color: var(--cat-${node.category || 'teoria'}, var(--vault-accent))"></i>
        <span class="tooltip-title">${node.data.name}</span>
      </div>
      <div class="tooltip-type">${node.level === 0 ? 'Base de Conocimiento' : (node.isFile ? getTypeName(node.data) : 'Categoría Nivel ' + node.level)}</div>
      ${counts ? `<div class="tooltip-stats"><span><i class="fa-solid fa-folder"></i>${counts.folders} carpetas</span><span><i class="fa-solid fa-file"></i>${counts.files} archivos</span></div>` : ''}
      ${node.data.type === 'folder' && node.data.children?.length ? '<div class="tooltip-hint">Click para explorar</div>' : ''}
    `;
    
    tooltip.dataset.category = node.category || '';
    
    const rect = el.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = (rect.top - 10) + 'px';
    tooltip.style.transform = 'translate(-50%, -100%)';
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    const tooltip = document.getElementById('mapTooltip');
    if (tooltip) tooltip.classList.remove('visible');
  }

  function updateMinimap() {
    if (!minimapCtx || !minimapCanvas) return;
    
    const scale = 150 / WORLD_SIZE;
    minimapCtx.clearRect(0, 0, 160, 160);
    
    // Fondo
    minimapCtx.fillStyle = 'rgba(0,0,0,0.3)';
    minimapCtx.fillRect(0, 0, 160, 160);
    
    // Conexiones
    minimapCtx.strokeStyle = 'rgba(255, 159, 26, 0.2)';
    minimapCtx.lineWidth = 0.5;
    mapNodes.forEach(node => {
      if (node.parent) {
        const parent = mapNodes.find(n => n.id === node.parent);
        if (parent) {
          minimapCtx.beginPath();
          minimapCtx.moveTo(parent.x * scale + 5, parent.y * scale + 5);
          minimapCtx.lineTo(node.x * scale + 5, node.y * scale + 5);
          minimapCtx.stroke();
        }
      }
    });
    
    // Nodos
    mapNodes.forEach(node => {
      const colors = { teoria: '#8b5cf6', ciberseguridad: '#ef4444', programacion: '#22c55e', sistemas: '#3b82f6', fundamentos: '#f59e0b', proyectos: '#ec4899', laboratorio: '#06b6d4' };
      minimapCtx.fillStyle = node.level === 0 ? '#ff9f1a' : (colors[node.category] || '#666');
      minimapCtx.beginPath();
      minimapCtx.arc(node.x * scale + 5, node.y * scale + 5, node.level === 0 ? 4 : (node.isFile ? 1 : 2), 0, Math.PI * 2);
      minimapCtx.fill();
    });
    
    // Viewport
    const container = document.getElementById('networkContainer');
    if (!container) return;
    const viewW = (container.offsetWidth / camera.zoom) * scale;
    const viewH = (container.offsetHeight / camera.zoom) * scale;
    const viewX = (camera.x - container.offsetWidth / 2 / camera.zoom) * scale + 5;
    const viewY = (camera.y - container.offsetHeight / 2 / camera.zoom) * scale + 5;
    
    const viewport = document.querySelector('.minimap-viewport');
    if (viewport) {
      viewport.style.left = Math.max(0, viewX) + 'px';
      viewport.style.top = Math.max(0, viewY) + 'px';
      viewport.style.width = Math.min(150, viewW) + 'px';
      viewport.style.height = Math.min(150, viewH) + 'px';
    }
  }

  function animate() {
    if (currentView !== 'network' || !canvas || !ctx) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const container = document.getElementById('networkContainer');
    if (!container) { animationId = requestAnimationFrame(animate); return; }
    
    const offsetX = container.offsetWidth / 2;
    const offsetY = container.offsetHeight / 2;
    
    // Dibujar conexiones
    ctx.lineCap = 'round';
    
    mapNodes.forEach(node => {
      if (!node.parent) return;
      const parent = mapNodes.find(n => n.id === node.parent);
      if (!parent) return;
      
      // Transformar coordenadas
      const x1 = (parent.x - camera.x) * camera.zoom + offsetX;
      const y1 = (parent.y - camera.y) * camera.zoom + offsetY;
      const x2 = (node.x - camera.x) * camera.zoom + offsetX;
      const y2 = (node.y - camera.y) * camera.zoom + offsetY;
      
      // Saltar si está fuera de pantalla
      if (x1 < -100 && x2 < -100) return;
      if (x1 > canvas.width + 100 && x2 > canvas.width + 100) return;
      if (y1 < -100 && y2 < -100) return;
      if (y1 > canvas.height + 100 && y2 > canvas.height + 100) return;
      
      const colors = { teoria: '#8b5cf6', ciberseguridad: '#ef4444', programacion: '#22c55e', sistemas: '#3b82f6', fundamentos: '#f59e0b', proyectos: '#ec4899', laboratorio: '#06b6d4' };
      const color = colors[node.category] || '#ff9f1a';
      
      // Opacidad basada en si está en foco
      const focusedNode = mapNodes.find(n => n.id === focusedNodeId);
      const distance = focusedNode ? Math.sqrt(Math.pow(node.x - focusedNode.x, 2) + Math.pow(node.y - focusedNode.y, 2)) : 0;
      const maxDist = 600 / camera.zoom;
      let opacity = distance > maxDist ? 0.1 : (1 - distance / maxDist) * 0.5 + 0.2;
      
      // Línea principal
      ctx.strokeStyle = color + Math.round(opacity * 255).toString(16).padStart(2, '0');
      ctx.lineWidth = node.isFile ? 1 : 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      // Glow
      if (opacity > 0.3) {
        ctx.strokeStyle = color + '15';
        ctx.lineWidth = 6;
        ctx.stroke();
      }
    });
    
    // Partículas en líneas activas
    const time = Date.now() * 0.001;
    const focusedNode = mapNodes.find(n => n.id === focusedNodeId);
    if (focusedNode) {
      mapNodes.filter(n => n.parent === focusedNodeId).forEach((node, i) => {
        const parent = mapNodes.find(n => n.id === node.parent);
        if (!parent) return;
        
        const progress = (time * 0.4 + i * 0.15) % 1;
        const x1 = (parent.x - camera.x) * camera.zoom + offsetX;
        const y1 = (parent.y - camera.y) * camera.zoom + offsetY;
        const x2 = (node.x - camera.x) * camera.zoom + offsetX;
        const y2 = (node.y - camera.y) * camera.zoom + offsetY;
        
        const px = x1 + (x2 - x1) * progress;
        const py = y1 + (y2 - y1) * progress;
        
        const colors = { teoria: '#8b5cf6', ciberseguridad: '#ef4444', programacion: '#22c55e', sistemas: '#3b82f6', fundamentos: '#f59e0b', proyectos: '#ec4899', laboratorio: '#06b6d4' };
        ctx.fillStyle = colors[node.category] || '#ff9f1a';
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    animationId = requestAnimationFrame(animate);
  }

  // ===== VIEW TOGGLE =====
  function switchView(view) {
    currentView = view;
    btnExplorer?.classList.toggle('active', view === 'explorer');
    btnNetwork?.classList.toggle('active', view === 'network');
    explorerView?.classList.toggle('active', view === 'explorer');
    networkView?.classList.toggle('active', view === 'network');
    
    if (view === 'network') {
      setTimeout(() => {
        resizeCanvas();
        buildMap();
        renderMap();
        focusOn('root', false);
        updateCamera(false);
      }, 50);
    }
  }

  // ===== INIT =====
  function init() {
    allItems = flattenData(vaultData);
    renderStats();
    render();
    
    let searchTimeout;
    searchInput?.addEventListener('input', e => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => search(e.target.value), 200);
    });
    
    btnExplorer?.addEventListener('click', () => switchView('explorer'));
    btnNetwork?.addEventListener('click', () => switchView('network'));
    
    // Back button del mapa
    document.getElementById('mapBackBtn')?.addEventListener('click', goBackMap);
    
    switchView('explorer');
  }

  init();
});
});
