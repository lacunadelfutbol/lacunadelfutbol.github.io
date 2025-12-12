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
const TOTAL_ASISTENCIAS_POSIBLES = 22;

// ----- Datos de ejemplo -----
const jugadores = [
    { nombre: "YEIK SOLIS", asistencias: [5,7,6,4,0,0,0,0,0,0,0,0] },
    { nombre: "ALEXANDER SOLIS", asistencias: [5,6,6,4,0,0,0,0,0,0,0,0] },
    { nombre: "MATEO RODRIGUEZ", asistencias: [2,5,4,4,0,0,0,0,0,0,0,0] },
    { nombre: "ALAN MELO", asistencias: [4,7,3,2,0,0,0,0,0,0,0,0] },
    { nombre: "MICHEL MORALES", asistencias: [3,6,2,3,0,0,0,0,0,0,0,0] },
    { nombre: "ARTURO TREJO", asistencias: [4,2,2,2,0,0,0,0,0,0,0,0] },
    { nombre: "KARIM VALENCIA", asistencias: [2,6,4,2,0,0,0,0,0,0,0,0] },
    { nombre: "JOSMAR VALENCIA", asistencias: [2,6,4,2,0,0,0,0,0,0,0,0] },
    { nombre: "AXEL PELCASTRE", asistencias: [3,4,3,4,0,0,0,0,0,0,0,0] },
    { nombre: "SANTIAGO PECASTRE", asistencias: [3,4,3,4,0,0,0,0,0,0,0,0] },
    { nombre: "DYLAN RIVERA", asistencias: [2,5,3,4,0,0,0,0,0,0,0,0] },
    { nombre: "DIEGO RIVERA", asistencias: [2,5,2,4,0,0,0,0,0,0,0,0] },
    { nombre: "LEO", asistencias: [1,0,1,0,0,0,0,0,0,0,0,0] },
    { nombre: "FERNANDO ANGELES", asistencias: [3,7,3,4,0,0,0,0,0,0,0,0] },
    { nombre: "GABRIEL HERNANDEZ", asistencias: [3,2,2,1,0,0,0,0,0,0,0,0] },
    { nombre: "BARUSH AMADOR", asistencias: [1,2,4,2,0,0,0,0,0,0,0,0] },
    { nombre: "ALAIN AMADOR", asistencias: [3,6,4,4,0,0,0,0,0,0,0,0] },
    { nombre: "ALEXIS HERNANDEZ", asistencias: [4,5,3,2,0,0,0,0,0,0,0,0] },
    { nombre: "FRANKI AMADOR", asistencias: [2,7,4,2,0,0,0,0,0,0,0,0] },
    { nombre: "CRISTOPHER ZARCO", asistencias: [3,4,3,2,0,0,0,0,0,0,0,0] },
    { nombre: "ANGEL PEREZ", asistencias: [3,4,3,2,0,0,0,0,0,0,0,0] },
    { nombre: "EDWIN LARES", asistencias: [0,2,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "MATI HERNANDEZ", asistencias: [1,2,2,0,0,0,0,0,0,0,0,0] },
    { nombre: "SANTI HERNANDEZ", asistencias: [1,2,2,0,0,0,0,0,0,0,0,0] },
    { nombre: "GERARDO GONZALEZ", asistencias: [0,0,2,0,0,0,0,0,0,0,0,0] },
    { nombre: "IAN CASTILLO", asistencias: [1,5,2,2,0,0,0,0,0,0,0,0] },
    { nombre: "RICARDO CASTILLO", asistencias: [1,5,2,2,0,0,0,0,0,0,0,0] },
    { nombre: "ADRIAN SIERRA", asistencias: [1,7,2,3,0,0,0,0,0,0,0,0] },
    { nombre: "YASID MARTINEZ", asistencias: [1,2,3,0,0,0,0,0,0,0,0,0] },
    { nombre: "EDGAR ROBERTO", asistencias: [0,0,3,3,0,0,0,0,0,0,0,0] }
];

// Variable global para jugadores filtrados
let jugadoresFiltrados = [...jugadores];

// ----- BÚSQUEDA SIMPLE Y MINIMALISTA -----
function crearBuscadorMinimalista() {
    // Crear contenedor del buscador minimalista
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
    
    // Insertar el buscador después del h2
    const h2 = document.querySelector('section h2');
    h2.insertAdjacentHTML('afterend', buscadorHTML);
    
    // Elementos del DOM
    const inputBuscador = document.getElementById('inputBuscador');
    const contadorDiv = document.getElementById('contadorResultados');
    
    // Función para filtrar jugadores
    function filtrarJugadores(textoBusqueda) {
        const textoBusquedaUpper = textoBusqueda.toUpperCase().trim();
        
        if (!textoBusquedaUpper) {
            // Si no hay texto, mostrar todos
            jugadoresFiltrados = [...jugadores];
            contadorDiv.textContent = `Mostrando ${jugadores.length} jugadores`;
            contadorDiv.style.color = '#666';
        } else {
            // Búsqueda parcial en cualquier parte del nombre
            jugadoresFiltrados = jugadores.filter(jugador => 
                jugador.nombre.toUpperCase().includes(textoBusquedaUpper)
            );
            
            // Actualizar contador
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
        
        // Renderizar tabla con resultados
        renderizarTabla();
    }
    
    // Evento para input de búsqueda (en tiempo real)
    inputBuscador.addEventListener('input', function(e) {
        filtrarJugadores(e.target.value);
    });
    
    // Evento para limpiar con la tecla Escape
    inputBuscador.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filtrarJugadores('');
        }
    });
}

// ----- Función para calcular posición con empates -----
function calcularPosiciones(jugadoresOrdenados) {
    let posicion = 1;
    let posiciones = [];
    let porcentajeAnterior = null;
    let posicionAnterior = 1;
    
    for (let i = 0; i < jugadoresOrdenados.length; i++) {
        const totalAsistencias = jugadoresOrdenados[i].asistencias.reduce((a, b) => a + b, 0);
        const porcentajeActual = (totalAsistencias / TOTAL_ASISTENCIAS_POSIBLES) * 100;
        
        // Si es el primer jugador o el porcentaje es diferente al anterior
        if (porcentajeAnterior === null || porcentajeActual !== porcentajeAnterior) {
            posicion = i + 1;
            posicionAnterior = posicion;
        } else {
            // Mismo porcentaje que el anterior → misma posición
            posicion = posicionAnterior;
        }
        
        posiciones.push(posicion);
        porcentajeAnterior = porcentajeActual;
    }
    
    return posiciones;
}

// ----- Función para renderizar tabla -----
function renderizarTabla() {
    const tbody = document.querySelector("#tabla-asistencias tbody");
    tbody.innerHTML = '';
    
    if (jugadoresFiltrados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="15" style="text-align: center; padding: 30px; color: #666; font-style: italic;">
                    No se encontraron jugadores con ese criterio de búsqueda
                </td>
            </tr>
        `;
        return;
    }
    
    // Ordenar jugadores filtrados por porcentaje (de mayor a menor)
    const jugadoresOrdenados = [...jugadoresFiltrados].sort((a, b) => {
        const totalA = a.asistencias.reduce((sum, asistencia) => sum + asistencia, 0);
        const totalB = b.asistencias.reduce((sum, asistencia) => sum + asistencia, 0);
        const porcentajeA = (totalA / TOTAL_ASISTENCIAS_POSIBLES) * 100;
        const porcentajeB = (totalB / TOTAL_ASISTENCIAS_POSIBLES) * 100;
        return porcentajeB - porcentajeA;
    });
    
    // Calcular posiciones (con empates)
    const posiciones = calcularPosiciones(jugadoresOrdenados);
    
    // Llenar tabla
    jugadoresOrdenados.forEach((nino, index) => {
        const totalAsistencias = nino.asistencias.reduce((a, b) => a + b, 0);
        const porcentaje = (totalAsistencias / TOTAL_ASISTENCIAS_POSIBLES) * 100;
        let color = porcentaje >= 80 ? "green" : porcentaje >= 50 ? "orange" : "red";
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="font-weight: bold; text-align: center; padding: 6px 3px; min-width: 50px;">${posiciones[index]}°</td>
            <td>${nino.nombre}</td>
            ${nino.asistencias.map(a => `<td>${a}</td>`).join('')}
            <td style="color:${color}; font-weight:bold;">${porcentaje.toFixed(0)}%</td>
        `;
        
        // Añadir efecto hover (igual que antes)
        tr.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#f0f8ff';
        });
        
        tr.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
        });
        
        tbody.appendChild(tr);
    });
}

// ----- Inicializar -----
document.addEventListener('DOMContentLoaded', function() {
    // Primero, agregar la columna "Posición" al encabezado de la tabla
    const thead = document.querySelector("#tabla-asistencias thead tr");
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
    
    // Crear el buscador minimalista
    crearBuscadorMinimalista();
    
    // Renderizar tabla inicial
    renderizarTabla();
    
    // Botón de descarga PDF
    document.getElementById("descargarPDF").addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título
        doc.setFontSize(18);
        doc.text("Registro de Asistencias", 14, 20);
        doc.setFontSize(10);
        doc.text(`Total de asistencias posibles: ${TOTAL_ASISTENCIAS_POSIBLES}`, 14, 28);

        // Convertir la tabla HTML a PDF
        doc.autoTable({
            html: "#tabla-asistencias",
            startY: 30,
            styles: { fontSize: 10, halign: "center" },
            headStyles: { fillColor: [41, 128, 185] }, // Azul FIFA
        });

        // Guardar
        doc.save("Asistencias.pdf");
    });
});