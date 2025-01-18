// Game variables
let cash = 0;
let currentSword = null;
let level = 1;
let exp = 0;
let nextLevelExp = 100;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// DOM Elements
const expBar = document.getElementById("exp-bar");
const expText = document.getElementById("exp-text");
const swordBox = document.getElementById("sword-box");
const swordDetailsEl = document.getElementById("sword-details");
const swordMoldEl = document.getElementById("sword-mold");
const swordValueEl = document.getElementById("sword-value");
const playerNameEl = document.getElementById("player-name");
const messageEl = document.getElementById("message");
const leaderboardEl = document.getElementById("leaderboard");
const leaderboardListEl = document.getElementById("leaderboard-list");

// Prompt for player name if not set
let playerName = localStorage.getItem("playerName");
if (!playerName) {
  playerName = prompt("Enter your player name:");
  localStorage.setItem("playerName", playerName || "Player");
}
playerNameEl.textContent = playerName || "Player";

// Auto-save every 30 seconds
setInterval(autoSaveGame, 30000);

// Sword attributes
const rarities = [
  { name: "Common", multiplier: 1, baseChance: 1, color: "#cccccc" },
  { name: "Uncommon", multiplier: 2, baseChance: 0.5, color: "#00ff00" },
  { name: "Rare", multiplier: 5, baseChance: 0.25, color: "#0000ff" },
  { name: "Epic", multiplier: 20, baseChance: 0.125, color: "#800080" },
  { name: "Legendary", multiplier: 100, baseChance: 0.0625, color: "#ffa500" }
];

const molds = [
  { name: "Normal", multiplier: 1, baseChance: 1, color: "#cccccc" },
  { name: "Bronze", multiplier: 2, baseChance: 0.5, color: "#cd7f32" },
  { name: "Silver", multiplier: 4, baseChance: 0.25, color: "#c0c0c0" },
  { name: "Gold", multiplier: 10, baseChance: 0.125, color: "#ffd700" },
  { name: "Diamond", multiplier: 50, baseChance: 0.0625, color: "#b9f2ff" }
];

const qualities = [
  { name: "Poor", multiplier: 0.5, baseChance: 1, color: "#cccccc" },
  { name: "Fine", multiplier: 1, baseChance: 0.5, color: "#00ff00" },
  { name: "Pristine", multiplier: 2, baseChance: 0.25, color: "#0000ff" },
  { name: "Masterwork", multiplier: 5, baseChance: 0.125, color: "#800080" }
];

// Update EXP bar
function updateExpBar() {
  while (exp >= nextLevelExp) {
    levelUp();
  }
  const percentage = (exp / nextLevelExp) * 100;
  expBar.style.width = `${percentage}%`;
  expText.textContent = `${exp} / ${nextLevelExp} EXP`;
}

// Level up
function levelUp() {
  level++;
  exp -= nextLevelExp;
  nextLevelExp = Math.floor(nextLevelExp * 1.5);
  displayMessage(`Level Up! You are now Level ${level}!`);
}

// Auto-save game
function autoSaveGame() {
  saveGame();
  displayMessage("Game auto-saved!");
}

// Save the game
function saveGame() {
  const saveData = {
    cash,
    level,
    exp,
    nextLevelExp,
    playerName
  };
  localStorage.setItem("swordGameSave", JSON.stringify(saveData));
  displayMessage("Game saved!");
}

// Load the game
function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("swordGameSave"));
  if (!saveData) {
    displayMessage("No save found!");
    return;
  }

  cash = saveData.cash || 0;
  level = saveData.level || 1;
  exp = saveData.exp || 0;
  nextLevelExp = saveData.nextLevelExp || 100;
  playerName = saveData.playerName || "Player";

  updateExpBar();
  displayMessage("Game loaded!");
}

// Update leaderboard
function updateLeaderboard() {
  leaderboard.push({ name: playerName, cash });
  leaderboard.sort((a, b) => b.cash - a.cash);
  leaderboard = leaderboard.slice(0, 10); // Keep top 10
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  displayLeaderboard();
}

// Display leaderboard
function displayLeaderboard() {
  leaderboardEl.style.display = leaderboardEl.style.display === "block" ? "none" : "block";
  leaderboardListEl.innerHTML = leaderboard
    .map((entry, index) => `<li>${index + 1}. ${entry.name} - $${formatNumber(entry.cash)}</li>`)
    .join("");
}

// Display green message
function displayMessage(text) {
  messageEl.textContent = text;
  setTimeout(() => {
    messageEl.textContent = "";
  }, 3000);
}

// Generate a sword
function generateSword() {
  const rarity = getRandomElement(rarities);
  const quality = getRandomElement(qualities);
  const mold = getRandomElement(molds);

  const value = Math.floor(
    (10 + Math.random() * 90) * rarity.multiplier * quality.multiplier * mold.multiplier
  );

  currentSword = { rarity, quality, mold, value };
  displaySword();
}

// Display sword
function displaySword() {
  if (!currentSword) return;

  swordBox.style.display = "block";
  swordDetailsEl.textContent = `${currentSword.rarity.name}/${currentSword.quality.name}`;
  swordDetailsEl.style.color = currentSword.rarity.color;
  swordMoldEl.textContent = `Mold: ${currentSword.mold.name}`;
  swordMoldEl.style.color = currentSword.mold.color;
  swordValueEl.textContent = `$${formatNumber(currentSword.value)}`;
}

// Sell the current sword
function sellSword() {
  if (!currentSword) {
    displayMessage("No sword to sell!");
    return;
  }
  cash += currentSword.value;
  exp += Math.floor(currentSword.value / 10);
  currentSword = null;
  swordBox.style.display = "none";
  updateExpBar();
  displayMessage(`Sword sold! Gained EXP and $${formatNumber(cash)}`);
}

// Upgrade rarity
function upgradeRarity() {
  if (!currentSword) {
    displayMessage("No sword to upgrade!");
    return;
  }
  const currentIndex = rarities.findIndex(r => r.name === currentSword.rarity.name);
  if (currentIndex === -1 || currentIndex === rarities.length - 1) {
    displayMessage("Rarity is already at maximum!");
    return;
  }
  currentSword.rarity = rarities[currentIndex + 1];
  displaySword();
  displayMessage("Sword rarity upgraded!");
}

// Upgrade mold
function upgradeMold() {
  if (!currentSword) {
    displayMessage("No sword to upgrade!");
    return;
  }
  const currentIndex = molds.findIndex(m => m.name === currentSword.mold.name);
  if (currentIndex === -1 || currentIndex === molds.length - 1) {
    displayMessage("Mold is already at maximum!");
    return;
  }
  currentSword.mold = molds[currentIndex + 1];
  displaySword();
  displayMessage("Sword mold upgraded!");
}

// Utility functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function formatNumber(number) {
  if (number >= 1e12) return (number / 1e12).toFixed(2) + "T";
  if (number >= 1e9) return (number / 1e9).toFixed(2) + "B";
  if (number >= 1e6) return (number / 1e6).toFixed(2) + "M";
  if (number >= 1e3) return (number / 1e3).toFixed(2) + "K";
  return Math.floor(number);
}

// Event listeners
document.getElementById("generate-sword").addEventListener("click", generateSword);
document.getElementById("sell-sword").addEventListener("click", sellSword);
document.getElementById("upgrade-quality").addEventListener("click", upgradeQuality);
document.getElementById("upgrade-rarity").addEventListener("click", upgradeRarity);
document.getElementById("upgrade-mold").addEventListener("click", upgradeMold);
document.getElementById("save-game").addEventListener("click", saveGame);
document.getElementById("load-game").addEventListener("click", loadGame);
document.getElementById("toggle-leaderboard").addEventListener("click", displayLeaderboard);
