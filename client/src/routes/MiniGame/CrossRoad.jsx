import { useEffect, useState } from 'react';
import game from './road.js';
// import './game.css';
const CrossRoad = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      game();
    }
  }, [loading]);

  const play = () => {
    return (
      <>
        <div id="counter">0</div>

        <div id="controlls">
          <div>
            <button id="forward">
              <svg width="30" height="30" viewBox="0 0 10 10">
                <g transform="rotate(0, 5,5)">
                  <path d="M5,4 L7,6 L3,6 L5,4" />
                </g>
              </svg>
            </button>
            <button id="left">
              <svg width="30" height="30" viewBox="0 0 10 10">
                <g transform="rotate(-90, 5,5)">
                  <path d="M5,4 L7,6 L3,6 L5,4" />
                </g>
              </svg>
            </button>
            <button id="backward">
              <svg width="30" height="30" viewBox="0 0 10 10">
                <g transform="rotate(180, 5,5)">
                  <path d="M5,4 L7,6 L3,6 L5,4" />
                </g>
              </svg>
            </button>
            <button id="right">
              <svg width="30" height="30" viewBox="0 0 10 10">
                <g transform="rotate(90, 5,5)">
                  <path d="M5,4 L7,6 L3,6 L5,4" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div id="end">
          <button id="retry">Retry</button>
        </div>

        <div id="cr"></div>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <button
          onClick={() => {
            setLoading(false);
          }}>
          선물배달
        </button>
      ) : (
        play()
      )}
    </>
  );
};

export default CrossRoad;
