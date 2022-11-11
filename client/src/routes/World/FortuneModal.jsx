import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { fortuneModalState } from '../../Atom';
import AlertModal from '../Common/AlertModal';

const FortuneModal = () => {
  const [modal, setModal] = useRecoilState(fortuneModalState);
  return (
    <>
      {modal ? (
        <Modal
          onClick={() => {
            setModal(!modal);
          }}>
          <AlertModal
            title={'ssafy'}
            leftBtnName={'left'}
            rightBtnName={'right'}>
            <p>ㅗㅗㅗㅗㅗㅗ</p>
          </AlertModal>
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

export default FortuneModal;
