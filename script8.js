    // Función para alternar el estado del menú (mostrar u ocultar)
    document.getElementById("menu-toggle").addEventListener("click", function() {
        var menu = document.getElementById("menu");
        if (menu.style.left === "-250px") {
            menu.style.left = "0";  // Mostrar el menú
        } else {
            menu.style.left = "-250px";  // Ocultar el menú
        }
    });
    const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Verifica si hay una preferencia guardada
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Modo Claro";
}

// Función para cambiar de tema
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Modo Claro";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Modo Noche";
    }
});
