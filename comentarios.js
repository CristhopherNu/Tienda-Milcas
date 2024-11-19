document.getElementById('comment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;
    const rating = document.getElementById('rating').value;
    const photo = document.getElementById('photo').files[0];
    
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    const photoURL = photo ? URL.createObjectURL(photo) : '';
    
    // Generar estrellas
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>'; // Estrella llena
        } else {
            stars += '<i class="far fa-star"></i>'; // Estrella vacía
        }
    }

    commentElement.innerHTML = `
        <strong>${username}</strong> <span class="rating">(${stars})</span>
        <p>${comment}</p>
        ${photoURL ? `<img src="${photoURL}" alt="Comentario Photo">` : ''}
        <button class="like-button">Like</button>
        <span class="like-count">0</span>
    `;

    document.getElementById('comments-list').appendChild(commentElement);

    // Reset form
    this.reset();
});

