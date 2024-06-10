import { Color, Scene } from 'three';
import { CameraManager } from './CameraManager.js';
import { LightManager } from './LightManager.js';
import { WorldManager } from './WorldManager.js';
import { Selector } from './Selector.js';

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
    this.selector = new Selector();

    // Add game input listeners
    this.addEventListeners();
  }

  init(assets) {
    // Initialize entity factory and load scene
    this.cameraManager.init();
    this.lightManager.init();
    this.worldManager.init(assets, this.scene);
    this.selector.init(this.cameraManager.camera);

    // Add components to scene
    this.scene.add(this.cameraManager);
    this.scene.add(this.lightManager);
    this.scene.add(this.worldManager);
    this.scene.add(this.selector);
  }

  throwTrash(e) {
    // Perform raycast
    var point = this.selector.getPoint(e);

    // Throw trash if point exists
    if (point) {
      point.sub(this.cameraManager.camera.position);
      point.y = 2; // Toss vertically
      point.clampLength(-20, 20);

      // Create a trash entity
      var trash = this.worldManager.entityManager.entityFactory.createCuboid({
        model: this.worldManager.entityManager.entityFactory.assets.duplicate('paper'),
        position: this.cameraManager.camera.position,
        scale: { x: 0.25, y: 0.25, z: 0.25 }
      });

      // Adjust paper model
      trash.model.scale.set(3, 3, 3);
      trash.model.play('Roll', 0);

      // Apply force to trash
      trash.rigidBodyDesc.setLinvel(point.x, point.y, point.z);
      trash.rigidBodyDesc.setAngvel({
        x: Math.floor(Math.random() * (4 - (-4) + 1) + (-4)),
        y: Math.floor(Math.random() * (4 - (-4) + 1) + (-4)),
        z: Math.floor(Math.random() * (4 - (-4) + 1) + (-4))
      });

      // Add trash to world
      this.worldManager.entityManager.add(trash);
    }
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
    this.throwTrash(e);

    // Send message back to UI
    window.dispatchEvent(new CustomEvent('incrementCount'));
  }

  toJSON() {

  }
}

export { GameManager };