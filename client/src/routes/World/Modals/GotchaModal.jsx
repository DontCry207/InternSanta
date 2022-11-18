import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  chapterConditionState,
  gotchaModalState,
  missionModalState,
} from '../../../Atom';
import MainModal from '../../Common/MainModal';
import GetSealPage from '../../Seal/GetSealPage';

const GotchaModal = () => {
  const [gotchaModal, setGotchaModal] = useRecoilState(gotchaModalState);
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const setMissionModal = useSetRecoilState(missionModalState);

  const missionClear = () => {
    if (!condition[5]) {
      const updatedList = [...condition];
      updatedList.splice(5, 1, true);
      setCondition(updatedList);
    }
    setMissionModal(5);
  };

  const close = (e) => {
    setGotchaModal(false);
    setTimeout(() => {
      missionClear();
    }, 500);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#2E2D56">
          <GetSealPage />
        </MainModal>
      </Modal>
    );
  };

  return <>{gotchaModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default GotchaModal;
