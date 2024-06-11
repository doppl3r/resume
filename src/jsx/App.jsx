import '../scss/Game.scss'
import { createRef, useEffect, useState } from 'react'
import { Game } from '../js/Game.js';
import Loading from './Loading.jsx'

function App() {
  const count = createRef();
  const canvas = createRef();
  const instructions = createRef();
  const hint = createRef();
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
    hint.current.style.display = 'none';
  }

  function toggleWireframe(e) {
    game.gameManager.worldManager.debugger.toggle();
  }

  function openPDF(e) {
    window.open('pdf/resume-jacob-debenedetto-2024.pdf', '_blank');
    }
    
    function openCode(e) {
      window.open('https://github.com/doppl3r/resume', '_blank');
    }

  // Return game UI
  return (
    <>
      <canvas ref={canvas} />
      <div className="ui">
        <Loading />
        <div className="count" ref={count}>0</div>
        <div className="top-right">
          <div className="toggle">
            <input type="checkbox" id="wireframe" onChange={toggleWireframe}></input>
            <label htmlFor="wireframe">DEBUG</label>
          </div>
          <div className="toggle">
            <input type="checkbox" id="code" onChange={openCode}></input>
            <label htmlFor="code">GIT</label>
          </div>
          <div className="toggle">
            <input type="checkbox" id="pdf" onChange={openPDF}></input>
            <label htmlFor="pdf">PDF</label>
          </div>
        </div>
        <div className="hint material-symbols-rounded" ref={hint}>arrow_selector_tool</div>
        <div className="instructions" ref={instructions}>Tap to toss Jacob's resume</div>
      </div>
    </>
  )
}

export default App
