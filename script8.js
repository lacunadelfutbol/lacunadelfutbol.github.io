// Función para alternar el estado del menú (mostrar u ocultar)
document.getElementById("menu-toggle").addEventListener("click", function() {
    var menu = document.getElementById("menu");
    if (menu.style.left === "-250px") {
        menu.style.left = "0";  // Mostrar el menú
    } else {
        menu.style.left = "-250px";  // Ocultar el menú
    }
});

// ----- Datos de ejemplo -----
const jugadores = [
    { nombre: "YEIK SOLIS", asistencias: [5,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "ALEXANDER SOLIS", asistencias: [5,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "MATEO RODRIGUEZ", asistencias: [2,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "ALAN MELO", asistencias: [4,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "MICHEL MORALES", asistencias: [3,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "ARTURO TREJO", asistencias: [4,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "KARIM VALENCIA", asistencias: [2,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "JOSMAR VALENCIA", asistencias: [2,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "AXEL PELCASTRE", asistencias: [3,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "SANTIAGO PECASTRE", asistencias: [3,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "DYLAN RIVERA", asistencias: [2,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "DIEGO RIVERA", asistencias: [2,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "LEO", asistencias: [1,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "FERNANDO ANGELES", asistencias: [3,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "GABRIEL HERNANDEZ", asistencias: [3,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "BARUSH AMADOR", asistencias: [1,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "ALAIN AMADOR", asistencias: [3,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "ALEXIS HERNANDEZ", asistencias: [4,1,0,0,0,0,0,0,0,0,0,0] },
    // Los que no asistieron
    { nombre: "FRANKI AMADOR", asistencias: [2,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "CRISTOPHER ZARCO", asistencias: [3,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "ANGEL PEREZ", asistencias: [3,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "IKER RODRIGUEZ", asistencias: [0,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "EDWIN LARES", asistencias: [0,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "MATI HERNANDEZ", asistencias: [1,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "SANTI HERNANDEZ", asistencias: [1,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "GERARDO GONZALEZ", asistencias: [0,0,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "IAN CASTILLO", asistencias: [1,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "RICARDO CASTILLO", asistencias: [1,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "ADRIAN SIERRA", asistencias: [1,1,0,0,0,0,0,0,0,0,0,0] },
    { nombre: "YASID MARTINEZ", asistencias: [1,1,0,0,0,0,0,0,0,0,0,0] }
];

// ----- Llenar tabla -----
const tbody = document.querySelector("#tabla-asistencias tbody");
jugadores.forEach(nino => {
    const totalMeses = nino.asistencias.length;
    const totalAsistencias = nino.asistencias.reduce((a,b) => a+b, 0);
    const porcentaje = (totalAsistencias / totalMeses) * 100;

    let color = porcentaje >= 80 ? "green" : porcentaje >= 50 ? "orange" : "red";

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${nino.nombre}</td>
        ${nino.asistencias.map(a => `<td>${a}</td>`).join('')}
        <td style="color:${color}; font-weight:bold;">${porcentaje.toFixed(0)}%</td>
    `;
    tbody.appendChild(tr);
});
// --- Descargar tabla como PDF ---
document.getElementById("descargarPDF").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Registro de Asistencias", 14, 20);

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