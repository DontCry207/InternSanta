import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { sealModalState } from '../../../Atom';
import MainModal from '../../Common/MainModal';
import SealListPage from '../../Seal/SealListPage';

const SealModal = () => {
  const [sealModal, setSealModal] = useRecoilState(sealModalState);

  const render = () => {
    return (
      <Modal>
        <MainModal closeBtnControl={setSealModal} bgColor="#2E2D56">
          <SealListPage />
        </MainModal>
      </Modal>
    );
  };

  return <>{sealModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default SealModal;
