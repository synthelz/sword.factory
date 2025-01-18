// Game variables
let cash = 0;
let currentSword = null;
let level = 1;
let exp = 0;
let nextLevelExp = 100;

// DOM Elements
const expBar = document.getElementById("exp-bar");
const expText = document.getElementById("exp-text");
const swordBox = document.getElementById("sword-box");
const swordDetailsEl = document.getElementById("sword-details");
const swordMoldEl = document.getElementById("sword-mold");
const swordValueEl = document.getElementById("sword-value");
const playerNameEl = document.getElementById("player-name");
const messageEl = document.getElementById("message");

// Prompt for player name if not set
let playerName = localStorage.getItem("playerName");
if (!playerName) {
  playerName = prompt("Enter your player name:");
  localStorage.setItem("playerName", playerName || "Player");
}
playerNameEl.textContent = playerName || "Player";

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

// Display green message
function displayMessage(text) {
  messageEl.textContent = text;
  setTimeout(() => {
    messageEl.textContent = "";
  }, 3000);
}

// Level up
function levelUp() {
  level++;
  exp -= nextLevelExp;
  nextLevelExp = Math.floor(nextLevelExp * 1.5);
  updateExpBar();
  displayMessage(`Level Up! You are now Level ${level}!`);
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
  displayMessage(`Sword sold! Gained EXP and $${formatNumber(cash)}`);
});
document.getElementById("upgrade-quality").addEventListener("click", () => {
  if (!currentSword) {
    displayMessage("No sword to upgrade!");
    return;
  }
  if (currentSword.quality.name === qualities[qualities.length - 1].name) {
    displayMessage("Sword quality is already at maximum!");
    return;
  }
  const currentIndex = qualities.findIndex((q) => q.name === currentSword.quality.name);
  currentSword.quality = qualities[currentIndex + 1];
  displaySword();
  displayMessage("Sword quality upgraded!");
});
