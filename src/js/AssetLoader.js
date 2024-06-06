import { LoadingManager } from 'three';
import { AssetAudioLoader } from './AssetAudioLoader.js';
import { AssetTextureLoader } from './AssetTextureLoader.js';
import { AssetModelLoader } from './AssetModelLoader.js';

class AssetLoader extends LoadingManager {
  constructor(onLoad, onProgress, onError) {
    // Inherit LoadingManager with events
    super(onLoad, onProgress, onError);

    // Initialize cache and loaders
    this.cache = {};
    this.assetModelLoader = new AssetModelLoader(this);
    this.assetTextureLoader = new AssetTextureLoader(this);
    this.assetAudioLoader = new AssetAudioLoader(this);
  }

  load() {
    // Load loaders
    this.assetModelLoader.load();
    this.assetTextureLoader.load();
    this.assetAudioLoader.load();
  }

  get(key) {
    // Return item from cache (clone by default)
    var item = this.cache[key];
    return item;
  }

  duplicate(key) {
    var item = this.get(key);
    if (item) item = item.duplicate();
    return item;
  }
}

export { AssetLoader };