// game.js

import { rarities, qualities, molds } from './data.js';
import { calculateSwordValue, weightedRandom, displayMessage, upgradeAttribute } from './utils.js';
import { updateGUI, updateLeaderboard, initializeUI } from './ui.js';

// Initial State
const state = {
  playerName: "Player",
  level: 1,
  rarity: "Basic-",
  quality: "Broken",
  mold: "Normal",
  swordValue: 0,
  baseValue: 1500,
  exp: 0,
  expToLevelUp: 100,
  leaderboard: [],
};

/**
 * Generates a new sword with the lowest attributes and a randomized base value.
 */
export function generateSword(state) {
  // Set the lowest rarity, quality, and mold as defaults
  state.rarity = rarities[0].name; // Lowest rarity
  state.quality = qualities[0].name; // Lowest quality
  state.mold = molds[0].name; // Lowest mold

  // Randomize base value between 1500 and 2000
  state.baseValue = Math.floor(Math.random() * 501) + 1500; // Random value in range 1500-2000

  // Recalculate sword value
  state.swordValue = calculateSwordValue(state);

  // Update the UI with the new sword details
  updateGUI(state);
}

/**
 * Sells the current sword and adds EXP based on its value.
 */
export function sellSword(state) {
  if (state.swordValue === 0) {
    displayMessage("No sword to sell!", false);
    return;
  }

  const expGain = Math.floor(state.swordValue / 10);
  state.exp += expGain;

  // Handle leveling up
  while (state.exp >= state.expToLevelUp) {
    state.exp -= state.expToLevelUp;
    state.expToLevelUp = Math.floor(state.expToLevelUp * 1.5);
    state.level++;
    displayMessage(`Level up! New level: ${state.level}`, true);
  }

  displayMessage(`Sword sold for $${state.swordValue}! Gained ${expGain} EXP.`, true);

  // Add to leaderboard
  addToLeaderboard(state.playerName, state.swordValue);

  // Reset sword value
  state.swordValue = 0;
  updateGUI(state);
}

/**
 * Adds a score to the leaderboard and updates the UI.
 */
export function addToLeaderboard(playerName, score) {
  state.leaderboard.push({ name: playerName, score });

  // Keep only the top 10 scores
  state.leaderboard = state.leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  updateLeaderboard(state.leaderboard);
}

/**
 * Upgrades the sword's quality.
 */
export function upgradeQuality(state) {
  state.quality = upgradeAttribute(qualities, state.quality, "Quality");
  state.swordValue = calculateSwordValue(state);
  updateGUI(state);
}

/**
 * Upgrades the sword's rarity.
 */
export function upgradeRarity(state) {
  state.rarity = upgradeAttribute(rarities, state.rarity, "Rarity");
  state.swordValue = calculateSwordValue(state);
  updateGUI(state);
}

/**
 * Upgrades the sword's mold.
 */
export function upgradeMold(state) {
  state.mold = upgradeAttribute(molds, state.mold, "Mold");
  state.swordValue = calculateSwordValue(state);
  updateGUI(state);
}

/**
 * Saves the game state to localStorage.
 */
export function saveGame(state) {
  const saveData = {
    playerName: state.playerName,
    level: state.level,
    rarity: state.rarity,
    quality: state.quality,
    mold: state.mold,
    swordValue: state.swordValue,
    exp: state.exp,
    expToLevelUp: state.expToLevelUp,
    leaderboard: state.leaderboard,
  };

  localStorage.setItem("swordGameSave", JSON.stringify(saveData));
  displayMessage("Game saved successfully!", true);
}

/**
 * Loads the game state from localStorage.
 */
export function loadGame(state) {
  const saveData = JSON.parse(localStorage.getItem("swordGameSave"));

  if (!saveData) {
    displayMessage("No saved game found!", false);
    return;
  }

  state.playerName = saveData.playerName;
  state.level = saveData.level;
  state.rarity = saveData.rarity;
  state.quality = saveData.quality;
  state.mold = saveData.mold;
  state.swordValue = saveData.swordValue;
  state.exp = saveData.exp;
  state.expToLevelUp = saveData.expToLevelUp;
  state.leaderboard = saveData.leaderboard;

  updateGUI(state);
  updateLeaderboard(state.leaderboard);
  displayMessage("Game loaded successfully!", true);
}

/**
 * Toggles the leaderboard display.
 */
export function toggleLeaderboard() {
  const leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.display = leaderboardElement.style.display === "none" ? "block" : "none";
}

// Initialize UI and Game
initializeUI({
  generateSword: () => generateSword(state),
  sellSword: () => sellSword(state),
  upgradeQuality: () => upgradeQuality(state),
  upgradeRarity: () => upgradeRarity(state),
  upgradeMold: () => upgradeMold(state),
  saveGame: () => saveGame(state),
  loadGame: () => loadGame(state),
});
updateGUI(state);
