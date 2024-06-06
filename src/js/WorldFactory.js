

class WorldFactory {
  constructor() {
    
  }

  init(assets) {
    this.assets = assets;
  }

  create(name) {
    var model;

    // Conditionally assign cached assets
    var model = this.assets.duplicate(name);

    // Return new entity
    return model;
  }
}

export { WorldFactory }