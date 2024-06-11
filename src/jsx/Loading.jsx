import { useState } from 'react'

function Loading() {
  const [progress, setProgress] = useState({ urls: '', index: 0, max: 1, percent: 0 });

  // Update progress state value
  function updateLoading(data) {
    setProgress(data);
  }

  // Refresh UI when game object dispatches custom events
  window.addEventListener('updateLoading', function(e) {
    updateLoading(e.detail);
  });

  return(
    <>
      <div className={"loading " + (progress.percent == 100 ? 'hidden' : 'show') }>
        <div className="bar">
          <div className="progress" style={{ width: progress.percent + '%' }}></div>
        </div>
      </div>
    </>
  )
}

export default Loading