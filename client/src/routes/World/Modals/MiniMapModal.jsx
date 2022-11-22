import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { miniMapModalState } from '../../../Atom';
import MainModal from '../../Common/MainModal';
import map from '../../../assets/images/miniMap.png';

const MiniMapModal = () => {
  const [gameModal, setGameModal] = useRecoilState(miniMapModalState);

  const close = (e) => {
    setGameModal(false);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#608b98">
          <img src={map} alt="" />
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

  img {
    height: 100%;
    border-radius: 20px;
  }
`;

export default MiniMapModal;
