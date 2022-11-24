import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { miniMapModalState } from '../../../Atom';
import MainModal from '../../Common/MainModal';
import map from '../../../assets/images/miniMap.webp';

const MiniMapModal = () => {
  const [gameModal, setGameModal] = useRecoilState(miniMapModalState);

  const close = (e) => {
    setGameModal(false);
  };

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#608b98">
          <ImgBox>
            <img src={map} alt="" />
          </ImgBox>
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

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 30px;
  img {
    height: 100%;
    border-radius: 30px;
  }
`;

export default MiniMapModal;
