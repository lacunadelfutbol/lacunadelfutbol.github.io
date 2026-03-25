// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    
    // ========== MENÚ LATERAL ==========
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        // Estado inicial del menú
        menu.style.left = "-250px";
        
        menuToggle.addEventListener("click", function() {
            if (menu.style.left === "-250px") {
                menu.style.left = "0";
            } else {
                menu.style.left = "-250px";
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const menuLinks = menu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.addEventListener("click", function() {
                menu.style.left = "-250px";
            });
        });
    }

    // ========== CONTADORES CON ANIMACIÓN ==========
    const counters = document.querySelectorAll('.counter-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    };
    
    // Intersection Observer para activar contadores al hacer scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
    
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
            
            // Animación de fade out/in
            motivationText.style.opacity = '0';
            motivationAuthor.style.opacity = '0';
            
            setTimeout(() => {
                motivationText.textContent = newMessage.text;
                motivationAuthor.textContent = newMessage.author;
                motivationText.style.opacity = '1';
                motivationAuthor.style.opacity = '1';
            }, 300);
        });
    }
    
    // ========== EFECTO DE SCROLL SUAVE PARA ENLACES ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href !== "") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // ========== EFECTO DE PARALLAX EN HEADER ==========
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (header) {
            const scrolled = window.pageYOffset;
            header.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // ========== ANIMACIÓN DE TARJETAS AL HOVER (se maneja con CSS) ==========
    // Efecto de aparición al hacer scroll para las tarjetas
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.value-card, .counter-card, .welcome-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Aplicar clase inicial para animación CSS
    const cards = document.querySelectorAll('.value-card, .counter-card');
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
});