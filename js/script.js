document.addEventListener('DOMContentLoaded', () => {

    // --- ESTADO DA APLICAÇÃO ---
    let cartItems = [];
    let favItems = [];

    // Elementos da interface
    const cartCountEl = document.getElementById('cartCount');
    const favCountEl = document.getElementById('favCount');
    const toastEl = document.getElementById('toastNotification');

    // Modais e Triggers
    const cartBtn = document.getElementById('cartBtn');
    const starBtn = document.getElementById('starBtn');
    const cartModal = document.getElementById('cartModalCustom');
    const favModal = document.getElementById('favModalCustom');
    const accountModal = document.getElementById('accountModalCustom');

    const closeCartBtn = document.querySelector('.close-cart');
    const closeFavBtn = document.querySelector('.close-fav');
    const closeAccountBtn = document.querySelector('.close-account');

    const accountSidebarLink = document.getElementById('accountSidebarLink');
    const filterSidebarLink = document.getElementById('filterSidebarLink');
    const paymentsSidebarLink = document.getElementById('paymentsSidebarLink');
    const helpSidebarLink = document.getElementById('helpSidebarLink');

    let currentSelectedBook = null;

    // --- FUNÇÃO DE NOTIFICAÇÃO (TOAST) ---
    function showToast(message) {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.style.display = 'block';
        
        setTimeout(() => {
            toastEl.style.display = 'none';
        }, 3000);
    }

    // --- ATUALIZAR INTERFACE DO CARRINHO ---
    function updateCartUI() {
        if (cartCountEl) cartCountEl.textContent = cartItems.length;
        
        const container = document.getElementById('cartItemsContainer');
        const totalPriceEl = document.getElementById('cartTotalPrice');
        
        if (!container) return;

        if (cartItems.length === 0) {
            container.innerHTML = '<p class="text-muted text-center py-4">Seu carrinho está vazio no momento.</p>';
            if (totalPriceEl) totalPriceEl.textContent = 'R$ 0,00';
            return;
        }

        let html = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            const rawPrice = parseFloat(item.price.replace('R$', '').replace(',', '.').trim()) || 0;
            total += rawPrice;

            html += `
                <div class="cart-item-row">
                    <img src="${item.cover}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h5 class="cart-item-title">${item.title}</h5>
                        <span class="cart-item-price">${item.price}</span>
                    </div>
                    <button class="btn btn-sm btn-outline-danger remove-cart-item" data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;
        if (totalPriceEl) totalPriceEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        document.querySelectorAll('.remove-cart-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                cartItems.splice(idx, 1);
                updateCartUI();
                showToast('Item removido do carrinho.');
            });
        });
    }

    // --- ATUALIZAR INTERFACE DOS FAVORITOS ---
    function updateFavUI() {
        if (favCountEl) favCountEl.textContent = favItems.length;
        
        const container = document.getElementById('favItemsContainer');
        if (!container) return;

        if (favItems.length === 0) {
            container.innerHTML = '<p class="text-muted text-center py-4">Nenhum livro salvo nos favoritos.</p>';
            return;
        }

        let html = '';
        favItems.forEach((item, index) => {
            html += `
                <div class="fav-item-row">
                    <img src="${item.cover}" alt="${item.title}">
                    <div class="fav-item-info">
                        <h5 class="fav-item-title">${item.title}</h5>
                        <small class="text-muted">${item.author}</small>
                        <div class="text-danger fw-bold small">${item.price}</div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger remove-fav-item" data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;

        document.querySelectorAll('.remove-fav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                favItems.splice(idx, 1);
                updateFavUI();
                showToast('Removido dos favoritos.');
            });
        });
    }

    // --- ABRIR MODAL DE DETALHES DO LIVRO ---
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
            const cover = card.getAttribute('data-cover') || '';
            const synopsis = card.getAttribute('data-synopsis') || 'Sem sinopse disponível.';

            currentSelectedBook = { title, author, price, cover, synopsis };

            if (modalBookTitle) modalBookTitle.textContent = title;
            if (modalBookAuthor) modalBookAuthor.textContent = author;
            if (modalBookPrice) modalBookPrice.textContent = price;
            if (modalBookCover) {
                modalBookCover.src = cover;
                modalBookCover.alt = title;
            }
            if (modalBookSynopsis) modalBookSynopsis.textContent = synopsis;

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

    if (closeBtn) closeBtn.addEventListener('click', () => customModal.style.display = 'none');

    // --- AÇÕES DO MODAL DE DETALHES DO LIVRO ---
    const addCartModalBtn = document.getElementById('addCartModalBtn');
    const addFavModalBtn = document.getElementById('addFavModalBtn');

    if (addCartModalBtn) {
        addCartModalBtn.addEventListener('click', () => {
            if (currentSelectedBook) {
                cartItems.push(currentSelectedBook);
                updateCartUI();
                if (customModal) customModal.style.display = 'none';
                showToast('Item adicionado ao carrinho!');
            }
        });
    }

    if (addFavModalBtn) {
        addFavModalBtn.addEventListener('click', () => {
            if (currentSelectedBook) {
                if (!favItems.some(item => item.title === currentSelectedBook.title)) {
                    favItems.push(currentSelectedBook);
                    updateFavUI();
                    showToast('Adicionado aos seus favoritos!');
                } else {
                    showToast('Este livro já está nos favoritos.');
                }
            }
        });
    }

    // --- ABRIR MODAIS DO TOPO ---
    if (cartBtn && cartModal) cartBtn.addEventListener('click', () => cartModal.style.display = 'flex');
    if (starBtn && favModal) starBtn.addEventListener('click', () => favModal.style.display = 'flex');

    if (closeCartBtn && cartModal) closeCartBtn.addEventListener('click', () => cartModal.style.display = 'none');
    if (closeFavBtn && favModal) closeFavBtn.addEventListener('click', () => favModal.style.display = 'none');

    // --- LINKS DA SIDEBAR ---
    if (accountSidebarLink && accountModal) {
        accountSidebarLink.addEventListener('click', (e) => {
            e.preventDefault();
            accountModal.style.display = 'flex';
        });
    }

    if (closeAccountBtn && accountModal) {
        closeAccountBtn.addEventListener('click', () => accountModal.style.display = 'none');
    }

    if (filterSidebarLink) {
        filterSidebarLink.addEventListener('click', (e) => {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                showToast('Digite na busca para filtrar os livros da biblioteca.');
            }
        });
    }

    if (paymentsSidebarLink) {
        paymentsSidebarLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Aceitamos Pix, Cartão de Crédito e Boleto em até 6x!');
        });
    }

    if (helpSidebarLink) {
        helpSidebarLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Suporte Velvet: atendimento@velvetlibrary.com');
        });
    }

    // --- MODAIS DE AUTENTICAÇÃO ---
    const loginModal = document.getElementById('loginModalCustom');
    const registerModal = document.getElementById('registerModalCustom');

    const loginTriggerBtn = document.querySelector('.login-trigger-btn');
    const registerTriggerBtn = document.querySelector('.register-trigger-btn');
    
    const closeLoginBtn = document.querySelector('.close-login');
    const closeRegisterBtn = document.querySelector('.close-register');

    if (loginTriggerBtn && loginModal) loginTriggerBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    if (registerTriggerBtn && registerModal) registerTriggerBtn.addEventListener('click', () => registerModal.style.display = 'flex');

    if (closeLoginBtn && loginModal) closeLoginBtn.addEventListener('click', () => loginModal.style.display = 'none');
    if (closeRegisterBtn && registerModal) closeRegisterBtn.addEventListener('click', () => registerModal.style.display = 'none');

    // Fechar Modais ao Clicar Fora
    window.addEventListener('click', (event) => {
        if (event.target === customModal) customModal.style.display = 'none';
        if (event.target === loginModal) loginModal.style.display = 'none';
        if (event.target === registerModal) registerModal.style.display = 'none';
        if (event.target === cartModal) cartModal.style.display = 'none';
        if (event.target === favModal) favModal.style.display = 'none';
        if (event.target === accountModal) accountModal.style.display = 'none';
    });

    // --- PESQUISA EM TEMPO REAL ---
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
    const checkoutBtn = document.getElementById('checkoutBtn');
    const logoutBtn = document.getElementById('logoutBtn');

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

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                showToast('Seu carrinho está vazio!');
            } else {
                cartItems = [];
                updateCartUI();
                if (cartModal) cartModal.style.display = 'none';
                showToast('Compra finalizada com sucesso! Agradecemos a preferência.');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (accountModal) accountModal.style.display = 'none';
            showToast('Você saiu da sua conta.');
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------------------------------------
    // FUNÇÕES AUXILIARES PARA ABRIR E FECHAR MODAIS
    // -------------------------------------------------------------
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Evita rolar a página por trás
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Fecha modais ao clicar no botão 'X'
    document.querySelectorAll(".custom-close-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const modal = this.closest(".custom-modal");
            if (modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });

    // Fecha modais ao clicar no fundo escuro
    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("custom-modal")) {
            event.target.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // -------------------------------------------------------------
    // 1. ABRIR MINHA CONTA (Botão do Menu Rápido na Sidebar)
    // -------------------------------------------------------------
    const accountSidebarLink = document.getElementById("accountSidebarLink");
    if (accountSidebarLink) {
        accountSidebarLink.addEventListener("click", function (e) {
            e.preventDefault();
            openModal("accountModalCustom");
        });
    }

    // -------------------------------------------------------------
    // 2. ABRIR ENTRAR (LOGIN) - Botão do Header
    // -------------------------------------------------------------
    document.querySelectorAll(".login-trigger-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            openModal("loginModalCustom");
        });
    });

    // -------------------------------------------------------------
    // 3. ABRIR CRIAR CONTA (REGISTRO) - Botão do Header
    // -------------------------------------------------------------
    document.querySelectorAll(".register-trigger-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            openModal("registerModalCustom");
        });
    });

    // -------------------------------------------------------------
    // 4. ABRIR FAVORITOS - Botão de Ícone no Header
    // -------------------------------------------------------------
    const starBtn = document.getElementById("starBtn");
    if (starBtn) {
        starBtn.addEventListener("click", function (e) {
            e.preventDefault();
            openModal("favModalCustom");
        });
    }

    // -------------------------------------------------------------
    // 5. ABRIR CARRINHO - Botão de Ícone no Header
    // -------------------------------------------------------------
    const cartBtn = document.getElementById("cartBtn");
    if (cartBtn) {
        cartBtn.addEventListener("click", function (e) {
            e.preventDefault();
            openModal("cartModalCustom");
        });
    }

    // -------------------------------------------------------------
    // SUBMISSÃO DOS FORMULÁRIOS DE LOGIN E CADASTRO (SIMULAÇÃO)
    // -------------------------------------------------------------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Login realizado com sucesso!");
            closeModal("loginModalCustom");
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Conta criada com sucesso!");
            closeModal("registerModalCustom");
        });
    }
});