import React from 'react';
import { useState } from 'react';
import BlockStack from './BlockStack';
import CrossRoad from './CrossRoad';
import GameRanking from './GameRanking';
import game1 from '../../assets/images/blockstack.webp';
import game2 from '../../assets/images/crossroad.webp';
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
                <p>
                  선물 쌓기 <button onClick={() => setPage(4)}>랭킹</button>
                </p>
              </div>
              <div>
                <img src={game2} alt="" onClick={() => setPage(3)} />
                <p>
                  길건너 눈사람 <button onClick={() => setPage(5)}>랭킹</button>
                </p>
              </div>
            </GameList>
          </>
        )}
        {page === 2 && <BlockStack setPage={setPage} />}
        {page === 3 && <CrossRoad setPage={setPage} />}
        {page === 4 && <GameRanking setPage={setPage} gameType={1} />}
        {page === 5 && <GameRanking setPage={setPage} gameType={2} />}
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
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      button {
        height: 28px;
        width: 50px;
        border-radius: 10px;
        font-size: 18px;
        background-color: #2e2d56;
        color: white;
      }
    }
  }
`;
export default MiniGamePage;
