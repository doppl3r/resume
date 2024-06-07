import { Color, Scene } from 'three';
import { CameraManager } from './CameraManager.js';
import { LightManager } from './LightManager.js';
import { WorldManager } from './WorldManager.js';

/*
  Mediator class for game logic
*/

class GameManager {
  constructor(canvas) {
    // Initialize scene
    this.scene = new Scene();
    this.scene.background = new Color('#1F1F1F');

    // Initialize components
    this.cameraManager = new CameraManager(canvas);
    this.lightManager = new LightManager();
    this.worldManager = new WorldManager();
  }

  init(assets) {
    // Initialize entity factory and load scene
    this.cameraManager.init();
    this.lightManager.init();
    this.worldManager.init(assets, this.scene);

    // Add components to scene
    this.scene.add(this.cameraManager);
    this.scene.add(this.lightManager);
    this.scene.add(this.worldManager);
  }

  updatePhysics(delta, alpha) {
    // Update world physics
    this.worldManager.updatePhysics(delta, alpha);
  }

  updateRender(delta, alpha) {
    this.cameraManager.updateRender(delta, alpha);
    this.lightManager.updateRender(delta, alpha);
    this.worldManager.updateRender(delta, alpha);
  }

  toJSON() {

  }
}

export { GameManager };