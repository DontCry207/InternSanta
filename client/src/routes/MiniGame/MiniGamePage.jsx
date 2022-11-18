import React from 'react';
import { useState } from 'react';
import BlockStack from './BlockStack';
import CrossRoad from './CrossRoad';
import game1 from '../../assets/images/blockstack.png';
import game2 from '../../assets/images/crossroad.png';
import styled from 'styled-components';

const MiniGamePage = () => {
  const [page, setPage] = useState(1);

  const miniGameHome = () => {
    return (
      <>
        {page === 1 && (
          <>
            <Title textColor="white">미니게임</Title>
            <GameList>
              <div>
                <img src={game1} alt="" onClick={() => setPage(2)} />
                <p>선물 쌓기</p>
              </div>
              <div>
                <img src={game2} alt="" onClick={() => setPage(3)} />
                <p>길건너 눈사람</p>
              </div>
            </GameList>
          </>
        )}
        {page === 2 && (
          <>
            <BlockStack setPage={setPage} />
          </>
        )}
        {page === 3 && (
          <>
            <CrossRoad setPage={setPage} />
          </>
        )}
      </>
    );
  };

  return <>{miniGameHome()}</>;
};

const Title = styled.h2`
  display: block;
  font-size: 80px;
  width: 100%;
  text-align: center;
  color: ${(props) => props.textColor};
`;

const GameList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 80px;
  div {
    text-align: center;
    img {
      width: 340px;
      border-radius: 20px;
      cursor: pointer;
    }
    p {
      font-size: 28px;
      padding-top: 15px;
    }
  }
`;
export default MiniGamePage;
