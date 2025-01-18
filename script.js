// Game Variables
let playerName = "Player";
let level = 1;
let rarity = "Common";
let quality = "Fine";
let mold = "Bronze";
let swordValue = 1234;
let exp = 0;
let expToLevelUp = 100;
let leaderboard = [];

// Weighted Rarity Data
const rarities = [
  { name: "Common", weight: 1 },
  { name: "Uncommon", weight: 32 },
  { name: "Rare", weight: 4096 },
  { name: "Epic", weight: 91835 },
  { name: "Legendary", weight: 1835008 },
];

const qualities = [
  { name: "Poor", weight: 1 },
  { name: "Fine", weight: 32 },
  { name: "Pristine", weight: 4096 },
  { name: "Masterwork", weight: 91835 },
];

const molds = [
  { name: "Bronze", weight: 1 },
  { name: "Silver", weight: 32 },
  { name: "Gold", weight: 4096 },
  { name: "Diamond", weight: 91835 },
];

// Color Classes for Attributes
const rarityClasses = {
  Common: "common",
  Uncommon: "uncommon",
  Rare: "rare",
  Epic: "epic",
  Legendary: "legendary",
};

// Weighted Random Function
function weightedRandom(attributes) {
  const totalWeight = attributes.reduce((sum, attr) => sum + 1 / attr.weight, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;

  for (const attr of attributes) {
    weightSum += 1 / attr.weight;
    if (random <= weightSum) {
      return attr;
    }
  }
}

// Update the Sword GUI
function updateGUI() {
  document.getElementById("player-name").textContent = `${playerName}'s Sword`;
  document.getElementById("level").className = rarityClasses[rarity];
  document.getElementById("level").textContent = level;
  document.getElementById("rarity").className = rarityClasses[rarity];
  document.getElementById("rarity").textContent = rarity;
  document.getElementById("quality").className = rarityClasses[rarity];
  document.getElementById("quality").textContent = quality;
  document.getElementById("mold").className = rarityClasses[rarity];
  document.getElementById("mold").textContent = mold;
  document.getElementById("value").textContent = `$${swordValue.toLocaleString()}`;
  document.getElementById("exp-display").textContent = `EXP: ${exp} / ${expToLevelUp}`;
  document.getElementById("exp-bar-fill").style.width = `${(exp / expToLevelUp) * 100}%`;
}

// Generate a New Sword
function generateSword() {
  rarity = weightedRandom(rarities).name;
  quality = weightedRandom(qualities).name;
  mold = weightedRandom(molds).name;
  swordValue = Math.floor(Math.random() * 1000 + 1000);

  updateGUI();
}

// Sell the Current Sword
function sellSword() {
  if (swordValue === 0) {
    alert("No sword to sell!");
    return;
  }

  const expGain = Math.floor(swordValue / 10);
  exp += expGain;

  // Handle leveling up
  while (exp >= expToLevelUp) {
    exp -= expToLevelUp;
    expToLevelUp = Math.floor(expToLevelUp * 1.5);
    level++;
    alert(`Congratulations! You've leveled up to Level ${level}!`);
  }

  alert(`Sword sold for $${swordValue}! Gained ${expGain} EXP.`);
  swordValue = 0; // Reset sword value after selling
  updateGUI();
}

// Upgrade Logic
function upgradeAttribute(attributeList, currentAttribute, attributeName) {
  const currentIndex = attributeList.findIndex(attr => attr.name === currentAttribute);
  if (currentIndex === attributeList.length - 1) {
    alert(`${attributeName} is already at maximum!`);
    return currentAttribute;
  }

  const chance = 1 / attributeList[currentIndex + 1].weight;
  if (Math.random() <= chance) {
    alert(`${attributeName} upgraded successfully!`);
    return attributeList[currentIndex + 1].name;
  } else {
    alert(`${attributeName} upgrade failed!`);
    return currentAttribute;
  }
}

function upgradeQuality() {
  quality = upgradeAttribute(qualities, quality, "Quality");
  updateGUI();
}

function upgradeRarity() {
  rarity = upgradeAttribute(rarities, rarity, "Rarity");
  updateGUI();
}

function upgradeMold() {
  mold = upgradeAttribute(molds, mold, "Mold");
  updateGUI();
}

// Save Game
function saveGame() {
  const saveData = {
    playerName,
    level,
    rarity,
    quality,
    mold,
    swordValue,
    exp,
    expToLevelUp,
    leaderboard,
  };

  localStorage.setItem("swordGameSave", JSON.stringify(saveData));
  alert("Game saved successfully!");
}

// Load Game
function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("swordGameSave"));

  if (!saveData) {
    alert("No saved game found!");
    return;
  }

  playerName = saveData.playerName;
  level = saveData.level;
  rarity = saveData.rarity;
  quality = saveData.quality;
  mold = saveData.mold;
  swordValue = saveData.swordValue;
  exp = saveData.exp;
  expToLevelUp = saveData.expToLevelUp;
  leaderboard = saveData.leaderboard;

  alert("Game loaded successfully!");
  updateGUI();
}

// Toggle Leaderboard
function toggleLeaderboard() {
  const leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.display = leaderboardElement.style.display === "none" ? "block" : "none";
}

// Add Button Event Listeners
document.getElementById("generate-sword").addEventListener("click", generateSword);
document.getElementById("sell-sword").addEventListener("click", sellSword);
document.getElementById("upgrade-quality").addEventListener("click", upgradeQuality);
document.getElementById("upgrade-rarity").addEventListener("click", upgradeRarity);
document.getElementById("upgrade-mold").addEventListener("click", upgradeMold);
document.getElementById("save-game").addEventListener("click", saveGame);
document.getElementById("load-game").addEventListener("click", loadGame);
document.getElementById("toggle-leaderboard").addEventListener("click", toggleLeaderboard);

// Initialize the Game
updateGUI();
