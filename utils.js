import { rarityMultipliers, qualityMultipliers, moldMultipliers } from './data.js';

/**
 * Displays a message in the message box with success or error styling.
 * @param {string} message - The message to display.
 * @param {boolean} isSuccess - True for success styling, false for error styling.
 */
export function displayMessage(message, isSuccess = true) {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = message;
  messageBox.style.color = isSuccess ? "green" : "red";
}

/**
 * Selects a random attribute from a weighted list.
 * @param {Array} attributes - List of attributes with weights.
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
}

/**
 * Calculates the sword value based on base value and multipliers.
 * @param {Object} state - The game state containing base value, rarity, quality, and mold.
 * @returns {number} - The calculated sword value.
 */
export function calculateSwordValue(state) {
  const moldMultiplier = state.mold ? moldMultipliers[state.mold] : 1;
  const qualityMultiplier = state.quality ? qualityMultipliers[state.quality] : 1;
  const rarityMultiplier = state.rarity ? rarityMultipliers[state.rarity] : 1;

  return Math.floor(state.baseValue * moldMultiplier * qualityMultiplier * rarityMultiplier);
}

/**
 * Upgrades an attribute with a chance of success based on weights.
 * @param {Array} attributeList - The list of attributes.
 * @param {string} currentAttribute - The current attribute name.
 * @param {string} attributeName - The name of the attribute being upgraded (for messages).
 * @returns {string} - The upgraded attribute name (or unchanged if upgrade fails).
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
