// Rarities, molds, and qualities data
const rarities = [
  { name: "Common", multiplier: 1, baseChance: 1 },
  { name: "Uncommon", multiplier: 2, baseChance: 0.5 },
  { name: "Rare", multiplier: 5, baseChance: 0.25 },
  { name: "Epic", multiplier: 20, baseChance: 0.125 },
  { name: "Legendary", multiplier: 100, baseChance: 0.0625 },
  { name: "Mythical", multiplier: 500, baseChance: 0.00390625 },
  { name: "Ascendant", multiplier: 1000, baseChance: 0.001953125 },
  { name: "Transcendent", multiplier: 5000, baseChance: 0.0009765625 },
  { name: "Divine", multiplier: 10000, baseChance: 0.00048828125 }
];

const molds = [
  { name: "Normal", multiplier: 1, baseChance: 1 },
  { name: "Bronze", multiplier: 2.5, baseChance: 0.5 },
  { name: "Silver", multiplier: 6, baseChance: 0.25 },
  { name: "Gold", multiplier: 15, baseChance: 0.125 },
  { name: "Sapphire", multiplier: 35, baseChance: 0.0625 },
  { name: "Emerald", multiplier: 60, baseChance: 0.03125 },
  { name: "Ruby", multiplier: 100, baseChance: 0.015625 },
  { name: "Amethyst", multiplier: 145, baseChance: 0.0078125 },
  { name: "Diamond", multiplier: 190, baseChance: 0.00390625 }
];

const qualities = [
  { name: "Poor", multiplier: 0.5, baseChance: 1 },
  { name: "Fine", multiplier: 1, baseChance: 0.5 },
  { name: "Pristine", multiplier: 2, baseChance: 0.25 },
  { name: "Masterwork", multiplier: 4, baseChance: 0.125 },
  { name: "Exquisite", multiplier: 8, baseChance: 0.0625 },
  { name: "Flawless", multiplier: 15, baseChance: 0.03125 }
];

let cash = 0;
let exp = 0;
let level = 1;
let currentSword = null;

// Debugging helper
function logDebug(message) {
  console.log(`[DEBUG]: ${message}`);
}

// Format numbers for readability
function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "k";
  return Math.floor(num).toString();
}

// Update cash display
function updateCash() {
  document.getElementById("cash").textContent = formatNumber(cash);
}

// Update EXP bar
function updateExpBar() {
  const currentLevelExp = exp - ((level - 1) * (level - 1) * 150);
  const nextLevelExp = (level * level) * 150;
  const percentage = (currentLevelExp / nextLevelExp) * 100;
  document.getElementById("exp-bar").style.width = `${percentage}%`;
  document.getElementById("exp").textContent = formatNumber(exp);
}

// Calculate player level
function calculateLevel() {
  return Math.floor(1 + Math.sqrt(exp / 150));
}

// Update player level
function updateLevel() {
  const newLevel = calculateLevel();
  if (newLevel > level) {
    level = newLevel;
    displayMessage(`Congratulations! You've reached Level ${level}!`);
  }
}

// Weighted random selection
function weightedRandom(attributes) {
  const totalWeight = attributes.reduce((sum, attr) => sum + attr.baseChance, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;

  for (const attr of attributes) {
    weightSum += attr.baseChance;
    if (random <= weightSum) {
      return attr;
    }
  }
}

// Generate a new sword
function generateSword() {
  logDebug("Generating a new sword...");
  const rarity = weightedRandom(rarities);
  const mold = weightedRandom(molds);
  const quality = weightedRandom(qualities);

  const value = Math.floor((Math.random() * 50 + 50) * rarity.multiplier * mold.multiplier * quality.multiplier);

  currentSword = {
    rarity: rarity.name,
    rarityMultiplier: rarity.multiplier,
    mold: mold.name,
    moldMultiplier: mold.multiplier,
    quality: quality.name,
    qualityMultiplier: quality.multiplier,
    value: value,
    enchants: { enchant1: 0, enchant2: 0, enchant3: 0 }
  };

  displayMessage("Sword generated successfully!");
  displaySword();
}

// Sell the current sword
function sellSword() {
  if (!currentSword) {
    displayMessage("No sword to sell! Generate one first.");
    return;
  }

  const expGained = Math.floor(
    (currentSword.value / 10) *
    currentSword.rarityMultiplier *
    currentSword.qualityMultiplier
  );

  cash += currentSword.value;
  exp += expGained;

  currentSword = null;
  updateCash();
  updateExpBar();
  updateLevel();
  displayMessage(`Sword sold! Gained ${formatNumber(expGained)} EXP and $${formatNumber(cash)}.`);
  displaySword();
}

// Display the current sword
function displaySword() {
  const swordBox = document.querySelector(".sword-box");
  if (!currentSword) {
    swordBox.style.display = "none";
    return;
  }

  swordBox.style.display = "block";
  document.getElementById("sword-quality").textContent = currentSword.quality;
  document.getElementById("sword-rarity").textContent = currentSword.rarity;
  document.getElementById("sword-rarity").className = currentSword.rarity.toLowerCase();
  document.getElementById("sword-mold").textContent = currentSword.mold;
  document.getElementById("sword-mold").className = currentSword.mold.toLowerCase();
  document.getElementById("enchant1").textContent = currentSword.enchants.enchant1;
  document.getElementById("enchant2").textContent = currentSword.enchants.enchant2;
  document.getElementById("enchant3").textContent = currentSword.enchants.enchant3;
}

// Display messages to the player
function displayMessage(message) {
  document.getElementById("message").textContent = message;
}

// Add event listeners to buttons
function setupEventListeners() {
  document.querySelector("button[onclick='generateSword()']").addEventListener("click", generateSword);
  document.querySelector("button[onclick='sellSword()']").addEventListener("click", sellSword);
  document.querySelector("button[onclick='saveGame()']").addEventListener("click", saveGame);
  document.querySelector("button[onclick='loadGame()']").addEventListener("click", loadGame);
}

// Initialize the game
function initializeGame() {
  setupEventListeners();
  updateCash();
  updateExpBar();
  displayMessage("Welcome to Sword Factory Revamp!");
}

initializeGame();
