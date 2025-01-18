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
  { name: "Normal", multiplier: 1, baseChance: 1, rarity: "Common" },
  { name: "Bronze", multiplier: 2.5, baseChance: 0.5, rarity: "Common" },
  { name: "Silver", multiplier: 6, baseChance: 0.25, rarity: "Common" },
  { name: "Gold", multiplier: 15, baseChance: 0.125, rarity: "Uncommon" },
  { name: "Sapphire", multiplier: 35, baseChance: 0.0625, rarity: "Uncommon" },
  { name: "Emerald", multiplier: 60, baseChance: 0.03125, rarity: "Uncommon" },
  { name: "Ruby", multiplier: 100, baseChance: 0.015625, rarity: "Rare" },
  { name: "Amethyst", multiplier: 145, baseChance: 0.0078125, rarity: "Rare" },
  { name: "Diamond", multiplier: 190, baseChance: 0.00390625, rarity: "Rare" },
  { name: "Opal", multiplier: 250, baseChance: 0.001953125, rarity: "Epic" },
  { name: "Uranium", multiplier: 300, baseChance: 0.0009765625, rarity: "Epic" },
  { name: "Crystal", multiplier: 350, baseChance: 0.00048828125, rarity: "Epic" },
  { name: "Moonstone", multiplier: 420, baseChance: 0.000244140625, rarity: "Legendary" },
  { name: "Topaz", multiplier: 490, baseChance: 0.0001220703125, rarity: "Legendary" },
  { name: "Painite", multiplier: 700, baseChance: 0.00006103515625, rarity: "Legendary" },
  { name: "Anhydrite", multiplier: 850, baseChance: 0.000030517578125, rarity: "Mythical" },
  { name: "Azure", multiplier: 950, baseChance: 0.0000152587890625, rarity: "Mythical" },
  { name: "Volcanic", multiplier: 1175, baseChance: 0.00000762939453125, rarity: "Mythical" },
  { name: "Jade", multiplier: 1200, baseChance: 0.000003814697265625, rarity: "Ascendant" },
  { name: "Shale", multiplier: 1250, baseChance: 0.0000019073486328125, rarity: "Ascendant" },
  { name: "Platinum", multiplier: 1300, baseChance: 0.00000095367431640625, rarity: "Ascendant" },
  { name: "Quartz", multiplier: 1400, baseChance: 0.000000476837158203125, rarity: "Transcendent" },
  { name: "Asgarite", multiplier: 1500, baseChance: 0.0000002384185791015625, rarity: "Transcendent" },
  { name: "Stardust", multiplier: 1750, baseChance: 0.00000011920928955078125, rarity: "Transcendent" },
  { name: "Zeolite", multiplier: 1900, baseChance: 0.000000059604644775390625, rarity: "Divine" },
  { name: "Ammolite", multiplier: 2100, baseChance: 0.0000000298023223876953125, rarity: "Divine" }
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
let luckLevel = 0;
const defaultLuckValue = 1;
const autoSaveInterval = 30000; // Auto-save every 30 seconds

function getLuckValue() {
  return defaultLuckValue + (luckLevel * 0.2);
}

function generateSword() {
  const rarity = weightedRandom(rarities);
  const mold = weightedRandom(molds);
  const quality = weightedRandom(qualities);
  const value = Math.floor(Math.random() * 100) + mold.multiplier;

  currentSword = {
    name: `${rarity.name} ${mold.name}`,
    rarity: rarity,
    quality: quality,
    mold: mold.name,
    value: value,
  };
  console.log(currentSword); // Debugging log
  displaySword();
}

function sellSword() {
  if (!currentSword) return alert("Produce a sword first!");

  cash += currentSword.value;
  alert(`Sword sold for $${currentSword.value}!`);
  currentSword = null;
  updateCash();
  displaySword();
}

function saveSword() {
  alert("Sword saved!");
}

function upgradeSword(attribute) {
  // Implement the logic to upgrade sword attributes
  alert(`Upgraded ${attribute}!`);
}

function weightedRandom(list) {
  let totalWeight = 0;
  for (const item of list) {
    totalWeight += item.baseChance;
    item.cumulativeWeight = totalWeight;
  }
  const random = Math.random() * totalWeight;
  for (const item of list) {
    if (random < item.cumulativeWeight) {
      return item;
    }
  }
  return list[0];
}

function displaySword() {
  const swordBox = document.querySelector(".sword-box");

  if (!currentSword) {
    swordBox.style.display = "none";
    return;
  }

  swordBox.style.display = "block";
  document.getElementById("sword-level").textContent = currentSword.value;
  document.getElementById("sword-rarity").textContent = currentSword.rarity.name;
  document.getElementById("sword-quality").textContent = currentSword.quality.name;
  document.getElementById("sword-rarity-text").textContent = currentSword.rarity.name;
  document.getElementById("sword-mold").textContent = currentSword.mold;
  document.getElementById("enchant1").textContent = Math.floor(Math.random() * 100) + 1;
  document.getElementById("enchant2").textContent = Math.floor(Math.random() * 100) + 1;
  document.getElementById("enchant3").textContent = Math.floor(Math.random() * 100) + 1;
}

function updateCash() {
  document.getElementById("cash").textContent = cash;
}

// Load data when the page loads
window.onload = () => {
  displaySword();
  updateCash();
};

// Set up auto-save
setInterval(() => {
  // Save data logic if needed
}, autoSaveInterval);
