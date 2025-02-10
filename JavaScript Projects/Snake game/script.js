const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 20; // Size of each block (snake segment and food)
const canvasSize = 400; // Size of canvas
canvas.width = canvasSize;
canvas.height = canvasSize;

const rows = canvas.height / scale;
const columns = canvas.width / scale;
let score = 0;
let speed = 200; // Initial speed (time in ms for each game loop)

let snake = [{ x: 5, y: 5 }];
let direction = "RIGHT";
let food = spawnFood();

// Retrieve high score from localStorage or set to 0 if not found
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;
document.getElementById("highScore").textContent = "High Score: " + highScore;

function setup() {
  document.addEventListener("keydown", changeDirection);
  document.addEventListener("touchstart", changeDirection);
  document.addEventListener("touchmove", changeDirection);
  gameLoop();
}

function gameLoop() {
  setTimeout(function () {
    clearCanvas();
    drawSnake();
    drawFood();
    moveSnake();
    checkCollisions();
    increaseSpeed();
    gameLoop();
  }, speed);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  // Create a linear gradient for the snake
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#00ff00"); // Starting color (light green)
  gradient.addColorStop(1, "#00cc00"); // Ending color (darker green)

  // Apply the gradient to each segment of the snake
  snake.forEach((segment) => {
    ctx.fillStyle = gradient;
    ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
  });
}

function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "RIGHT") head.x += 1;
  if (direction === "LEFT") head.x -= 1;
  if (direction === "UP") head.y -= 1;
  if (direction === "DOWN") head.y += 1;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = "Score: " + score;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function drawFood() {
  const gradient = ctx.createRadialGradient(
    food.x * scale + scale / 2,
    food.y * scale + scale / 2,
    2,
    food.x * scale + scale / 2,
    food.y * scale + scale / 2,
    scale / 2
  );
  gradient.addColorStop(0, "#ff0000");
  gradient.addColorStop(1, "#ff6a00");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(
    food.x * scale + scale / 2,
    food.y * scale + scale / 2,
    scale / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function spawnFood() {
  let foodX = Math.floor(Math.random() * rows);
  let foodY = Math.floor(Math.random() * columns);
  return { x: foodX, y: foodY };
}

function changeDirection(event) {
  if (event.type === "keydown") {
    // Handle keyboard events as before
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  } else if (event.type === "touchstart" || event.type === "touchmove") {
    // Handle touch events
    const touch = event.touches[0];
    const canvasRect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - canvasRect.left;
    const touchY = touch.clientY - canvasRect.top;

    // Determine the direction based on the touch position
    if (touchX < canvasRect.width / 2 && touchY < canvasRect.height / 2) {
      // Top-left quadrant
      direction = "UP";
    } else if (touchX < canvasRect.width / 2 && touchY > canvasRect.height / 2) {
      // Bottom-left quadrant
      direction = "LEFT";
    } else if (touchX > canvasRect.width / 2 && touchY < canvasRect.height / 2) {
      // Top-right quadrant
      direction = "RIGHT";
    } else if (touchX > canvasRect.width / 2 && touchY > canvasRect.height / 2) {
      // Bottom-right quadrant
      direction = "DOWN";
    }
  }
}

function checkCollisions() {
  const head = snake[0];
  // Wall collision
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
    endGame();
  }

  // Self-collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      endGame();
    }
  }
}

function endGame() {
  // Update high score if current score is higher
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore); // Save to localStorage
    document.getElementById("highScore").textContent =
      "High Score: " + highScore;
  }

  document.getElementById("gameOver").style.display = "block"; // Display the "Game Over" message
  alert("Game Over! Final Score: " + score);
  resetGame();
}

function resetGame() {
  snake = [{ x: 5, y: 5 }];
  score = 0;
  document.getElementById("score").textContent = "Score: 0";
  direction = "RIGHT";
  speed = 200; // Reset speed
  document.getElementById("gameOver").style.display = "none"; // Hide the game over message
}

function increaseSpeed() {
  if (score > 0 && score % 5 === 0) {
    // Increase speed every 3 points
    speed = Math.max(100, speed - 10); // Slow increase, minimum speed of 100ms
  }
}

setup();
