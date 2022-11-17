import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chapter1ConditionState,
  chapter2ConditionState,
  infoUpdateState,
  missionModalState,
  userInfoState,
} from '../../Atom';
import AlertModal from '../Common/AlertModal';
import { fetchData } from '../../utils/apis/api';

const MissionModal = () => {
  const [modal, setModal] = useRecoilState(missionModalState);
  const [update, setUpdate] = useRecoilState(infoUpdateState);
  const condition1 = useRecoilValue(chapter1ConditionState);
  const condition2 = useRecoilValue(chapter2ConditionState);
  const [clear, setClear] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const chapter = userInfo.memberChapter;
  const checkPoint = userInfo.memberCheckpoint;

  const condition = [null, condition1, condition2];

  const clearQuest = async () => {
    const res = await fetchData.patch('/api/v1/member/chapter');
    setUpdate(!update);
  };

  const proceedCheckPoint = async () => {
    const res = await fetchData.patch('/api/v1/member/checkpoint');
    setUpdate(!update);
  };

  const check = () => {
    if (chapter === 0) {
      clearQuest();
    } else if (chapter === 10) {
      console.log('스토리 끝');
    } else if (checkPoint === 0) {
      proceedCheckPoint();
    }
    if (checkPoint === 1 && condition[chapter]) {
      proceedCheckPoint();
    }
    if (checkPoint === 2) {
      clearQuest();
      setClear(true);
    }
  };

  const close = () => {
    setClear(false);
    setModal(false);
  };

  useEffect(() => {
    if (modal) {
      check();
    }
  }, [modal]);

  return (
    <>
      {clear ? (
        <Modal>
          <AlertModal
            title={'퀘스트 성공'}
            rightBtnName={'닫기'}
            setRightBtnControl={() => {
              close();
            }}></AlertModal>
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

export default MissionModal;
