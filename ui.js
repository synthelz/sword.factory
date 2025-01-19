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
  // Attach listeners to buttons and log for debugging
  document.getElementById("generate-sword").addEventListener("click", () => {
    console.log("Generate Sword clicked");
    actions.generateSword();
  });
  document.getElementById("sell-sword").addEventListener("click", () => {
    console.log("Sell Sword clicked");
    actions.sellSword();
  });
  document.getElementById("upgrade-quality").addEventListener("click", () => {
    console.log("Upgrade Quality clicked");
    actions.upgradeQuality();
  });
  document.getElementById("upgrade-rarity").addEventListener("click", () => {
    console.log("Upgrade Rarity clicked");
    actions.upgradeRarity();
  });
  document.getElementById("upgrade-mold").addEventListener("click", () => {
    console.log("Upgrade Mold clicked");
    actions.upgradeMold();
  });
  document.getElementById("save-game").addEventListener("click", () => {
    console.log("Save Game clicked");
    actions.saveGame();
  });
  document.getElementById("load-game").addEventListener("click", () => {
    console.log("Load Game clicked");
    actions.loadGame();
  });
  document.getElementById("toggle-leaderboard").addEventListener("click", () => {
    console.log("Toggle Leaderboard clicked");
    actions.toggleLeaderboard();
  });
}

