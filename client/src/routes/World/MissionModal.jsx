import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { missionModalState, userInfoState } from '../../Atom';
import AlertModal from '../Common/AlertModal';

const MissionModal = () => {
  const [modal, setModal] = useRecoilState(missionModalState);
  const userInfo = useRecoilValue(userInfoState);
  const chapter = userInfo.memberChapter;
  const checkPoint = userInfo.memberCheckpoint;

  const close = () => {
    setModal(false);
  };

  const title = {
    0: '퀘스트 성공',
    1: '퀘스트 수락',
    2: '미션 성공',
  };

  const content = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  };

  return (
    <>
      {modal ? (
        <Modal>
          <AlertModal
            title={title[checkPoint]}
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
