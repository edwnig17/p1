const menuItems = [
    {
        name: "Chorizo ",
        price: 5000,
        image: "img/chorizo.jpeg",
        description: "Chorizo 100% de cerdo, preparado artesanalmente mediante un proceso especial de amasado que permite reunir todos los sabores de nuestras especias seleccionadas, y perfectamente embutido en una tripa de cerdo para conservar su medida.",
        color: "#EF4444"
    },
    {
        name: "Tamal ",
        price: 6000,
        image: "img/tamal.jpeg",
        description: "Tamal elaborado con masa de maíz y arvejas, relleno de cerdo. La masa es cocida a fuego lento durante 6 a 7 horas para lograr su textura perfecta.",
        color: "#F59E0B"
    },
    {
        name: "Empanada de Arroz con Chorizo",
        price: 3000,
        image: "img/empanada.jpeg",
        description: "Deliciosa empanada rellena de arroz y nuestro chorizo especial, perfectamente frita hasta lograr un dorado crujiente.",
        color: "#F97316"
    },
    {
        name: "Morcilla con Papa Chorreada",
        price: 4500,
        image: "img/morcilla.jpeg",
        description: "Morcilla artesanal elaborada por una abuela muy querida de nuestra comunidad, servida con papa chorreada. Apoyamos el sason local.",
        color: "#8B5CF6"
    },
    {
        name: "Huevo Cocido con Papa Chorreada",
        price: 3000,
        image: "img/huevo.jpeg",
        description: "Huevos cocidos perfectamente acompañados de nuestra deliciosa papa chorreada, una combinacion colosal para cualquier bolsillo.",
        color: "#10B981"
    }
];

// Populate menu
const menuGrid = document.getElementById('menuGrid');
menuItems.forEach((item, index) => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>$${item.price.toLocaleString()}</p>
            <button class="btn" onclick="showItemDescription('${item.name}', '${item.description}', '${item.color}')">Descubre el Sabor</button>
        </div>
    `;
    menuItem.style.animationDelay = `${index * 0.1}s`;
    menuGrid.appendChild(menuItem);
});

function showItemDescription(name, description, color) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const content = document.createElement('div');
    content.style.backgroundColor = 'white';
    content.style.padding = '20px';
    content.style.borderRadius = '10px';
    content.style.maxWidth = '80%';
    content.style.boxShadow = `0 0 20px ${color}`;
    content.style.animation = 'modalAppear 0.3s ease-out';
    content.innerHTML = `
        <h3 style="color: ${color}; font-size: 2rem; margin-bottom: 10px;">${name}</h3>
        <p style="font-size: 1.2rem; line-height: 1.6;">${description}</p>
        <button class="btn" style="background-color: ${color};" onclick="this.parentElement.parentElement.remove()">Cerrar</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Story toggle with smooth transition
const storyButton = document.getElementById('storyButton');
const story = document.getElementById('story');
storyButton.addEventListener('click', () => {
    story.classList.toggle('show');
    storyButton.textContent = story.classList.contains('show') ? 'Ocultar Historia' : 'Nuestra Historia';
});

// Game logic
let gameStarted = false;
let score = 0;
let timeLeft = 60;
let gameOver = false;
let orders = [];
let customerSatisfaction = 100;
let combo = 0;
let timer;

const startGameButton = document.getElementById('startGameButton');
const gameArea = document.getElementById('gameArea');
const gameOverArea = document.getElementById('gameOver');
const restartGameButton = document.getElementById('restartGameButton');
const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('timeLeft');
const satisfactionElement = document.getElementById('satisfaction');
const comboElement = document.getElementById('combo');
const ordersListElement = document.getElementById('ordersList');
const gameButtonsElement = document.getElementById('gameButtons');
const finalScoreElement = document.getElementById('finalScore');
const finalSatisfactionElement = document.getElementById('finalSatisfaction');

function startGame() {
    gameStarted = true;
    score = 0;
    timeLeft = 60;
    gameOver = false;
    orders = [];
    customerSatisfaction = 100;
    combo = 0;
    updateDisplay();
    generateOrder();
    startGameButton.style.display = 'none';
    gameArea.style.display = 'block';
    gameOverArea.style.display = 'none';

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0 || customerSatisfaction <= 0) {
            endGame();
        }
    }, 1000);
}

function generateOrder() {
    const newOrder = menuItems[Math.floor(Math.random() * menuItems.length)].name;
    orders.push(newOrder);
    updateDisplay();
}

function handleOrderComplete(itemName) {
    if (orders[0] === itemName) {
        score++;
        orders.shift();
        combo++;
        customerSatisfaction = Math.min(100, customerSatisfaction + 5);
        generateOrder();
        showFeedback('¡Excelente!', 'success');
    } else {
        score = Math.max(0, score - 1);
        combo = 0;
        customerSatisfaction = Math.max(0, customerSatisfaction - 10);
        showFeedback('¡Ups! Pedido equivocado', 'error');
    }
    updateDisplay();
}

function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.position = 'fixed';
    feedback.style.top = '20px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.padding = '10px 20px';
    feedback.style.borderRadius = '5px';
    feedback.style.color = 'white';
    feedback.style.fontWeight = 'bold';
    feedback.style.zIndex = '1000';
    feedback.style.opacity = '0';
    feedback.style.transition = 'opacity 0.3s ease';

    if (type === 'success') {
        feedback.style.backgroundColor = '#4CAF50';
    } else {
        feedback.style.backgroundColor = '#F44336';
    }

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 1500);
}

function updateDisplay() {
    scoreElement.textContent = score;
    timeLeftElement.textContent = timeLeft;
    satisfactionElement.textContent = customerSatisfaction;
    comboElement.textContent = combo;
    ordersListElement.innerHTML = orders.slice(0, 3).map(order => {
        const item = menuItems.find(item => item.name === order);
        return `
            <span style="
                background-color: ${item.color};
                padding: 5px 10px;
                border-radius: 15px;
                margin: 2px;
                display: inline-block;
                font-weight: bold;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                animation: orderPulse 1s infinite alternate;
            ">${order}</span>
        `;
    }).join('');
}

function endGame() {
    clearInterval(timer);
    gameStarted = false;
    gameOver = true;
    gameArea.style.display = 'none';
    gameOverArea.style.display = 'block';
    finalScoreElement.textContent = score;
    finalSatisfactionElement.textContent = customerSatisfaction;
}

startGameButton.addEventListener('click', startGame);
restartGameButton.addEventListener('click', startGame);

// Populate game buttons
menuItems.forEach(item => {
    const button = document.createElement('button');
    button.className = 'game-button';
    button.style.backgroundImage = `url('${item.image}')`;
    button.innerHTML = `<span>${item.name}</span>`;
    button.addEventListener('click', () => handleOrderComplete(item.name));
    gameButtonsElement.appendChild(button);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
        const speed = (index + 1) * 0.1;
        layer.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// Intersection Observer for menu items animation
const menuItemsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.5s ease forwards ${entry.target.style.animationDelay}`;
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-item').forEach(item => {
    menuItemsObserver.observe(item);
});

// Add some interactive elements
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
        const offsetX = (mouseX - 0.5) * (index + 1) * 10;
        const offsetY = (mouseY - 0.5) * (index + 1) * 10;
        layer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});