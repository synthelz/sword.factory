let cash = 0;
let exp = 0;
let level = 1;
let currentSword = null;

// Sword attributes
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
  { name: "Normal", multiplier: 1, baseChance: 1, color: "#ffffff" },
  { name: "Bronze", multiplier: 2.5, baseChance: 0.5, color: "#cd7f32" },
  { name: "Silver", multiplier: 6, baseChance: 0.25, color: "#c0c0c0" },
  { name: "Gold", multiplier: 15, baseChance: 0.125, color: "#ffd700" },
  { name: "Sapphire", multiplier: 35, baseChance: 0.0625, color: "#0f52ba" },
  { name: "Emerald", multiplier: 60, baseChance: 0.03125, color: "#50c878" },
  { name: "Ruby", multiplier: 100, baseChance: 0.015625, color: "#e0115f" },
  { name: "Amethyst", multiplier: 145, baseChance: 0.0078125, color: "#9966cc" },
  { name: "Diamond", multiplier: 190, baseChance: 0.00390625, color: "#b9f2ff" }
];

const qualities = [
  { name: "Poor", multiplier: 0.5, baseChance: 1 },
  { name: "Fine", multiplier: 1, baseChance: 0.5 },
  { name: "Pristine", multiplier: 2, baseChance: 0.25 },
  { name: "Masterwork", multiplier: 4, baseChance: 0.125 },
  { name: "Exquisite", multiplier: 8, baseChance: 0.0625 },
  { name: "Flawless", multiplier: 15, baseChance: 0.03125 }
];

// Weighted random function
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

// Generate a sword
function generateSword() {
  const rarity = weightedRandom(rarities);
  const mold = weightedRandom(molds);
  const quality = weightedRandom(qualities);

  const value = Math.floor(
    (Math.random() * 50 + 50) * rarity.multiplier * mold.multiplier * quality.multiplier
  );

  currentSword = {
    rarity: rarity.name,
    rarityColor: rarity.color || "#ffffff",
    mold: mold.name,
    moldColor: mold.color,
    quality: quality.name,
    value: value,
    enchants: { enchant1: 0, enchant2: 0, enchant3: 0 }
  };

  displayMessage("Sword generated successfully!");
  displaySword();
}

// Sell a sword
function sellSword() {
  if (!currentSword) {
    displayMessage("No sword to sell! Generate one first.");
    return;
  }

  cash += currentSword.value;
  const gainedExp = Math.floor(currentSword.value / 10);
  exp += gainedExp;

  // Level up logic
  const expForNextLevel = level * 100;
  if (exp >= expForNextLevel) {
    exp -= expForNextLevel;
    level++;
    displayMessage(`Leveled up! You are now level ${level}.`);
  }

  currentSword = null;
  updateCash();
  updateExpBar();
  displaySword();
}

// Update cash display
function updateCash() {
  document.getElementById("cash").textContent = formatNumber(cash);
}

// Update EXP bar
function updateExpBar() {
  const expBar = document.getElementById("exp-bar");
  const expForNextLevel = level * 100;
  const progress = (exp / expForNextLevel) * 100;

  expBar.style.width = `${progress}%`;
  expBar.style.backgroundColor = progress > 0 ? "yellow" : "transparent";

  document.getElementById("level").textContent = `Level: ${level}`;
  document.getElementById("exp-text").textContent = `${formatNumber(exp)} / ${formatNumber(
    expForNextLevel
  )} EXP`;
}

// Display a sword
function displaySword() {
  const swordBox = document.querySelector(".sword-box");
  if (!currentSword) {
    swordBox.style.display = "none";
    return;
  }

  swordBox.style.display = "block";
  document.getElementById("sword-quality").textContent = currentSword.quality;
  document.getElementById("sword-rarity").textContent = currentSword.rarity;
  document.getElementById("sword-mold").textContent = currentSword.mold;
  document.getElementById("sword-mold").style.color = currentSword.moldColor;

  document.getElementById("enchant1").textContent = currentSword.enchants.enchant1;
  document.getElementById("enchant2").textContent = currentSword.enchants.enchant2;
  document.getElementById("enchant3").textContent = currentSword.enchants.enchant3;
}

// Display a message
function displayMessage(message) {
  document.getElementById("message").textContent = message;
}

// Format numbers with abbreviations
function formatNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toFixed(0);
}

// Save and load
function saveGame() {
  const saveData = {
    cash,
    exp,
    level,
    currentSword
  };
  localStorage.setItem("gameSave", JSON.stringify(saveData));
  displayMessage("Game saved!");
}

function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("gameSave"));
  if (saveData) {
    cash = saveData.cash || 0;
    exp = saveData.exp || 0;
    level = saveData.level || 1;
    currentSword = saveData.currentSword || null;

    updateCash();
    updateExpBar();
    displaySword();
    displayMessage("Game loaded!");
  } else {
    displayMessage("No save data found!");
  }
}

// Event listeners
document.getElementById("generate-sword").addEventListener("click", generateSword);
document.getElementById("sell-sword").addEventListener("click", sellSword);
document.getElementById("save-game").addEventListener("click", saveGame);
document.getElementById("load-game").addEventListener("click", loadGame);
