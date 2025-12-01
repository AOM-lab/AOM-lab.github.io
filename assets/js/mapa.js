/* ===============================
   KNOWLEDGE VAULT — EXPLORADOR + MAPA VISUAL
   JavaScript para navegación, búsqueda y Network Graph
   =============================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== DATOS DEL VAULT =====
  const vaultData = {
    id: 'root',
    name: 'Knowledge Vault',
    type: 'folder',
    children: [
      {
        id: 'teoria',
        name: 'Teoría y Conceptos',
        type: 'folder',
        category: 'teoria',
        children: [
          {
            id: 'teoria-redes',
            name: 'Redes y Comunicaciones',
            type: 'folder',
            category: 'teoria',
            children: [
              { id: 't-r-1', name: 'Modelo OSI', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-r-2', name: 'Protocolos TCP/IP', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-r-3', name: 'Subnetting y VLSM', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-r-4', name: 'DNS y DHCP', type: 'file', fileType: 'doc', category: 'teoria' },
            ]
          },
          {
            id: 'teoria-so',
            name: 'Sistemas Operativos',
            type: 'folder',
            category: 'teoria',
            children: [
              { id: 't-so-1', name: 'Gestión de Procesos', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-so-2', name: 'Sistemas de Archivos', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-so-3', name: 'Memoria Virtual', type: 'file', fileType: 'doc', category: 'teoria' },
            ]
          },
          {
            id: 'teoria-bd',
            name: 'Bases de Datos',
            type: 'folder',
            category: 'teoria',
            children: [
              { id: 't-bd-1', name: 'Modelo Relacional', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-bd-2', name: 'Normalización', type: 'file', fileType: 'doc', category: 'teoria' },
              { id: 't-bd-3', name: 'SQL Avanzado', type: 'file', fileType: 'doc', category: 'teoria' },
            ]
          }
        ]
      },
      {
        id: 'ciberseguridad',
        name: 'Ciberseguridad',
        type: 'folder',
        category: 'ciberseguridad',
        children: [
          {
            id: 'ciber-hardening',
            name: 'Hardening de Sistemas',
            type: 'folder',
            category: 'ciberseguridad',
            children: [
              { id: 'c-h-1', name: 'CIS Benchmarks Linux', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-h-2', name: 'CIS Benchmarks Windows', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-h-3', name: 'Bastionado Servidores', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-h-4', name: 'Configuración SSH', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
            ]
          },
          {
            id: 'ciber-incidentes',
            name: 'Respuesta Incidentes',
            type: 'folder',
            category: 'ciberseguridad',
            children: [
              { id: 'c-i-1', name: 'Playbook Ransomware', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-i-2', name: 'Análisis de Malware', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-i-3', name: 'Forensia Digital', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
            ]
          },
          {
            id: 'ciber-pentest',
            name: 'Pentesting',
            type: 'folder',
            category: 'ciberseguridad',
            children: [
              { id: 'c-p-1', name: 'Metodología OWASP', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-p-2', name: 'Reconocimiento', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
              { id: 'c-p-3', name: 'Explotación Web', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
            ]
          },
          {
            id: 'ciber-normativas',
            name: 'Normativas',
            type: 'folder',
            category: 'ciberseguridad',
            children: [
              { id: 'c-n-1', name: 'ENS', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-n-2', name: 'ISO 27001', type: 'file', fileType: 'pdf', category: 'ciberseguridad' },
              { id: 'c-n-3', name: 'GDPR / LOPD', type: 'file', fileType: 'doc', category: 'ciberseguridad' },
            ]
          }
        ]
      },
      {
        id: 'programacion',
        name: 'Programación',
        type: 'folder',
        category: 'programacion',
        children: [
          {
            id: 'prog-python',
            name: 'Python',
            type: 'folder',
            category: 'programacion',
            children: [
              { id: 'p-py-1', name: 'Fundamentos', type: 'file', fileType: 'doc', category: 'programacion' },
              { id: 'p-py-2', name: 'Automatización', type: 'file', fileType: 'code', category: 'programacion' },
              { id: 'p-py-3', name: 'APIs y Requests', type: 'file', fileType: 'doc', category: 'programacion' },
            ]
          },
          {
            id: 'prog-bash',
            name: 'Bash Scripting',
            type: 'folder',
            category: 'programacion',
            children: [
              { id: 'p-b-1', name: 'Comandos', type: 'file', fileType: 'doc', category: 'programacion' },
              { id: 'p-b-2', name: 'Scripts Backup', type: 'file', fileType: 'code', category: 'programacion' },
              { id: 'p-b-3', name: 'Cron Jobs', type: 'file', fileType: 'doc', category: 'programacion' },
            ]
          },
          {
            id: 'prog-sql',
            name: 'SQL',
            type: 'folder',
            category: 'programacion',
            children: [
              { id: 'p-sql-1', name: 'Queries', type: 'file', fileType: 'code', category: 'programacion' },
              { id: 'p-sql-2', name: 'Procedimientos', type: 'file', fileType: 'doc', category: 'programacion' },
            ]
          }
        ]
      },
      {
        id: 'sistemas',
        name: 'Administración Sistemas',
        type: 'folder',
        category: 'sistemas',
        children: [
          {
            id: 'sys-linux',
            name: 'Linux',
            type: 'folder',
            category: 'sistemas',
            children: [
              { id: 's-l-1', name: 'RHEL/Debian', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-l-2', name: 'Systemd', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-l-3', name: 'LVM y RAID', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-l-4', name: 'SELinux', type: 'file', fileType: 'doc', category: 'sistemas' },
            ]
          },
          {
            id: 'sys-windows',
            name: 'Windows Server',
            type: 'folder',
            category: 'sistemas',
            children: [
              { id: 's-w-1', name: 'Active Directory', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-w-2', name: 'GPOs', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-w-3', name: 'PowerShell', type: 'file', fileType: 'code', category: 'sistemas' },
            ]
          },
          {
            id: 'sys-cloud',
            name: 'Cloud',
            type: 'folder',
            category: 'sistemas',
            children: [
              { id: 's-c-1', name: 'AWS', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-c-2', name: 'Docker', type: 'file', fileType: 'doc', category: 'sistemas' },
              { id: 's-c-3', name: 'Kubernetes', type: 'file', fileType: 'doc', category: 'sistemas' },
            ]
          }
        ]
      },
      {
        id: 'fundamentos',
        name: 'Fundamentos',
        type: 'folder',
        category: 'fundamentos',
        children: [
          {
            id: 'fund-hardware',
            name: 'Hardware',
            type: 'folder',
            category: 'fundamentos',
            children: [
              { id: 'f-h-1', name: 'Arquitectura', type: 'file', fileType: 'doc', category: 'fundamentos' },
              { id: 'f-h-2', name: 'Componentes', type: 'file', fileType: 'doc', category: 'fundamentos' },
            ]
          },
          {
            id: 'fund-software',
            name: 'Software',
            type: 'folder',
            category: 'fundamentos',
            children: [
              { id: 'f-s-1', name: 'Ciclo de Vida', type: 'file', fileType: 'doc', category: 'fundamentos' },
              { id: 'f-s-2', name: 'Metodologías', type: 'file', fileType: 'doc', category: 'fundamentos' },
            ]
          }
        ]
      },
      {
        id: 'proyectos',
        name: 'Proyectos',
        type: 'folder',
        category: 'proyectos',
        children: [
          {
            id: 'proy-personal',
            name: 'Personales',
            type: 'folder',
            category: 'proyectos',
            children: [
              { id: 'pp-1', name: 'Homelab', type: 'file', fileType: 'doc', category: 'proyectos' },
              { id: 'pp-2', name: 'Portfolio', type: 'file', fileType: 'doc', category: 'proyectos' },
              { id: 'pp-3', name: 'Scripts', type: 'file', fileType: 'code', category: 'proyectos' },
            ]
          },
          {
            id: 'proy-academico',
            name: 'Académicos',
            type: 'folder',
            category: 'proyectos',
            children: [
              { id: 'pa-1', name: 'TFM Ciberseguridad', type: 'file', fileType: 'pdf', category: 'proyectos' },
              { id: 'pa-2', name: 'Proyecto ASIR', type: 'file', fileType: 'pdf', category: 'proyectos' },
            ]
          }
        ]
      },
      {
        id: 'laboratorio',
        name: 'Laboratorio',
        type: 'folder',
        category: 'laboratorio',
        children: [
          {
            id: 'lab-ctf',
            name: 'CTF y Retos',
            type: 'folder',
            category: 'laboratorio',
            children: [
              { id: 'l-c-1', name: 'HackTheBox', type: 'file', fileType: 'doc', category: 'laboratorio' },
              { id: 'l-c-2', name: 'TryHackMe', type: 'file', fileType: 'doc', category: 'laboratorio' },
              { id: 'l-c-3', name: 'VulnHub', type: 'file', fileType: 'doc', category: 'laboratorio' },
            ]
          },
          {
            id: 'lab-sandbox',
            name: 'Sandbox',
            type: 'folder',
            category: 'laboratorio',
            children: [
              { id: 'l-s-1', name: 'AD Vulnerable', type: 'file', fileType: 'doc', category: 'laboratorio' },
              { id: 'l-s-2', name: 'DVWA', type: 'file', fileType: 'doc', category: 'laboratorio' },
            ]
          }
        ]
      }
    ]
  };

  // ===== ESTADO =====
  let currentPath = ['root'];
  let searchQuery = '';
  let allItems = [];
  let currentView = 'explorer'; // 'explorer' | 'network'
  let networkNodes = [];
  let canvas, ctx;
  let animationId;

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
    node.children?.forEach(count);
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

  // ===== RENDER STATS =====
  function renderStats() {
    const counts = countItems(vaultData);
    if (statsTotal) statsTotal.textContent = counts.total;
    if (statsFolders) statsFolders.textContent = counts.folders;
    if (statsFiles) statsFiles.textContent = counts.files;
  }

  // ===== RENDER BREADCRUMB =====
  function renderBreadcrumb() {
    if (!breadcrumbContainer) return;
    let html = `<div class="breadcrumb-item" data-path="root"><i class="fa-solid fa-house breadcrumb-home"></i><span>Inicio</span></div>`;
    let pathSoFar = ['root'];
    
    for (let i = 1; i < currentPath.length; i++) {
      pathSoFar.push(currentPath[i]);
      const node = findNodeById(vaultData, currentPath[i]);
      const isLast = i === currentPath.length - 1;
      html += `<i class="fa-solid fa-chevron-right breadcrumb-separator"></i>`;
      html += `<div class="breadcrumb-item ${isLast ? 'current' : ''}" data-path="${pathSoFar.join(',')}">${node?.name || currentPath[i]}</div>`;
    }
    
    breadcrumbContainer.innerHTML = html;
    breadcrumbContainer.querySelectorAll('.breadcrumb-item:not(.current)').forEach(item => {
      item.addEventListener('click', () => navigateTo(item.dataset.path.split(',')));
    });
  }

  // ===== RENDER CONTENT =====
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
      html += `<div class="vault-card back-card" data-action="back"><div class="card-icon"><i class="fa-solid fa-arrow-left"></i></div><div class="card-title">Volver atrás</div><div class="card-meta"><span class="card-type"><i class="fa-solid fa-level-up-alt"></i>Anterior</span></div></div>`;
    }
    
    items.forEach(item => {
      const icon = getIcon(item);
      const typeName = getTypeName(item);
      const isFolder = item.type === 'folder';
      const childCount = isFolder ? (item.children?.length || 0) : null;
      html += `<div class="vault-card ${isFolder ? 'is-folder' : 'is-file'}" data-id="${item.id}" data-category="${item.category || ''}"><div class="card-icon"><i class="${icon}"></i></div><div class="card-title">${item.name}</div><div class="card-meta"><span class="card-type"><i class="${icon}"></i>${typeName}</span>${childCount !== null ? `<span class="card-count">${childCount}</span>` : ''}</div></div>`;
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

  // ===== RENDER SEARCH =====
  function renderSearchResults(results) {
    if (!contentContainer) return;
    let html = `<div class="search-results-header"><span class="search-results-count"><strong>${results.length}</strong> resultado${results.length !== 1 ? 's' : ''}</span><button class="search-clear" id="clearSearch"><i class="fa-solid fa-times"></i> Limpiar</button></div>`;
    
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

  // ===== RENDER TREE =====
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
        const path = buildPathToNode(item.dataset.id);
        if (path) navigateTo(path);
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
    return search(vaultData, []);
  }

  // ===== NAVEGACIÓN =====
  function navigateTo(path) {
    currentPath = path;
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    render();
  }

  function goBack() {
    if (currentPath.length > 1) { currentPath = currentPath.slice(0, -1); render(); }
  }

  function search(query) {
    searchQuery = query.toLowerCase().trim();
    if (!searchQuery) { render(); return; }
    renderSearchResults(allItems.filter(item => item.name.toLowerCase().includes(searchQuery)));
  }

  function clearSearch() {
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    render();
  }

  function render() {
    renderBreadcrumb();
    renderContent();
    renderTree();
  }

  // ============================================
  // NETWORK GRAPH - SIMPLIFICADO Y LIMPIO
  // ============================================

  const categoryColors = {
    teoria: { hex: '#8b5cf6', rgb: '139, 92, 246' },
    ciberseguridad: { hex: '#ef4444', rgb: '239, 68, 68' },
    programacion: { hex: '#22c55e', rgb: '34, 197, 94' },
    sistemas: { hex: '#3b82f6', rgb: '59, 130, 246' },
    fundamentos: { hex: '#f59e0b', rgb: '245, 158, 11' },
    proyectos: { hex: '#ec4899', rgb: '236, 72, 153' },
    laboratorio: { hex: '#06b6d4', rgb: '6, 182, 212' }
  };

  let expandedCategory = null;

  function initNetwork() {
    const container = document.getElementById('networkContainer');
    if (!container) return;
    
    canvas = document.getElementById('networkCanvas');
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', () => {
      resizeCanvas();
      if (currentView === 'network') {
        createNetworkNodes();
        renderNetworkNodes();
      }
    });
    
    createNetworkNodes();
    renderNetworkNodes();
    animate();
  }

  function resizeCanvas() {
    const container = document.getElementById('networkContainer');
    if (!container || !canvas) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  function createNetworkNodes() {
    networkNodes = [];
    const container = document.getElementById('networkContainer');
    if (!container) return;
    
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    
    // Root node - más grande y centrado
    networkNodes.push({
      id: 'root',
      x: centerX,
      y: centerY,
      radius: 55,
      type: 'root',
      name: 'Knowledge Vault',
      data: vaultData,
      fixed: true
    });
    
    // Solo categorías principales - distribución circular perfecta
    const categories = vaultData.children;
    const angleStep = (Math.PI * 2) / categories.length;
    const catRadius = Math.min(container.offsetWidth, container.offsetHeight) * 0.32;
    
    categories.forEach((cat, i) => {
      // Empezar desde arriba (-90°) y distribuir uniformemente
      const angle = angleStep * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * catRadius;
      const y = centerY + Math.sin(angle) * catRadius;
      
      const counts = countItems(cat);
      
      networkNodes.push({
        id: cat.id,
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        angle: angle,
        radius: 42,
        type: 'category',
        name: cat.name,
        category: cat.category,
        parent: 'root',
        data: cat,
        childCount: counts.total,
        folderCount: counts.folders,
        fileCount: counts.files
      });
    });
  }

  function renderNetworkNodes() {
    const nodesContainer = document.getElementById('networkNodes');
    if (!nodesContainer) return;
    
    let html = '';
    
    networkNodes.forEach((node, index) => {
      const delay = index * 0.08;
      
      if (node.type === 'root') {
        html += `
          <div class="network-node node-root" data-id="${node.id}" 
               style="left:${node.x}px;top:${node.y}px;animation-delay:${delay}s">
            <i class="node-icon fa-solid fa-brain"></i>
            <span class="node-label">Knowledge</span>
            <span class="node-sublabel">Vault</span>
          </div>`;
      } else if (node.type === 'category') {
        const icon = getCategoryIcon(node.category);
        html += `
          <div class="network-node node-category" data-id="${node.id}" data-category="${node.category}"
               style="left:${node.x}px;top:${node.y}px;animation-delay:${delay}s">
            <i class="node-icon ${icon}"></i>
            <span class="node-label">${node.name}</span>
            <span class="node-count">${node.childCount} items</span>
          </div>`;
      }
    });
    
    // Panel de información
    html += `
      <div class="network-info-panel" id="networkInfoPanel">
        <div class="info-panel-header">
          <i class="info-panel-icon"></i>
          <span class="info-panel-title"></span>
        </div>
        <div class="info-panel-stats"></div>
        <div class="info-panel-items"></div>
      </div>`;
    
    nodesContainer.innerHTML = html;
    
    // Events para categorías
    nodesContainer.querySelectorAll('.node-category').forEach(el => {
      el.addEventListener('mouseenter', handleCategoryHover);
      el.addEventListener('mouseleave', handleCategoryLeave);
      el.addEventListener('click', handleCategoryClick);
    });
  }

  function getCategoryIcon(category) {
    const icons = {
      teoria: 'fa-solid fa-book',
      ciberseguridad: 'fa-solid fa-shield-halved',
      programacion: 'fa-solid fa-code',
      sistemas: 'fa-solid fa-server',
      fundamentos: 'fa-solid fa-microchip',
      proyectos: 'fa-solid fa-rocket',
      laboratorio: 'fa-solid fa-flask'
    };
    return icons[category] || 'fa-solid fa-folder';
  }

  function handleCategoryHover(e) {
    const el = e.target.closest('.network-node');
    const node = networkNodes.find(n => n.id === el.dataset.id);
    if (!node) return;
    
    // Mostrar panel de información
    showInfoPanel(node, el);
    
    // Resaltar conexión
    el.classList.add('hovered');
  }

  function handleCategoryLeave(e) {
    const el = e.target.closest('.network-node');
    el.classList.remove('hovered');
    hideInfoPanel();
  }

  function handleCategoryClick(e) {
    const el = e.target.closest('.network-node');
    const node = networkNodes.find(n => n.id === el.dataset.id);
    if (!node) return;
    
    // Cambiar a vista explorador y navegar a esa categoría
    const path = ['root', node.id];
    currentPath = path;
    switchView('explorer');
    render();
  }

  function showInfoPanel(node, el) {
    const panel = document.getElementById('networkInfoPanel');
    if (!panel) return;
    
    const icon = getCategoryIcon(node.category);
    panel.querySelector('.info-panel-icon').className = `info-panel-icon ${icon}`;
    panel.querySelector('.info-panel-title').textContent = node.name;
    
    // Stats
    panel.querySelector('.info-panel-stats').innerHTML = `
      <div class="info-stat"><i class="fa-solid fa-folder"></i> ${node.folderCount} carpetas</div>
      <div class="info-stat"><i class="fa-solid fa-file"></i> ${node.fileCount} archivos</div>
    `;
    
    // Items (subcategorías)
    const subcats = node.data.children?.filter(c => c.type === 'folder') || [];
    let itemsHtml = '<div class="info-items-title">Contenido:</div>';
    subcats.slice(0, 5).forEach(sub => {
      itemsHtml += `<div class="info-item"><i class="fa-solid fa-folder"></i> ${sub.name}</div>`;
    });
    if (subcats.length > 5) {
      itemsHtml += `<div class="info-item more">+${subcats.length - 5} más...</div>`;
    }
    panel.querySelector('.info-panel-items').innerHTML = itemsHtml;
    
    // Posicionar panel
    const rect = el.getBoundingClientRect();
    const containerRect = document.getElementById('networkContainer').getBoundingClientRect();
    const panelX = rect.left - containerRect.left + rect.width + 15;
    const panelY = rect.top - containerRect.top + rect.height / 2;
    
    // Ajustar si se sale por la derecha
    if (panelX + 220 > containerRect.width) {
      panel.style.left = (rect.left - containerRect.left - 235) + 'px';
    } else {
      panel.style.left = panelX + 'px';
    }
    panel.style.top = panelY + 'px';
    panel.style.transform = 'translateY(-50%)';
    
    panel.classList.add('visible');
    panel.dataset.category = node.category;
  }

  function hideInfoPanel() {
    const panel = document.getElementById('networkInfoPanel');
    if (panel) {
      panel.classList.remove('visible');
    }
  }

  function animate() {
    if (currentView !== 'network') return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const rootNode = networkNodes.find(n => n.type === 'root');
    if (!rootNode) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    
    // Dibujar conexiones desde root a categorías
    networkNodes.filter(n => n.type === 'category').forEach(node => {
      const color = categoryColors[node.category]?.hex || '#ff9f1a';
      const isHovered = document.querySelector(`.node-category[data-id="${node.id}"]`)?.classList.contains('hovered');
      
      // Línea principal
      ctx.strokeStyle = isHovered ? color + '80' : color + '35';
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(rootNode.x, rootNode.y);
      ctx.lineTo(node.x, node.y);
      ctx.stroke();
      
      // Glow effect
      if (isHovered) {
        ctx.strokeStyle = color + '20';
        ctx.lineWidth = 8;
        ctx.stroke();
      }
    });
    
    // Efecto de partículas en las líneas (sutil)
    const time = Date.now() * 0.001;
    networkNodes.filter(n => n.type === 'category').forEach((node, i) => {
      const color = categoryColors[node.category]?.hex || '#ff9f1a';
      const progress = (time * 0.3 + i * 0.15) % 1;
      
      const px = rootNode.x + (node.x - rootNode.x) * progress;
      const py = rootNode.y + (node.y - rootNode.y) * progress;
      
      ctx.fillStyle = color + '60';
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    
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
        createNetworkNodes();
        renderNetworkNodes();
        animate();
      }, 100);
    } else {
      if (animationId) cancelAnimationFrame(animationId);
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
    
    switchView('explorer');
  }

  init();
});
