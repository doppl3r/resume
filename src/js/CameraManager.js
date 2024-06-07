import { Group } from 'three';
import { CameraFactory } from './CameraFactory.js';

/*
  Mediator class for camera objects
*/

class CameraManager extends Group {
  constructor(canvas) {
    super();
    if (canvas) this.canvas = canvas; // Store reference for CameraControls
  }

  init(options = {}) {
    // Create camera with default position
    var camera = CameraFactory.create('perspective', { fov: 25 });
    camera.position.add({ x: 7, y: 5, z: 7 });
    camera.lookAt(0, 1.75, 0);
    camera.updateProjectionMatrix();
    this.camera = camera; // Assign current camera
    this.add(camera);
  }

  updateRender(delta, alpha) {

  }
}

export { CameraManager };