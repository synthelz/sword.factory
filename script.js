const rarities = [
  { name: "Common", multiplier: 1, baseChance: 1 / 1 },
  { name: "Uncommon", multiplier: 2, baseChance: 1 / 2 },
  { name: "Rare", multiplier: 5, baseChance: 1 / 4 },
  { name: "Epic", multiplier: 20, baseChance: 1 / 8 },
  { name: "Legendary", multiplier: 100, baseChance: 1 / 16 },
  { name: "Mythical", multiplier: 500, baseChance: 1 / 1024 },
  { name: "Ascendant", multiplier: 1000, baseChance: 1 / 2048 },
  { name: "Transcendent", multiplier: 5000, baseChance: 1 / 4096 },
  { name: "Divine", multiplier: 10000, baseChance: 1 / 10000 },
  { name: "Omnificent", multiplier: 500000, baseChance: 1 / 50000 },
  { name: "Ethereal", multiplier: 1000000, baseChance: 1 / 1000000 },
  { name: "Void", multiplier: 10000000, baseChance: 1 / 100000000 },
  { name: "Quantum", multiplier: 50000000, baseChance: 1 / 1000000000 },
  { name: "Cosmic", multiplier: 100000000, baseChance: 1 / 10000000000 }
];

const molds = [
  { name: "Katana", baseChance: 1 / 1 },
  { name: "Longsword", baseChance: 1 / 4 },
  { name: "Dagger", baseChance: 1 / 16 },
  { name: "Broadsword", baseChance: 1 / 256 },
  { name: "Rapier", baseChance: 1 / 2048 },
  { name: "Scimitar", baseChance: 1 / 4096 }
];

const qualities = [
  { name: "Poor", baseChance: 1 / 1 },
  { name: "Fine", baseChance: 1 / 2 },
  { name: "Pristine", baseChance: 1 / 16 },
  { name: "Masterwork", baseChance: 1 / 256 },
  { name: "Exquisite", baseChance: 1 / 2048 },
  { name: "Flawless", baseChance: 1 / 4096 }
];

let gold = 0;
let inventory = [];
let currentSword = null;
let autoUpgrades = { molds: false, qualities: false, rarities: false };
let luckLevel = 1;

function produceSword() {
  const rarity = weightedRandom(rarities);
  const mold = weightedRandom(molds);
  const quality = weightedRandom(qualities);
  const value = Math.floor(Math.random() * 100) + rarity.multiplier * 10;

  currentSword = {
    name: `${rarity.name} ${mold.name}`,
    rarity: rarity,
    quality: quality,
    mold: mold.name,
    value: value,
  };
  inventory.push(currentSword);
  displaySword();
  updateInventory();
}

function upgradeSword(attribute) {
  if (!currentSword) return alert("Produce a sword first!");

  let upgraded = false;

  if (attribute === 'rarity') {
    const currentIndex = rarities.indexOf(currentSword.rarity);
    if (currentIndex < rarities.length - 1) {
      const nextRarity = rarities[currentIndex + 1];
      const upgradeChance = nextRarity.baseChance / luckLevel;
      if (Math.random() < upgradeChance) {
        currentSword.rarity = nextRarity;
        currentSword.value += nextRarity.multiplier * 10;
        upgraded = true;
      }
    }
  } else if (attribute === 'mold') {
    const currentIndex = molds.findIndex(m => m.name === currentSword.mold);
    if (currentIndex < molds.length - 1) {
      const nextMold = molds[currentIndex + 1];
      const upgradeChance = nextMold.baseChance / luckLevel;
      if (Math.random() < upgradeChance) {
        currentSword.mold = nextMold.name;
        currentSword.value += 20;
        upgraded = true;
      }
    }
  } else if (attribute === 'quality') {
    const currentIndex = qualities.indexOf(currentSword.quality);
    if (currentIndex < qualities.length - 1) {
      const nextQuality = qualities[currentIndex + 1];
      const upgradeChance = nextQuality.baseChance / luckLevel;
      if (Math.random() < upgradeChance) {
        currentSword.quality = nextQuality;
        currentSword.value += 30;
        upgraded = true;
      }
    }
  }

  currentSword.name = `${currentSword.rarity.name} ${currentSword.mold}`;
  
  displaySword();
  updateGold();
  updateInventory();
  displayMessage(upgraded ? "Sword upgraded successfully!" : "Upgrade failed!");
}

function sellSword() {
  if (!currentSword) return alert("Produce a sword first!");
  gold += currentSword.value;
  inventory = inventory.filter((sword) => sword !== currentSword);
  currentSword = null;
  document.getElementById("sword-container").innerHTML = "No sword created yet!";
  updateGold();
  updateInventory();
  displayMessage("Sword sold successfully!");
}

function toggleInventory() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.style.display = inventoryDiv.style.display === "block" ? "none" : "block";
}

function toggleAuto(type) {
  autoUpgrades[type] = !autoUpgrades[type];
  const button = document.getElementById(`auto-upgrade-${type}`);
  button.classList.toggle("active", autoUpgrades[type]);
}

function weightedRandom(list) {
  // Calculate total cumulative weight
  let totalWeight = 0;
  for (const item of list) {
    totalWeight += item.baseChance;
    item.cumulativeWeight = totalWeight;
  }

  // Generate a random number between 0 and totalWeight
  const random = Math.random() * totalWeight;

  // Find the corresponding item
  for (const item of list) {
    if (random < item.cumulativeWeight) {
      return item;
    }
  }
  return list[0];
}

function displaySword() {
  const container = document.getElementById("sword-container");
  if (!currentSword) return (container.innerHTML = "No sword created yet!");
  container.innerHTML = `
    <div class="sword-ui">
      <p>Next Rarity: ${getNextRarityName(currentSword.rarity)}</p>
      <p>Name: ${currentSword.name}</p>
      <p>Value: ${currentSword.value}</p>
      <p>Rarity: ${currentSword.rarity.name}</p>
      <p>Mold: ${currentSword.mold}</p>
      <p>Quality: ${currentSword.quality.name}</p>
    </div>
  `;
}

function getNextRarityName(currentRarity) {
  const currentIndex = rarities.indexOf(currentRarity);
  if (currentIndex < rarities.length - 1) {
    return rarities[currentIndex + 1].name;
  }
  return "Maxed";
}

function updateGold() {
  document.getElementById("gold").innerText = `Gold: ${gold}`;
  document.getElementById("next-upgrade-cost").innerText = `Next Luck Upgrade Cost: ${Math.floor(100 * Math.pow(2, luckLevel))} Gold`;
}

function updateInventory() {
  const list = document.getElementById("inventory-list");
  list.innerHTML = inventory
    .map(
      (sword) => `
    <div class="sword-item">
      <p>${sword.name}</p>
      <p>Value: ${sword.value}</p>
      <p>Rarity: ${sword.rarity.name}</p>
      <p>Mold: ${sword.mold}</p>
      <p>Quality: ${sword.quality.name}</p>
    </div>
  `
    )
    .join("");
}

function upgradeLuck() {
  const cost = Math.floor(100 * Math.pow(2, luckLevel));
  if (gold < cost) return alert("Not enough gold to upgrade luck!");
  gold -= cost;
  luckLevel++;
  updateGold();
  displayMessage(`Luck upgraded to level ${luckLevel}!`);
}

function displayMessage(message) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = message;
  setTimeout(() => {
    messageDiv.innerText = '';
  }, 2000);
}
