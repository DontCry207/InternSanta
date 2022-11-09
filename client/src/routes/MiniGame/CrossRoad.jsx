import { useEffect, useState } from 'react';
import styled from 'styled-components';
import game from './road.js';
// import './game.css';
const CrossRoad = (props) => {
  const { setPage } = props;
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

        <Results id="end">
          {/* <button id="retry">Retry</button> */}
          <button onClick={() => setPage(1)}>처음으로</button>
        </Results>

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
const Results = styled.div`
  display: none;
`;
export default CrossRoad;
