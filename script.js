// Game Variables
let playerName = "Player";
let level = 1;
let rarity = "Common";
let quality = "Fine";
let mold = "Bronze";
let swordValue = 1234;
let exp = 0;
let expToLevelUp = 100;

// Rarity Data with Weights
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

// Utility: Weighted Random Selection
function weightedRandom(attributes) {
  const totalWeight = attributes.reduce((sum, attr) => sum + 1 / attr.weight, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;

  for (const attr of attributes) {
    weightSum += 1 / attr.weight;
    if (random <= weightSum) {
      return attr;
    }
  }
}

// Update the Sword GUI
function updateGUI() {
  document.getElementById("player-name").textContent = `${playerName}'s Sword`;
  document.getElementById("level-rarity-quality").textContent = `Level ${level} | ${rarity} / ${quality}`;
  document.getElementById("mold-value").textContent = `${mold} ${swordValue.toLocaleString()}`;
  document.getElementById("exp-display").textContent = `EXP: ${exp} / ${expToLevelUp}`;
  document.getElementById("exp-bar-fill").style.width = `${(exp / expToLevelUp) * 100}%`;
}

// Display a Message
function displayMessage(message, isSuccess = true) {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageElement.style.color = isSuccess ? "green" : "red";
  document.querySelector(".game-container").appendChild(messageElement);

  setTimeout(() => messageElement.remove(), 3000);
}

// Generate a New Sword
function generateSword() {
  const selectedRarity = weightedRandom(rarities);
  const selectedQuality = weightedRandom(qualities);
  const selectedMold = weightedRandom(molds);

  rarity = selectedRarity.name;
  quality = selectedQuality.name;
  mold = selectedMold.name;
  swordValue = Math.floor((Math.random() * 1000 + 1000) * (1 / selectedRarity.weight));

  console.log("New sword generated!");
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

  while (exp >= expToLevelUp) {
    exp -= expToLevelUp;
    expToLevelUp = Math.floor(expToLevelUp * 1.5);
    level++;
    displayMessage(`Level Up! New Level: ${level}`);
  }

  displayMessage(`Sword sold for ${swordValue}! Gained ${expGain} EXP.`);
  swordValue = 0; // Reset sword value after selling
  updateGUI();
}

// Upgrade Sword Quality
function upgradeQuality() {
  const currentIndex = qualities.findIndex(q => q.name === quality);
  if (currentIndex === qualities.length - 1) {
    displayMessage("Quality is already at maximum!", false);
    return;
  }

  const chance = 1 / qualities[currentIndex + 1].weight;
  if (Math.random() <= chance) {
    quality = qualities[currentIndex + 1].name;
    swordValue += 500;
    displayMessage("Sword quality upgraded!");
  } else {
    displayMessage("Upgrade failed!", false);
  }

  updateGUI();
}

// Upgrade Sword Rarity
function upgradeRarity() {
  const currentIndex = rarities.findIndex(r => r.name === rarity);
  if (currentIndex === rarities.length - 1) {
    displayMessage("Rarity is already at maximum!", false);
    return;
  }

  const chance = 1 / rarities[currentIndex + 1].weight;
  if (Math.random() <= chance) {
    rarity = rarities[currentIndex + 1].name;
    swordValue += 1000;
    displayMessage("Sword rarity upgraded!");
  } else {
    displayMessage("Upgrade failed!", false);
  }

  updateGUI();
}

// Upgrade Sword Mold
function upgradeMold() {
  const currentIndex = molds.findIndex(m => m.name === mold);
  if (currentIndex === molds.length - 1) {
    displayMessage("Mold is already at maximum!", false);
    return;
  }

  const chance = 1 / molds[currentIndex + 1].weight;
  if (Math.random() <= chance) {
    mold = molds[currentIndex + 1].name;
    swordValue += 1500;
    displayMessage("Sword mold upgraded!");
  } else {
    displayMessage("Upgrade failed!", false);
  }

  updateGUI();
}

// Event Listeners
document.getElementById("generate-sword").addEventListener("click", generateSword);
document.getElementById("sell-sword").addEventListener("click", sellSword);
document.getElementById("upgrade-quality").addEventListener("click", upgradeQuality);
document.getElementById("upgrade-rarity").addEventListener("click", upgradeRarity);
document.getElementById("upgrade-mold").addEventListener("click", upgradeMold);

// Initialize the Game
updateGUI();
