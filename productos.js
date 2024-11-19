
function sendWhatsApp(productName) {
  const message = encodeURIComponent(`Hola, me gustaría consultar la disponibilidad del producto: ${productName}`);
  window.open(`https://wa.me/50487934720?text=${message}`);
}

// Manejar filtros de categoría
let currentCategory = 'todos';
let searchTerm = '';

document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', () => {
      document.querySelector('.category-btn.active').classList.remove('active');
      button.classList.add('active');
      currentCategory = button.dataset.category;
      filterProducts();
  });
});

// Manejar búsqueda
document.querySelector('.search-input').addEventListener('input', (e) => {
  searchTerm = e.target.value.toLowerCase();
  filterProducts();
});

// Función para filtrar productos
function filterProducts() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const description = card.querySelector('.card-description').textContent.toLowerCase();
      const category = card.dataset.category;
      
      const matchesCategory = currentCategory === 'todos' || category === currentCategory;
      const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
      
      if (matchesCategory && matchesSearch) {
          card.style.display = '';
      } else {
          card.style.display = 'none';
      }
  });
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
