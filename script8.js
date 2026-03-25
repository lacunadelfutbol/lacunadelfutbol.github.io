// Función para alternar el estado del menú (mostrar u ocultar)
document.getElementById("menu-toggle").addEventListener("click", function() {
    var menu = document.getElementById("menu");
    if (menu.style.left === "-250px") {
        menu.style.left = "0";  // Mostrar el menú
    } else {
        menu.style.left = "-250px";  // Ocultar el menú
    }
});

// ----- CONFIGURACIÓN -----
const TOTAL_ASISTENCIAS_POSIBLES = 51;

// ----- Datos de ejemplo -----
const jugadores = [
    { nombre: "YEIK SOLIS", asistencias: [5,7,6,8,7,9,8,0,0,0,0,0] },
    { nombre: "ALEXANDER SOLIS", asistencias: [5,6,6,7,7,9,8,0,0,0,0,0] },
    { nombre: "MATEO RODRIGUEZ", asistencias: [2,5,4,6,4,3,4,0,0,0,0,0] },
    { nombre: "ALAN MELO", asistencias: [4,7,3,6,5,5,3,0,0,0,0,0] },
    { nombre: "MICHEL MORALES", asistencias: [3,6,2,5,4,7,3,0,0,0,0,0] },
    { nombre: "ARTURO TREJO", asistencias: [4,2,2,2,2,0,0,0,0,0,0,0] },
    { nombre: "KARIM VALENCIA", asistencias: [2,6,4,5,6,7,4,0,0,0,0,0] },
    { nombre: "JOSMAR VALENCIA", asistencias: [2,6,4,5,6,7,4,0,0,0,0,0] },
    { nombre: "AXEL PELCASTRE", asistencias: [3,4,3,6,2,4,1,0,0,0,0,0] },
    { nombre: "SANTIAGO PECASTRE", asistencias: [3,4,3,6,3,4,0,0,0,0,0,0] },
    { nombre: "DYLAN RIVERA", asistencias: [2,5,3,4,4,4,2,0,0,0,0,0] },
    { nombre: "ANGEL GOMEZ", asistencias: [0,0,0,0,0,4,2,0,0,0,0,0] },
    { nombre: "LEO", asistencias: [1,0,1,0,3,1,0,0,0,0,0,0] },
    { nombre: "FERNANDO ANGELES", asistencias: [3,7,3,4,1,6,1,0,0,0,0,0] },
    { nombre: "GABRIEL HERNANDEZ", asistencias: [3,2,2,3,7,6,7,0,0,0,0,0] },
    { nombre: "BARUSH AMADOR", asistencias: [1,2,4,4,5,4,2,0,0,0,0,0] },
    { nombre: "ALAIN AMADOR", asistencias: [3,6,4,6,6,7,2,0,0,0,0,0] },
    { nombre: "ALEXIS HERNANDEZ", asistencias: [4,5,3,5,5,4,5,0,0,0,0,0] },
    { nombre: "FRANKI AMADOR", asistencias: [2,7,4,5,6,5,2,0,0,0,0,0] },
    { nombre: "CRISTOPHER ZARCO", asistencias: [3,4,3,3,4,0,0,0,0,0,0,0] },
    { nombre: "ANGEL PEREZ", asistencias: [3,4,3,3,4,0,0,0,0,0,0,0] },
    { nombre: "MATEO", asistencias: [0,0,0,0,3,4,6,0,0,0,0,0] },
    { nombre: "MATI HERNANDEZ", asistencias: [1,2,2,1,4,5,6,0,0,0,0,0] },
    { nombre: "SANTI HERNANDEZ", asistencias: [1,2,2,1,4,5,6,0,0,0,0,0] },
    { nombre: "GERARDO GONZALEZ", asistencias: [0,0,2,3,2,0,0,0,0,0,0,0] },
    { nombre: "IAN CASTILLO", asistencias: [1,5,2,5,5,6,7,0,0,0,0,0] },
    { nombre: "RICARDO CASTILLO", asistencias: [1,5,2,5,5,6,7,0,0,0,0,0] },
    { nombre: "VANESA", asistencias: [0,0,0,0,0,3,1,0,0,0,0,0] },
    { nombre: "MIGUEL ANGEL", asistencias: [0,0,0,0,0,0,2,0,0,0,0,0] },
    { nombre: "SANTIAGO MENESES", asistencias: [0,0,0,0,0,0,2,0,0,0,0,0] },
    { nombre: "ADRIAN SIERRA", asistencias: [1,7,2,3,1,2,0,0,0,0,0,0] },
    { nombre: "YASID MARTINEZ", asistencias: [1,2,4,1,4,3,1,0,0,0,0,0] },
    { nombre: "EDGAR ROBERTO", asistencias: [0,0,3,4,5,6,3,0,0,0,0,0] }
];

// Variable global para jugadores filtrados
let jugadoresFiltrados = [...jugadores];
// Variable para almacenar las posiciones generales
let posicionesGenerales = {};
// Variable para almacenar el mes actual
let mesActual = {};
// Cache para el contenedor del Top 10
let topContainerCache = null;

// ----- FUNCIÓN: Obtener mes actual basado en la fecha -----
function obtenerMesActual() {
    const meses = ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'];
    const fecha = new Date();
    const mes = fecha.getMonth();
    const año = fecha.getFullYear();
    
    let indiceMes;
    let añoVisualizacion = año;
    
    if (mes >= 8) {
        indiceMes = mes - 8;
        añoVisualizacion = año;
    } else {
        indiceMes = mes + 4;
        añoVisualizacion = año;
    }
    
    return {
        nombre: meses[indiceMes] || 'Septiembre',
        nombreCompleto: `${meses[indiceMes] || 'Septiembre'} ${añoVisualizacion}`,
        indice: indiceMes,
        año: añoVisualizacion
    };
}

// ----- FUNCIÓN: Verificar cambio de mes -----
function verificarCambioMes() {
    const nuevoMes = obtenerMesActual();
    
    if (mesActual.indice !== nuevoMes.indice || mesActual.año !== nuevoMes.año) {
        mesActual = nuevoMes;
        renderizarTop10Mensual();
        mostrarNotificacionMes();
    }
}

// ----- FUNCIÓN: Mostrar notificación de cambio de mes -----
function mostrarNotificacionMes() {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #D4AF37;
        color: #1a1a1a;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease;
        font-weight: 500;
        border-left: 4px solid #1a1a1a;
    `;
    notificacion.innerHTML = `
        <strong>👑 Mes actualizado:</strong> Ahora mostrando Top 10 de ${mesActual.nombreCompleto}
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 500);
    }, 3000);
}

// ----- FUNCIÓN: Calcular Top 10 del mes actual basado en jugadores filtrados -----
function calcularTop10Mensual() {
    const indiceMes = mesActual.indice;
    
    // Usar jugadores filtrados en lugar de todos los jugadores
    const asistenciasMes = jugadoresFiltrados.map(jugador => ({
        nombre: jugador.nombre,
        asistencia: jugador.asistencias[indiceMes] || 0
    }));
    
    const top10 = asistenciasMes
        .sort((a, b) => b.asistencia - a.asistencia)
        .slice(0, 10);
    
    return {
        mes: mesActual.nombreCompleto,
        top: top10
    };
}

// ----- FUNCIÓN: Renderizar Top 10 mensual (OPTIMIZADA) -----
function renderizarTop10Mensual() {
    const topData = calcularTop10Mensual();
    
    // Usar el contenedor en caché o crearlo solo una vez
    if (!topContainerCache) {
        topContainerCache = document.querySelector('.top-mensual-container');
        
        if (!topContainerCache) {
            topContainerCache = document.createElement('div');
            topContainerCache.className = 'top-mensual-container';
            
            const tablaContainer = document.querySelector('.tabla-container');
            if (tablaContainer && tablaContainer.parentNode) {
                tablaContainer.parentNode.insertBefore(topContainerCache, tablaContainer.nextSibling);
            }
        }
    }
    
    // Verificar si realmente necesitamos actualizar el contenido
    // Si el contenedor ya tiene el mismo mes y misma cantidad de datos, evitamos re-renderizar
    const mesActualEnDOM = topContainerCache.querySelector('.top-mes');
    if (mesActualEnDOM && mesActualEnDOM.textContent === topData.mes && 
        topContainerCache.querySelectorAll('.top-item').length === topData.top.length) {
        // Si el mes no cambió y la cantidad de items es la misma, actualizar solo los valores
        actualizarTop10Valores(topData);
        return;
    }
    
    // Si hay cambios significativos, re-renderizar completamente
    let topHTML = `
        <div class="top-header">
            <div class="top-titulo">
                <span class="top-icon">👑</span>
                <h3>TOP 10 ASISTENCIAS</h3>
            </div>
            <div class="top-mes">${topData.mes}</div>
        </div>
    `;
    
    if (topData.top.length === 0 || topData.top.every(item => item.asistencia === 0)) {
        topHTML += `
            <div class="no-data">
                No hay asistencias registradas en ${topData.mes}
            </div>
        `;
    } else {
        topHTML += '<div class="top-lista">';
        
        topData.top.forEach((item, index) => {
            const posicionClass = index < 3 ? ` top-${index + 1}` : '';
            const asistenciaTexto = item.asistencia === 1 ? 'asistencia' : 'asistencias';
            
            topHTML += `
                <div class="top-item${posicionClass}" data-nombre="${item.nombre.replace(/[^a-zA-Z0-9]/g, '_')}">
                    <div class="top-posicion">${index + 1}</div>
                    <div class="top-info">
                        <span class="top-nombre">${escapeHTML(item.nombre)}</span>
                        <span class="top-asistencias">${item.asistencia} ${asistenciaTexto}</span>
                    </div>
                </div>
            `;
        });
        
        topHTML += '</div>';
    }
    
    topHTML += `
        <div class="top-footer">
            <span class="auto-update">👑 Se actualiza automáticamente cada mes</span>
        </div>
    `;
    
    // Usar requestAnimationFrame para evitar reflows durante el scroll
    requestAnimationFrame(() => {
        if (topContainerCache) {
            topContainerCache.innerHTML = topHTML;
        }
    });
}

// ----- FUNCIÓN AUXILIAR: Actualizar solo los valores del Top 10 (evita re-renderizar todo) -----
function actualizarTop10Valores(topData) {
    const items = topContainerCache.querySelectorAll('.top-item');
    
    if (items.length === topData.top.length) {
        items.forEach((item, index) => {
            const asistenciaSpan = item.querySelector('.top-asistencias');
            if (asistenciaSpan && topData.top[index]) {
                const asistenciaTexto = topData.top[index].asistencia === 1 ? 'asistencia' : 'asistencias';
                asistenciaSpan.textContent = `${topData.top[index].asistencia} ${asistenciaTexto}`;
            }
        });
    } else {
        // Si la cantidad cambió, re-renderizar completo
        requestAnimationFrame(() => {
            if (topContainerCache) {
                const topDataNuevo = calcularTop10Mensual();
                renderizarTop10Mensual();
            }
        });
    }
}

// ----- FUNCIÓN AUXILIAR: Escapar HTML para prevenir XSS -----
function escapeHTML(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ----- FUNCIÓN: Calcular posiciones generales (original) -----
function calcularPosicionesGenerales() {
    const jugadoresOrdenados = [...jugadores].sort((a, b) => {
        const totalA = a.asistencias.reduce((sum, asistencia) => sum + asistencia, 0);
        const totalB = b.asistencias.reduce((sum, asistencia) => sum + asistencia, 0);
        const porcentajeA = (totalA / TOTAL_ASISTENCIAS_POSIBLES) * 100;
        const porcentajeB = (totalB / TOTAL_ASISTENCIAS_POSIBLES) * 100;
        
        if (porcentajeA === porcentajeB) {
            return totalB - totalA;
        }
        return porcentajeB - porcentajeA;
    });
    
    const posiciones = {};
    
    for (let i = 0; i < jugadoresOrdenados.length; i++) {
        const posicion = i + 1;
        posiciones[jugadoresOrdenados[i].nombre] = posicion;
    }
    
    return posiciones;
}

// ----- BÚSQUEDA (optimizada) -----
function crearBuscadorMinimalista() {
    const buscadorHTML = `
        <div class="buscador-container" style="margin: 20px 0; max-width: 500px; margin-left: auto; margin-right: auto;">
            <input type="text" 
                   id="inputBuscador" 
                   placeholder="Buscar jugador por nombre..."
                   style="width: 100%; padding: 10px; border: 2px solid #3498db; border-radius: 5px; font-size: 16px;">
            <div id="contadorResultados" style="margin-top: 5px; font-size: 14px; color: #666; text-align: right;">
                Mostrando ${jugadores.length} jugadores
            </div>
        </div>
    `;
    
    const h2 = document.querySelector('section h2');
    if (h2) {
        h2.insertAdjacentHTML('afterend', buscadorHTML);
    }
    
    const inputBuscador = document.getElementById('inputBuscador');
    const contadorDiv = document.getElementById('contadorResultados');
    
    // Usar debounce para mejorar rendimiento durante la escritura
    let timeoutId = null;
    
    function filtrarJugadores(textoBusqueda) {
        const textoBusquedaUpper = textoBusqueda.toUpperCase().trim();
        
        if (!textoBusquedaUpper) {
            jugadoresFiltrados = [...jugadores];
            if (contadorDiv) {
                contadorDiv.textContent = `Mostrando ${jugadores.length} jugadores`;
                contadorDiv.style.color = '#666';
            }
        } else {
            jugadoresFiltrados = jugadores.filter(jugador => 
                jugador.nombre.toUpperCase().includes(textoBusquedaUpper)
            );
            
            if (contadorDiv) {
                if (jugadoresFiltrados.length === 0) {
                    contadorDiv.textContent = `No se encontraron jugadores con "${textoBusqueda}"`;
                    contadorDiv.style.color = '#e74c3c';
                } else if (jugadoresFiltrados.length === 1) {
                    contadorDiv.textContent = `Mostrando 1 jugador`;
                    contadorDiv.style.color = '#27ae60';
                } else {
                    contadorDiv.textContent = `Mostrando ${jugadoresFiltrados.length} jugadores`;
                    contadorDiv.style.color = '#2980b9';
                }
            }
        }
        
        // Usar requestAnimationFrame para actualizaciones suaves
        requestAnimationFrame(() => {
            renderizarTabla();
            renderizarTop10Mensual();
        });
    }
    
    if (inputBuscador) {
        inputBuscador.addEventListener('input', function(e) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                filtrarJugadores(e.target.value);
            }, 150); // Debounce de 150ms
        });
        
        inputBuscador.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                filtrarJugadores('');
            }
        });
    }
}

// ----- RENDERIZAR TABLA (OPTIMIZADA) -----
function renderizarTabla() {
    const tbody = document.querySelector("#tabla-asistencias tbody");
    if (!tbody) return;
    
    // Usar DocumentFragment para mejorar rendimiento
    const fragment = document.createDocumentFragment();
    
    if (jugadoresFiltrados.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="15" style="text-align: center; padding: 30px; color: #666; font-style: italic;">
                No se encontraron jugadores con ese criterio de búsqueda
            </td>
        `;
        fragment.appendChild(tr);
    } else {
        const jugadoresOrdenados = [...jugadoresFiltrados].sort((a, b) => {
            const posicionA = posicionesGenerales[a.nombre] || 999;
            const posicionB = posicionesGenerales[b.nombre] || 999;
            return posicionA - posicionB;
        });
        
        jugadoresOrdenados.forEach((nino) => {
            const totalAsistencias = nino.asistencias.reduce((a, b) => a + b, 0);
            const porcentaje = (totalAsistencias / TOTAL_ASISTENCIAS_POSIBLES) * 100;
            let color = porcentaje >= 80 ? "green" : porcentaje >= 50 ? "orange" : "red";
            const posicion = posicionesGenerales[nino.nombre] || "-";
            
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="font-weight: bold; text-align: center; padding: 6px 3px; min-width: 50px;">${posicion}°</td>
                <td>${escapeHTML(nino.nombre)}</td>
                ${nino.asistencias.map(a => `<td>${a}</td>`).join('')}
                <td style="color:${color}; font-weight:bold;">${porcentaje.toFixed(0)}%</td>
            `;
            
            tr.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#f0f8ff';
            });
            
            tr.addEventListener('mouseout', function() {
                this.style.backgroundColor = '';
            });
            
            fragment.appendChild(tr);
        });
    }
    
    // Limpiar y agregar el fragmento de una vez
    tbody.innerHTML = '';
    tbody.appendChild(fragment);
}

// ----- INICIALIZAR -----
document.addEventListener('DOMContentLoaded', function() {
    mesActual = obtenerMesActual();
    
    const thead = document.querySelector("#tabla-asistencias thead tr");
    if (thead) {
        thead.innerHTML = `
            <th style="min-width: 50px; padding: 8px 3px;">Posición</th>
            <th style="min-width: 180px;">Nombre</th>
            <th>Sept</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dic</th>
            <th>Ene</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Abr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Ago</th>
            <th>Porcentaje</th>
        `;
    }
    
    posicionesGenerales = calcularPosicionesGenerales();
    crearBuscadorMinimalista();
    renderizarTabla();
    renderizarTop10Mensual();
    
    setInterval(verificarCambioMes, 3600000);
    window.addEventListener('focus', verificarCambioMes);
    
    const descargarBtn = document.getElementById("descargarPDF");
    if (descargarBtn) {
        descargarBtn.addEventListener("click", () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text("Registro de Asistencias", 14, 20);
            doc.setFontSize(10);
            doc.text(`Total de asistencias posibles: ${TOTAL_ASISTENCIAS_POSIBLES}`, 14, 28);

            doc.autoTable({
                html: "#tabla-asistencias",
                startY: 30,
                styles: { fontSize: 10, halign: "center" },
                headStyles: { fillColor: [41, 128, 185] },
            });

            doc.save("Asistencias.pdf");
        });
    }
});

// ----- ESTILOS SOLO PARA TOP 10 (negro y dorado) -----
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    /* Estilos EXCLUSIVOS para Top 10 */
    .top-mensual-container {
        margin: 40px 0 20px;
        padding: 30px;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        border: 1px solid #D4AF37;
        width: 100%;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        will-change: transform;
    }
    
    .top-mensual-container::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #D4AF37, #8B6910, #D4AF37);
        border-radius: 16px;
        z-index: -1;
        animation: borderGlow 3s ease-in-out infinite;
    }
    
    @keyframes borderGlow {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }
    
    .top-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid #D4AF37;
    }
    
    .top-titulo {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .top-icon {
        font-size: 32px;
        filter: drop-shadow(0 0 10px #D4AF37);
    }
    
    .top-titulo h3 {
        margin: 0;
        color: #D4AF37;
        font-size: 1.6em;
        font-weight: 700;
        letter-spacing: 2px;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
    
    .top-mes {
        background: linear-gradient(135deg, #D4AF37, #8B6910);
        color: #1a1a1a;
        padding: 8px 20px;
        border-radius: 25px;
        font-size: 1em;
        font-weight: 600;
        box-shadow: 0 2px 15px rgba(212, 175, 55, 0.3);
    }
    
    .top-lista {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .top-item {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        padding: 15px 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        transition: all 0.3s;
        border: 1px solid rgba(212, 175, 55, 0.2);
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    
    .top-item:hover {
        transform: translateX(8px);
        background: rgba(212, 175, 55, 0.1);
        border-color: #D4AF37;
        box-shadow: 0 5px 20px rgba(212, 175, 55, 0.2);
    }
    
    .top-posicion {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.3em;
        margin-right: 20px;
        background: #2d2d2d;
        color: #D4AF37;
        border: 2px solid #D4AF37;
        transition: all 0.3s;
    }
    
    .top-item.top-1 .top-posicion {
        background: linear-gradient(135deg, #D4AF37, #8B6910);
        color: #1a1a1a;
        border-color: #fff;
        box-shadow: 0 0 20px #D4AF37;
    }
    
    .top-item.top-2 .top-posicion {
        background: linear-gradient(135deg, #C0C0C0, #A0A0A0);
        color: #1a1a1a;
        border-color: #fff;
        box-shadow: 0 0 15px #C0C0C0;
    }
    
    .top-item.top-3 .top-posicion {
        background: linear-gradient(135deg, #CD7F32, #8B4513);
        color: #fff;
        border-color: #fff;
        box-shadow: 0 0 15px #CD7F32;
    }
    
    .top-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .top-nombre {
        font-weight: 600;
        color: #fff;
        font-size: 1.1em;
        letter-spacing: 0.5px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .top-asistencias {
        background: linear-gradient(135deg, #D4AF37, #8B6910);
        color: #1a1a1a;
        padding: 6px 20px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.95em;
        box-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
    }
    
    .top-footer {
        margin-top: 25px;
        text-align: center;
    }
    
    .auto-update {
        font-size: 0.9em;
        color: #D4AF37;
        background: rgba(212, 175, 55, 0.1);
        padding: 8px 20px;
        border-radius: 25px;
        display: inline-block;
        border: 1px solid #D4AF37;
        backdrop-filter: blur(5px);
    }
    
    .no-data {
        text-align: center;
        padding: 40px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        color: #D4AF37;
        font-style: italic;
        border: 2px dashed #D4AF37;
    }
    
    /* Mejoras para scroll suave */
    .tabla-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
`;
document.head.appendChild(style);