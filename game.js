// game.js

import { 
  rarityMultipliers, 
  qualityMultipliers, 
  moldMultipliers, 
  molds, 
  qualities, 
  rarities 
} from './data.js';

import { 
  displayMessage, 
  weightedRandom, 
  calculateSwordValue, 
  upgradeAttribute 
} from './utils.js';

// Game State Variables
let playerName = "Player";
let level = 1;
let rarity = "Common";
let quality = "Fine";
let mold = "Bronze";
let swordValue = 0;
let baseValue = 500; // Base sword value
let exp = 0;
let expToLevelUp = 100;
let leaderboard = [];

/**
 * Updates the UI elements to reflect the current game state.
 */
function updateGUI() {
  document.getElementById("player-name").textContent = `${playerName}'s Sword`;
  document.getElementById("level").textContent = level;

  const rarityElement = document.getElementById("rarity");
  rarityElement.textContent = rarity;
  rarityElement.className = rarity;

  const qualityElement = document.getElementById("quality");
  qualityElement.textContent = quality;

  const moldElement = document.getElementById("mold");
  moldElement.textContent = mold;

  document.getElementById("value").textContent = `$${swordValue}`;
  document.getElementById("exp-display").textContent = `EXP: ${exp} / ${expToLevelUp}`;
  document.getElementById("exp-bar-fill").style.width = `${(exp / expToLevelUp) * 100}%`;
}

/**
 * Generates a new sword with random attributes and calculates its value.
 */
function generateSword() {
  rarity = weightedRandom(rarities);
  quality = weightedRandom(qualities);
  mold = weightedRandom(molds);
  baseValue = Math.floor(Math.random() * 500 + 500); // Random base value between 500 and 1000
  swordValue = calculateSwordValue(
    baseValue,
    moldMultipliers[mold],
    qualityMultipliers[quality],
    rarityMultipliers[rarity]
  );
  updateGUI();
}

/**
 * Sells the current sword and grants experience points.
 */
function sellSword() {
  if (swordValue === 0) {
    displayMessage("No sword to sell!", false);
    return;
  }

  const expGain = Math.floor(swordValue / 10);
  exp += expGain;

  while (exp >= expToLevelUp) {
    exp -= expToLevelUp;
    expToLevelUp = Math.floor(expToLevelUp * 1.5);
    level++;
    displayMessage(`Level up! New level: ${level}`, true);
  }

  displayMessage(`Sword sold for $${swordValue}! Gained ${expGain} EXP.`, true);
  addToLeaderboard(playerName, swordValue);

  swordValue = 0; // Reset sword value after selling
  updateGUI();
}

/**
 * Adds the player's score to the leaderboard and updates it.
 * @param {string} playerName - Name of the player.
 * @param {number} score - The player's score.
 */
function addToLeaderboard(playerName, score) {
  leaderboard.push({ name: playerName, score });
  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
  updateLeaderboard();
}

/**
 * Updates the leaderboard UI.
 */
function updateLeaderboard() {
  const leaderboardElement = document.getElementById("leaderboard-list");
  leaderboardElement.innerHTML = "";

  leaderboard.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.name} - $${entry.score.toLocaleString()}`;
    leaderboardElement.appendChild(listItem);
  });
}

/**
 * Attempts to upgrade the sword's quality.
 */
function upgradeQuality() {
  quality = upgradeAttribute(qualities, quality, "Quality");
  swordValue = calculateSwordValue(
    baseValue,
    moldMultipliers[mold],
    qualityMultipliers[quality],
    rarityMultipliers[rarity]
  );
  updateGUI();
}

/**
 * Attempts to upgrade the sword's rarity.
 */
function upgradeRarity() {
  rarity = upgradeAttribute(rarities, rarity, "Rarity");
  swordValue = calculateSwordValue(
    baseValue,
    moldMultipliers[mold],
    qualityMultipliers[quality],
    rarityMultipliers[rarity]
  );
  updateGUI();
}

/**
 * Attempts to upgrade the sword's mold.
 */
function upgradeMold() {
  mold = upgradeAttribute(molds, mold, "Mold");
  swordValue = calculateSwordValue(
    baseValue,
    moldMultipliers[mold],
    qualityMultipliers[quality],
    rarityMultipliers[rarity]
  );
  updateGUI();
}

/**
 * Saves the game state to local storage.
 */
function saveGame() {
  const saveData = {
    playerName,
    level,
    rarity,
    quality,
    mold,
    swordValue,
    exp,
    expToLevelUp,
    leaderboard,
  };
  localStorage.setItem("swordGameSave", JSON.stringify(saveData));
  displayMessage("Game saved successfully!", true);
}

/**
 * Loads the game state from local storage.
 */
function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("swordGameSave"));
  if (!saveData) {
    displayMessage("No saved game found!", false);
    return;
  }

  ({
    playerName,
    level,
    rarity,
    quality,
    mold,
    swordValue,
    exp,
    expToLevelUp,
    leaderboard
  } = saveData);

  updateGUI();
  updateLeaderboard();
  displayMessage("Game loaded successfully!", true);
}

/**
 * Toggles the visibility of the leaderboard.
 */
function toggleLeaderboard() {
  const leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.display = leaderboardElement.style.display === "none" ? "block" : "none";
}

// Add Event Listeners
function initializeGame() {
  document.getElementById("generate-sword").addEventListener("click", generateSword);
  document.getElementById("sell-sword").addEventListener("click", sellSword);
  document.getElementById("upgrade-quality").addEventListener("click", upgradeQuality);
  document.getElementById("upgrade-rarity").addEventListener("click", upgradeRarity);
  document.getElementById("upgrade-mold").addEventListener("click", upgradeMold);
  document.getElementById("save-game").addEventListener("click", saveGame);
  document.getElementById("load-game").addEventListener("click", loadGame);
  document.getElementById("toggle-leaderboard").addEventListener("click", toggleLeaderboard);

  updateGUI();
  updateLeaderboard();
}

// Initialize the game on page load
window.addEventListener("DOMContentLoaded", initializeGame);
