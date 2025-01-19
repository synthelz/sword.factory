// utils.js

/**
 * Display a message in the UI with a success or error style.
 * @param {string} message - The message to display.
 * @param {boolean} [isSuccess=true] - Whether the message is a success or error message.
 */
export function displayMessage(message, isSuccess = true) {
  const messageBox = document.getElementById("message-box");
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.style.color = isSuccess ? "green" : "red";
  }
}

/**
 * Selects a weighted random attribute from a list.
 * @param {Array<{ name: string, weight: number }>} attributes - List of attributes with weights.
 * @returns {string} - The name of the selected attribute.
 */
export function weightedRandom(attributes) {
  const totalWeight = attributes.reduce((sum, attr) => sum + 1 / attr.weight, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;

  for (const attr of attributes) {
    weightSum += 1 / attr.weight;
    if (random <= weightSum) {
      return attr.name;
    }
  }

  return attributes[attributes.length - 1].name; // Fallback to the last attribute.
}

/**
 * Calculates the value of a sword based on its attributes.
 * @param {number} baseValue - The base value of the sword.
 * @param {number} moldMultiplier - Multiplier for the mold.
 * @param {number} qualityMultiplier - Multiplier for the quality.
 * @param {number} rarityMultiplier - Multiplier for the rarity.
 * @returns {number} - The calculated sword value.
 */
export function calculateSwordValue(baseValue, moldMultiplier, qualityMultiplier, rarityMultiplier) {
  return Math.floor(baseValue * moldMultiplier * qualityMultiplier * rarityMultiplier);
}

/**
 * Handles upgrading an attribute.
 * @param {Array<{ name: string, weight: number }>} attributeList - List of attributes.
 * @param {string} currentAttribute - The current attribute to upgrade.
 * @param {string} attributeName - Name of the attribute (for messaging).
 * @returns {string} - The upgraded attribute or the original if the upgrade fails.
 */
export function upgradeAttribute(attributeList, currentAttribute, attributeName) {
  const currentIndex = attributeList.findIndex(attr => attr.name === currentAttribute);
  if (currentIndex === attributeList.length - 1) {
    displayMessage(`${attributeName} is already at maximum!`, false);
    return currentAttribute;
  }

  const chance = 1 / attributeList[currentIndex + 1].weight;
  if (Math.random() <= chance) {
    displayMessage(`${attributeName} upgraded successfully!`, true);
    return attributeList[currentIndex + 1].name;
  } else {
    displayMessage(`${attributeName} upgrade failed!`, false);
    return currentAttribute;
  }
}
