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

function calculateLevel() {
  return Math.floor(1 + Math.sqrt(exp / 150)); // Quadratic EXP scaling
}

function updateLevel() {
  const newLevel = calculateLevel();
  if (newLevel > level) {
    level = newLevel;
    displayMessage(`Congratulations! You've reached Level ${level}!`);
  }
}

function updateExpBar() {
  const currentLevelExp = exp - ((level - 1) * (level - 1) * 150);
  const nextLevelExp = (level * level) * 150;
  const percentage = (currentLevelExp / nextLevelExp) * 100;
  const expBar = document.getElementById("exp-bar");
  expBar.style.width = `${percentage}%`;
}

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

function generateSword() {
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
  displayMessage(`Sword sold! Gained ${expGained} EXP and $${cash}.`);
  displaySword();
}

function upgradeSword(attribute) {
  if (!currentSword) {
    displayMessage("No sword to upgrade! Generate one first.");
    return;
  }

  let success = false;

  if (attribute === "quality") {
    success = tryUpgrade(qualities, "quality");
  } else if (attribute === "rarity") {
    success = tryUpgrade(rarities, "rarity");
  } else if (attribute === "mold") {
    success = tryUpgrade(molds, "mold");
  } else if (attribute === "enchant") {
    success = tryUpgradeEnchant();
  }

  if (success) {
    displayMessage(`${attribute.charAt(0).toUpperCase() + attribute.slice(1)} upgraded successfully!`);
  } else {
    displayMessage(
      `Upgrade failed for ${attribute}. Maximum level reached or insufficient chance.`
    );
  }
  displaySword();
}

function tryUpgrade(attributeList, attributeKey) {
  const currentIndex = attributeList.findIndex(attr => attr.name === currentSword[attributeKey]);
  if (currentIndex === -1 || currentIndex === attributeList.length - 1) return false;

  const nextAttribute = attributeList[currentIndex + 1];
  if (Math.random() <= nextAttribute.baseChance) {
    currentSword[attributeKey] = nextAttribute.name;
    currentSword[`${attributeKey}Multiplier`] = nextAttribute.multiplier;
    currentSword.value *= nextAttribute.multiplier / attributeList[currentIndex].multiplier;
    return true;
  }
  return false;
}

function tryUpgradeEnchant() {
  const enchantChance = 0.2; // 20% success rate
  if (Math.random() <= enchantChance) {
    for (const key in currentSword.enchants) {
      currentSword.enchants[key] += 1;
    }
    return true;
  }
  return false;
}

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

function updateCash() {
  document.getElementById("cash").textContent = cash;
}

function saveGame() {
  const gameState = { cash, exp, level, currentSword };
  localStorage.setItem("swordFactoryGame", JSON.stringify(gameState));
  displayMessage("Game saved successfully!");
}

function loadGame() {
  const savedState = localStorage.getItem("swordFactoryGame");
  if (savedState) {
    const { cash: savedCash, exp: savedExp, level: savedLevel, currentSword: savedSword } = JSON.parse(savedState);
    cash = savedCash || 0;
    exp = savedExp || 0;
    level = savedLevel || 1;
    currentSword = savedSword || null;
    updateCash();
    updateExpBar();
    displaySword();
    displayMessage("Game loaded successfully!");
  } else {
    displayMessage("No saved game found.");
  }
}

function displayMessage(message) {
  document.getElementById("message").textContent = message;
}
