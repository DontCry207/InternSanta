import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Block from './block';

const BlockStack = (props) => {
  const { setPage } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      Block();
    }
  }, [loading]);

  const play = () => {
    return (
      <>
        <Results id="results">
          <div className="content">
            <p>You missed the block</p>
            <p>To reset the game press R</p>
            <button onClick={() => setPage(1)}>처음으로</button>
          </div>
        </Results>
        <div id="score">0</div>

        <div id="game"></div>
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
          선물쌓기
        </button>
      ) : (
        play()
      )}
    </>
  );
};
const Results = styled.div`
  display: none;
`;
export default BlockStack;
