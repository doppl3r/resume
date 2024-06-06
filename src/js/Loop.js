/*
  Executes single or multiple functions at a recurring frequency. The first
  function loop determines the shared alpha value for all sibling functions.

  Tip: Add your physics function first (ex: 30hz), then add the rendering
  function at a higher frequency (ex: -1 = unlimited). Use the alpha value
  to interpolate rendered objects between engine steps.

  Clock credit: mrdoob
*/

class Loop {
  constructor() {
    this.actions = [];
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    this.speed = 1;
    this.running = false;
  }

  add(callback = function(){}, tick = -1) {
    // Add callback function to array of functions
    this.actions.push({
      rate: 1 / tick,
      sum: 1 / tick,
      alpha: 0,
      callback: callback // Execute function after each interval
    });
  }

  update(loop) {
    if (this.running == true) {
      // Request visual update function before next repaint
      requestAnimationFrame(function(){ loop.update(loop); });

      // Check if functions exist
      if (this.actions.length > 0) {
        var delta = this.getDelta();
        var alpha = this.actions[0].sum / this.actions[0].rate; // Set alpha relative to first interval

        // Loop through array of functions (descending order)
        for (var i = this.actions.length - 1; i >= 0; i--) {
          this.actions[i].sum += delta;

          // Trigger this.actions[i] callback
          if (this.actions[i].sum >= this.actions[i].rate || this.actions[i].rate == -1) {
            this.actions[i].sum %= this.actions[i].rate;
            this.actions[i].callback({
              delta: (this.actions[i].rate == -1) ? delta : this.actions[i].rate,
              alpha: alpha
            });
          }
        }
      }
    }
  }

  start() {
    this.startTime = this.now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
    this.update(this);
  }

  stop() {
    this.getElapsedTime();
    this.running = false;
  }

  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }

  getDelta() {
    let diff = 0;

    // Update the elapsed time if the clock is running
    if (this.running) {
      const newTime = this.now();
      diff = (newTime - this.oldTime) / 1000;
      this.oldTime = newTime;
      this.elapsedTime += diff;
    }
    return diff * this.speed;
  }

  now() {
    return (typeof performance === 'undefined' ? Date : performance).now();
  }
}

export { Loop };