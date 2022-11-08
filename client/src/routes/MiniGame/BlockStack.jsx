import { useState, useEffect } from 'react';
import Block from './block';

const BlockStack = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      Block();
    }
  }, [loading]);

  const play = () => {
    return (
      <div className="App">
        <div id="results">
          <div className="content">
            <p>You missed the block</p>
            <p>To reset the game press R</p>
            <p>
              Follow me
              <a href="https://twitter.com/HunorBorbely" target="_blank">
                @HunorBorbely
              </a>
            </p>
          </div>
        </div>
        <div id="score">0</div>

        <div id="game"></div>
      </div>
    );
  };
  return (
    <>
      {loading ? (
        <button
          onClick={() => {
            setLoading(false);
          }}>
          선물쌓기
        </button>
      ) : (
        play()
      )}
    </>
  );
};

export default BlockStack;
