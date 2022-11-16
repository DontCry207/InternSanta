import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { missionModalState, userInfoState } from '../../Atom';
import AlertModal from '../Common/AlertModal';
import { fetchData } from '../../utils/apis/api';

const MissionModal = () => {
  const [modal, setModal] = useRecoilState(missionModalState);
  const userInfo = useRecoilValue(userInfoState);
  const chapter = userInfo.memberChapter;
  const checkPoint = userInfo.memberCheckpoint;

  const clearQuest = async () => {
    const res = await fetchData.patch('/api/v1/member/chapter');
    console.log(res.data);
  };

  const check = () => {
    if (chapter === 0 && checkPoint === 0) {
      setModal(modal);
    }
  };

  useEffect(() => {
    check();
  }, [modal]);

  return (
    <>
      {modal ? (
        <Modal>
          <AlertModal
            title={'퀘스트 성공'}
            rightBtnName={'닫기'}
            setRightBtnControl={() => {
              setModal(null);
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
