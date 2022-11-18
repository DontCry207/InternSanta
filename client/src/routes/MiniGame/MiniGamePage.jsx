import React from 'react';
import { useState } from 'react';
import BlockStack from './BlockStack';
import CrossRoad from './CrossRoad';
import game1 from '../../assets/images/blockstack.png';
import game2 from '../../assets/images/crossroad.png';
import styled from 'styled-components';
import MainModal from '../Common/MainModal';
import { useRecoilState } from 'recoil';
import {
  chapterConditionState,
  gameModalState,
  missionModalState,
} from '../../Atom';
const MiniGamePage = () => {
  const [page, setPage] = useState(1);
  const [gameModal, setGameModal] = useRecoilState(gameModalState);
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const [missionModal, setMissionModal] = useRecoilState(missionModalState);

  const missionClear = () => {
    if (!condition[7]) {
      const updatedList = [...condition];
      updatedList.splice(7, 1, true);
      setCondition(updatedList);
      setMissionModal(true);
    }
  };

  const close = (e) => {
    setGameModal(false);
    if (page === 2) {
      setTimeout(() => {
        missionClear();
      }, 500);
    }
  };

  const miniGameHome = () => {
    return (
      <>
        {gameModal ? (
          <GameBox>
            <MainModal closeBtnControl={close} bgColor="#56668E">
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
                  <BlockStack setPage={setPage} />
                </>
              )}
            </MainModal>
          </GameBox>
        ) : null}
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

const GameBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
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
