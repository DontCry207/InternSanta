import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import { movieModalState } from '../../Atom';
import MainModal from '../Common/MainModal';
import MovieRecPage from '../CarolZone/MovieRecPage';

const MovieModal = () => {
  const [modal, setModal] = useRecoilState(movieModalState);
  const [onMovieModal, setOnMovieModal] = useState(false);

  return (
    <>
      {modal ? (
        <Modal>
          <MainModal closeBtnControl={setModal} bgColor="#e2e2e2">
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
