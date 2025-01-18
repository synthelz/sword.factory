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
let currentSword = null;

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
    mold: mold.name,
    quality: quality.name,
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

  cash += currentSword.value;
  displayMessage(`Sold sword for $${currentSword.value}!`);
  currentSword = null;
  updateCash();
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
  document.getElementById("sword-quality").textContent = `Quality: ${currentSword.quality}`;
  document.getElementById("sword-rarity").textContent = currentSword.rarity;
  document.getElementById("sword-mold").textContent = `Mold: ${currentSword.mold}`;
  document.getElementById("enchant1").textContent = currentSword.enchants.enchant1;
  document.getElementById("enchant2").textContent = currentSword.enchants.enchant2;
  document.getElementById("enchant3").textContent = currentSword.enchants.enchant3;
}

function updateCash() {
  document.getElementById("cash").textContent = cash;
}

function displayMessage(message) {
  document.getElementById("message").textContent = message;
}
