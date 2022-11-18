import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  chapterConditionState,
  missionModalState,
  quickDrawModalState,
} from '../../../Atom';
import MainModal from '../../Common/MainModal';
import DrawModal from '../../QuickDraw/DrawModal';

const QuickDrawModal = () => {
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const [quickDrawModal, setQuickDrawModal] =
    useRecoilState(quickDrawModalState);
  const setMissionModal = useSetRecoilState(missionModalState);

  const missionClear = () => {
    if (!condition[4]) {
      const updatedList = [...condition];
      updatedList.splice(4, 1, true);
      setCondition(updatedList);
    }
    setMissionModal(4);
  };

  const close = (e) => {
    setQuickDrawModal(false);
    setTimeout(() => {
      missionClear();
    }, 500);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#2E2D56">
          <DrawModal close={close} />
        </MainModal>
      </Modal>
    );
  };

  return <>{quickDrawModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default QuickDrawModal;
