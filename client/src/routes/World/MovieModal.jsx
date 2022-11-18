import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  chapterConditionState,
  missionModalState,
  movieModalState,
} from '../../Atom';
import MainModal from '../Common/MainModal';
import MovieRecPage from '../CarolZone/MovieRecPage';

const MovieModal = () => {
  const [modal, setModal] = useRecoilState(movieModalState);
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const setMissionModal = useSetRecoilState(missionModalState);

  const missionClear = () => {
    if (!condition[6]) {
      const updatedList = [...condition];
      updatedList.splice(6, 1, true);
      setCondition(updatedList);
      setMissionModal(true);
    }
  };

  const close = (e) => {
    setModal(false);
    setTimeout(() => {
      missionClear();
    }, 500);
  };

  return (
    <>
      {modal ? (
        <Modal>
          <MainModal closeBtnControl={close} bgColor="#76b484">
            <MovieRecPage />
          </MainModal>
        </Modal>
      ) : null}
    </>
  );
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default MovieModal;
