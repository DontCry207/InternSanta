import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  chapterConditionState,
  gameModalState,
  missionModalState,
} from '../../../Atom';
import MainModal from '../../Common/MainModal';
import MiniGamePage from '../../MiniGame/MiniGamePage';

const MiniGameModal = () => {
  const [gameModal, setGameModal] = useRecoilState(gameModalState);
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const setMissionModal = useSetRecoilState(missionModalState);

  const missionClear = () => {
    if (!condition[7]) {
      const updatedList = [...condition];
      updatedList.splice(7, 1, true);
      setCondition(updatedList);
    }
    setMissionModal(7);
  };

  const close = (e) => {
    setGameModal(false);
    setTimeout(() => {
      missionClear();
    }, 500);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#2E2D56">
          <MiniGamePage />
        </MainModal>
      </Modal>
    );
  };

  return <>{gameModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default MiniGameModal;
