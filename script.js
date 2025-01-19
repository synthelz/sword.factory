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

// Classes for Color Coding
const rarityClasses = {
  Common: "common",
  Uncommon: "uncommon",
  Rare: "rare",
  Epic: "epic",
  Legendary: "legendary",
};

const moldClasses = {
  Bronze: "bronze",
  Silver: "silver",
  Gold: "gold",
  Diamond: "diamond",
};

// Molds with Weights and Multipliers
const molds = [
  { name: "Normal", weight: 1, multiplier: 1 },
  { name: "Bronze", weight: 10, multiplier: 2.5 },
  { name: "Silver", weight: 100, multiplier: 6 },
  { name: "Gold", weight: 1000, multiplier: 15 },
  { name: "Sapphire", weight: 10000, multiplier: 35 },
  { name: "Emerald", weight: 100000, multiplier: 60 },
  { name: "Ruby", weight: 1000000, multiplier: 100 },
  { name: "Amethyst", weight: 10000000, multiplier: 145 },
  { name: "Diamond", weight: 100000000, multiplier: 190 },
  { name: "Opal", weight: 1000000000, multiplier: 250 },
  { name: "Uranium", weight: 5000000000, multiplier: 300 },
  { name: "Crystal", weight: 10000000000, multiplier: 350 },
  { name: "Moonstone", weight: 50000000000, multiplier: 420 },
  { name: "Topaz", weight: 100000000000, multiplier: 490 },
  { name: "Painite", weight: 1000000000000, multiplier: 700 },
  { name: "Anhydrite", weight: 1500000000000, multiplier: 850 },
  { name: "Azure", weight: 10000000000000, multiplier: 950 },
  { name: "Volcanic", weight: 10000000000000, multiplier: 1175 },
  { name: "Jade", weight: 10500000000000, multiplier: 1200 },
  { name: "Shale", weight: 30000000000000, multiplier: 1250 },
  { name: "Platinum", weight: 60000000000000, multiplier: 1300 },
  { name: "Quartz", weight: 100000000000000, multiplier: 1400 },
  { name: "Asgarite", weight: 250000000000000, multiplier: 1500 },
  { name: "Stardust", weight: 400000000000000, multiplier: 1750 },
  { name: "Zeolite", weight: 500000000000000, multiplier: 1900 },
  { name: "Ammolite", weight: 1000000000000000, multiplier: 2000 },
];

// Qualities with Weights and Multipliers
const qualities = [
  { name: "Broken", weight: 1, multiplier: 1 },
  { name: "Rough", weight: 3, multiplier: 1.25 },
  { name: "Bad", weight: 9, multiplier: 1.5 },
  { name: "Okay", weight: 27, multiplier: 2 },
  { name: "Fine", weight: 81, multiplier: 3 },
  { name: "Good", weight: 243, multiplier: 4.5 },
  { name: "Great", weight: 729, multiplier: 6 },
  { name: "Awesome", weight: 2187, multiplier: 9 },
  { name: "Excellent", weight: 6561, multiplier: 12.5 },
  { name: "Perfect", weight: 19683, multiplier: 18 },
];

// Rarities
const rarities = [
  { name: "Basic-", weight: 1, multiplier: 1 },
  { name: "Basic", weight: 1 / 1.33, multiplier: 1.2 },
  { name: "Basic++", weight: 1 / 1.78, multiplier: 1.44 },
  { name: "Common-", weight: 1 / 3.16, multiplier: 2.07 },
  { name: "Common", weight: 1 / 4.22, multiplier: 2.49 },
  { name: "Common+", weight: 1 / 5.62, multiplier: 2.99 },
  { name: "Common++", weight: 1 / 7.5, multiplier: 3.58 },
  { name: "Uncommon-", weight: 1 / 10, multiplier: 4.3 },
  { name: "Uncommon", weight: 1 / 13.34, multiplier: 5.16 },
  { name: "Uncommon+", weight: 1 / 17.78, multiplier: 6.19 },
  { name: "Uncommon++", weight: 1 / 23.71, multiplier: 7.43 },
  { name: "Rare-", weight: 1 / 31.62, multiplier: 8.92 },
  { name: "Rare", weight: 1 / 42.17, multiplier: 10.7 },
  { name: "Rare+", weight: 1 / 56.23, multiplier: 12.84 },
  { name: "Rare++", weight: 1 / 74.99, multiplier: 15.41 },
  { name: "Epic-", weight: 1 / 100, multiplier: 18.49 },
  { name: "Epic", weight: 1 / 133.35, multiplier: 22.19 },
  { name: "Epic+", weight: 1 / 177.83, multiplier: 26.62 },
  { name: "Epic++", weight: 1 / 237.14, multiplier: 31.95 },
  { name: "Legendary-", weight: 1 / 316.23, multiplier: 38.34 },
  { name: "Legendary", weight: 1 / 421.7, multiplier: 46.01 },
  { name: "Legendary+", weight: 1 / 562.34, multiplier: 55.21 },
  { name: "Legendary++", weight: 1 / 749.89, multiplier: 66.25 },
  { name: "Mythical-", weight: 1 / 1000, multiplier: 79.5 },
  { name: "Mythical", weight: 1 / 1334, multiplier: 95.4 },
  { name: "Mythical+", weight: 1 / 1778, multiplier: 144.48 },
  { name: "Mythical++", weight: 1 / 2371, multiplier: 137.37 },
  { name: "Divine-", weight: 1 / 3162, multiplier: 164.84 },
  { name: "Divine", weight: 1 / 4217, multiplier: 197.81 },
  { name: "Divine+", weight: 1 / 5623, multiplier: 237.38 },
  { name: "Divine++", weight: 1 / 7499, multiplier: 284.85 },
  { name: "Super-", weight: 1 / 10000, multiplier: 341.82 },
  { name: "Super", weight: 1 / 13335, multiplier: 410.19 },
  { name: "Super+", weight: 1 / 17783, multiplier: 492.22 },
  { name: "Super++", weight: 1 / 23714, multiplier: 590.67 },
  { name: "Mega-", weight: 1 / 31623, multiplier: 708.8 },
  { name: "Mega", weight: 1 / 42170, multiplier: 850.56 },
  { name: "Mega+", weight: 1 / 56234, multiplier: 1021 },
  { name: "Mega++", weight: 1 / 74989, multiplier: 1123 },
  { name: "Ultra-", weight: 1 / 100000, multiplier: 1235 },
  { name: "Ultra", weight: 1 / 133352, multiplier: 1359 },
  { name: "Ultra+", weight: 1 / 177828, multiplier: 1495 },
  { name: "Ultra++", weight: 1 / 237137, multiplier: 1644 },
  { name: "Omega-", weight: 1 / 316228, multiplier: 1809 },
  { name: "Omega", weight: 1 / 421697, multiplier: 1990 },
  { name: "Omega+", weight: 1 / 562341, multiplier: 2189 },
  { name: "Omega++", weight: 1 / 749894, multiplier: 2407 },
  { name: "Extreme-", weight: 1 / 1000000, multiplier: 2648 },
  { name: "Extreme", weight: 1 / 1333521, multiplier: 2913 },
  { name: "Extreme+", weight: 1 / 1778279, multiplier: 3204 },
  { name: "Extreme++", weight: 1 / 2371374, multiplier: 3525 },
  { name: "Ultimate-", weight: 1 / 3162278, multiplier: 3877 },
  { name: "Ultimate", weight: 1 / 4216965, multiplier: 4265 },
  { name: "Ultimate+", weight: 1 / 5623413, multiplier: 4691 },
  { name: "Ultimate++", weight: 1 / 7498942, multiplier: 5161 },
  { name: "Insane-", weight: 1 / 10000000, multiplier: 5677 },
  { name: "Insane", weight: 1 / 13335214, multiplier: 6244 },
  { name: "Insane+", weight: 1 / 17782794, multiplier: 6869 },
  { name: "Insane++", weight: 1 / 23713737, multiplier: 7556 },
  { name: "Hyper-", weight: 1 / 31622777, multiplier: 8311 },
  { name: "Hyper", weight: 1 / 42169650, multiplier: 9142 },
  { name: "Hyper+", weight: 1 / 56234133, multiplier: 10057 },
  { name: "Hyper++", weight: 1 / 74989421, multiplier: 11062 },
  { name: "Godly-", weight: 1 / 100000000, multiplier: 12722 },
  { name: "Godly", weight: 1 / 200000000, multiplier: 14630 },
  { name: "Godly+", weight: 1 / 400000000, multiplier: 16824 },
  { name: "Godly++", weight: 1 / 800000000, multiplier: 19348 },
  { name: "Unique-", weight: 1 / 1600000000, multiplier: 22250 },
  { name: "Unique", weight: 1 / 3200000000, multiplier: 25588 },
  { name: "Unique+", weight: 1 / 6400000000, multiplier: 29426 },
  { name: "Unique++", weight: 1 / 12800000000, multiplier: 33840 },
  { name: "Exotic-", weight: 1 / 25600000000, multiplier: 38916 },
  { name: "Exotic", weight: 1 / 51200000000, multiplier: 44752 },
  { name: "Exotic+", weight: 1 / 102400000000, multiplier: 51466 },
  { name: "Exotic++", weight: 1 / 204800000000, multiplier: 59186 },
  { name: "Supreme-", weight: 1 / 409600000000, multiplier: 68064 },
  { name: "Supreme", weight: 1 / 819200000000, multiplier: 78273 },
  { name: "Supreme+", weight: 1 / 1638000000000, multiplier: 90014 },
  { name: "Supreme++", weight: 1 / 3276000000000, multiplier: 103516 },
  { name: "Celestial-", weight: 1 / 6553000000000, multiplier: 119044 },
  { name: "Celestial", weight: 1 / 13100000000000, multiplier: 136900 },
  { name: "Celestial+", weight: 1 / 26210000000000, multiplier: 157435 },
  { name: "Celestial++", weight: 1 / 52420000000000, multiplier: 181050 },
  { name: "Eternal-", weight: 1 / 104800000000000, multiplier: 208208 },
  { name: "Eternal", weight: 1 / 209700000000000, multiplier: 239439 },
  { name: "Eternal+", weight: 1 / 419400000000000, multiplier: 275355 },
  { name: "Eternal++", weight: 1 / 838800000000000, multiplier: 316656 },
  { name: "Cosmic-", weight: 1 / 1677000000000000, multiplier: 364157 },
  { name: "Cosmic", weight: 1 / 3355000000000000, multiplier: 418781 },
  { name: "Cosmic+", weight: 1 / 6710000000000000, multiplier: 481598 },
  { name: "Cosmic++", weight: 1 / 13420000000000000, multiplier: 553838 },
  { name: "Heavenly-", weight: 1 / 25840000000000000, multiplier: 636913 },
  { name: "Heavenly", weight: 1 / 53680000000000000, multiplier: 737450 },
  { name: "Heavenly+", weight: 1 / 107300000000000000, multiplier: 842318 },
  { name: "Heavenly++", weight: 1 / 214700000000000000, multiplier: 968665 },
  { name: "Stellar-", weight: 1 / 429400000000000000, multiplier: 1113965 },
  { name: "Stellar", weight: 1 / 858900000000000000, multiplier: 1281060 },
  { name: "Stellar+", weight: 1 / 1717000000000000000, multiplier: 1473219 },
  { name: "Stellar++", weight: 1 / 3435000000000000000, multiplier: 1694202 },
  { name: "Galactic-", weight: 1 / 6871000000000000000, multiplier: 1948332 },
  { name: "Galactic", weight: 1 / 13740000000000000000, multiplier: 2240582 },
  { name: "Galactic+", weight: 1 / 27480000000000000000, multiplier: 2576669 },
  { name: "Galactic++", weight: 1 / 54970000000000000000, multiplier: 2963169 },
  { name: "Infinity-", weight: 1 / 109900000000000000000, multiplier: 3407645 },
  { name: "Infinity", weight: 1 / 219900000000000000000, multiplier: 3918792 },
  { name: "Infinity+", weight: 1 / 439800000000000000000, multiplier: 4506610 },
  { name: "Infinity++", weight: 1 / 879600000000000000000, multiplier: 5182602 },
  { name: "Infinity+3", weight: 1 / 759000000000000000000000, multiplier: 5959992 },
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

  // Update Level
  document.getElementById("level").textContent = level;

  // Update Rarity
  const rarityElement = document.getElementById("rarity");
  rarityElement.textContent = rarity;
  rarityElement.className = rarityClasses[rarity];

  // Update Quality
  const qualityElement = document.getElementById("quality");
  qualityElement.textContent = quality;
  qualityElement.className = rarityClasses[rarity]; // Rarity influences quality appearance

  // Update Mold
  const moldElement = document.getElementById("mold");
  moldElement.textContent = mold;
  moldElement.className = moldClasses[mold];

  // Update Sword Value
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
