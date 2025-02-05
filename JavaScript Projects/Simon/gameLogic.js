// gameLogic.js
import { saveGameProgress, loadGameProgress } from './storage.js';
import { displayLevel, updateRecordTable } from './uiHandler.js';

const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let userSequence = [];
let level = 0;
let records = [];

export function initGame() {
  const savedProgress = loadGameProgress();
  if (savedProgress) {
    level = savedProgress.level;
    sequence = savedProgress.sequence;
    records = savedProgress.records || [];
    displayLevel(level);
    updateRecordTable(records);
  }
}

export function startGame() {
  sequence = [];
  level = 0;
  nextSequence();
}

export function nextSequence() {
  userSequence = [];
  level++;
  displayLevel(level);

  const randomColor = colors[Math.floor(Math.random() * 4)];
  sequence.push(randomColor);
  saveGameProgress({ level, sequence, records });

  sequence.forEach((color, index) => {
    setTimeout(() => {
      animatePress(color);
      playSound(color);
    }, 600 * (index + 1));
  });
}

export function checkSequence(index) {
  if (userSequence[index] !== sequence[index]) {
    records.push(level);
    records.sort((a, b) => b - a).splice(5); // Keep top 5 records
    updateRecordTable(records);
    playSound("wrong"); // Add a 'wrong.mp3' file in the sounds folder
    displayLevel("Game Over! Press Start");
    sequence = [];
    level = 0;
    saveGameProgress({ level, sequence, records });
    return;
  }

  if (userSequence.length === sequence.length) {
    setTimeout(nextSequence, 1000);
  }
}

export function handleUserInput(color) {
  userSequence.push(color);
  animatePress(color);
  playSound(color);
  checkSequence(userSequence.length - 1);
}

function playSound(color) {
  const audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function animatePress(color) {
  const button = document.querySelector(`.${color}`);
  button.style.opacity = "0.7";
  setTimeout(() => (button.style.opacity = "1"), 300);
}
