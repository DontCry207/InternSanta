import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  chapterConditionState,
  clothesModalState,
  missionModalState,
} from '../../../Atom';
import ClothesPage from '../../Clothes/ClothesPage';
import MainModal from '../../Common/MainModal';
const ClothesModal = () => {
  const [clothesModal, setClothesModal] = useRecoilState(clothesModalState);
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const setMissionModal = useSetRecoilState(missionModalState);

  const missionClear = () => {
    if (!condition[1]) {
      const updatedList = [...condition];
      updatedList.splice(1, 1, true);
      setCondition(updatedList);
    }
    setMissionModal(1);
  };

  const close = (e) => {
    setClothesModal(false);
    setTimeout(() => {
      missionClear();
    }, 500);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#8A8A8A">
          <ClothesPage close={close} />
        </MainModal>
      </Modal>
    );
  };

  return <>{clothesModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default ClothesModal;
