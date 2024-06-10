import { DoubleSide, Group, Mesh, MeshPhongMaterial, PlaneGeometry, Raycaster } from 'three';

/*
  Returns 3D coordinates from 2D DOM element pointer event
*/

class Selector extends Group {
  constructor() {
    super();
    this.raycaster = new Raycaster();
  }

  init(camera) {
    this.camera = camera;

    // Create invisible plane that looks at the camera
    var plane = new Mesh(new PlaneGeometry(100, 100), new MeshPhongMaterial({ visible: false, side: DoubleSide }));
    plane.name = 'plane';
    plane.position.y = 2;
    plane.lookAt(camera.position);

    // Add plane object to group
    this.add(plane);
  }

  getPoint(e) {
    // Cast ray from camera
    this.raycaster.setFromCamera(this.getCoordinates(e), this.camera);
    var intersects = this.raycaster.intersectObject(this, true);
    
    // Return 3D point
    var point;
    if (intersects.length > 0) point = intersects[0].point;
    return point;
  }

  getCoordinates(e) {
    return {
      x: ((e.clientX - e.target.parentElement.offsetLeft) / window.innerWidth) * 2 - 1,
      y: -((e.clientY - e.target.parentElement.offsetTop) / window.innerHeight) * 2 + 1, z: 0.5
    };
  }
}

export { Selector };