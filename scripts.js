// ===== SISTEMA DE MANUTENÇÃO E CONTROLE DE ACESSO =====

// Configurações do sistema
const MAINTENANCE_CONFIG = {
    launchDate: new Date('2025-08-15T19:00:00-03:00'), // 15/08/2025 às 19:00 (horário de Brasília)
    adminUsers: [
        {
            username: 'Saimon',
            password: 'admin123',
            role: 'owner'
        }
    ]
};

// Variáveis globais do sistema
let isMaintenanceMode = true;
let currentAdmin = null;
let countdownInterval = null;

// Verificar se o site deve estar em manutenção
function checkMaintenanceStatus() {
    const now = new Date();
    const timeUntilLaunch = MAINTENANCE_CONFIG.launchDate - now;
    
    if (timeUntilLaunch <= 0) {
        // Site já foi inaugurado
        isMaintenanceMode = false;
        showMainSite();
        return false;
    } else {
        // Site ainda em manutenção
        isMaintenanceMode = true;
        showMaintenancePage();
        startCountdown();
        return true;
    }
}

// Mostrar página de manutenção
function showMaintenancePage() {
    document.getElementById('maintenancePage').style.display = 'flex';
    document.getElementById('mainContent').style.display = 'none';
}

// Mostrar site principal
function showMainSite() {
    document.getElementById('maintenancePage').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

// Iniciar cronômetro regressivo
function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeUntilLaunch = MAINTENANCE_CONFIG.launchDate - now;
        
        if (timeUntilLaunch <= 0) {
            // Cronômetro zerou - inaugurar site
            clearInterval(countdownInterval);
            isMaintenanceMode = false;
            showMainSite();
            return;
        }
        
        // Calcular tempo restante
        const days = Math.floor(timeUntilLaunch / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeUntilLaunch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilLaunch % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeUntilLaunch % (1000 * 60)) / 1000);
        
        // Atualizar display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Funções do modal de login admin
function showAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'block';
}

function closeAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'none';
    // Limpar campos
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
}

function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Verificar credenciais admin
    const adminUser = MAINTENANCE_CONFIG.adminUsers.find(
        user => user.username === username && user.password === password
    );
    
    if (adminUser) {
        currentAdmin = adminUser;
        closeAdminLogin();
        showMainSite();
        
        // Mostrar mensagem de boas-vindas
        alert(`Bem-vindo, ${adminUser.username}! Acesso administrativo concedido.`);
        
        // Salvar sessão admin no localStorage
        localStorage.setItem('adminSession', JSON.stringify({
            username: adminUser.username,
            role: adminUser.role,
            timestamp: Date.now()
        }));
    } else {
        alert('Credenciais administrativas inválidas!');
    }
}

// Verificar sessão admin existente
function checkAdminSession() {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
        const session = JSON.parse(adminSession);
        const now = Date.now();
        const sessionAge = now - session.timestamp;
        
        // Sessão válida por 24 horas
        if (sessionAge < 24 * 60 * 60 * 1000) {
            const adminUser = MAINTENANCE_CONFIG.adminUsers.find(
                user => user.username === session.username
            );
            if (adminUser) {
                currentAdmin = adminUser;
                return true;
            }
        } else {
            // Sessão expirada
            localStorage.removeItem('adminSession');
        }
    }
    return false;
}

// Função para logout admin
function logoutAdmin() {
    currentAdmin = null;
    localStorage.removeItem('adminSession');
    
    if (isMaintenanceMode) {
        showMaintenancePage();
    }
    
    alert('Logout administrativo realizado com sucesso!');
}

// Fechar modal admin ao clicar fora
window.addEventListener('click', function(event) {
    const adminModal = document.getElementById('adminLoginModal');
    if (event.target === adminModal) {
        closeAdminLogin();
    }
});

// ===== SISTEMA DE USUÁRIOS E AUTENTICAÇÃO =====

// Sistema de usuários e autenticação
let currentUser = null;
const users = [];

// Dados dos produtos
const products = {
    bots: [
        {
            name: "Bot Básico",
            description: "Comandos essenciais, moderação, logs e suporte por 30 dias",
            icon: "fas fa-robot",
            urlPrice: "R$ 20",
            completePrice: "R$ 80",
            delivery: "Mesmo dia",
            features: ["Comandos de moderação", "Sistema de logs", "Suporte por 30 dias", "Configuração personalizada"]
        },
        {
            name: "Bot Música",
            description: "Player musical completo com playlists e integração Spotify/YouTube",
            icon: "fas fa-music",
            urlPrice: "R$ 35",
            completePrice: "R$ 100",
            delivery: "Mesmo dia",
            features: ["Player de música", "Integração Spotify/YouTube", "Sistema de playlists", "Controles avançados"]
        },
        {
            name: "Bot IA",
            description: "Chat com IA integrado, geração de imagens e moderação inteligente",
            icon: "fas fa-brain",
            urlPrice: "R$ 50",
            completePrice: "R$ 150",
            delivery: "Mesmo dia",
            features: ["Chat com IA", "Geração de imagens", "Moderação inteligente", "Suporte premium"]
        },
        {
            name: "Bot Agenda",
            description: "Bot para gerenciamento de eventos e lembretes",
            icon: "fas fa-calendar",
            urlPrice: "R$ 27",
            completePrice: "R$ 90",
            delivery: "Mesmo dia",
            features: ["Agendamento", "Lembretes", "Calendário integrado"]
        },
        {
            name: "Bot Premium",
            description: "Pacote completo com todos os bots da loja",
            icon: "fas fa-crown",
            price: "R$ 500",
            delivery: "Mesmo dia",
            premium: true,
            features: ["Todos os bots incluídos", "Arquivos URL e COMPLETO", "Suporte vitalício", "Documentação completa"]
        },
        {
            name: "Bot Customizável",
            description: "Bot totalmente personalizado para suas necessidades",
            icon: "fas fa-cogs",
            price: "R$ 20 a R$ 500",
            delivery: "4 a 10 dias",
            features: ["Personalização total", "Funcionalidades exclusivas", "Design personalizado", "Integrações especiais"]
        }
    ],
    portfolios: [
        {
            name: "Básico",
            icon: "fas fa-file-alt",
            price: "R$ 30",
            description: "Portfólio simples e elegante",
            delivery: "1 a 3 dias",
            features: ["Design responsivo", "Seções personalizáveis", "SEO otimizado", "Suporte básico"]
        },
        {
            name: "Premium",
            icon: "fas fa-star",
            price: "R$ 200",
            description: "Portfólio avançado com recursos exclusivos",
            premium: true,
            delivery: "1 a 10 dias",
            features: ["Design exclusivo", "Animações avançadas", "Blog integrado", "Suporte premium"]
        },
        {
            name: "Customizável",
            icon: "fas fa-palette",
            price: "R$ 30 a R$ 200",
            description: "Portfólio personalizado",
            delivery: "Depende do serviço",
            features: ["Design personalizado", "Funcionalidades especiais", "Integrações", "Suporte completo"]
        }
    ],
    minecraft: [
        {
            name: "Básico",
            icon: "fas fa-cube",
            price: "R$ 30",
            description: "Scripts básicos para Minecraft",
            delivery: "Mesmo dia",
            features: ["Comandos essenciais", "Plugins básicos", "Configuração simples", "Suporte básico"]
        },
        {
            name: "Premium",
            icon: "fas fa-gem",
            price: "R$ 200",
            description: "Scripts avançados com recursos exclusivos",
            premium: true,
            delivery: "Mesmo dia",
            features: ["Scripts exclusivos", "Plugins avançados", "Configuração completa", "Suporte premium"]
        },
        {
            name: "Customizável",
            icon: "fas fa-tools",
            price: "R$ 30 a R$ 180",
            description: "Scripts personalizados",
            delivery: "Depende do serviço",
            features: ["Scripts personalizados", "Funcionalidades especiais", "Integrações", "Suporte completo"]
        }
    ],
    discord: [
        {
            name: "Básico",
            icon: "fab fa-discord",
            price: "R$ 80",
            description: "Até 5 bots configurados + suporte 30 dias",
            delivery: "Até 1 hora após a compra",
            features: ["5 bots configurados", "Suporte 30 dias", "Configuração básica", "Documentação"]
        },
        {
            name: "Premium",
            icon: "fas fa-crown",
            price: "R$ 110",
            description: "Todos os bots da loja + suporte 2 anos",
            delivery: "Até 1 hora após a compra",
            features: ["Todos os bots", "Suporte 2 anos", "Configuração completa", "Suporte prioritário"]
        },
        {
            name: "Premium++",
            icon: "fas fa-rocket",
            price: "R$ 320",
            description: "Servidor totalmente configurado com +5000 membros",
            premium: true,
            delivery: "Até 1 dia após a compra",
            features: ["Servidor completo", "Bots configurados", "Suporte vitalício", "Configuração exclusiva"]
        }
    ],
    sites: [
        {
            name: "Básico",
            icon: "fas fa-globe",
            price: "Em breve",
            description: "Site básico - Em desenvolvimento",
            delivery: "A ser definido",
            features: ["Design responsivo", "Seções básicas", "SEO básico", "Suporte"]
        },
        {
            name: "Completo",
            icon: "fas fa-laptop-code",
            price: "Em breve",
            description: "Site completo - Em desenvolvimento",
            delivery: "A ser definido",
            features: ["Design completo", "Funcionalidades avançadas", "SEO otimizado", "Suporte premium"]
        },
        {
            name: "Premium",
            icon: "fas fa-gem",
            price: "Em breve",
            description: "Site premium - Em desenvolvimento",
            delivery: "A ser definido",
            features: ["Design exclusivo", "Funcionalidades exclusivas", "SEO avançado", "Suporte vitalício"]
        }
    ],
    optimizations: [
        {
            name: "Básica",
            icon: "fas fa-tachometer-alt",
            price: "Em breve",
            description: "Limpeza e comandos básicos",
            delivery: "A ser definido",
            features: ["Limpeza básica", "Comandos essenciais", "Otimização simples", "Suporte básico"]
        },
        {
            name: "Profissional",
            icon: "fas fa-user-tie",
            price: "Em breve",
            description: "Otimização total sem excluir arquivos",
            delivery: "A ser definido",
            features: ["Otimização completa", "Preservação de dados", "Configuração avançada", "Suporte profissional"]
        },
        {
            name: "Premium",
            icon: "fas fa-crown",
            price: "Em breve",
            description: "Windows modificado + otimização total",
            premium: true,
            delivery: "A ser definido",
            features: ["Windows modificado", "Otimização total", "Configuração exclusiva", "Suporte vitalício"]
        }
    ]
};

// Funções de navegação
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sistema de Login/Registro - MODIFICADO PARA CONTROLE DE ACESSO
function openAuthModal(type) {
    // Verificar se o site está em manutenção
    if (isMaintenanceMode && !currentAdmin) {
        alert('Não é possível acessar no momento. O site ainda não foi inaugurado.');
        return;
    }
    
    const modal = document.getElementById('authModal');
    const authForm = document.getElementById('authForm');
    
    if (type === 'login') {
        authForm.innerHTML = `
            <div class="auth-form">
                <h3>Login</h3>
                <form onsubmit="handleLogin(event)">
                    <input type="text" id="loginUsername" placeholder="Usuário" required>
                    <input type="password" id="loginPassword" placeholder="Senha" required>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        `;
    } else {
        authForm.innerHTML = `
            <div class="auth-form">
                <h3>Registrar</h3>
                <form onsubmit="handleRegister(event)">
                    <input type="text" id="registerUsername" placeholder="Usuário" required>
                    <input type="password" id="registerPassword" placeholder="Senha" required>
                    <input type="password" id="confirmPassword" placeholder="Confirmar Senha" required>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        `;
    }
    
    modal.style.display = 'block';
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    
    // Verificar se o site está em manutenção
    if (isMaintenanceMode && !currentAdmin) {
        alert('Não é possível acessar no momento. O site ainda não foi inaugurado.');
        return;
    }
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        updateAuthUI();
        closeAuthModal();
        
        // Limpar campos
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        
        alert(`Bem-vindo de volta, ${username}!`);
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    // Verificar se o site está em manutenção
    if (isMaintenanceMode && !currentAdmin) {
        alert('Não é possível acessar no momento. O site ainda não foi inaugurado.');
        return;
    }
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    if (users.find(u => u.username === username)) {
        alert('Usuário já existe!');
        return;
    }
    
    const newUser = { 
        username, 
        password, 
        highScore: 0,
        gamesPlayed: 0
    };
    
    users.push(newUser);
    currentUser = newUser;
    updateAuthUI();
    closeAuthModal();
    
    // Limpar campos
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    alert('Registro realizado com sucesso!');
}

function logout() {
    currentUser = null;
    updateAuthUI();
    alert('Logout realizado com sucesso!');
}

function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    const adminInfo = document.getElementById('admin-info');
    const usernameSpan = document.querySelector('.username');
    const adminUsernameSpan = document.querySelector('.admin-username');
    
    if (currentAdmin) {
        // Admin logado
        authButtons.style.display = 'none';
        userInfo.style.display = 'none';
        adminInfo.style.display = 'flex';
        adminUsernameSpan.textContent = currentAdmin.username;
    } else if (currentUser) {
        // Usuário normal logado
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        adminInfo.style.display = 'none';
        usernameSpan.textContent = currentUser.username;
    } else {
        // Ninguém logado
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
        adminInfo.style.display = 'none';
    }
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const authModal = document.getElementById('authModal');
    if (event.target === authModal) {
        authModal.style.display = 'none';
    }
}

// Funções do modal
function showCategory(category) {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    // Atualizar abas ativas
    updateActiveTab(category);
    
    let categoryTitle = '';
    switch(category) {
        case 'bots': categoryTitle = 'Bots'; break;
        case 'portfolios': categoryTitle = 'Portfólios'; break;
        case 'minecraft': categoryTitle = 'Scripts Minecraft'; break;
        case 'discord': categoryTitle = 'Servidores Discord'; break;
        case 'sites': categoryTitle = 'Sites'; break;
        case 'optimizations': categoryTitle = 'Otimizações'; break;
    }
    
    let html = `<h2>${categoryTitle}</h2>`;
    
    html += '<div class="product-grid">';
    
    products[category].forEach(product => {
        const premiumClass = product.premium ? 'premium' : '';
        html += `
            <div class="product-card ${premiumClass}">
                <div class="product-icon">
                    <i class="${product.icon}"></i>
                </div>
                <h4>${product.name}</h4>
                <div class="description">${product.description}</div>
        `;
        
        if (product.urlPrice && product.completePrice) {
            html += `
                <div class="product-options">
                    <button class="option-btn" onclick="showPrice('${product.name}', 'URL', '${product.urlPrice}')">URL</button>
                    <button class="option-btn" onclick="showPrice('${product.name}', 'Completo', '${product.completePrice}')">Completo</button>
                </div>
                <div class="price" id="price-${product.name.replace(/\s+/g, '-')}">${product.urlPrice}</div>
                <div class="options-warning">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-text">
                        <strong>URL:</strong> Apenas link para adicionar o bot. Não é de posse do cliente. Suporte: 90 dias. Atualizações: vitalícias.<br>
                        <strong>Completo:</strong> Arquivos completos, pode hospedar/mudar nome/configurações. Suporte vitalício.
                    </div>
                </div>
            `;
        } else {
            html += `<div class="price">${product.price}</div>`;
        }
        
        if (product.features) {
            html += '<ul class="features">';
            product.features.forEach(feature => {
                html += `<li>${feature}</li>`;
            });
            html += '</ul>';
        }
        
        html += `
                <div class="delivery">Entrega: ${product.delivery}</div>
                <a href="https://discord.gg/WCzMTYncw4" target="_blank" class="buy-btn">COMPRAR</a>
            </div>
        `;
    });
    
    html += '</div>';
    modalContent.innerHTML = html;
    modal.style.display = 'block';
}

// Função para atualizar aba ativa
function updateActiveTab(activeCategory) {
    // Remover classe ativa de todas as abas
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Adicionar classe ativa na aba selecionada
    const activeCard = document.querySelector(`[onclick="showCategory('${activeCategory}')"]`);
    if (activeCard) {
        activeCard.classList.add('active');
    }
}

function showPrice(productName, option, price) {
    const priceElement = document.getElementById(`price-${productName.replace(/\s+/g, '-')}`);
    if (priceElement) {
        priceElement.textContent = price;
        
        // Destacar a opção selecionada
        const buttons = priceElement.parentElement.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === option) {
                btn.classList.add('active');
            }
        });
    }
}

// Funções do jogo Snake
let canvas, ctx, snake, food, gameLoop, score = 0;
let gameRunning = false;

function initGame() {
    canvas = document.getElementById('snakeCanvas');
    ctx = canvas.getContext('2d');
    
    // Inicializar cobra
    snake = [
        {x: 200, y: 200},
        {x: 190, y: 200},
        {x: 180, y: 200}
    ];
    
    // Inicializar comida
    generateFood();
    
    // Controles
    document.addEventListener('keydown', handleKeyPress);
    
    // Botões
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('resetGame').addEventListener('click', resetGame);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * 20) * 20,
        y: Math.floor(Math.random() * 20) * 20
    };
}

function drawGame() {
    // Limpar canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar cobra
    ctx.fillStyle = '#4CAF50';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 18, 18);
    });
    
    // Desenhar cabeça
    ctx.fillStyle = '#45a049';
    ctx.fillRect(snake[0].x, snake[0].y, 18, 18);
    
    // Desenhar comida
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(food.x, food.y, 18, 18);
}

function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};
    
    // Mover cabeça
    switch(direction) {
        case 'up': head.y -= 20; break;
        case 'down': head.y += 20; break;
        case 'left': head.x -= 20; break;
        case 'right': head.x += 20; break;
    }
    
    // Verificar colisão com paredes
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }
    
    // Verificar colisão com próprio corpo
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Verificar se comeu comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('currentScore').textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

let direction = 'right';

function handleKeyPress(event) {
    if (!gameRunning) return;
    
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

function startGame() {
    if (!currentUser) {
        alert('Faça login para jogar!');
        return;
    }
    
    if (!gameRunning) {
        gameRunning = true;
        gameLoop = setInterval(() => {
            moveSnake();
            drawGame();
        }, 150);
    }
}

function resetGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    score = 0;
    direction = 'right';
    document.getElementById('currentScore').textContent = '0';
    initGame();
    drawGame();
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    if (currentUser) {
        // Atualizar pontuação do usuário
        if (score > currentUser.highScore) {
            currentUser.highScore = score;
        }
        currentUser.gamesPlayed++;
        
        // Salvar no localStorage
        saveUsers();
    }
    
    alert(`Game Over! Pontuação: ${score}`);
    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboardList');
    
    // Ordenar usuários por pontuação
    const sortedUsers = [...users].sort((a, b) => b.highScore - a.highScore);
    
    leaderboard.innerHTML = '';
    
    sortedUsers.slice(0, 10).forEach((user, index) => {
        const rank = index + 1;
        const emoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
        
        const leaderboardItem = document.createElement('div');
        leaderboardItem.className = 'leaderboard-item';
        leaderboardItem.innerHTML = `
            <span class="rank">${emoji}</span>
            <span class="player">${user.username}</span>
            <span class="score">${user.highScore}</span>
        `;
        leaderboard.appendChild(leaderboardItem);
    });
}

// Funções de persistência
function saveUsers() {
    localStorage.setItem('snakeUsers', JSON.stringify(users));
}

function loadUsers() {
    const savedUsers = localStorage.getItem('snakeUsers');
    if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        users.push(...parsedUsers);
    }
}

// Funções do RELAXE
function openRelax() {
    const player = document.getElementById('relaxPlayer');
    player.style.display = 'block';
}

function closeRelax() {
    const player = document.getElementById('relaxPlayer');
    player.style.display = 'none';
}

// Fechar player RELAXE ao clicar fora
window.addEventListener('click', function(event) {
    const player = document.getElementById('relaxPlayer');
    if (event.target === player) {
        player.style.display = 'none';
    }
});

// Formulário de contato
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simular envio
    alert(`Mensagem enviada com sucesso!\n\nNome: ${name}\nEmail: ${email}\nAssunto: ${subject}\nMensagem: ${message}`);
    
    // Limpar formulário
    this.reset();
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Verificar status de manutenção
    const isInMaintenance = checkMaintenanceStatus();
    
    // Verificar sessão admin existente
    if (isInMaintenance && checkAdminSession()) {
        showMainSite();
    }
    
    // Carregar usuários salvos
    loadUsers();
    
    // Inicializar jogo
    initGame();
    drawGame();
    
    // Atualizar UI de autenticação
    updateAuthUI();
    
    // Mostrar categoria Bots por padrão
    showCategory('bots');
    
    // Atualizar leaderboard
    updateLeaderboard();
    
    // Animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.stat-card, .spec-card, .category-card, .quality-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Detectar dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Aviso para dispositivos móveis no jogo
if (isMobile()) {
    const gameSection = document.getElementById('game');
    const mobileWarning = document.createElement('div');
    mobileWarning.innerHTML = '<p style="text-align: center; color: #f59e0b; margin-bottom: 20px;">⚠️ Este jogo é otimizado para computadores</p>';
    gameSection.insertBefore(mobileWarning, gameSection.firstChild);
}
