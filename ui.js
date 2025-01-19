// ui.js

import { rarityClasses, moldClasses } from './data.js';
import { displayMessage } from './utils.js';

/**
 * Updates the GUI with the latest game state.
 * @param {Object} state - The game state to update in the UI.
 */
export function updateGUI(state) {
  const {
    playerName,
    level,
    rarity,
    quality,
    mold,
    swordValue,
    exp,
    expToLevelUp,
  } = state;

  // Update Player Name and Sword Display
  document.getElementById("player-name").textContent = `${playerName}'s Sword`;

  // Update Level
  document.getElementById("level").textContent = level;

  // Update Rarity
  const rarityElement = document.getElementById("rarity");
  rarityElement.textContent = rarity;
  rarityElement.className = rarityClasses[rarity] || "";

  // Update Quality
  const qualityElement = document.getElementById("quality");
  qualityElement.textContent = quality;

  // Update Mold
  const moldElement = document.getElementById("mold");
  moldElement.textContent = mold;
  moldElement.className = moldClasses[mold] || "";

  // Update Sword Value
  document.getElementById("value").textContent = `$${swordValue}`;

  // Update EXP
  const expBarFill = document.getElementById("exp-bar-fill");
  document.getElementById("exp-display").textContent = `EXP: ${exp} / ${expToLevelUp}`;
  expBarFill.style.width = `${(exp / expToLevelUp) * 100}%`;
}

/**
 * Updates the leaderboard UI.
 * @param {Array} leaderboard - The array of leaderboard entries.
 */
export function updateLeaderboard(leaderboard) {
  const leaderboardElement = document.getElementById("leaderboard-list");
  leaderboardElement.innerHTML = "";

  leaderboard.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.name} - $${entry.score.toLocaleString()}`;
    leaderboardElement.appendChild(listItem);
  });
}

/**
 * Adds event listeners to buttons and other interactive elements.
 * @param {Object} actions - Functions to trigger on button events.
 */
export function initializeUI(actions) {
  document.getElementById("generate-sword").addEventListener("click", actions.generateSword);
  document.getElementById("sell-sword").addEventListener("click", actions.sellSword);
  document.getElementById("upgrade-quality").addEventListener("click", actions.upgradeQuality);
  document.getElementById("upgrade-rarity").addEventListener("click", actions.upgradeRarity);
  document.getElementById("upgrade-mold").addEventListener("click", actions.upgradeMold);
  document.getElementById("save-game").addEventListener("click", actions.saveGame);
  document.getElementById("load-game").addEventListener("click", actions.loadGame);
  document.getElementById("toggle-leaderboard").addEventListener("click", toggleLeaderboard);
}

/**
 * Toggles the visibility of the leaderboard.
 */
export function toggleLeaderboard() {
  const leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.display = leaderboardElement.style.display === "none" ? "block" : "none";
}
