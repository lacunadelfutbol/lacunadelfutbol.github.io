// Función para alternar el estado del menú (mostrar u ocultar)
document.getElementById("menu-toggle").addEventListener("click", function() {
    var menu = document.getElementById("menu");
    if (menu.style.left === "-250px") {
        menu.style.left = "0";
    } else {
        menu.style.left = "-250px";
    }
});

// ----- CONFIGURACIÓN -----
const TOTAL_ASISTENCIAS_POSIBLES = 64;

// ----- Datos de ejemplo -----
const jugadores = [
    { nombre: "YEIK SOLIS", asistencias: [5,7,6,8,7,9,9,9,3,0,0,0] },
    { nombre: "ALEXANDER SOLIS", asistencias: [5,6,6,7,7,9,9,8,2,0,0,0] },
    { nombre: "MATEO RODRIGUEZ", asistencias: [2,5,4,6,4,3,5,6,3,0,0,0] },
    { nombre: "ALAN MELO", asistencias: [4,7,3,6,5,5,3,6,3,0,0,0] },
    { nombre: "MICHEL MORALES", asistencias: [3,6,2,5,4,7,3,5,1,0,0,0] },
    { nombre: "ARTURO TREJO", asistencias: [4,2,2,2,2,0,0,1,0,0,0,0] },
    { nombre: "KARIM VALENCIA", asistencias: [2,6,4,5,6,7,4,5,1,0,0,0] },
    { nombre: "JOSMAR VALENCIA", asistencias: [2,6,4,5,6,7,4,6,1,0,0,0] },
    { nombre: "AXEL PELCASTRE", asistencias: [3,4,3,6,2,4,1,3,1,0,0,0] },
    { nombre: "SANTIAGO PECASTRE", asistencias: [3,4,3,6,3,4,0,3,1,0,0,0] },
    { nombre: "DYLAN RIVERA", asistencias: [2,5,3,4,4,4,2,3,0,0,0,0] },
    { nombre: "ANGEL GOMEZ", asistencias: [0,0,0,0,0,4,3,6,1,0,0,0] },
    { nombre: "LEO", asistencias: [1,0,1,0,3,1,0,0,0,0,0,0] },
    { nombre: "FERNANDO ANGELES", asistencias: [3,7,3,4,1,6,1,0,0,0,0,0] },
    { nombre: "GABRIEL HERNANDEZ", asistencias: [3,2,2,3,7,6,8,8,1,0,0,0] },
    { nombre: "BARUSH AMADOR", asistencias: [1,2,4,4,5,4,2,1,0,0,0,0] },
    { nombre: "ALAIN AMADOR", asistencias: [3,6,4,6,6,7,3,6,0,0,0,0] },
    { nombre: "ALEXIS HERNANDEZ", asistencias: [4,5,3,5,5,4,6,6,1,0,0,0] },
    { nombre: "FRANKI AMADOR", asistencias: [2,7,4,5,6,5,3,4,1,0,0,0] },
    { nombre: "CRISTOPHER ZARCO", asistencias: [3,4,3,3,4,0,0,0,0,0,0,0] },
    { nombre: "ANGEL PEREZ", asistencias: [3,4,3,3,4,0,0,0,0,0,0,0] },
    { nombre: "MATEO", asistencias: [0,0,0,0,3,4,6,3,0,0,0,0] },
    { nombre: "MATI HERNANDEZ", asistencias: [1,2,2,1,4,5,7,4,0,0,0,0] },
    { nombre: "SANTI HERNANDEZ", asistencias: [1,2,2,1,4,5,7,4,0,0,0,0] },
    { nombre: "ELIOT TAPIA", asistencias: [0,0,0,0,0,0,0,2,3,0,0,0] },
    { nombre: "IAN CASTILLO", asistencias: [1,5,2,5,5,6,8,5,1,0,0,0] },
    { nombre: "RICARDO CASTILLO", asistencias: [1,5,2,5,5,6,7,5,1,0,0,0] },
    { nombre: "VANESA", asistencias: [0,0,0,0,0,3,1,0,0,0,0,0] },
    { nombre: "MIGUEL ANGEL", asistencias: [0,0,0,0,0,0,2,3,3,0,0,0] },
    { nombre: "SANTIAGO MENESES", asistencias: [0,0,0,0,0,0,3,2,2,0,0,0] },
    { nombre: "ABDIEL TAPIA", asistencias: [0,0,0,0,0,0,0,2,2,0,0,0] },
    { nombre: "YASID MARTINEZ", asistencias: [1,2,4,1,4,3,1,2,0,0,0,0] },
    { nombre: "EDGAR ROBERTO", asistencias: [0,0,3,4,5,6,3,3,1,0,0,0] }
];

// ----- MESES DEL CICLO ESCOLAR -----
// Índice 0 = Septiembre 2025, índice 7 = Abril 2026
const MESES_CICLO = [
    { nombre: 'Septiembre', año: 2025 },
    { nombre: 'Octubre',    año: 2025 },
    { nombre: 'Noviembre',  año: 2025 },
    { nombre: 'Diciembre',  año: 2025 },
    { nombre: 'Enero',      año: 2026 },
    { nombre: 'Febrero',    año: 2026 },
    { nombre: 'Marzo',      año: 2026 },
    { nombre: 'Abril',      año: 2026 },
    { nombre: 'Mayo',       año: 2026 },
    { nombre: 'Junio',      año: 2026 },
    { nombre: 'Julio',      año: 2026 },
    { nombre: 'Agosto',     año: 2026 }
];

// Variable global para jugadores filtrados
let jugadoresFiltrados = [...jugadores];
let posicionesGenerales = {};
let mesActual = {};
let mesViendo = null;
let topContainerCache = null;
let busquedaTimeout = null;

// ----- FUNCIÓN: Obtener mes actual del ciclo -----
function obtenerMesActual() {
    const fecha = new Date();
    const mes = fecha.getMonth();   // 0=Ene ... 11=Dic
    const año = fecha.getFullYear();

    // El ciclo empieza en Septiembre (mes 8 del año)
    let indiceCiclo;
    if (año === 2025 && mes >= 8) {
        indiceCiclo = mes - 8;          // Sep=0, Oct=1, Nov=2, Dic=3
    } else if (año === 2026 && mes <= 7) {
        indiceCiclo = mes + 4;          // Ene=4, Feb=5, Mar=6, Abr=7, ...
    } else {
        indiceCiclo = 0;                // fallback a Septiembre
    }

    // No permitir índice mayor a los meses definidos
    indiceCiclo = Math.min(indiceCiclo, MESES_CICLO.length - 1);

    return {
        nombre: MESES_CICLO[indiceCiclo].nombre,
        nombreCompleto: `${MESES_CICLO[indiceCiclo].nombre} ${MESES_CICLO[indiceCiclo].año}`,
        indice: indiceCiclo,
        año: MESES_CICLO[indiceCiclo].año
    };
}

// ----- FUNCIÓN: Verificar cambio de mes -----
function verificarCambioMes() {
    const nuevoMes = obtenerMesActual();
    if (mesActual.indice !== nuevoMes.indice || mesActual.año !== nuevoMes.año) {
        mesActual = nuevoMes;
        mesViendo = mesActual.indice;
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

// ----- FUNCIÓN: Navegar entre meses (botones ← →) -----
function cambiarMesTop(dir) {
    const nuevoIndice = mesViendo + dir;
    if (nuevoIndice < 0 || nuevoIndice > mesActual.indice) return;
    mesViendo = nuevoIndice;
    renderizarTop10Mensual();
}

// ----- FUNCIÓN: Calcular Top 10 del mes que se está viendo -----
function calcularTop10Mensual() {
    const indice = (mesViendo !== null) ? mesViendo : mesActual.indice;

    const asistenciasMes = jugadoresFiltrados.map(jugador => ({
        nombre: jugador.nombre,
        asistencia: jugador.asistencias[indice] || 0
    }));

    const top10 = asistenciasMes
        .sort((a, b) => b.asistencia - a.asistencia)
        .slice(0, 10);

    return {
        mes: MESES_CICLO[indice].nombre,
        año: MESES_CICLO[indice].año,
        mesCompleto: `${MESES_CICLO[indice].nombre} ${MESES_CICLO[indice].año}`,
        indice: indice,
        top: top10
    };
}

// ----- FUNCIÓN: Crear contenedor del Top 10 -----
function obtenerContenedorTop10() {
    if (topContainerCache && document.body.contains(topContainerCache)) {
        return topContainerCache;
    }
    let contenedor = document.querySelector('.top-mensual-container');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.className = 'top-mensual-container';
        const section = document.querySelector('section');
        if (section) {
            const btnPDF = document.getElementById('descargarPDF');
            if (btnPDF && btnPDF.parentNode) {
                btnPDF.parentNode.insertBefore(contenedor, btnPDF.nextSibling);
            } else {
                section.appendChild(contenedor);
            }
        }
    }
    topContainerCache = contenedor;
    return contenedor;
}

// ----- FUNCIÓN: Renderizar Top 10 con navegación de meses -----
function renderizarTop10Mensual() {
    if (mesViendo === null) mesViendo = mesActual.indice;

    const topData = calcularTop10Mensual();
    const container = obtenerContenedorTop10();
    if (!container) return;

    const puedeIrAtras    = mesViendo > 0;
    const puedeIrAdelante = mesViendo < mesActual.indice;

    let topHTML = `
        <div class="top-header">
            <div class="top-titulo">
                <span class="top-icon">🏆</span>
                <h3>TOP 10 ASISTENCIAS</h3>
            </div>
            <div class="top-nav-meses">
                <button
                    class="btn-nav-mes"
                    onclick="cambiarMesTop(-1)"
                    ${!puedeIrAtras ? 'disabled' : ''}
                    title="Mes anterior">&#8592;</button>
                <div class="top-mes-badge">
                    <span class="mes-icon">📅</span>
                    <span>${topData.mesCompleto}</span>
                </div>
                <button
                    class="btn-nav-mes"
                    onclick="cambiarMesTop(1)"
                    ${!puedeIrAdelante ? 'disabled' : ''}
                    title="Mes siguiente">&#8594;</button>
            </div>
        </div>
    `;

    if (topData.top.length === 0 || topData.top.every(item => item.asistencia === 0)) {
        topHTML += `
            <div class="no-data-mensual">
                <span class="no-data-icon">📊</span>
                <p>No hay asistencias registradas en ${topData.mesCompleto}</p>
            </div>
        `;
    } else {
        topHTML += '<div class="top-lista">';
        topData.top.forEach((item, index) => {
            let medalla = '';
            let claseEspecial = '';
            if (index === 0) { medalla = '🥇'; claseEspecial = 'top-oro'; }
            else if (index === 1) { medalla = '🥈'; claseEspecial = 'top-plata'; }
            else if (index === 2) { medalla = '🥉'; claseEspecial = 'top-bronce'; }
            const asistenciaTexto = item.asistencia === 1 ? 'asistencia' : 'asistencias';
            topHTML += `
                <div class="top-item ${claseEspecial}">
                    <div class="top-posicion">
                        <span class="posicion-numero">${index + 1}</span>
                        ${medalla ? `<span class="medalla">${medalla}</span>` : ''}
                    </div>
                    <div class="top-info">
                        <span class="top-nombre">${item.nombre}</span>
                        <span class="top-asistencias">${item.asistencia} ${asistenciaTexto}</span>
                    </div>
                </div>
            `;
        });
        topHTML += '</div>';
    }

    topHTML += `
        <div class="top-footer">
            <span class="auto-update">← → Navega entre los meses del ciclo escolar</span>
        </div>
    `;

    container.innerHTML = topHTML;
}

// ----- FUNCIÓN: Calcular posiciones generales -----
function calcularPosicionesGenerales() {
    const jugadoresOrdenados = [...jugadores].sort((a, b) => {
        const totalA = a.asistencias.reduce((sum, asistencia) => sum + asistencia, 0);
        const totalB = b.asistencias.reduce((sum, asistencia) => sum + asistencia, 0);
        const porcentajeA = (totalA / TOTAL_ASISTENCIAS_POSIBLES) * 100;
        const porcentajeB = (totalB / TOTAL_ASISTENCIAS_POSIBLES) * 100;
        if (porcentajeA === porcentajeB) return totalB - totalA;
        return porcentajeB - porcentajeA;
    });
    const posiciones = {};
    for (let i = 0; i < jugadoresOrdenados.length; i++) {
        posiciones[jugadoresOrdenados[i].nombre] = i + 1;
    }
    return posiciones;
}

// ----- BÚSQUEDA -----
function crearBuscadorMinimalista() {
    if (document.querySelector('.buscador-container')) return;

    const buscadorHTML = `
        <div class="buscador-container">
            <div class="buscador-icono">🔍</div>
            <input type="text"
                   id="inputBuscador"
                   placeholder="Buscar jugador por nombre...">
            <div id="contadorResultados" class="contador-resultados">
                Mostrando ${jugadores.length} jugadores
            </div>
        </div>
    `;

    const h2 = document.querySelector('section h2');
    if (h2) {
        h2.insertAdjacentHTML('afterend', buscadorHTML);
    }

    const inputBuscador = document.getElementById('inputBuscador');
    const contadorDiv   = document.getElementById('contadorResultados');

    function filtrarJugadores(textoBusqueda) {
        const textoBusquedaUpper = textoBusqueda.toUpperCase().trim();
        if (!textoBusquedaUpper) {
            jugadoresFiltrados = [...jugadores];
            if (contadorDiv) {
                contadorDiv.textContent = `📋 Mostrando ${jugadores.length} jugadores`;
                contadorDiv.style.color = '#666';
            }
        } else {
            jugadoresFiltrados = jugadores.filter(jugador =>
                jugador.nombre.toUpperCase().includes(textoBusquedaUpper)
            );
            if (contadorDiv) {
                if (jugadoresFiltrados.length === 0) {
                    contadorDiv.textContent = `❌ No se encontraron jugadores con "${textoBusqueda}"`;
                    contadorDiv.style.color = '#e74c3c';
                } else if (jugadoresFiltrados.length === 1) {
                    contadorDiv.textContent = `✅ Mostrando 1 jugador`;
                    contadorDiv.style.color = '#27ae60';
                } else {
                    contadorDiv.textContent = `📊 Mostrando ${jugadoresFiltrados.length} jugadores`;
                    contadorDiv.style.color = '#2980b9';
                }
            }
        }
        requestAnimationFrame(() => {
            renderizarTabla();
            renderizarTop10Mensual();
        });
    }

    if (inputBuscador) {
        inputBuscador.addEventListener('input', function(e) {
            if (busquedaTimeout) clearTimeout(busquedaTimeout);
            busquedaTimeout = setTimeout(() => {
                filtrarJugadores(e.target.value);
            }, 200);
        });
        inputBuscador.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                filtrarJugadores('');
            }
        });
    }
}

// ----- RENDERIZAR TABLA -----
function renderizarTabla() {
    const tbody = document.querySelector("#tabla-asistencias tbody");
    if (!tbody) return;

    const fragment = document.createDocumentFragment();

    if (jugadoresFiltrados.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="15" style="text-align: center; padding: 40px; color: #999; font-style: italic;">
                🔍 No se encontraron jugadores con ese criterio de búsqueda
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
            let color = porcentaje >= 80 ? "#27ae60" : porcentaje >= 50 ? "#f39c12" : "#e74c3c";
            const posicion = posicionesGenerales[nino.nombre] || "-";

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="font-weight: bold; text-align: center; padding: 8px 3px; min-width: 60px;">${posicion}°</td>
                <td style="font-weight: 500; text-align: left;">${nino.nombre}</td>
                ${nino.asistencias.map(a => `<td style="text-align: center;">${a}</td>`).join('')}
                <td style="color:${color}; font-weight:bold; text-align: center;">${porcentaje.toFixed(0)}%</td>
            `;
            tr.addEventListener('mouseover', function() { this.style.backgroundColor = '#f8f9fa'; });
            tr.addEventListener('mouseout',  function() { this.style.backgroundColor = ''; });
            fragment.appendChild(tr);
        });
    }

    tbody.innerHTML = '';
    tbody.appendChild(fragment);
}

// ----- INICIALIZAR -----
document.addEventListener('DOMContentLoaded', function() {
    mesActual  = obtenerMesActual();
    mesViendo  = mesActual.indice;

    const thead = document.querySelector("#tabla-asistencias thead tr");
    if (thead) {
        const primeraTh = thead.querySelector('th');
        if (primeraTh && primeraTh.textContent !== 'Posición') {
            thead.insertAdjacentHTML('afterbegin', '<th style="min-width: 60px; padding: 10px 3px;">Posición</th>');
        }
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
                styles: { fontSize: 9, halign: "center", cellPadding: 3 },
                headStyles: { fillColor: [30, 60, 114], textColor: [255, 255, 255] },
                alternateRowStyles: { fillColor: [245, 245, 245] }
            });
            doc.save("Asistencias.pdf");
        });
    }
});

// ----- ESTILOS -----
if (!document.querySelector('#estilos-top10')) {
    const estilosTop10 = document.createElement('style');
    estilosTop10.id = 'estilos-top10';
    estilosTop10.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0);    opacity: 1; }
            to   { transform: translateX(100%); opacity: 0; }
        }

        .top-mensual-container {
            margin: 40px auto 20px;
            background: linear-gradient(135deg, #1a2a3a 0%, #0f1a24 100%);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            border: 1px solid rgba(212, 175, 55, 0.3);
            transform: translateZ(0);
        }

        .top-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(212, 175, 55, 0.3);
            flex-wrap: wrap;
            gap: 15px;
        }

        .top-titulo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .top-icon { font-size: 32px; }

        .top-titulo h3 {
            margin: 0;
            color: #D4AF37;
            font-size: 1.5em;
            font-weight: 700;
            letter-spacing: 1px;
        }

        /* Navegación de meses */
        .top-nav-meses {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .btn-nav-mes {
            background: rgba(212, 175, 55, 0.12);
            border: 1px solid rgba(212, 175, 55, 0.5);
            color: #D4AF37;
            width: 34px;
            height: 34px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-nav-mes:hover:not(:disabled) {
            background: rgba(212, 175, 55, 0.28);
            border-color: #D4AF37;
            transform: scale(1.08);
        }

        .btn-nav-mes:disabled {
            opacity: 0.25;
            cursor: default;
        }

        .top-mes-badge {
            background: rgba(212, 175, 55, 0.15);
            padding: 8px 18px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            gap: 8px;
            border: 1px solid rgba(212, 175, 55, 0.5);
            min-width: 160px;
            justify-content: center;
        }

        .mes-icon { font-size: 14px; }

        .top-mes-badge span:last-child {
            color: #D4AF37;
            font-weight: 600;
            font-size: 0.9em;
        }

        .top-lista {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
        }

        .top-item {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 12px 18px;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.2s;
            border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .top-item:hover {
            background: rgba(212, 175, 55, 0.1);
            transform: translateX(5px);
            border-color: #D4AF37;
        }

        .top-item.top-oro {
            background: linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
            border-left: 3px solid #D4AF37;
        }

        .top-item.top-plata { border-left: 3px solid #C0C0C0; }
        .top-item.top-bronce { border-left: 3px solid #CD7F32; }

        .top-posicion {
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 55px;
        }

        .posicion-numero {
            font-size: 1.3em;
            font-weight: bold;
            color: #D4AF37;
            width: 35px;
            text-align: center;
        }

        .medalla { font-size: 1.1em; }

        .top-info {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }

        .top-nombre {
            font-weight: 600;
            color: #ecf0f1;
            font-size: 1em;
        }

        .top-asistencias {
            background: rgba(212, 175, 55, 0.2);
            padding: 5px 14px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9em;
            color: #D4AF37;
        }

        .top-footer {
            text-align: center;
            padding-top: 15px;
            border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .auto-update {
            font-size: 0.8em;
            color: #95a5a6;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .no-data-mensual {
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
        }

        .no-data-icon {
            font-size: 48px;
            display: block;
            margin-bottom: 15px;
        }

        .no-data-mensual p {
            color: #D4AF37;
            font-size: 1em;
        }

        /* Buscador */
        .buscador-container {
            margin: 20px auto;
            max-width: 500px;
            position: relative;
        }

        .buscador-icono {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: #1e3c72;
        }

        .buscador-container input {
            width: 100%;
            padding: 12px 15px 12px 45px;
            border: 2px solid #e0e0e0;
            border-radius: 50px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s;
            background: white;
        }

        .buscador-container input:focus {
            border-color: #1e3c72;
            box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
        }

        .contador-resultados {
            margin-top: 8px;
            font-size: 13px;
            text-align: right;
            padding-right: 15px;
        }

        @media (max-width: 768px) {
            .top-mensual-container { padding: 18px; margin: 20px auto; }
            .top-titulo h3 { font-size: 1.2em; }
            .top-item { padding: 10px 15px; }
            .top-nombre { font-size: 0.9em; }
            .top-asistencias { font-size: 0.8em; padding: 4px 10px; }
            .posicion-numero { font-size: 1.1em; width: 30px; }
            .top-mes-badge { min-width: 140px; padding: 6px 12px; }
        }
    `;
    document.head.appendChild(estilosTop10);
}