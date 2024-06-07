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

    // Add game input listeners
    this.addEventListeners();
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

  throwTrash() {
    var trash = this.worldManager.entityManager.entityFactory.createCuboid({
      position: this.cameraManager.camera.position,
      scale: { x: 0.25, y: 0.25, z: 0.25 }
    });

    var speed = 8.5;
    trash.rigidBodyDesc.setLinvel(-speed, 0, -speed);
    trash.rigidBodyDesc.setAngvel({ x: -4, y: 4, z: 4 });

    this.worldManager.entityManager.add(trash);
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

  addEventListeners() {
    this.cameraManager.canvas.addEventListener('pointerdown', this.click.bind(this));
  }

  click(e) {
    this.throwTrash();
  }

  toJSON() {

  }
}

export { GameManager };