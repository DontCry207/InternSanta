import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import { fortuneModalState } from '../../Atom';
import AlertModal from '../Common/AlertModal';

const FortuneModal = () => {
  const [modal, setModal] = useRecoilState(fortuneModalState);
  const [fortuneText, setFortuneText] = useState('');

  const getFortune = async () => {
    const res = await fetchData.get('/api/v1/fortune');
    console.log(res);
    const { fortune } = res.data;
    setFortuneText(fortune);
    return fortune;
  };

  useEffect(() => {
    setFortuneText(getFortune());
  }, []);

  return (
    <>
      {modal ? (
        <Modal
          onClick={() => {
            setModal(!modal);
          }}>
          <AlertModal title={'오늘의 운세'} rightBtnName={'닫기'}>
            <p>{fortuneText}</p>
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
