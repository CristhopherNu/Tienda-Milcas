document.addEventListener('DOMContentLoaded', function() {
    // Función para actualizar los contadores
    function updateCountdowns() {
        const countdownElements = document.querySelectorAll('.countdown');
        
        countdownElements.forEach(element => {
            let timeLeft = parseInt(element.dataset.time);
            
            if (timeLeft > 0) {
                timeLeft--;
                element.dataset.time = timeLeft;
                
                // Convertir segundos a formato HH:MM:SS
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;
                
                // Formatear con ceros a la izquierda
                const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                
                element.textContent = timeString;
            } else {
                element.textContent = '¡Oferta terminada!';
                element.style.color = '#999';
            }
        });
    }

    // Actualizar contadores cada segundo
    setInterval(updateCountdowns, 1000);

    // Animación suave al hacer hover en las tarjetas
    const cards = document.querySelectorAll('.discount-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animación del banner de texto
    const bannerContainer = document.querySelector('.banner-text-container');
    const bannerTexts = document.querySelectorAll('.banner-text');
    
    // Clonar los textos para crear un efecto infinito
    bannerTexts.forEach(text => {
        const clone = text.cloneNode(true);
        bannerContainer.appendChild(clone);
    });

    // Función para reiniciar la animación del banner
    function resetBannerAnimation() {
        bannerContainer.style.animation = 'none';
        bannerContainer.offsetHeight; // Trigger reflow
        bannerContainer.style.animation = null;
    }

    // Reiniciar la animación cuando termine
    bannerContainer.addEventListener('animationend', resetBannerAnimation);
});