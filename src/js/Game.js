import { AssetLoader } from './AssetLoader.js';
import { Loop } from './Loop';
import { Graphics } from './Graphics.js';
import { GameManager } from './GameManager.js';

class Game {
  constructor() {
    this.assets = new AssetLoader(
      this.onLoad.bind(this),
      this.onProgress.bind(this),
    )
  }

  init(canvas) {
    this.loop = new Loop();
    this.graphics = new Graphics(canvas);
    this.gameManager = new GameManager(canvas);

    // Load public assets
    this.assets.load();
  }

  onLoad() {
    // Update scene
    this.gameManager.init(this.assets);

    // Assign scene & camera to graphic renderer
    this.graphics.setScene(this.gameManager.scene);
    this.graphics.setCamera(this.gameManager.cameraManager.camera);

    // Add game loops
    this.loop.add(this.update.bind(this), -1); // -1 = unlimited
    this.loop.start();
  }

  onProgress(url, itemsLoaded, itemsTotal) {
    var percent = Math.ceil((itemsLoaded / itemsTotal) * 100);
    window.dispatchEvent(new CustomEvent('updateLoading', { detail: { url: url, itemsLoaded: itemsLoaded, itemsTotal: itemsTotal, percent: percent }}));
  }

  update(data) {
    this.gameManager.update(data.delta, data.alpha);
    this.graphics.render();
  }
}

export { Game };