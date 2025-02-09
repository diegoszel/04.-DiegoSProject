// main.js
import { initGame, startGame } from "./scripts/gameLogic.js";
import { setupEventListeners } from "./scripts/uiHandler.js";

// Initialize the game
initGame();

// Set up UI interactions
setupEventListeners(startGame);
