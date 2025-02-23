let categories = {
    Fruits: ['🍎', '🥝', '🍇', '🍉', '🍒', '🍍', '🥭', '🍑'],
    Emojis: ['😀', '😂', '🥰', '😎', '🤩', '😍', '😜', '😇'],
    Animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    Vehicles: ['🚲', '🚗', '🛺', '🏍', '🚌', '🚝', '✈', '🚢']
};

let selectedCategory = '';
let cards = [];
let flippedCards = [];
let matchedCards = [];
let timer;
let timeLeft = 30;
let score = 0;

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('selected-category').textContent = category;
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
}

function startGame() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('game-result').style.display = 'none'; // Hide result message

    let items = [...categories[selectedCategory], ...categories[selectedCategory]];
    items.sort(() => Math.random() - 0.5);
    cards = items.map((item, index) => ({ id: index, symbol: item, flipped: false }));

    document.getElementById('game-grid').innerHTML = cards.map((card, index) =>
        `<div class="card hidden" id="card-${index}" onclick="handleCardClick(${index})"></div>`
    ).join('');

    score = 0;
    matchedCards = [];
    flippedCards = [];
    document.getElementById('score').textContent = score;

    startTimer();
}


function handleCardClick(id) {
    let cardElement = document.getElementById(`card-${id}`);

    if (flippedCards.includes(id) || matchedCards.includes(id)) return;

    flippedCards.push(id);
    cardElement.textContent = cards[id].symbol;
    cardElement.classList.remove('hidden');

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}


function checkMatch() {
    let [first, second] = flippedCards;
    let elements = document.querySelectorAll('.card');

    if (cards[first].symbol === cards[second].symbol) {
        matchedCards.push(first, second);
        elements[first].classList.add('matched');
        elements[second].classList.add('matched');
        score += 10;
    } else {
        elements[first].textContent = '';
        elements[first].classList.add('hidden');
        elements[second].textContent = '';
        elements[second].classList.add('hidden');
    }

    flippedCards = [];
    document.getElementById('score').textContent = score;
    checkWin();
}

function checkWin() {
    if (matchedCards.length === cards.length) {
        document.getElementById('game-result').textContent = `🎉 You Win! Score: ${score}`;
        document.getElementById('game-result').style.display = 'block';
        clearInterval(timer);
    }
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('time').textContent = timeLeft;
        } else {
            clearInterval(timer);
            document.getElementById('game-result').textContent = `Time's Up! You Lose. Score: ${score}`;
            document.getElementById('game-result').style.display = 'block';

            // Disable further card clicks
            document.querySelectorAll('.card').forEach(card => {
                card.onclick = null;
            });
        }
    }, 1000);
}


function resetGame() {
    clearInterval(timer);
    timeLeft = 30;
    score = 0;
    matchedCards = [];
    flippedCards = [];
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('score').textContent = score;
    document.getElementById('game-result').style.display = 'none'; // Hide result message
    startGame();
}



function goHome() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('time').textContent = timeLeft;
    score = 0;
    document.getElementById('score').textContent = score;
    matchedCards = [];
    flippedCards = [];
    document.getElementById('game-grid').innerHTML = ''; 
    selectedCategory = ''; 
    document.getElementById('game-result').style.display = 'none';

    document.getElementById('game-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}
