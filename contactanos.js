// Manejar el envío del formulario
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');

// Animar el nombre de la empresa cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    const companyName = document.querySelector('.company-name');
    const companySlogan = document.querySelector('.company-slogan');
    
    if (companyName) {
        companyName.style.opacity = '0';
        setTimeout(() => {
            companyName.style.opacity = '1';
            companyName.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (companySlogan) {
        companySlogan.style.opacity = '0';
        setTimeout(() => {
            companySlogan.style.opacity = '1';
            companySlogan.style.transform = 'translateY(0)';
        }, 600);
    }
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validar el formulario
    if (!validateForm()) {
        return;
    }

    // Animación de envío
    submitBtn.querySelector('span').style.opacity = '0';
    submitBtn.querySelector('.success-animation').style.display = 'block';

    // Simular envío del formulario
    setTimeout(() => {
        // Aquí iría el código para enviar los datos al servidor
        showSuccessMessage();
        resetForm();
    }, 2000);
});

// Validación del formulario
function validateForm() {
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input);
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            showError(input, 'Por favor, ingrese un email válido');
        } else if (input.id === 'phone' && !validatePhone(input.value)) {
            isValid = false;
            showError(input, 'Por favor, ingrese un teléfono válido');
        } else {
            removeError(input);
        }
    });

    return isValid;
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validar teléfono
function validatePhone(phone) {
    const re = /^\d{2}-\d{2}-\d{2}-\d{2}$/;
    return re.test(phone);
}


// Mostrar error en campo
function showError(input, message = 'Este campo es requerido') {
    input.style.borderColor = '#ff4444';
    removeError(input); // Remover mensaje de error anterior si existe
    
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = '#ff4444';
    errorMessage.style.fontSize = '0.8em';
    errorMessage.style.marginTop = '5px';
    errorMessage.style.display = 'block';
    
    input.parentNode.appendChild(errorMessage);
}

// Remover error de campo
function removeError(input) {
    input.style.borderColor = '#ddd';
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Mensaje enviado con éxito!';
    successMessage.style.backgroundColor = '#4CAF50';
    successMessage.style.color = 'white';
    successMessage.style.padding = '15px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.marginBottom = '20px';
    successMessage.style.textAlign = 'center';
    successMessage.style.animation = 'fadeIn 0.5s ease-out';
    
    contactForm.parentNode.insertBefore(successMessage, contactForm);

    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 3000);
}

// Resetear formulario
function resetForm() {
    contactForm.reset();
    submitBtn.querySelector('span').style.opacity = '1';
    submitBtn.querySelector('.success-animation').style.display = 'none';
}

// Validación en tiempo real
const inputs = contactForm.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            removeError(this);
        }
    });
});

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function (e) {
    // Remueve cualquier carácter que no sea un número
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/);
    // Aplica el formato deseado
    e.target.value = !x[2]
        ? x[1]
        : `${x[1]}-${x[2]}${x[3] ? `-${x[3]}` : ''}${x[4] ? `-${x[4]}` : ''}`;
});


// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', function() {
    const testimonials = [
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, quam. Odio voluptatem officiis eos illo! Pariatur, totam alias. Beatae accusamus earum quos obcaecati minima molestias. Possimus minima dolores itaque! Esse!",
            author: "Mia Brown",
            position: "Marketer",
            image: "https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
        },
        {
            text: "Otro testimonio de ejemplo aquí...",
            author: "John Doe",
            position: "Developer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
        }
    ];

    let currentTestimonialIndex = 0;
    const testimonialText = document.querySelector('.testimonial-text');
    const authorImage = document.querySelector('.testimonial-author img');
    const authorName = document.querySelector('.author-info h2');
    const authorPosition = document.querySelector('.author-info span');
    const prevButton = document.querySelector('.left-arrow');
    const nextButton = document.querySelector('.right-arrow');

    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        testimonialText.textContent = testimonial.text;
        authorImage.src = testimonial.image;
        authorName.textContent = testimonial.author;
        authorPosition.textContent = testimonial.position;
    }

    prevButton.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonialIndex);
    });

    nextButton.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonial(currentTestimonialIndex);
    });
});

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

  // Inicializar EmailJS
emailjs.init('QFmCgjEtlAH0FRtiy'); // Reemplaza con tu Public Key de EmailJS

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const formData = new FormData(contactForm); // Captura los datos del formulario
    const formObject = Object.fromEntries(formData.entries()); // Convierte los datos a un objeto

    // Mostrar animación de envío
    submitBtn.querySelector('span').style.opacity = '0';
    submitBtn.querySelector('.success-animation').style.display = 'block';

    // Enviar datos a EmailJS
    emailjs.send('service_x1eq9j5', 'template_st7g03a', formObject)
        .then(response => {
            console.log('¡Correo enviado!', response.status, response.text);
            showSuccessMessage();
            resetForm();
        })
        .catch(err => {
            console.error('Error al enviar correo:', err);
            showErrorMessage('Ocurrió un error al enviar el mensaje. Intenta de nuevo.');
        })
        .finally(() => {
            submitBtn.querySelector('span').style.opacity = '1';
            submitBtn.querySelector('.success-animation').style.display = 'none';
        });
});

// Mostrar mensaje de error
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.backgroundColor = '#ff4444';
    errorMessage.style.color = 'white';
    errorMessage.style.padding = '15px';
    errorMessage.style.borderRadius = '5px';
    errorMessage.style.marginBottom = '20px';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.animation = 'fadeIn 0.5s ease-out';

    contactForm.parentNode.insertBefore(errorMessage, contactForm);

    setTimeout(() => {
        errorMessage.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            errorMessage.remove();
        }, 500);
    }, 3000);
}
