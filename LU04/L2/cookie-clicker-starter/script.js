/**
 * Game configuration constants
 */
const CONFIG = {
  TICK_RATE: 100, // milliseconds
};

/**
 * Upgrade - Represents a purchaseable item in the store
 */
class Upgrade {
  constructor(name, emoji, cost, generation) {
    this.name = name;
    this.emoji = emoji;
    this.cost = cost;
    this.generation = generation;
    this.count = 0;
  }

  /**
   * Check if enough cookies to afford this upgrade
   */
  canAfford(cookies) {
    return cookies >= this.cost;
  }

  /**
   * Buy multiple of this upgrade
   * @returns {number} Total cost of purchases made
   */
  buyMultiple(cookies, quantity) {
    const canBuy = Math.min(quantity, Math.floor(cookies / this.cost));
    if (canBuy > 0) {
      this.count += canBuy;
      return this.cost * canBuy;
    }
    return 0;
  }

  /**
   * Get total generation rate
   */
  getGenerationRate() {
    return this.count * this.generation;
  }
}

/**
 * GameState - Manages all game state and logic
 */
class GameState {
  constructor() {
    this.cookies = 0;
    this.grandmas = new Upgrade('Grandma', '👵', 100, 1.0);
    this.factories = new Upgrade('Factory', '🏭', 10000, 10.0);
    this.cherub = new Upgrade('Cookie Cherub', '👨', 1000000, 100.0);
    this.god = new Upgrade('Cookie God', '🛶', 1000000000, 10000.0);
    this.listeners = new Set();
  }

  /**
   * Add a listener to be notified of state changes
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of state change
   */
  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  /**
   * Add cookies to the game
   */
  addCookies(amount) {
    this.cookies += amount;
    this.notify();
  }

  /**
   * Buy an upgrade with specified quantity
   */
  buyUpgrade(upgrade, quantity) {
    const spent = upgrade.buyMultiple(this.cookies, quantity);
    if (spent > 0) {
      this.cookies -= spent;
      this.notify();
      return true;
    }
    return false;
  }

  /**
   * Calculate total passive generation rate
   */
  getPassiveGenerationRate() {
    return this.grandmas.getGenerationRate() + this.factories.getGenerationRate();
  }
}

/**
 * GameUI - Handles all UI updates
 */
class GameUI {
  constructor(gameState) {
    this.gameState = gameState;
    this.elements = {
      cookieImage: document.getElementById("cookie-image"),
      clickCount: document.getElementById("click-count"),
      cpsDisplay: document.getElementById("cps-display"),
      grandmaCount: document.getElementById("grandma-count"),
      factoryCount: document.getElementById("factory-count"),
      cherubCount: document.getElementById("cherub-count"),
      godCount: document.getElementById("god-count"),
      grandmaBuyBtns: {
        1: document.getElementById("buy-grandma-1"),
        10: document.getElementById("buy-grandma-10"),
        100: document.getElementById("buy-grandma-100"),
        max: document.getElementById("buy-grandma-max"),
      },
      factoryBuyBtns: {
        1: document.getElementById("buy-factory-1"),
        10: document.getElementById("buy-factory-10"),
        100: document.getElementById("buy-factory-100"),
        max: document.getElementById("buy-factory-max"),
      },
      cherubBuyBtns: {
        1: document.getElementById("buy-cherub-1"),
        10: document.getElementById("buy-cherub-10"),
        100: document.getElementById("buy-cherub-100"),
        max: document.getElementById("buy-cherub-max"),
      },
      godBuyBtns: {
        1: document.getElementById("buy-god-1"),
        10: document.getElementById("buy-god-10"),
        100: document.getElementById("buy-god-100"),
        max: document.getElementById("buy-god-max"),
      },
    };
    
    this.setupEventListeners();
    this.gameState.subscribe(() => this.update());
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Cookie click
    this.elements.cookieImage.addEventListener("click", () => {
      this.gameState.addCookies(1);
      this.playClickAnimation(this.elements.cookieImage);
    });

    // Grandma purchase buttons
    this.elements.grandmaBuyBtns[1].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.grandmas, 1)) {
        this.playPurchaseAnimation(this.elements.grandmaBuyBtns[1]);
      }
    });

    this.elements.grandmaBuyBtns[10].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.grandmas, 10)) {
        this.playPurchaseAnimation(this.elements.grandmaBuyBtns[10]);
      }
    });

    this.elements.grandmaBuyBtns[100].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.grandmas, 100)) {
        this.playPurchaseAnimation(this.elements.grandmaBuyBtns[100]);
      }
    });

    this.elements.grandmaBuyBtns.max.addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.grandmas, Infinity)) {
        this.playPurchaseAnimation(this.elements.grandmaBuyBtns.max);
      }
    });

    // Factory purchase buttons
    this.elements.factoryBuyBtns[1].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.factories, 1)) {
        this.playPurchaseAnimation(this.elements.factoryBuyBtns[1]);
      }
    });

    this.elements.factoryBuyBtns[10].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.factories, 10)) {
        this.playPurchaseAnimation(this.elements.factoryBuyBtns[10]);
      }
    });

    this.elements.factoryBuyBtns[100].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.factories, 100)) {
        this.playPurchaseAnimation(this.elements.factoryBuyBtns[100]);
      }
    });

    this.elements.factoryBuyBtns.max.addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.factories, Infinity)) {
        this.playPurchaseAnimation(this.elements.factoryBuyBtns.max);
      }
    });

    // Cherub purchase buttons
    this.elements.cherubBuyBtns[1].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.cherub, 1)) {
        this.playPurchaseAnimation(this.elements.cherubBuyBtns[1]);
      }
    });

    this.elements.cherubBuyBtns[10].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.cherub, 10)) {
        this.playPurchaseAnimation(this.elements.cherubBuyBtns[10]);
      }
    });

    this.elements.cherubBuyBtns[100].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.cherub, 100)) {
        this.playPurchaseAnimation(this.elements.cherubBuyBtns[100]);
      }
    });

    this.elements.cherubBuyBtns.max.addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.cherub, Infinity)) {
        this.playPurchaseAnimation(this.elements.cherubBuyBtns.max);
      }
    });

    // God purchase buttons
    this.elements.godBuyBtns[1].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.god, 1)) {
        this.playPurchaseAnimation(this.elements.godBuyBtns[1]);
      }
    });

    this.elements.godBuyBtns[10].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.god, 10)) {
        this.playPurchaseAnimation(this.elements.godBuyBtns[10]);
      }
    });

    this.elements.godBuyBtns[100].addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.god, 100)) {
        this.playPurchaseAnimation(this.elements.godBuyBtns[100]);
      }
    });

    this.elements.godBuyBtns.max.addEventListener("click", () => {
      if (this.gameState.buyUpgrade(this.gameState.god, Infinity)) {
        this.playPurchaseAnimation(this.elements.godBuyBtns.max);
      }
    });
  }

  /**
   * Update all UI elements based on game state
   */
  update() {
    const { cookies, grandmas, factories, cherub, god } = this.gameState;
    const cps = this.gameState.getPassiveGenerationRate();

    // Update displays
    this.elements.clickCount.textContent = Math.floor(cookies);
    this.elements.cpsDisplay.textContent = cps.toFixed(1);
    this.elements.grandmaCount.textContent = grandmas.count;
    this.elements.factoryCount.textContent = factories.count;
    this.elements.cherubCount.textContent = cherub.count;
    this.elements.godCount.textContent = god.count;

    // Update button states
    this.updateButtonState(this.elements.grandmaBuyBtns, grandmas, cookies);
    this.updateButtonState(this.elements.factoryBuyBtns, factories, cookies);
    this.updateButtonState(this.elements.cherubBuyBtns, cherub, cookies);
    this.updateButtonState(this.elements.godBuyBtns, god, cookies);
  }

  /**
   * Update button states based on affordability
   */
  updateButtonState(buttons, upgrade, cookies) {
    buttons[1].disabled = !upgrade.canAfford(cookies);
    buttons[10].disabled = cookies < upgrade.cost * 10;
    buttons[100].disabled = cookies < upgrade.cost * 100;
    buttons.max.disabled = !upgrade.canAfford(cookies);
  }

  /**
   * Play click animation on cookie
   */
  playClickAnimation(element) {
    element.style.transform = "scale(0.95)";
    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 100);
  }

  /**
   * Play visual feedback on purchase
   */
  playPurchaseAnimation(element) {
    element.style.transform = "scale(0.95)";
    element.style.backgroundColor = "#10b981";
    setTimeout(() => {
      element.style.transform = "scale(1)";
      element.style.backgroundColor = "";
    }, 200);
  }
}

/**
 * PassiveGenerator - Handles passive cookie generation
 */
class PassiveGenerator {
  constructor(gameState) {
    this.gameState = gameState;
    this.lastTick = Date.now();
  }

  /**
   * Update passive generation based on elapsed time
   */
  tick() {
    const now = Date.now();
    const elapsedMs = now - this.lastTick;
    const elapsedSeconds = elapsedMs / 1000;

    const generationRate = this.gameState.getPassiveGenerationRate();
    const cookiesToAdd = generationRate * elapsedSeconds;

    if (cookiesToAdd > 0) {
      this.gameState.addCookies(cookiesToAdd);
    }

    this.lastTick = now;
  }
}

/**
 * Initialize the game
 */
function initializeGame() {
  const gameState = new GameState();
  const gameUI = new GameUI(gameState);
  const passiveGenerator = new PassiveGenerator(gameState);

  // Start passive generation loop
  setInterval(() => {
    passiveGenerator.tick();
  }, CONFIG.TICK_RATE);

  console.log("Cookie Clicker Game Initialized");
}

// Initialize game when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame);
} else {
  initializeGame();
}
