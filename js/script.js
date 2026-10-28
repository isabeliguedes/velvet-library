document.addEventListener('DOMContentLoaded', () => {


    // Seleciona o Modal e seus elementos internos
    const customModal = document.getElementById('customModal');
    const closeBtn = document.querySelector('.custom-close-btn');


    const modalBookTitle = document.getElementById('modalBookTitle');
    const modalBookAuthor = document.getElementById('modalBookAuthor');
    const modalBookStars = document.getElementById('modalBookStars');
    const modalBookPrice = document.getElementById('modalBookPrice');
    const modalBookCover = document.getElementById('modalBookCover');
    const modalBookSynopsis = document.getElementById('modalBookSynopsis');


    // Seleciona todos os livros da página
    const bookCards = document.querySelectorAll('.book-card');


    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            // Pega os atributos salvos no HTML do livro
            const title = card.getAttribute('data-title');
            const author = card.getAttribute('data-author');
            const stars = parseInt(card.getAttribute('data-stars')) || 5;
            const price = card.getAttribute('data-price');
            const cover = card.getAttribute('data-cover');
            const synopsis = card.getAttribute('data-synopsis');


            // Insere os dados dentro do Modal
            modalBookTitle.textContent = title;
            modalBookAuthor.textContent = author;
            modalBookPrice.textContent = price;
            modalBookCover.src = cover;
            modalBookSynopsis.textContent = synopsis;


            // Gera as estrelas dinamicamente
            modalBookStars.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                if (i < stars) {
                    modalBookStars.innerHTML += '<i class="fa-solid fa-star"></i> ';
                } else {
                    modalBookStars.innerHTML += '<i class="fa-regular fa-star"></i> ';
                }
            }


            // EXIBE O MODAL NA TELA
            customModal.style.display = 'flex';
        });
    });


    // Fechar ao clicar no X
    closeBtn.addEventListener('click', () => {
        customModal.style.display = 'none';
    });


    // Fechar ao clicar fora da caixa do modal
    window.addEventListener('click', (event) => {
        if (event.target === customModal) {
            customModal.style.display = 'none';
        }
    });


    // Botões auxiliares da header
    const cartBtn = document.querySelector('.cart-btn');
    const starBtn = document.querySelector('.star-btn');
    const btnCriarConta = document.querySelector('.btn-yellow');


    if (cartBtn) cartBtn.addEventListener('click', () => alert('A abrir carrinho de compras...'));
    if (starBtn) starBtn.addEventListener('click', () => alert('A abrir lista de favoritos...'));
    if (btnCriarConta) btnCriarConta.addEventListener('click', () => alert('A abrir ecrã de registo'));
});
