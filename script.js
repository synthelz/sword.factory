const rarities = [
  { name: "Common", multiplier: 1, baseChance: 1 },
  { name: "Uncommon", multiplier: 2, baseChance: 0.5 },
  { name: "Rare", multiplier: 5, baseChance: 0.25 },
  { name: "Epic", multiplier: 20, baseChance: 0.125 },
  { name: "Legendary", multiplier: 100, baseChance: 0.0625 },
  { name: "Mythical", multiplier: 500, baseChance: 0.03125 },
  { name: "Ascended", multiplier: 1000, baseChance: 0.015625 },
  { name: "Transcendent", multiplier: 5000, baseChance: 0.0078125 },
  { name: "Divine", multiplier: 10000, baseChance: 0.00390625 },
  { name: "Omnificent", multiplier: 500000, baseChance: 0.001953125 },
  { name: "Celestial", multiplier: 1000000, baseChance: 0.0009765625 },
  { name: "Ethereal", multiplier: 5000000, baseChance: 0.00048828125 },
  { name: "Void", multiplier: 10000000, baseChance: 0.000244140625 },
  { name: "Quantum", multiplier: 50000000, baseChance: 0.0001220703125 },
  { name: "Cosmic", multiplier: 100000000, baseChance: 0.00006103515625 }
];
const molds = ["Katana", "Longsword", "Dagger", "Broadsword", "Rapier", "Scimitar", "Claymore", "Gladius"];
const qualities = ["Poor", "Fine", "Pristine", "Masterwork", "Exquisite", "Flawless"];
let gold = 0;
let inventory = [];
let currentSword = null;
let autoUpgrades = { molds: false, qualities: false, rarities: false };
let luckLevel = 1;

function produceSword() {
  const rarity = weightedRandom(rarities, luckLevel);
  const mold = molds[Math.floor(Math.random() * molds.length)];
  const quality = weightedRandom(qualities, luckLevel);
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

function weightedRandom(list, luckLevel) {
  // Calculate the adjusted chances based on luck level
  const totalWeight = list.reduce((sum, item) => sum + item.baseChance / Math.pow(2, luckLevel), 0);
  let random = Math.random() * totalWeight;
  for (const item of list) {
    const adjustedChance = item.baseChance / Math.pow(2, luckLevel);
    if (random < adjustedChance) return item;
    random -= adjustedChance;
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
