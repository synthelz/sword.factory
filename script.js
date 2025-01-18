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
  leaderboardEl.style.display = leaderboardEl.style.display === "block" ? "none" : "block";
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

// Event listeners
document.getElementById("generate-sword").addEventListener("click", generateSword);
document.getElementById("sell-sword").addEventListener("click", () => {
  if (!currentSword) {
    displayMessage("No sword to sell!");
    return;
  }
  cash += currentSword.value;
  exp += Math.floor(currentSword.value / 10);
  currentSword = null;
  swordBox.style.display = "none";
  updateExpBar();
  displayMessage(`Sword sold! Gained EXP and $${cash}`);
});
document.getElementById("upgrade-quality").addEventListener("click", () => {
  if (!currentSword) {
    displayMessage("No sword to upgrade!");
    return;
  }
  displayMessage("Sword quality upgraded!");
});
document.getElementById("save-game").addEventListener("click", saveGame);
document.getElementById("load-game").addEventListener("click", loadGame);
document.getElementById("toggle-leaderboard").addEventListener("click", displayLeaderboard);
