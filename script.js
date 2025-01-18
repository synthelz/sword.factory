function upgradeSword(type) {
  if (!currentSword) {
    displayMessage("Produce a sword first!");
    return;
  }

  let success = false;

  // Upgrading Quality
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
 
  // Upgrading Rarity
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
 
  // Upgrading Mold
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

  // Upgrading Enchants (for simplicity, we can upgrade each enchantment one by one)
  if (type === "enchant") {
    // Choose one enchantment to upgrade (here we randomly pick one)
    const enchantmentId = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    const enchantName = `enchant${enchantmentId}`;
    const enchantChance = 0.2; // 20% chance to upgrade any enchantment

    success = Math.random() < enchantChance;
    if (success) {
      document.getElementById(enchantName).textContent = Math.floor(Math.random() * 100) + 1;
      displayMessage(`${enchantName} upgraded successfully!`);
    } else {
      displayMessage(`Failed to upgrade ${enchantName}.`);
    }
  }

  // Update sword display after upgrading
  if (success) {
    displaySword();
    updateCash();
  }
}

