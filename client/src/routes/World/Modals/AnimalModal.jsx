import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  animalModalState,
  chapterConditionState,
  infoUpdateState,
  missionModalState,
  petState,
  userInfoState,
} from '../../../Atom';
import AnimalPage from '../../AnimalPet/AnimalPage';
import MainModal from '../../Common/MainModal';

const AnimalModal = () => {
  const [animalModal, setAnimalModal] = useRecoilState(animalModalState);
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const setMissionModal = useSetRecoilState(missionModalState);
  const [update, setUpdate] = useRecoilState(infoUpdateState);

  const missionClear = () => {
    if (!condition[2]) {
      const updatedList = [...condition];
      updatedList.splice(2, 1, true);
      setCondition(updatedList);
    }
    setMissionModal(2);
  };

  const close = (e) => {
    setAnimalModal(false);
    setUpdate(!update);
    setTimeout(() => {
      missionClear();
    }, 500);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#8A8A8A">
          <AnimalPage close={close} />
        </MainModal>
      </Modal>
    );
  };

  return <>{animalModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default AnimalModal;
