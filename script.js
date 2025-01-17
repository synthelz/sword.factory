const rarities = [
  { name: "Common", multiplier: 1, baseChance: 100000 },
  { name: "Uncommon", multiplier: 2, baseChance: 50000 },
  { name: "Rare", multiplier: 5, baseChance: 25000 },
  { name: "Epic", multiplier: 20, baseChance: 12500 },
  { name: "Legendary", multiplier: 100, baseChance: 6250 },
  { name: "Mythical", multiplier: 500, baseChance: 3125 },
  { name: "Ascended", multiplier: 1000, baseChance: 1562.5 },
  { name: "Transcendent", multiplier: 5000, baseChance: 781.25 },
  { name: "Divine", multiplier: 10000, baseChance: 390.625 },
  { name: "Omnificent", multiplier: 500000, baseChance: 195.3125 },
  { name: "Celestial", multiplier: 1000000, baseChance: 97.65625 },
  { name: "Ethereal", multiplier: 5000000, baseChance: 48.828125 },
  { name: "Void", multiplier: 10000000, baseChance: 24.4140625 },
  { name: "Quantum", multiplier: 50000000, baseChance: 12.20703125 },
  { name: "Cosmic", multiplier: 100000000, baseChance: 6.103515625 }
];

const molds = ["Katana", "Longsword", "Dagger", "Broadsword", "Rapier", "Scimitar", "Claymore", "Gladius"];
const qualities = ["Poor", "Fine", "Pristine", "Masterwork", "Exquisite", "Flawless"];
let gold = 0;
let inventory = [];
let currentSword = null;
let autoUpgrades = { molds: false, qualities: false, rarities: false };
let luckLevel = 1;

function produceSword() {
  const rarity = weightedRandom(rarities);
  const mold = molds[Math.floor(Math.random() * molds.length)];
  const quality = weightedRandom(qualities);
  const value = Math.floor(Math.random() * 100) + rarity.multiplier * 10;

  currentSword = {
    name: `${rarity.name} ${mold}`,
    rarity: rarity,
    quality: quality,
    mold: mold,
    value: value,
  };
  inventory.push(currentSword);
  displaySword();
  updateInventory();
}

function upgradeSword(attribute) {
  if (!currentSword) return alert("Produce a sword first!");

  // RNG for upgrade success (1/4 chance)
  if (Math.random() > 0.75) {
    displayMessage("Upgrade failed!");
    return;
  }

  let upgraded = false;

  if (attribute === 'rarity') {
    const currentIndex = rarities.indexOf(currentSword.rarity);
    if (currentIndex < rarities.length - 1) {
      const newRarity = rarities[currentIndex + 1];
      currentSword.rarity = newRarity;
      currentSword.value += newRarity.multiplier * 10;
      upgraded = true;
    }
  } else if (attribute === 'mold') {
    const currentIndex = molds.indexOf(currentSword.mold);
    if (currentIndex < molds.length - 1) {
      const newMold = molds[currentIndex + 1];
      currentSword.mold = newMold;
      currentSword.value += 20;
      upgraded = true;
    }
  } else if (attribute === 'quality') {
    const currentIndex = qualities.indexOf(currentSword.quality);
    if (currentIndex < qualities.length - 1) {
      const newQuality = qualities[currentIndex + 1];
      currentSword.quality = newQuality;
      currentSword.value += 30;
      upgraded = true;
    }
  }

  currentSword.name = `${currentSword.rarity.name} ${currentSword.mold}`;
  
  displaySword();
  updateGold();
  updateInventory();
  displayMessage("Sword upgraded successfully!");
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
      <p>Quality: ${currentSword.quality}</p>
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
      <p>Quality: ${sword.quality}</p>
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
