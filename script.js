<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sword Factory Revamp</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #0f0f1e, #1a1a2e, #2a2a3e);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
      color: #fff;
      margin: 0;
      padding: 0;
      text-align: center;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .exp-bar-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #222;
      height: 25px;
    }

    .exp-bar {
      height: 100%;
      background: yellow;
      width: 0%;
      transition: width 0.3s ease;
    }

    .container {
      padding: 20px;
    }

    h1 {
      font-size: 32px;
      color: #ffcc00;
      margin-bottom: 20px;
    }

    .sword-box {
      background: #222;
      color: #fff;
      padding: 20px;
      margin: 20px auto;
      width: 300px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      position: relative;
      display: none;
    }

    .sword-box h2 {
      margin: 0 0 10px;
      font-size: 20px;
    }

    .sword-box .level-rarity {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .sword-box .attributes {
      font-size: 14px;
      text-align: left;
      margin: 10px 0;
    }

    .sword-box .attributes span {
      display: block;
      margin-bottom: 5px;
    }

    .sword-box .attributes .enchant {
      font-size: 14px;
      font-weight: bold;
      color: #ffa500;
    }

    .sword-box .mold {
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 18px;
      font-weight: bold;
    }

    .buttons {
      margin: 20px 0;
    }

    .buttons button {
      margin: 10px;
      padding: 10px 20px;
      background: #444;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
    }

    .buttons button:hover {
      background: #555;
    }

    .cash, .exp {
      margin-top: 20px;
      font-size: 18px;
      font-weight: bold;
    }

    .message {
      margin-top: 10px;
      color: #0f0;
      font-size: 16px;
    }

    /* Color coding for sword attributes */
    .common { color: gray; }
    .uncommon { color: green; }
    .rare { color: blue; }
    .epic { color: purple; }
    .legendary { color: gold; }
    .mythical { color: #a855f7; }
    .ascendant { color: #ff69b4; }
    .transcendent { color: #ff1493; }
    .divine { color: #ff0000; }
    .normal { color: white; }
    .bronze { color: #cd7f32; }
    .silver { color: #c0c0c0; }
    .gold { color: #ffd700; }
    .sapphire { color: #0f52ba; }
    .emerald { color: #50c878; }
    .ruby { color: #e0115f; }
    .amethyst { color: #9966cc; }
    .diamond { color: #b9f2ff; }
  </style>
</head>
<body>
  <div class="exp-bar-container">
    <div class="exp-bar" id="exp-bar"></div>
  </div>

  <div class="container">
    <h1>Sword Factory Revamp</h1>
    <div class="sword-box">
      <h2><span id="player-name">Player's</span> Sword</h2>
      <div class="level-rarity">
        Level <span id="sword-level">1</span> | <span id="sword-rarity" class="normal">Normal</span>
      </div>
      <div class="attributes">
        <span id="sword-quality">Normal</span>
        <span class="enchant">Resistance: <span id="enchant1">0</span></span>
        <span class="enchant">Greed++: <span id="enchant2">0</span></span>
        <span class="enchant">Sharpness: <span id="enchant3">0</span></span>
      </div>
      <div class="mold" id="sword-mold">Normal</div>
    </div>

    <div class="buttons">
      <button onclick="generateSword()">Generate Sword</button>
      <button onclick="sellSword()">Sell Sword</button>
      <button onclick="saveGame()">Save Game</button>
      <button onclick="loadGame()">Load Game</button>
      <button onclick="upgradeSword('quality')">Upgrade Quality</button>
      <button onclick="upgradeSword('rarity')">Upgrade Rarity</button>
      <button onclick="upgradeSword('mold')">Upgrade Mold</button>
      <button onclick="upgradeSword('enchant')">Upgrade Enchants</button>
    </div>

    <div class="cash">Cash: $<span id="cash">0</span></div>
    <div class="exp">EXP: <span id="exp">0</span></div>
    <div class="message" id="message"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
