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
  const percentage = (exp / nextLevelExp) * 100;
  expBar.style.width = `${percentage}%`;
  expText.textContent = `${exp} / ${nextLevelExp} EXP`;

  if (exp >= nextLevelExp) {
    levelUp();
  }
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
}

// Load the game
function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("swordGameSave"));
  if (!saveData) return displayMessage("No save found!");

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
  leaderboardEl.style.display = "block";
  leaderboardListEl.innerHTML = leaderboard
    .map((entry, index) => `<li>${index + 1}. ${entry.name} - $${entry.cash}</li>`)
    .join("");
}

// Display green message
function displayMessage(text) {
  messageEl.textContent = text;
  setTimeout(() => {
    messageEl.textContent = "";
  }, 3000);
}

// Add event listeners
document.getElementById("show-leaderboard").addEventListener("click", displayLeaderboard);
document.getElementById("save-game").addEventListener("click", saveGame);
document.getElementById("load-game").addEventListener("click", loadGame);
