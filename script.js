const rarities = [
  { name: "Common", multiplier: 1, baseChance: 1 },
  { name: "Uncommon", multiplier: 2, baseChance: 0.5 },
  { name: "Rare", multiplier: 5, baseChance: 0.25 },
  { name: "Epic", multiplier: 20, baseChance: 0.125 },
  { name: "Legendary", multiplier: 100, baseChance: 0.0625 },
  { name: "Mythical", multiplier: 500, baseChance: 0.0009765625 },
  { name: "Ascendant", multiplier: 1000, baseChance: 0.00048828125 },
  { name: "Transcendent", multiplier: 5000, baseChance: 0.000244140625 },
  { name: "Divine", multiplier: 10000, baseChance: 0.0001 }
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
  { name: "Diamond", multiplier: 190, baseChance: 0.00390625 },
];

const qualities = [
  { name: "Poor", baseChance: 1 },
  { name: "Fine", baseChance: 0.5 },
  { name: "Pristine", baseChance: 0.0625 },
  { name: "Masterwork", baseChance: 0.00390625 },
  { name: "Exquisite", baseChance: 0.00048828125 },
  { name: "Flawless", baseChance: 0.000244140625 }
];

let cash = 0;
let currentSword = null;

function weightedRandom(attributes) {
  const totalWeight = attributes.reduce((sum, attribute) => sum + attribute.baseChance, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;

  for (let attribute of attributes) {
    weightSum += attribute.baseChance;
    if (random <= weightSum) {
      return attribute;
    }
  }
}

function generateSword() {
  const rarity = weightedRandom(rarities);
  const mold = weightedRandom(molds);
  const quality = weightedRandom(qualities);
  const value = Math.floor(Math.random() * 100) + mold.multiplier;

  currentSword = {
    rarity: rarity.name,
    mold: mold.name,
    quality: quality.name,
    value: value,
  };
  displayMessage("Sword generated successfully!");
  displaySword();
}

function sellSword() {
  if (!currentSword) {
    displayMessage("Produce a sword first!");
    return;
  }

  cash += currentSword.value;
  displayMessage(`Sword sold for $${currentSword.value}!`);
  currentSword = null;
  updateCash();
  displaySword();
}

function saveSword() {
  displayMessage("Sword saved successfully!");
}

function upgradeSword(attribute) {
  let success = false;
  if (attribute === 'quality') {
    success = tryUpgrade(qualities);
    if (success) currentSword.quality = success.name;
  } else if (attribute === 'rarity') {
    success = tryUpgrade(rarities);
    if (success) currentSword.rarity = success.name;
  } else if (attribute === 'mold') {
    success = tryUpgrade(molds);
    if (success) currentSword.mold = success.name;
  } else if (attribute === 'enchant') {
    success = tryUpgradeEnchant();
    if (success) updateEnchantments();
  }

  if (success) {
    displayMessage(`${attribute.charAt(0).toUpperCase() + attribute.slice(1)} upgraded successfully!`);
  } else {
    displayMessage(`Upgrade failed for ${attribute}.`);
  }
}

function tryUpgrade(attributeList) {
  const currentAttribute = attributeList.find(attr => attr.name === currentSword[attributeList[0].name]);
  const nextIndex = attributeList.indexOf(currentAttribute) + 1;

  if (nextIndex < attributeList.length) {
    const nextAttribute = attributeList[nextIndex];
    if (Math.random() <= nextAttribute.baseChance) {
      return nextAttribute;
    }
  }
  return null;
}

function tryUpgradeEnchant() {
  const enchantmentChance = 0.2; // Example chance for successful enchantment upgrade
  if (Math.random() <= enchantmentChance) {
    return true;
  }
  return false;
}

function updateEnchantments() {
  const enchantments = ['enchant1', 'enchant2', 'enchant3'];
  enchantments.forEach((enchant, index) => {
    document.getElementById(enchant).textContent = `Enchant ${index + 1}: Updated`;
  });
}

function displaySword() {
  if (!currentSword) {
    document.querySelector(".sword-box").style.display = "none";
    return;
  }

  document.querySelector(".sword-box").style.display = "block";
  document.getElementById("sword-quality").textContent = `Quality: ${currentSword.quality}`;
  document.getElementById("sword-rarity").textContent = currentSword.rarity;
  document.getElementById("sword-mold").textContent = `Mold: ${currentSword.mold}`;
}

function updateCash() {
  document.getElementById("cash").textContent = cash;
}

function displayMessage(message) {
  document.getElementById("message").textContent = message;
}
