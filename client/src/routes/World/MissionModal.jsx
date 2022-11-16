import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { infoUpdateState, missionModalState, userInfoState } from '../../Atom';
import AlertModal from '../Common/AlertModal';
import { fetchData } from '../../utils/apis/api';

const MissionModal = () => {
  const [modal, setModal] = useRecoilState(missionModalState);
  const [update, setUpdate] = useRecoilState(infoUpdateState);
  const userInfo = useRecoilValue(userInfoState);
  const chapter = userInfo.memberChapter;
  const checkPoint = userInfo.memberCheckpoint;

  const clearQuest = async () => {
    const res = await fetchData.patch('/api/v1/member/chapter');
    setUpdate(!update);
  };

  const proceedCheckPoint = async () => {
    const res = await fetchData.patch('/api/v1/member/checkpoint');
    setUpdate(!update);
  };

  const check = () => {
    if (chapter === 0 && checkPoint === 0) {
      clearQuest();
      setModal(modal);
    } else if (chapter === 1 && checkPoint === 0) {
      proceedCheckPoint();
    } else if (chapter === 1 && checkPoint === 1) {
      proceedCheckPoint();
    } else if (chapter === 1 && checkPoint === 2) {
      clearQuest();
    } else if (chapter === 2 && checkPoint === 0) {
      proceedCheckPoint();
    } else if (chapter === 2 && checkPoint === 1) {
      proceedCheckPoint();
    } else if (chapter === 2 && checkPoint === 2) {
      clearQuest();
    } else if (chapter === 3 && checkPoint === 0) {
      proceedCheckPoint();
    } else if (chapter === 3 && checkPoint === 1) {
      proceedCheckPoint();
    } else if (chapter === 3 && checkPoint === 2) {
      clearQuest();
    } else if (chapter === 4 && checkPoint === 0) {
      proceedCheckPoint();
    } else if (chapter === 4 && checkPoint === 1) {
      proceedCheckPoint();
    } else if (chapter === 4 && checkPoint === 2) {
      clearQuest();
    } else if (chapter === 5 && checkPoint === 0) {
      proceedCheckPoint();
    } else if (chapter === 5 && checkPoint === 1) {
      proceedCheckPoint();
    } else if (chapter === 5 && checkPoint === 2) {
      clearQuest();
    } else if (chapter === 6 && checkPoint === 0) {
      proceedCheckPoint();
    } else if (chapter === 6 && checkPoint === 1) {
      proceedCheckPoint();
    } else if (chapter === 6 && checkPoint === 2) {
      clearQuest();
    } else if (chapter === 7 && checkPoint === 0) {
      proceedCheckPoint();
    } else if (chapter === 7 && checkPoint === 1) {
      proceedCheckPoint();
    } else if (chapter === 7 && checkPoint === 2) {
      clearQuest();
    } else if (chapter === 8 && checkPoint === 0) {
      proceedCheckPoint();
    } else if (chapter === 8 && checkPoint === 1) {
      proceedCheckPoint();
    } else if (chapter === 8 && checkPoint === 2) {
      clearQuest();
    } else if (chapter === 9 && checkPoint === 0) {
      clearQuest();
    }
  };

  const close = () => {
    setModal(null);
  };

  useEffect(() => {
    console.log('mission');
    if (modal) {
      check();
    }
  }, [modal]);

  return (
    <>
      {modal ? (
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
