    // Función para alternar el estado del menú (mostrar u ocultar)
    document.getElementById("menu-toggle").addEventListener("click", function() {
        var menu = document.getElementById("menu");
        if (menu.style.left === "-250px") {
            menu.style.left = "0";  // Mostrar el menú
        } else {
            menu.style.left = "-250px";  // Ocultar el menú
        }
    });