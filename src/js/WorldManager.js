import { Group } from 'three'
import { Debugger } from './Debugger.js';
import { EntityManager } from './EntityManager.js';
import { World } from '@dimforge/rapier3d';

/*
  Mediator class for world objects
*/

class WorldManager extends Group {
  constructor() {
    super();
  }

  init(assets, scene) {
    // Initialize Rapier world
    this.world = new World({ x: 0.0, y: -9.81, z: 0.0 });

    // Initialize entity manager
    this.entityManager = new EntityManager(scene, this.world);
    this.entityManager.init(assets);

    // Add game debugger
    this.debugger = new Debugger(scene, this.world);
    this.debugger.disable();
    
    // Create trimesh from office model
    var office = this.entityManager.entityFactory.createTriMesh({ model: assets.duplicate('office') });
    this.entityManager.add(office);
  }

  updatePhysics(delta, alpha) {
    this.entityManager.updateBodies(delta);

    // Simulate world
    this.world.step();
    
    // Update debugger buffer
    this.debugger.update();
  }

  updateRender(delta, alpha) {
    this.entityManager.updateObjects(delta, alpha);
  }
}

export { WorldManager };