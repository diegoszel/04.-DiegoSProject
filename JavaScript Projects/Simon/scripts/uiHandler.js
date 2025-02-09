// uiHandler.js
import { handleUserInput } from './gameLogic.js';

export function setupEventListeners(startGame) {
  const buttons = document.querySelectorAll(".color-button");
  const startButton = document.querySelector(".start-btn");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const color = e.target.dataset.color;
      handleUserInput(color);
    });
  });

  startButton.addEventListener("click", startGame);
}

export function displayLevel(level) {
  const display = document.querySelector(".display");
  display.textContent = typeof level === "number" ? `Level ${level}` : level;
}

export function updateRecordTable(records) {
  const recordList = document.querySelector(".record-list");
  recordList.innerHTML = records
    .map((record, index) => `<li>${index + 1}. Level ${record}</li>`)
    .join("");
}
