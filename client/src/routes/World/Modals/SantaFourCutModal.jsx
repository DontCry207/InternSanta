import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  chapterConditionState,
  missionModalState,
  photoModalState,
} from '../../../Atom';
import MainModal from '../../Common/MainModal';
import SantaFourCutPage from '../../SantaFourCut/SantaFourCutPage';

const SantaFourCutModal = () => {
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const [photoModal, setPhotoModal] = useRecoilState(photoModalState);
  const setMissionModal = useSetRecoilState(missionModalState);

  const missionClear = () => {
    if (!condition[8]) {
      const updatedList = [...condition];
      updatedList.splice(8, 1, true);
      setCondition(updatedList);
    }
    setMissionModal(8);
  };

  const close = (e) => {
    setPhotoModal(false);
    setTimeout(() => {
      missionClear();
    }, 500);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#2E2D56">
          <SantaFourCutPage />
        </MainModal>
      </Modal>
    );
  };

  return <>{photoModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default SantaFourCutModal;
