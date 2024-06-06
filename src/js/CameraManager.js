import { Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
    var camera = CameraFactory.create('perspective', {});
    camera.position.add({ x: 0, y: 8, z: 8 });
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    this.camera = camera; // Assign current camera
    this.add(camera);

    // Assign camera controller to camera
    if (this.canvas) {
      this.orbit = new OrbitControls(camera, this.canvas);
      if (options.orbit == false) this.orbit.enabled = false;
    }
  }

  update(delta, alpha) {

  }
}

export { CameraManager };