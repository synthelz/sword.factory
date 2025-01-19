// Game Variables
let playerName = "Player";
let level = 1;
let rarity = "Common";
let quality = "Fine";
let mold = "Bronze";
let swordValue = 1234;
let baseValue = 500; // Base sword value
let exp = 0;
let expToLevelUp = 100;
let leaderboard = [];

// Multipliers for Rarity, Quality, and Mold
const rarityMultipliers = {
  Common: 1,
  Uncommon: 2,
  Rare: 3.5,
  Epic: 6,
  Legendary: 10,
};

const qualityMultipliers = {
  Poor: 1,
  Fine: 1.5,
  Pristine: 2.5,
  Masterwork: 4,
};

const moldMultipliers = {
  Bronze: 2,
  Silver: 3.5,
  Gold: 5,
  Diamond: 10,
};

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

// Utility: Display Messages
function displayMessage(message, isSuccess = true) {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = message;
  messageBox.style.color = isSuccess ? "green" : "red";
}

// Weighted Random Selection
function weightedRandom(attributes) {
  const totalWeight = attributes.reduce((sum, attr) => sum + 1 / attr.weight, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;
  for (const attr of attributes) {
    weightSum += 1 / attr.weight;
    if (random <= weightSum) {
      return attr.name;
    }
  }
}

// Calculate Sword Value
function calculateSwordValue() {
  const moldMultiplier = moldMultipliers[mold];
  const qualityMultiplier = qualityMultipliers[quality];
  const rarityMultiplier = rarityMultipliers[rarity];
  return Math.floor(baseValue * moldMultiplier * qualityMultiplier * rarityMultiplier);
}

// Update Sword Display
function updateGUI() {
  document.getElementById("player-name").textContent = `${playerName}'s Sword`;
  document.getElementById("level").textContent = level;
  document.getElementById("rarity").textContent = rarity;
  document.getElementById("quality").textContent = quality;
  document.getElementById("mold").textContent = mold;
  document.getElementById("value").textContent = `$${swordValue}`;
  document.getElementById("exp-display").textContent = `EXP: ${exp} / ${expToLevelUp}`;
  document.getElementById("exp-bar-fill").style.width = `${(exp / expToLevelUp) * 100}%`;
}

// Generate a New Sword
function generateSword() {
  rarity = weightedRandom(rarities);
  quality = weightedRandom(qualities);
  mold = weightedRandom(molds);
  baseValue = Math.floor(Math.random() * 500 + 500); // Random base value between 500 and 1000
  swordValue = calculateSwordValue();
  updateGUI();
}

// Sell the Current Sword
function sellSword() {
  if (swordValue === 0) {
    displayMessage("No sword to sell!", false);
    return;
  }

  const expGain = Math.floor(swordValue / 10);
  exp += expGain;

  // Handle leveling up
  while (exp >= expToLevelUp) {
    exp -= expToLevelUp;
    expToLevelUp = Math.floor(expToLevelUp * 1.5);
    level++;
    displayMessage(`Level up! New level: ${level}`, true);
  }

  displayMessage(`Sword sold for $${swordValue}! Gained ${expGain} EXP.`, true);

  // Add to leaderboard
  addToLeaderboard(playerName, swordValue);

  swordValue = 0; // Reset sword value after selling
  updateGUI();
}

// Add to Leaderboard
function addToLeaderboard(playerName, score) {
  leaderboard.push({ name: playerName, score });

  // Keep only the top 10 scores
  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);

  updateLeaderboard();
}

// Update Leaderboard HTML
function updateLeaderboard() {
  const leaderboardElement = document.getElementById("leaderboard-list");
  leaderboardElement.innerHTML = "";

  leaderboard.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.name} - $${entry.score.toLocaleString()}`;
    leaderboardElement.appendChild(listItem);
  });
}

// Upgrade Logic
function upgradeAttribute(attributeList, currentAttribute, attributeName) {
  const currentIndex = attributeList.findIndex(attr => attr.name === currentAttribute);
  if (currentIndex === attributeList.length - 1) {
    displayMessage(`${attributeName} is already at maximum!`, false);
    return currentAttribute;
  }

  const chance = 1 / attributeList[currentIndex + 1].weight;
  if (Math.random() <= chance) {
    displayMessage(`${attributeName} upgraded successfully!`, true);
    return attributeList[currentIndex + 1].name;
  } else {
    displayMessage(`${attributeName} upgrade failed!`, false);
    return currentAttribute;
  }
}

function upgradeQuality() {
  quality = upgradeAttribute(qualities, quality, "Quality");
  swordValue = calculateSwordValue();
  updateGUI();
}

function upgradeRarity() {
  rarity = upgradeAttribute(rarities, rarity, "Rarity");
  swordValue = calculateSwordValue();
  updateGUI();
}

function upgradeMold() {
  mold = upgradeAttribute(molds, mold, "Mold");
  swordValue = calculateSwordValue();
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
  displayMessage("Game saved successfully!", true);
}

function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("swordGameSave"));

  if (!saveData) {
    displayMessage("No saved game found!", false);
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

  updateGUI();
  updateLeaderboard();
  displayMessage("Game loaded successfully!", true);
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

// Initialize Game
updateGUI();
updateLeaderboard();
