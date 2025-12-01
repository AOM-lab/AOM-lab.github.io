/* --- ESTILOS PRO: KNOWLEDGE VAULT (Data System) --- */

#site-graph {
  --map-bg: #0b1022;
  --map-panel: rgba(255, 255, 255, 0.02);
  --map-border: rgba(255, 255, 255, 0.08);
  --map-accent: #ff9f1a;
  --map-text: #94a3b8;
  
  padding: 40px 0;
}

#site-graph .section-title { color: var(--map-accent); margin-bottom: 20px; }

/* CONTENEDOR PRINCIPAL */
.explorer-window {
  background: var(--map-bg);
  border: 1px solid var(--map-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px -10px rgba(0,0,0,0.6);
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

/* 1. BARRA DE TELEMETRÍA (STATS) */
.vault-stats {
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid var(--map-border);
  padding: 12px 24px;
  display: flex; gap: 30px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.75rem;
  color: var(--map-text);
  overflow-x: auto;
}

.stat-item { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.stat-value { color: #fff; font-weight: 700; color: var(--map-accent); }
.stat-dot { width: 6px; height: 6px; background: #34d399; border-radius: 50%; box-shadow: 0 0 5px #34d399; }

/* 2. CABECERA DE CONTROL (Buscador + Ruta) */
.vault-controls {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--map-border);
  padding: 16px 24px;
  display: flex; justify-content: space-between; align-items: center;
  gap: 20px;
}

/* Migas de pan (Ruta) */
.breadcrumbs {
  font-family: 'Source Code Pro', monospace;
  color: var(--map-text); font-size: 0.9rem;
  flex-grow: 1;
}
.crumb-root { color: var(--map-accent); font-weight: 700; cursor: pointer; }
.crumb-item { cursor: pointer; transition: 0.2s; }
.crumb-item:hover { color: #fff; text-decoration: underline; }
.crumb-sep { opacity: 0.4; margin: 0 6px; }
.crumb-current { color: #fff; }

/* Buscador Integrado */
.vault-search-box {
  position: relative;
  width: 250px;
}
.vault-search-box input {
  width: 100%;
  background: #05080f;
  border: 1px solid var(--map-border);
  border-radius: 6px;
  padding: 8px 12px 8px 35px;
  color: #fff; font-family: 'Inter', sans-serif; font-size: 0.85rem;
  transition: 0.2s;
}
.vault-search-box input:focus {
  border-color: var(--map-accent);
  box-shadow: 0 0 10px rgba(255, 159, 26, 0.1);
  outline: none;
}
.vault-search-box i {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  color: var(--map-text); font-size: 0.8rem;
}

/* 3. CUERPO (GRID) */
.explorer-body {
  padding: 30px;
  flex-grow: 1;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
  background-size: 40px 40px;
  overflow-y: auto;
  max-height: 600px; /* Scroll interno si hay mucho contenido */
}

.nodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

/* TARJETA DE NODO */
.node-card {
  background: var(--map-panel);
  border: 1px solid var(--map-border);
  border-radius: 10px;
  padding: 24px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  position: relative;
}

.node-card:hover {
  background: rgba(255, 159, 26, 0.06);
  border-color: var(--map-accent);
  transform: translateY(-4px);
}

.node-icon {
  font-size: 2.2rem; margin-bottom: 15px; color: #64748b; transition: 0.2s;
}
/* Colores específicos */
.node-card.folder .node-icon { color: #eab308; } /* Amarillo carpeta */
.node-card.file .node-icon { color: #3b82f6; font-size: 1.8rem; } /* Azul archivo */

/* Contador de items dentro de carpeta */
.node-count {
  position: absolute; top: 12px; right: 12px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.65rem; color: var(--map-text);
  background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;
}

.node-title {
  color: #e2e8f0; font-weight: 600; font-size: 0.9rem; margin-bottom: 4px;
}
.node-desc {
  color: var(--map-text); font-size: 0.75rem; line-height: 1.4;
}

/* BOTÓN DE RETORNO (Estilo Botón) */
.back-btn-row {
  grid-column: 1 / -1; margin-bottom: 10px;
}
.back-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 16px; border-radius: 6px;
  background: rgba(255,255,255,0.05);
  color: #fff; font-size: 0.85rem; cursor: pointer;
  border: 1px solid transparent; transition: 0.2s;
}
.back-btn:hover { background: rgba(255,255,255,0.1); border-color: var(--map-text); }

/* MENSAJES DE ESTADO */
.vault-message { grid-column: 1/-1; text-align: center; padding: 40px; color: var(--map-text); }

/* RESPONSIVE */
@media (max-width: 768px) {
  .vault-controls { flex-direction: column; align-items: stretch; gap: 15px; }
  .vault-search-box { width: 100%; }
  .nodes-grid { grid-template-columns: 1fr 1fr; }
}
