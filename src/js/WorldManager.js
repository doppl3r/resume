import { Group } from 'three';
import { WorldFactory } from './WorldFactory.js';

/*
  Mediator class for world objects
*/

class WorldManager extends Group {
  constructor() {
    super();
    this.worldFactory = new WorldFactory();
  }

  init(assets) {
    this.worldFactory.init(assets);
    this.world = this.worldFactory.create('dungeon-forge');
    this.add(this.world);
  }

  update(delta, alpha) {
    
  }
}

export { WorldManager };