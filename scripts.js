// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    
    // ========== MENÚ LATERAL ==========
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menu.style.left = "-250px";
        
        menuToggle.addEventListener("click", function() {
            if (menu.style.left === "-250px") {
                menu.style.left = "0";
            } else {
                menu.style.left = "-250px";
            }
        });
        
        const menuLinks = menu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.addEventListener("click", function() {
                menu.style.left = "-250px";
            });
        });
    }

    // ========== CONTADORES OPTIMIZADOS (sin requestAnimationFrame pesado) ==========
    const counters = document.querySelectorAll('.counter-number');
    let countersActivated = false;
    
    const animateCounters = () => {
        if (countersActivated) return;
        countersActivated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const duration = 1500; // 1.5 segundos
            const stepTime = 20; // 20ms por paso
            const steps = duration / stepTime;
            const increment = target / steps;
            
            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(interval);
                } else {
                    counter.innerText = Math.floor(current);
                }
            }, stepTime);
        });
    };
    
    // Usar Intersection Observer solo para activar contadores UNA VEZ
    const observerOptions = {
        threshold: 0.3,
        rootMargin: "0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // Desconectar después de activar
            }
        });
    }, observerOptions);
    
    // Observar la sección de contadores
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }
    
    // ========== MENSAJE MOTIVACIONAL INTERACTIVO ==========
    const messages = [
        { text: "El éxito no es casualidad, es trabajo duro, perseverancia, aprendizaje, sacrificio y amor por lo que haces.", author: "- Johan Cruyff" },
        { text: "La única manera de hacer un gran trabajo es amar lo que haces.", author: "- Steve Jobs" },
        { text: "Nunca te rindas, porque los grandes resultados requieren de un gran esfuerzo.", author: "- Lionel Messi" },
        { text: "El fútbol se juega con la cabeza. Los pies son solo las herramientas.", author: "- Andrés Iniesta" },
        { text: "La diferencia entre lo posible y lo imposible está en la determinación de una persona.", author: "- Tommy Lasorda" },
        { text: "Sueña, cree, trabaja, lucha, triunfa. Todo es posible con pasión.", author: "- Cristiano Ronaldo" },
        { text: "El talento gana partidos, pero el trabajo en equipo gana campeonatos.", author: "- Michael Jordan" }
    ];
    
    let currentIndex = 0;
    const motivationText = document.getElementById('motivation-text');
    const motivationAuthor = document.getElementById('motivation-author');
    const changeBtn = document.getElementById('change-message-btn');
    
    if (changeBtn && motivationText && motivationAuthor) {
        changeBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % messages.length;
            const newMessage = messages[currentIndex];
            
            motivationText.style.opacity = '0';
            motivationAuthor.style.opacity = '0';
            
            setTimeout(() => {
                motivationText.textContent = newMessage.text;
                motivationAuthor.textContent = newMessage.author;
                motivationText.style.opacity = '1';
                motivationAuthor.style.opacity = '1';
            }, 200);
        });
    }
    
    // ========== ANIMACIÓN SIMPLE AL HACER SCROLL (sin eventos pesados) ==========
    const cards = document.querySelectorAll('.value-card, .counter-card, .welcome-card');
    
    const checkVisibility = () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            if (isVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Estado inicial
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar una vez y en scroll (sin throttle para mantenerlo simple pero ligero)
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});