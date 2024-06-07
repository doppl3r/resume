import { Group } from 'three';
import { LightFactory } from './LightFactory.js';

/*
  Mediator class for light objects
*/

class LightManager extends Group {
  constructor() {
    super();
  }

  init() {
    var light = LightFactory.create('ambient', { shadow: true });
    light.position.set(0, 10, 0);
    this.add(light);
  }

  updateRender(delta, alpha) {
    
  }
}

export { LightManager }