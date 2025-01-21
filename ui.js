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
  console.log("Initializing UI and attaching event listeners...");

  const buttons = [
    { id: "generate-sword", action: actions.generateSword },
    { id: "sell-sword", action: actions.sellSword },
    { id: "upgrade-quality", action: actions.upgradeQuality },
    { id: "upgrade-rarity", action: actions.upgradeRarity },
    { id: "upgrade-mold", action: actions.upgradeMold },
    { id: "save-game", action: actions.saveGame },
    { id: "load-game", action: actions.loadGame },
    { id: "toggle-leaderboard", action: actions.toggleLeaderboard }
  ];

  buttons.forEach(button => {
    const element = document.getElementById(button.id);
    if (element) {
      console.log(`Attaching event listener to ${button.id}...`);
      element.addEventListener("click", () => {
        console.log(`${button.id} clicked`);
        button.action();
      });
    } else {
      console.error(`Element with id ${button.id} not found!`);
    }
  });
}
