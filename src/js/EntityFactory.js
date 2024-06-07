/*
  This class creates new entity instances that are compatible
  with Three.js and Rapier.js
*/

import { Cuboid } from './entities/Cuboid';
import { Sphere } from './entities/Sphere';
import { TriMesh } from './entities/TriMesh';

class EntityFactory {
  constructor(assets) {
    // Assign assets for creation
    this.assets = assets;
  }

  create(options) {
    // Call function by class name
    var fn = this['create' + options.class].bind(this);
    if (fn == null) return;
    return fn(options);
  }
  
  createCuboid(options) {
    return new Cuboid(options);
  }
  
  createSphere(options) {
    return new Sphere(options);
  }
  
  createTriMesh(options) {
    return new TriMesh(options);
  }
}

export { EntityFactory }