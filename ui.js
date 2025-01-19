import { rarityClasses, moldClasses } from './data.js';
import { displayMessage } from './utils.js';

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

  document.getElementById("player-name").textContent = `${playerName}'s Sword`;
  document.getElementById("level").textContent = level;
  const rarityElement = document.getElementById("rarity");
  rarityElement.textContent = rarity;
  rarityElement.className = rarityClasses[rarity] || "";

  const qualityElement = document.getElementById("quality");
  qualityElement.textContent = quality;

  const moldElement = document.getElementById("mold");
  moldElement.textContent = mold;
  moldElement.className = moldClasses[mold] || "";

  document.getElementById("value").textContent = `$${swordValue}`;
  const expBarFill = document.getElementById("exp-bar-fill");
  document.getElementById("exp-display").textContent = `EXP: ${exp} / ${expToLevelUp}`;
  expBarFill.style.width = `${(exp / expToLevelUp) * 100}%`;
}

export function updateLeaderboard(leaderboard) {
  const leaderboardElement = document.getElementById("leaderboard-list");
  leaderboardElement.innerHTML = "";

  leaderboard.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.name} - $${entry.score.toLocaleString()}`;
    leaderboardElement.appendChild(listItem);
  });
}

export function initializeUI(actions) {
  document.getElementById("generate-sword").addEventListener("click", actions.generateSword);
  document.getElementById("sell-sword").addEventListener("click", actions.sellSword);
  document.getElementById("upgrade-quality").addEventListener("click", actions.upgradeQuality);
  document.getElementById("upgrade-rarity").addEventListener("click", actions.upgradeRarity);
  document.getElementById("upgrade-mold").addEventListener("click", actions.upgradeMold);
  document.getElementById("save-game").addEventListener("click", actions.saveGame);
  document.getElementById("load-game").addEventListener("click", actions.loadGame);
  document.getElementById("toggle-leaderboard").addEventListener("click", actions.toggleLeaderboard);
}

