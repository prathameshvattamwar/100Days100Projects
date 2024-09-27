const gameBoard = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');
const resetButton = document.getElementById('reset-button');

let cards = [];
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let moves = 0;

// Card values (Using Emojis instead of letters)
const cardValues = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍒', '🍒', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝'];

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the game
function initGame() {
    gameBoard.innerHTML = '';
    cards = [];
    shuffle(cardValues).forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = '?';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
    moves = 0;
    movesCounter.innerText = moves;
}

// Flip card function
function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flipped');
    this.innerHTML = this.dataset.value;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check if two cards match
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        unflipCards();
    }
    moves++;
    movesCounter.innerText = moves;
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '?';
        secondCard.innerHTML = '?';
        resetBoard();
    }, 1000);
}

// Reset the board after each turn
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Reset game
resetButton.addEventListener('click', initGame);

// Initialize the game on page load
initGame();
