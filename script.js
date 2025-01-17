<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sword Factory Remade</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #222;
      color: #fff;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    .container {
      padding: 20px;
    }
    button {
      margin: 10px;
      padding: 10px 20px;
      background: #444;
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px;
    }
    button:hover {
      background: #666;
    }
    .inventory {
      display: none;
      position: fixed;
      top: 10%;
      left: 10%;
      width: 80%;
      height: 70%;
      background: #333;
      border: 2px solid #fff;
      overflow-y: auto;
      border-radius: 10px;
      padding: 20px;
      z-index: 1000;
    }
    .inventory h2 {
      margin: 0 0 10px 0;
    }
    .sword-item {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #555;
      border-radius: 5px;
      text-align: left;
    }
    .inventory-close {
      position: absolute;
      top: 10px;
      right: 20px;
      background: #900;
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 5px;
    }
    .sword-ui {
      margin-top: 20px;
      padding: 20px;
      background: #333;
      border-radius: 10px;
      display: inline-block;
    }
    .sword-ui p {
      margin: 5px 0;
    }
    .message {
      color: #0f0;
      margin-top: 10px;
    }
    .category {
      margin: 20px 0;
    }
    .category h2 {
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Sword Factory Remade</h1>
    <p>Produce, upgrade, and sell swords with advanced mechanics!</p>
    
    <div class="category">
      <h2>Swords</h2>
      <button onclick="produceSword()">Produce Sword</button>
      <button onclick="upgradeSword('rarity')">Upgrade Rarity</button>
      <button onclick="upgradeSword('mold')">Upgrade Mold</button>
      <button onclick="upgradeSword('quality')">Upgrade Quality</button>
      <button onclick="sellSword()">Sell Sword</button>
      <button onclick="toggleInventory()">View Inventory</button>
      <button onclick="upgradeLuck()">Upgrade Luck</button>
    </div>
    
    <div class="category">
      <h2>Settings</h2>
      <button onclick="exportData()">Export Data</button>
      <input type="file" onchange="importData(event)" />
    </div>

    <div id="cash">Cash: 0</div>
    <div id="sword-container">No sword created yet!</div>
    <div id="next-upgrade-cost">Next Luck Upgrade Cost: 100 Cash</div>
    <div id="message" class="message"></div>
  </div>

  <div class="inventory" id="inventory">
    <button class="inventory-close" onclick="toggleInventory()">Close</button>
    <h2>Sword Inventory</h2>
    <div id="inventory-list"></div>
  </div>

  <script src="script.js"></script> <!-- Link to your JS file -->
</body>
</html>
