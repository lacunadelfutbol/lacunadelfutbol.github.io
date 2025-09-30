    // Función para alternar el estado del menú (mostrar u ocultar)
    document.getElementById("menu-toggle").addEventListener("click", function() {
        var menu = document.getElementById("menu");
        if (menu.style.left === "-250px") {
            menu.style.left = "0";  // Mostrar el menú
        } else {
            menu.style.left = "-250px";  // Ocultar el menú
        }
    });
    // Opcional: ocultar botón al hacer scroll hacia abajo y mostrar al hacer scroll hacia arriba
(() => {
  const fb = document.getElementById('fb-float');
  if (!fb) return;
  let lastScroll = window.scrollY || 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY || 0;
    if (current > lastScroll && current > 120) {
      // scrolleando hacia abajo -> ocultar
      fb.style.transform = 'translateY(30px)';
      fb.style.opacity = '0';
      fb.style.pointerEvents = 'none';
    } else {
      // scrolleando hacia arriba -> mostrar
      fb.style.transform = 'translateY(0)';
      fb.style.opacity = '1';
      fb.style.pointerEvents = 'auto';
    }
    lastScroll = current;
  }, { passive: true });
})();
