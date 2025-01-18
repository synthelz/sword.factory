// Game variables
let cash = 0;
let currentSword = null;
let level = 1;
let exp = 0;
let nextLevelExp = 100;

// Rarities, qualities, molds, and enchants
const rarities = [
  { name: "Common", multiplier: 1, baseChance: 1, color: "#cccccc" },
  { name: "Uncommon", multiplier: 2, baseChance: 0.5, color: "#00ff00" },
  { name: "Rare", multiplier: 5, baseChance: 0.25, color: "#0000ff" },
  { name: "Epic", multiplier: 20, baseChance: 0.125, color: "#800080" },
  { name: "Legendary", multiplier: 100, baseChance: 0.0625, color: "#ffa500" },
  { name: "Mythical", multiplier: 500, baseChance: 0.03125, color: "#ff69b4" },
  { name: "Ascendant", multiplier: 1000, baseChance: 0.015625, color: "#ff0000" }
];

const molds = [
  { name: "Normal", multiplier: 1, baseChance: 1, color: "#cccccc" },
  { name: "Bronze", multiplier: 2, baseChance: 0.5, color: "#cd7f32" },
  { name: "Silver", multiplier: 4, baseChance: 0.25, color: "#c0c0c0" },
  { name: "Gold", multiplier: 10, baseChance: 0.125, color: "#ffd700" },
  { name: "Diamond", multiplier: 50, baseChance: 0.0625, color: "#b9f2ff" }
];

const qualities = [
  { name: "Poor", multiplier: 0.5, baseChance: 1, color: "#cccccc" },
  { name: "Fine", multiplier: 1, baseChance: 0.5, color: "#00ff00" },
  { name: "Pristine", multiplier: 2, baseChance: 0.25, color: "#0000ff" },
  { name: "Masterwork", multiplier: 5, baseChance: 0.125, color: "#800080" },
  { name: "Exquisite", multiplier: 10, baseChance: 0.0625, color: "#ffa500" }
];

const enchants = [
  { name: "Swiftness", baseLevel: 1 },
  { name: "Resistance", baseLevel: 1 },
  { name: "Surprise", baseLevel: 1 }
];

// DOM Elements
const expBar = document.getElementById("exp-bar");
const expText = document.getElementById("exp-text");
const swordBox = document.getElementById("sword-box");
const swordNameEl = document.getElementById("sword-name");
const swordRarityEl = document.getElementById("sword-rarity");
const swordQualityEl = document.getElementById("sword-quality");
const swordEnchantsEl = document.getElementById("sword-enchants");
const swordValueEl = document.getElementById("sword-value");
const swordMoldEl = document.getElementById("sword-mold");

// Update the EXP bar
function updateExpBar() {
  const percentage = (exp / nextLevelExp) * 100;
  expBar.style.width = `${percentage}%`;
  expText.textContent = `${exp} / ${nextLevelExp} EXP`;

  if (exp >= nextLevelExp) {
    levelUp();
  }
}

// Level up function
function levelUp() {
  level++;
  exp -= nextLevelExp;
  nextLevelExp = Math.floor(nextLevelExp * 1.5);
  updateExpBar();
  alert(`Congratulations! You've reached level ${level}.`);
}

// Generate a random sword
function generateSword() {
  const rarity = getRandomElement(rarities);
  const quality = getRandomElement(qualities);
  const mold = getRandomElement(molds);

  const enchantLevels = enchants.map((enchant) => ({
    name: enchant.name,
    level: Math.floor(Math.random() * 10) + 1
  }));

  const value = Math.floor(
    (10 + Math.random() * 90) *
      rarity.multiplier *
      quality.multiplier *
      mold.multiplier
  );

  currentSword = {
    name: `Sword of ${rarity.name}`,
    rarity,
    quality,
    mold,
    enchants: enchantLevels,
    value
  };

  displaySword();
}

// Display the sword
function displaySword() {
  if (!currentSword) return;

  swordBox.style.display = "block";
  swordNameEl.textContent = currentSword.name;
  swordRarityEl.textContent = `Rarity: ${currentSword.rarity.name}`;
  swordQualityEl.textContent = `Quality: ${currentSword.quality.name}`;
  swordEnchantsEl.textContent = `Enchants: ${currentSword.enchants
    .map((e) => `${e.name} ${e.level}`)
    .join(", ")}`;
  swordValueEl.textContent = `$${formatNumber(currentSword.value)}`;
  swordMoldEl.textContent = currentSword.mold.name;

  swordRarityEl.style.color = currentSword.rarity.color;
  swordQualityEl.style.color = currentSword.quality.color;
  swordMoldEl.style.color = currentSword.mold.color;
}

// Sell the current sword
function sellSword() {
  if (!currentSword) return alert("No sword to sell!");

  cash += currentSword.value;
  const expGain = Math.floor(
    (currentSword.value / 10) * currentSword.rarity.multiplier
  );
  exp += expGain;

  currentSword = null;
  swordBox.style.display = "none";
  updateExpBar();
  alert(`Sword sold for $${formatNumber(cash)} and gained ${expGain} EXP!`);
}

// Save the game
function saveGame() {
  const saveData = {
    cash,
    level,
    exp,
    nextLevelExp
  };
  localStorage.setItem("swordGameSave", JSON.stringify(saveData));
  alert("Game saved!");
}

// Load the game
function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("swordGameSave"));
  if (!saveData) return alert("No saved game found!");

  cash = saveData.cash;
  level = saveData.level;
  exp = saveData.exp;
  nextLevelExp = saveData.nextLevelExp;
  updateExpBar();
  alert("Game loaded!");
}

// Upgrade quality
function upgradeQuality() {
  if (!currentSword) return alert("No sword to upgrade!");
  if (currentSword.quality.multiplier >= qualities[qualities.length - 1].multiplier)
    return alert("Sword quality is already at maximum!");

  const currentIndex = qualities.findIndex(
    (q) => q.name === currentSword.quality.name
  );
  currentSword.quality = qualities[currentIndex + 1];
  displaySword();
  alert("Sword quality upgraded!");
}

// Utility functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function formatNumber(number) {
  if (number >= 1e12) return (number / 1e12).toFixed(2) + "T";
  if (number >= 1e9) return (number / 1e9).toFixed(2) + "B";
  if (number >= 1e6) return (number / 1e6).toFixed(2) + "M";
  if (number >= 1e3) return (number / 1e3).toFixed(2) + "K";
  return Math.floor(number);
}

// Event listeners
document.getElementById("generate-sword").addEventListener("click", generateSword);
document.getElementById("sell-sword").addEventListener("click", sellSword);
document.getElementById("save-game").addEventListener("click", saveGame);
document.getElementById("load-game").addEventListener("click", loadGame);
document.getElementById("upgrade-quality").addEventListener("click", upgradeQuality);
