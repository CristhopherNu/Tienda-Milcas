// Contenido detallado para cada sección
const detailedContent = {
    mission: {
        title: "Nuestra Misión",
        content: `
            <p>Nuestra misión es proporcionar soluciones innovadoras y servicios excepcionales que superen las expectativas de nuestros clientes, mientras contribuimos al desarrollo sostenible de nuestra comunidad.</p>
            <h4>Compromisos clave:</h4>
            <ul>
                <li>Excelencia en el servicio al cliente</li>
                <li>Innovación continua</li>
                <li>Desarrollo sostenible</li>
                <li>Impacto social positivo</li>
            </ul>
        `
    },
    vision: {
        title: "Nuestra Visión",
        content: `
            <p>Aspiramos a ser líderes reconocidos en nuestro sector, destacando por:</p>
            <ul>
                <li>Excelencia operativa</li>
                <li>Innovación constante</li>
                <li>Compromiso con clientes</li>
                <li>Desarrollo de talento</li>
            </ul>
            <p>Buscamos crear un impacto duradero en la industria y en la sociedad.</p>
        `
    },
    objectives: {
        title: "Nuestros Objetivos",
        content: `
            <h4>Objetivos Estratégicos:</h4>
            <ul>
                <li>Expandir nuestra presencia en el mercado nacional e internacional</li>
                <li>Desarrollar nuevos productos y servicios innovadores</li>
                <li>Mantener un índice de satisfacción del cliente superior al 95%</li>
                <li>Reducir nuestra huella de carbono en un 50% para 2025</li>
            </ul>
            <h4>Objetivos Operativos:</h4>
            <ul>
                <li>Optimizar procesos internos</li>
                <li>Implementar tecnologías emergentes</li>
                <li>Desarrollar talento interno</li>
                <li>Fortalecer relaciones con stakeholders</li>
            </ul>
        `
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.about-card');
    const modal = document.getElementById('infoModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');

    // Añadir animación al hacer scroll
    window.addEventListener('scroll', function() {
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if(cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Manejar clicks en los botones "Leer más"
    cards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        const cardType = card.dataset.type;

        readMoreBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir que el click llegue a la card
            modalTitle.textContent = detailedContent[cardType].title;
            modalBody.innerHTML = detailedContent[cardType].content;
            modal.style.display = 'block';
            
            // Añadir clase para animación
            modalBody.classList.add('fade-in');
        });
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Añadir efecto hover 3D a las cards
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const angleY = -(e.pageX - cardCenterX) / 20;
            const angleX = (e.pageY - cardCenterY) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// Añadir efectos de animación al scroll
function addScrollAnimation() {
    const cards = document.querySelectorAll('.about-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.5s ease ${index * 0.2}s`;
    });
}

// Inicializar animaciones
addScrollAnimation();


document.addEventListener('DOMContentLoaded', () => {
    // Manejo del botón scroll to top
    const scrollTopButton = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Manejo del formulario newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Aquí normalmente irían las validaciones y el envío al servidor
        // Por ahora solo mostraremos una alerta
        alert(`¡Gracias por suscribirte! ${email}`);
        e.target.reset();
    });

    // Animación suave para los enlaces rápidos
    const quickLinks = document.querySelectorAll('.quick-links a');
    
    quickLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Aquí puedes agregar la lógica de navegación
            console.log(`Navegando a: ${href}`);
        });
    });
});


function animateNumber(element, target) {
    let current = 0;
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60fps

    function update() {
      current += step;
      if (current > target) {
        current = target;
      }
      element.textContent = Math.floor(current);
      
      if (current < target) {
        requestAnimationFrame(update);
      }
    }

    update();
  }

  // Iniciar animaciones cuando los elementos sean visibles
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statsElements = document.querySelectorAll('.stat-number');
        statsElements.forEach(element => {
          const target = parseInt(element.getAttribute('data-count'));
          animateNumber(element, target);
        });
        observer.disconnect();
      }
    });
  });

  observer.observe(document.querySelector('.stats-container'));

  // Añadir interactividad a las etiquetas de habilidades
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.style.backgroundColor = getRandomColor();
    });
  });

  function getRandomColor() {
    const colors = ['#FFE0E0', '#E0FFE0', '#E0E0FF', '#FFE0FF', '#FFFFE0'];
    return colors[Math.floor(Math.random() * colors.length)];
  }