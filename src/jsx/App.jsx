import '../scss/Game.scss'
import { createRef, useEffect, useState } from 'react'
import { Game } from '../js/Game.js';

function App() {
  const count = createRef();
  const canvas = createRef();
  const instructions = createRef();
  const game = window.game = new Game();
  
  // Update canvas render
  useEffect(() => {
    // Initialize game with canvas prop value
    game.init(canvas.current);
  }, [canvas]); // [] = Runs only on the first render

  // Refresh UI when game object dispatches custom events
  window.addEventListener('incrementCount', function(e) {
    incrementCount(e.detail);
  });

  // Increment count
  function incrementCount() {
    count.current.innerHTML++;
    instructions.current.style.display = 'none';
  }

  // Return game UI
  return (
    <>
      <canvas ref={canvas} />
      <div className="ui">
        <div className="count" ref={count}>0</div>
        <div className="instructions" ref={instructions}>Click to toss Jacob's resume</div>
      </div>
    </>
  )
}

export default App
