document.addEventListener('DOMContentLoaded', () => {
    // Busca na barra de pesquisa ao premir "Enter"
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    alert(`A pesquisar por: "${query}"`);
                }
            }
        });
    }


    // Funcionalidade de deslocamento suave para todos os carrosséis de livros
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const carousel = event.target.closest('.books-carousel');
            if (carousel) {
                carousel.scrollBy({ left: 150, behavior: 'smooth' });
            }
        });
    });


    // Botões do cabeçalho (Entrar e Criar Conta)
    const btnEntrar = document.querySelectorAll('.btn-yellow')[0];
    const btnCriarConta = document.querySelectorAll('.btn-yellow')[1];


    if (btnEntrar) {
        btnEntrar.addEventListener('click', () => {
            alert('A abrir ecrã de login');
        });
    }


    if (btnCriarConta) {
        btnCriarConta.addEventListener('click', () => {
            alert('A abrir ecrã de registo');
        });
    }


    // Filtros por categorias (Pills e lista amarela)
    const pills = document.querySelectorAll('.pill, .yellow-box li');
    pills.forEach((item) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const categoria = item.textContent.replace(/[🌸🌹]/g, '').trim();
            alert(`A filtrar pela categoria: ${categoria}`);
        });
    });


    // Ícones do carrinho e favoritos
    const cartBtn = document.querySelector('.cart-btn');
    const starBtn = document.querySelector('.star-btn');


    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert('A abrir carrinho de compras...');
        });
    }


    if (starBtn) {
        starBtn.addEventListener('click', () => {
            alert('A abrir lista de favoritos...');
        });
    }
});
