

document.addEventListener('DOMContentLoaded', () => {


    // --- ESTADO DA APLICAÇÃO ---
    let cartCount = 0;
    let favCount = 0;


    // Elementos da interface
    const cartCountEl = document.getElementById('cartCount');
    const favCountEl = document.getElementById('favCount');
    const toastEl = document.getElementById('toastNotification');


    // --- FUNÇÃO DE NOTIFICAÇÃO (TOAST) ---
    function showToast(message) {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.style.display = 'block';
       
        setTimeout(() => {
            toastEl.style.display = 'none';
        }, 3000);
    }


    // --- MODAL DE DETALHES DO LIVRO ---
    const customModal = document.getElementById('customModal');
    const closeBtn = customModal ? customModal.querySelector('.custom-close-btn') : null;


    const modalBookTitle = document.getElementById('modalBookTitle');
    const modalBookAuthor = document.getElementById('modalBookAuthor');
    const modalBookStars = document.getElementById('modalBookStars');
    const modalBookPrice = document.getElementById('modalBookPrice');
    const modalBookCover = document.getElementById('modalBookCover');
    const modalBookSynopsis = document.getElementById('modalBookSynopsis');


    const bookCards = document.querySelectorAll('.book-card');


    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title') || 'Título Indisponível';
            const author = card.getAttribute('data-author') || 'Autor Desconhecido';
            const stars = parseInt(card.getAttribute('data-stars')) || 5;
            const price = card.getAttribute('data-price') || 'R$ 0,00';
     
            if (modalBookTitle) modalBookTitle.textContent = title;
            if (modalBookAuthor) modalBookAuthor.textContent = author;
            if (modalBookPrice) modalBookPrice.textContent = price;
            if (modalBookCover) {
                modalBookCover.src = cover;
                modalBookCover.alt = title;
            }
            if (modalBookSynopsis) modalBookSynopsis.textContent = synopsis;


            // Renderizar Estrelas Dinamicamente
            if (modalBookStars) {
                modalBookStars.innerHTML = '';
                for (let i = 0; i < 5; i++) {
                    if (i < stars) {
                        modalBookStars.innerHTML += '<i class="fa-solid fa-star text-warning"></i> ';
                    } else {
                        modalBookStars.innerHTML += '<i class="fa-regular fa-star text-muted"></i> ';
                    }
                }
            }


            if (customModal) customModal.style.display = 'flex';
        });
    });


    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            customModal.style.display = 'none';
        });
    }


    // --- MODAIS DE AUTENTICAÇÃO (LOGIN E REGISTRO) ---
    const loginModal = document.getElementById('loginModalCustom');
    const registerModal = document.getElementById('registerModalCustom');


    const loginTriggerBtn = document.querySelector('.login-trigger-btn');
    const registerTriggerBtn = document.querySelector('.register-trigger-btn');
   
    const closeLoginBtn = document.querySelector('.close-login');
    const closeRegisterBtn = document.querySelector('.close-register');


    if (loginTriggerBtn && loginModal) {
        loginTriggerBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    }


    if (registerTriggerBtn && registerModal) {
        registerTriggerBtn.addEventListener('click', () => registerModal.style.display = 'flex');
    }


    if (closeLoginBtn && loginModal) {
        closeLoginBtn.addEventListener('click', () => loginModal.style.display = 'none');
    }


    if (closeRegisterBtn && registerModal) {
        closeRegisterBtn.addEventListener('click', () => registerModal.style.display = 'none');
    }


    // Fechar Modais ao Clicar Fora
    window.addEventListener('click', (event) => {
        if (event.target === customModal) customModal.style.display = 'none';
        if (event.target === loginModal) loginModal.style.display = 'none';
        if (event.target === registerModal) registerModal.style.display = 'none';
    });


    // --- AÇÕES DO CARRINHO E FAVORITOS (MODAL) ---
    const addCartModalBtn = document.getElementById('addCartModalBtn');
    const addFavModalBtn = document.getElementById('addFavModalBtn');


    if (addCartModalBtn) {
        addCartModalBtn.addEventListener('click', () => {
            cartCount++;
            if (cartCountEl) cartCountEl.textContent = cartCount;
            if (customModal) customModal.style.display = 'none';
            showToast('Item adicionado ao carrinho com sucesso!');
        });
    }


    if (addFavModalBtn) {
        addFavModalBtn.addEventListener('click', () => {
            favCount++;
            if (favCountEl) favCountEl.textContent = favCount;
            showToast('Adicionado aos seus favoritos!');
        });
    }


    // --- BUSCA EM TEMPO REAL ---
    const searchInput = document.getElementById('searchInput');


    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();


            bookCards.forEach(card => {
                const title = (card.getAttribute('data-title') || '').toLowerCase();
                const author = (card.getAttribute('data-author') || '').toLowerCase();


                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }


    // --- FILTRO DE CATEGORIAS ---
    const categoryPills = document.querySelectorAll('.pills .pill');


    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove a classe ativa dos outros botões
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');


            const filterValue = pill.getAttribute('data-filter') || 'all';


            bookCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category') || '';


                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- ENVIO DOS FORMULÁRIOS ---
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');


    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (loginModal) loginModal.style.display = 'none';
            showToast('Login realizado com sucesso!');
        });
    }


    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (registerModal) registerModal.style.display = 'none';
            showToast('Conta criada com sucesso! Bem-vindo(a).');
        });
    }
});       const cover = card.getAttribute('data-cover') || '';
            const synopsis = card.getAttribute('data-synopsis') || 'Sem sinopse disponível.';
