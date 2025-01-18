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
  { name: "Opal", multiplier: 250, baseChance: 0.001953125 },
  { name: "Uranium", multiplier: 300, baseChance: 0.0009765625 },
  { name: "Crystal", multiplier: 350, baseChance: 0.00048828125 },
  { name: "Moonstone", multiplier: 420, baseChance: 0.000244140625 },
  { name: "Topaz", multiplier: 490, baseChance: 0.0001220703125 },
  { name: "Painite", multiplier: 700, baseChance: 0.00006103515625 },
  { name: "Anhydrite", multiplier: 850, baseChance: 0.000030517578125 },
  { name: "Azure", multiplier: 950, baseChance: 0.0000152587890625 },
  { name: "Volcanic", multiplier: 1175, baseChance: 0.00000762939453125 },
  { name: "Jade", multiplier: 1200, baseChance: 0.000003814697265625 },
  { name: "Shale", multiplier: 1250, baseChance: 0.0000019073486328125 },
  { name: "Platinum", multiplier: 1300, baseChance: 0.00000095367431640625 },
  { name: "Quartz", multiplier: 1400, baseChance: 0.000000476837158203125 },
  { name: "Asgarite", multiplier: 1500, baseChance: 0.0000002384185791015625 },
  { name: "Stardust", multiplier: 1750, baseChance: 0.00000011920928955078125 },
  { name: "Zeolite", multiplier: 1900, baseChance: 0.000000059604644775390625 },
  { name: "Ammolite", multiplier: 2100, baseChance: 0.0000000298023223876953125 }
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

function upgradeSword(type) {
  if (!currentSword) {
    displayMessage("Produce a sword first!");
    return;
  }

  let success = false;

  // Upgrade Quality
  if (type === "quality") {
    const currentQualityIndex = qualities.findIndex(q => q.name === currentSword.quality);
    if (currentQualityIndex < qualities.length - 1) {
      const nextQuality = qualities[currentQualityIndex + 1];
      success = Math.random() < nextQuality.baseChance;
      if (success) {
        currentSword.quality = nextQuality.name;
        displayMessage(`Quality upgraded to ${nextQuality.name}!`);
      } else {
        displayMessage(`Failed to upgrade quality.`);
      }
    } else {
      displayMessage("Quality is already at the highest tier!");
    }
  }

  // Upgrade Rarity
  if (type === "rarity") {
    const currentRarityIndex = rarities.findIndex(r => r.name === currentSword.rarity);
    if (currentRarityIndex < rarities.length - 1) {
      const nextRarity = rarities[currentRarityIndex + 1];
      success = Math.random() < nextRarity.baseChance;
      if (success) {
        currentSword.rarity = nextRarity.name;
        displayMessage(`Rarity upgraded to ${nextRarity.name}!`);
      } else {
        displayMessage(`Failed to upgrade rarity.`);
      }
    } else {
      displayMessage("Rarity is already at the highest tier!");
    }
  }

  // Upgrade Mold
  if (type === "mold") {
    const currentMoldIndex = molds.findIndex(m => m.name === currentSword.mold);
    if (currentMoldIndex < molds.length - 1) {
      const nextMold = molds[currentMoldIndex + 1];
      success = Math.random() < nextMold.baseChance;
      if (success) {
        currentSword.mold = nextMold.name;
        displayMessage(`Mold upgraded to ${nextMold.name}!`);
      } else {
        displayMessage(`Failed to upgrade mold.`);
      }
    } else {
      displayMessage("Mold is already at the highest tier!");
    }
  }

  // Upgrade Enchants
  if (type === "enchant") {
    // Randomly pick one enchantment to upgrade
    const enchantmentId = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    const enchantName = `enchant${enchantmentId}`;
    const enchantChance = 0.2; // 20% chance for any enchantment upgrade

    success = Math.random() < enchantChance;
    if (success) {
      // Assign a random enchantment value
      document.getElementById(enchantName).textContent = Math.floor(Math.random() * 100) + 1;
      displayMessage(`${enchantName} upgraded successfully!`);
    } else {
      displayMessage(`Failed to upgrade ${enchantName}.`);
    }
  }

  // If any upgrade was successful, update sword display
  if (success) {
    displaySword();
    updateCash();
  }
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
  document.getElementById("sword-level").textContent = Math.floor(currentSword.value);
