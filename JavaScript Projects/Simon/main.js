// main.js
import { initGame, startGame } from "./gameLogic.js";
import { setupEventListeners } from "./uiHandler.js";

// Initialize the game
initGame();

// Set up UI interactions
setupEventListeners(startGame);
