/* LÓGICA DE INTERFAZ DE BASE DE DATOS (SQL CLIENT) */

document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('db-tree-root');
    const tableBody = document.getElementById('db-table-body');
    const queryDisplay = document.getElementById('sql-query-display');
    
    if (!treeContainer) return;

    /* --- DATOS (Esquema de Base de Datos simulado) --- */
    const dbSchema = {
        name: "aom_lab_db",
        type: "root",
        expanded: true,
        children: [
            {
                name: "teoria_fundamentos",
                type: "schema",
                children: [
                    { name: "tbl_ciberseguridad", type: "table", rows: 15, updated: "2025-01-10" },
                    { name: "tbl_sistemas_linux", type: "table", rows: 8, updated: "2024-12-20" },
                    { name: "view_protocolos_red", type: "view", rows: 12, updated: "2024-11-05" }
                ]
            },
            {
                name: "portafolio_proyectos",
                type: "schema",
                children: [
                    { name: "deploy_kubernetes", type: "procedure", size: "45 KB", updated: "Yesterday" },
                    { name: "audit_report_2024", type: "blob", size: "1.2 MB", updated: "2 days ago" }
                ]
            },
            {
                name: "logs_investigacion",
                type: "schema",
                children: [
                    { name: "case_crowdstrike", type: "log", size: "200 KB", updated: "Active" },
                    { name: "incidents_q4", type: "log", size: "500 KB", updated: "Archived" }
                ]
            }
        ]
    };

    /* --- RENDER TREE (IZQUIERDA) --- */
    function renderTree(node, container, level = 0) {
        // Crear elemento del árbol
        const item = document.createElement('div');
        item.className = 'tree-item';
        item.style.paddingLeft = `${level * 15 + 10}px`;
        
        let icon = 'fa-database';
        if (node.type === 'schema') icon = 'fa-folder';
        if (node.type === 'table') icon = 'fa-table';
        if (node.type === 'view') icon = 'fa-eye';
        if (node.type === 'log') icon = 'fa-file-lines';

        item.innerHTML = `<i class="fa-solid ${icon} tree-icon"></i> ${node.name}`;
        
        // Evento Click
        item.onclick = (e) => {
            e.stopPropagation();
            // Resaltar activo
            document.querySelectorAll('.tree-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            
            // Simular Query y Cargar Datos
            updateQuery(node);
            loadTableData(node);
        };

        container.appendChild(item);

        // Renderizar hijos si existen
        if (node.children) {
            node.children.forEach(child => renderTree(child, container, level + 1));
        }
    }

    /* --- SIMULADOR DE QUERY (ESCRITURA) --- */
    function updateQuery(node) {
        const tableName = node.name;
        let query = '';
        
        if (node.type === 'root') query = `SHOW DATABASES;`;
        else if (node.type === 'schema') query = `USE ${tableName}; SHOW TABLES;`;
        else query = `<span class="sql-keyword">SELECT</span> * <span class="sql-keyword">FROM</span> ${tableName} <span class="sql-keyword">LIMIT</span> 100;`;

        queryDisplay.innerHTML = `${query}<span class="cursor-blink"></span>`;
    }

    /* --- RENDER TABLA (DERECHA) --- */
    function loadTableData(node) {
        tableBody.innerHTML = '';
        
        // Si es una carpeta/schema, mostramos sus hijos
        let dataToShow = [];
        if (node.children) {
            dataToShow = node.children;
        } else {
            // Si es un archivo final, inventamos filas "dummy" para que parezca una tabla de DB real
            // Esto es pura estética para vender la idea de DB
            dataToShow = [
                { id: 1, name: "config_main.yml", type: "VARCHAR", val: "Active" },
                { id: 2, name: "security_policy", type: "JSON", val: "{...}" },
                { id: 3, name: "user_access", type: "INT", val: "775" }
            ];
        }

        if (dataToShow.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" class="empty-state">// 0 rows returned in 0.04ms</td></tr>`;
            return;
        }

        dataToShow.forEach((row, index) => {
            const tr = document.createElement('tr');
            
            // Columnas simuladas
            const id = index + 1;
            const name = row.name || "data_row_" + id;
            const type = row.type || "TABLE";
            const extra = row.updated || row.val || "NULL";
            
            // Badge color
            let badgeClass = 'badge-folder';
            if(type !== 'table' && type !== 'schema') badgeClass = 'badge-file';

            tr.innerHTML = `
                <td style="color: #64748b;">${id}</td>
                <td style="color: #ff9f1a; font-weight:600;">${name}</td>
                <td><span class="type-badge ${badgeClass}">${type}</span></td>
                <td>${extra}</td>
                <td style="color: #64748b;">root</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Inicializar
    renderTree(dbSchema, treeContainer);
    // Cargar estado inicial
    updateQuery(dbSchema);
    loadTableData(dbSchema);
});
