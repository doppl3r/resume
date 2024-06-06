import '../scss/Game.scss'
import { createRef, useEffect, useState } from 'react'
import { Game } from '../js/Game.js';

function App() {
  const canvas = createRef();
  const game = window.game = new Game();
  
  // Update canvas render
  useEffect(() => {
    // Initialize game with canvas prop value
    game.init(canvas.current);
  }, [canvas]); // [] = Runs only on the first render

  // Return game UI
  return (
    <>
      <canvas ref={canvas} />
      <div className="ui"></div>
    </>
  )
}

export default App
