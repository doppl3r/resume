import { Color, DoubleSide, Mesh, MeshPhongMaterial, PlaneGeometry, Raycaster, Scene, Vector3 } from 'three';
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

    // Add raycaster
    this.raycaster = new Raycaster();
    this.plane = new Mesh(new PlaneGeometry(100, 100), new MeshPhongMaterial({ visible: false, side: DoubleSide }));
    this.plane.name = 'plane';
    this.plane.position.y = 2;
    this.plane.lookAt(this.cameraManager.camera.position);
    this.scene.add(this.plane);

    // Add components to scene
    this.scene.add(this.cameraManager);
    this.scene.add(this.lightManager);
    this.scene.add(this.worldManager);
  }

  throwTrash(e) {
    // Create a trash entity
    var trash = this.worldManager.entityManager.entityFactory.createCuboid({
      model: this.worldManager.entityManager.entityFactory.assets.duplicate('paper'),
      position: this.cameraManager.camera.position,
      scale: { x: 0.25, y: 0.25, z: 0.25 }
    });

    // Adjust paper model
    trash.model.scale.set(3, 3, 3);
    trash.model.play('Roll', 0);

    // Perform raycast
    this.raycaster.setFromCamera(this.getCoordinates(e), this.cameraManager.camera);
    var intersects = this.raycaster.intersectObject(this.scene, true);
    var point = new Vector3();

    // Set new position to plane intersection
    if (intersects.length > 0) {
      for (var i = 0; i < intersects.length; i++) {
        var data = intersects[i];
        if (data.object.name == 'plane') {
          point.copy(data.point);
          point.sub(this.cameraManager.camera.position);
          point.y = 2; // Toss vertically
          point.clampLength(-20, 20);
          break;
        }
      }
    }

    // Launch trash
    trash.rigidBodyDesc.setLinvel(point.x, point.y, point.z);
    trash.rigidBodyDesc.setAngvel({
      x: Math.floor(Math.random() * (4 - (-4) + 1) + (-4)),
      y: Math.floor(Math.random() * (4 - (-4) + 1) + (-4)),
      z: Math.floor(Math.random() * (4 - (-4) + 1) + (-4))
    });

    // Add trash to world
    this.worldManager.entityManager.add(trash);
  }

  getCoordinates(e) {
    return { x: ((e.clientX - e.target.parentElement.offsetLeft) / window.innerWidth) * 2 - 1, y: -((e.clientY - e.target.parentElement.offsetTop) / window.innerHeight) * 2 + 1, z: 0.5 };
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