document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    alert(`Buscando por: "${query}"`);
                    
                }
            }
        });
    }

    const nextButtons = document.querySelectorAll('.next-btn');

    nextButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
           
            const carousel = event.target.closest('.books-carousel');
            if (carousel) {
                
                carousel.scrollBy({ left: 150, behavior: 'smooth' });
            }
        });
    });

    const btnEntrar = document.querySelectorAll('.btn-yellow')[0];
    const btnCriarConta = document.querySelectorAll('.btn-yellow')[1];

    if (btnEntrar) {
        btnEntrar.addEventListener('click', () => {
            alert('Abrir tela de login');
        });
    }

    if (btnCriarConta) {
        btnCriarConta.addEventListener('click', () => {
            alert('Abrir tela de cadastro');
        });
    }

    const pills = document.querySelectorAll('.pill, .yellow-box li');

    pills.forEach((item) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const categoria = item.textContent.replace(/[🌸🌹]/g, '').trim();
            alert(`Filtrando pela categoria: ${categoria}`);
        });
    });

    const cartBtn = document.querySelector('.cart-btn');
    const starBtn = document.querySelector('.star-btn');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert('Abrindo carrinho de compras...');
        });
    }

    if (starBtn) {
        starBtn.addEventListener('click', () => {
            alert('Abrindo lista de favoritos...');
        });
    }

});