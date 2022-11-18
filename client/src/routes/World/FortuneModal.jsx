import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import {
  chapterConditionState,
  fortuneModalState,
  missionModalState,
} from '../../Atom';
import AlertModal from '../Common/AlertModal';

const FortuneModal = () => {
  const [modal, setModal] = useRecoilState(fortuneModalState);
  const [fortuneText, setFortuneText] = useState('');
  const [condition, setCondition] = useRecoilState(chapterConditionState);
  const [missionModal, setMissionModal] = useRecoilState(missionModalState);

  const getFortune = async () => {
    const res = await fetchData.get('/api/v1/fortune');
    const { fortune } = res.data;
    setFortuneText(fortune);
    return fortune;
  };

  const missionClear = () => {
    if (!condition[3]) {
      const updatedList = [...condition];
      updatedList.splice(3, 1, true);
      setCondition(updatedList);
      setMissionModal(true);
    }
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
            setTimeout(() => {
              missionClear();
            }, 500);
          }}>
          <AlertModal title={'오늘의 운세'} rightBtnName={'닫기'}>
            <Fortune>{fortuneText}</Fortune>
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
const Fortune = styled.div`
  font-size: 25px;
`;

export default FortuneModal;
