// Gráfico de Trabajo en Equipo
const ctxTrabajoEquipo = document.getElementById('trabajoEquipoChart').getContext('2d');
const trabajoEquipoChart = new Chart(ctxTrabajoEquipo, {
    type: 'bar',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Trabajo en Equipo',
            data: [50, 60, 75, 85], // Datos de ejemplo, puedes personalizarlos
            backgroundColor: 'rgba(66, 133, 244, 0.6)',
            borderColor: 'rgba(66, 133, 244, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Mejora en el Trabajo en Equipo'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'Mejora en la colaboración y comunicación del equipo';
                    }
                }
            }
        }
    }
});

// Gráfico de Desarrollo de Fuerza
const ctxFuerza = document.getElementById('fuerzaChart').getContext('2d');
const fuerzaChart = new Chart(ctxFuerza, {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Desarrollo de Fuerza',
            data: [40, 55, 70, 90], // Datos de ejemplo, puedes personalizarlos
            fill: false,
            borderColor: 'rgba(255, 87, 34, 1)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Aumento de la Fuerza Muscular'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'Mejora de la fuerza y resistencia física';
                    }
                }
            }
        }
    }
});

// Gráfico de Mejora de Coordinación
const ctxCoordinacion = document.getElementById('coordinacionChart').getContext('2d');
const coordinacionChart = new Chart(ctxCoordinacion, {
    type: 'radar',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Coordinación',
            data: [45, 60, 80, 90], // Datos de ejemplo, puedes personalizarlos
            backgroundColor: 'rgba(255, 193, 7, 0.3)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Mejora en la Coordinación Motriz'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'Mejora de habilidades motrices y equilibrio';
                    }
                }
            }
        }
    }
});

// Gráfico de Aumento de Actividad General
const ctxActividad = document.getElementById('actividadChart').getContext('2d');
const actividadChart = new Chart(ctxActividad, {
    type: 'pie',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Actividad General',
            data: [30, 50, 70, 85], // Datos de ejemplo, puedes personalizarlos
            backgroundColor: ['rgba(76, 175, 80, 0.6)', 'rgba(233, 30, 99, 0.6)', 'rgba(255, 193, 7, 0.6)', 'rgba(33, 150, 243, 0.6)'],
            borderColor: ['rgba(76, 175, 80, 1)', 'rgba(233, 30, 99, 1)', 'rgba(255, 193, 7, 1)', 'rgba(33, 150, 243, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Aumento en la Actividad General'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'Incremento en la actividad física y resistencia cardiovascular';
                    }
                }
            }
        }
    }
});

    // Función para alternar el estado del menú (mostrar u ocultar)
    document.getElementById("menu-toggle").addEventListener("click", function() {
        var menu = document.getElementById("menu");
        if (menu.style.left === "-250px") {
            menu.style.left = "0";  // Mostrar el menú
        } else {
            menu.style.left = "-250px";  // Ocultar el menú
        }
    });