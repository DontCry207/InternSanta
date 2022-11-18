import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  chapterConditionState,
  missionModalState,
  movieModalState,
} from '../../../Atom';
import MainModal from '../../Common/MainModal';
import MovieRecPage from '../../CarolZone/MovieRecPage';

const MovieModal = () => {
  const [modal, setModal] = useRecoilState(movieModalState);
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const setMissionModal = useSetRecoilState(missionModalState);

  const missionClear = () => {
    if (!condition[6]) {
      const updatedList = [...condition];
      updatedList.splice(6, 1, true);
      setCondition(updatedList);
    }
    setMissionModal(6);
  };

  const close = (e) => {
    setModal(false);
    setTimeout(() => {
      missionClear();
    }, 500);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#76b484">
          <MovieRecPage />
        </MainModal>
      </Modal>
    );
  };

  return <>{modal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default MovieModal;
