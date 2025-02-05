const emojis = ["🎮", "🎲", "🎯", "🎨", "🎭", "🎪"];
const gameContainer = document.getElementById("gameContainer");
const movesDisplay = document.getElementById("moves");
const pairsDisplay = document.getElementById("pairs");
const highScoresDisplay = document.getElementById("highScores");

let cards = [];
let flippedCards = [];
let moves = 0;
let pairs = 0;
let canFlip = true;
let highScores = [];

// Load high scores from localStorage
function loadHighScores() {
  const savedScores = localStorage.getItem("memoryGameHighScores");
  highScores = savedScores ? JSON.parse(savedScores) : [];
  updateHighScoresDisplay();
}

// Save high scores to localStorage
function saveHighScore(moves) {
  const date = new Date().toLocaleDateString();
  highScores.push({ moves, date });
  // Sort by moves (lower is better) and keep only top 5
  highScores.sort((a, b) => a.moves - b.moves);
  highScores = highScores.slice(0, 5);
  localStorage.setItem("memoryGameHighScores", JSON.stringify(highScores));
  updateHighScoresDisplay();
}

// Update the high scores display
function updateHighScoresDisplay() {
  if (highScores.length === 0) {
    highScoresDisplay.innerHTML = "<p>No scores yet!</p>";
    return;
  }

  const scoresHTML = highScores
    .map(
      (score, index) =>
        `<div>${index + 1}. ${score.moves} moves (${score.date})</div>`
    )
    .join("");
  highScoresDisplay.innerHTML = scoresHTML;
}

// Clear high scores
function clearHighScores() {
  if (confirm("Are you sure you want to clear all high scores?")) {
    localStorage.removeItem("memoryGameHighScores");
    highScores = [];
    updateHighScoresDisplay();
  }
}

function createCards() {
  const doubledEmojis = [...emojis, ...emojis];
  const shuffledEmojis = doubledEmojis.sort(() => Math.random() - 0.5);

  shuffledEmojis.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                    <div class="card-front">${emoji}</div>
                    <div class="card-back"></div>
                `;
    card.dataset.value = emoji;
    card.addEventListener("click", () => flipCard(card));
    gameContainer.appendChild(card);
    cards.push(card);
  });
}

function flipCard(card) {
  if (
    !canFlip ||
    flippedCards.includes(card) ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    canFlip = false;

    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
      pairs++;
      pairsDisplay.textContent = pairs;
      flippedCards.forEach((card) => {
        card.classList.add("matched");
        card.style.animation = "none";
        card.offsetHeight;
        card.style.animation = null;
      });
      flippedCards = [];
      canFlip = true;

      if (pairs === emojis.length) {
        setTimeout(() => {
          saveHighScore(moves);
          alert(`Congratulations! You won in ${moves} moves!`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach((card) => card.classList.remove("flipped"));
        flippedCards = [];
        canFlip = true;
      }, 1000);
    }
  }
}

function restartGame() {
  gameContainer.innerHTML = "";
  cards = [];
  flippedCards = [];
  moves = 0;
  pairs = 0;
  canFlip = true;
  movesDisplay.textContent = "0";
  pairsDisplay.textContent = "0";
  createCards();
}

// Initialize the game
loadHighScores();
createCards();
