// comparison.js
document.addEventListener('DOMContentLoaded', () => {
    const comparison = document.querySelector('.image-comparison');
    const resizer = comparison.querySelector('.resizer-slider');
    const itemBefore = comparison.querySelector('.item-before');
    let isResizing = false;

    // Funciones auxiliares
    const calculatePercentage = (event) => {
        const rect = comparison.getBoundingClientRect();
        let percentage = ((event.clientX - rect.left) / rect.width) * 100;
        return Math.min(Math.max(percentage, 0), 100);
    };

    const updatePosition = (percentage) => {
        itemBefore.style.width = `${percentage}%`;
        resizer.style.left = `${percentage}%`;
    };

    // Event listeners para mouse
    resizer.addEventListener('mousedown', () => {
        isResizing = true;
    });

    window.addEventListener('mousemove', (event) => {
        if (!isResizing) return;
        updatePosition(calculatePercentage(event));
    });

    window.addEventListener('mouseup', () => {
        isResizing = false;
    });

    // Event listeners para touch
    resizer.addEventListener('touchstart', () => {
        isResizing = true;
    });

    window.addEventListener('touchmove', (event) => {
        if (!isResizing) return;
        event.preventDefault();
        const touch = event.touches[0];
        updatePosition(calculatePercentage(touch));
    });

    window.addEventListener('touchend', () => {
        isResizing = false;
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

  document.addEventListener('DOMContentLoaded', function() {
    const scrollTopButton = document.getElementById('scroll-top');
    
    // Mostrar/ocultar el botón basado en el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { // Mostrar después de 300px de scroll
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    // Funcionalidad de scroll al hacer clic
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
  });