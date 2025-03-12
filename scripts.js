// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Gráfica 1: Partidos por semana recomendados
    const partidosCtx = document.getElementById('partidosChart').getContext('2d');
    const partidosChart = new Chart(partidosCtx, {
        type: 'bar',
        data: {
            labels: ['6-8 años', '9-10 años', '11-12 años'],
            datasets: [{
                label: 'Partidos por semana',
                data: [1, 2, 2],
                backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
                borderColor: ['#388E3C', '#FFA000', '#1976D2'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Partidos por semana'
                    }
                }
            }
        }
    });

    // Gráfica 2: Riesgo de lesiones
    const lesionesCtx = document.getElementById('lesionesChart').getContext('2d');
    const lesionesChart = new Chart(lesionesCtx, {
        type: 'bar',
        data: {
            labels: ['1 partido', '2 partidos', '3+ partidos'],
            datasets: [{
                label: 'Riesgo de lesiones (%)',
                data: [10, 20, 40],
                backgroundColor: ['#FFC107', '#FF9800', '#F44336'],
                borderColor: ['#FFA000', '#FB8C00', '#D32F2F'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Riesgo de lesiones (%)'
                    }
                }
            }
        }
    });

    // Gráfica 3: Actividad física recomendada
    const actividadCtx = document.getElementById('actividadChart').getContext('2d');
    const actividadChart = new Chart(actividadCtx, {
        type: 'bar',
        data: {
            labels: ['Fútbol', 'Juegos', 'Educación física'],
            datasets: [{
                label: 'Horas por semana',
                data: [4, 5, 3],
                backgroundColor: ['#4CAF50', '#2196F3', '#9C27B0'],
                borderColor: ['#388E3C', '#1976D2', '#7B1FA2'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Horas por semana'
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
});
