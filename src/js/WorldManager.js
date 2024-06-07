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
    //this.debugger.disable();

    var model = assets.duplicate('office');
    this.add(model);
  }

  updatePhysics(delta, alpha) {
    // Simulate world
    this.world.step();
    
    // Update debugger buffer
    this.debugger.update();
  }

  updateRender(delta, alpha) {
    
  }
}

export { WorldManager };