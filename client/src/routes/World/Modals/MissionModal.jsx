import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  infoUpdateState,
  missionModalState,
  questIndicatorState,
  userInfoState,
} from '../../../Atom';
import AlertModal from '../../Common/AlertModal';
import Coin from '../../../assets/images/coin.png';
import { useEffect } from 'react';
import { fetchData } from '../../../utils/apis/api';
import {
  missionClearText,
  questText,
  reward,
} from '../../../utils/constants/constants';

const MissionModal = () => {
  const [missionNum, setMissionNum] = useRecoilState(missionModalState);
  const [validation, setValidation] = useState('');
  const [update, setUpdate] = useRecoilState(infoUpdateState);
  const [indicator, setIndicator] = useRecoilState(questIndicatorState);
  const userInfo = useRecoilValue(userInfoState);
  const chapter = userInfo.memberChapter;
  const checkPoint = userInfo.memberCheckpoint;

  const close = () => {
    setMissionNum(null);
    setValidation(false);
  };

  const proceedCheckPoint = async () => {
    const res = await fetchData.patch('/api/v1/member/checkpoint');
    setUpdate(!update);
  };

  const isFirstTime = () => {
    if (missionNum === chapter && checkPoint === 1) {
      setValidation('mission');
      setIndicator(true);
      proceedCheckPoint();
    } else if (missionNum === 'sucess' || missionNum === 'get') {
      setValidation(missionNum);
    } else {
      setValidation(false);
    }
  };

  useEffect(() => {
    if (missionNum) {
      isFirstTime();
    }
  }, [missionNum]);

  const title = {
    0: '퀘스트 성공',
    1: '퀘스트 수락',
    2: '미션 성공',
  };

  const missionClear = () => {
    return (
      <TextBox>
        {missionClearText[missionNum].map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </TextBox>
    );
  };

  const questClear = () => {
    if (chapter >= 1) {
      return (
        <RewardBox>
          <p>+{reward[chapter - 1]}</p>
          <img src={Coin} alt="" />
        </RewardBox>
      );
    }
  };

  const getQuest = () => {
    return (
      <TextBox>
        {questText[chapter].map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </TextBox>
    );
  };

  const render = () => {
    return (
      <Modal>
        <AlertModal
          title={title[checkPoint]}
          rightBtnName={'닫기'}
          setRightBtnControl={() => {
            close();
          }}>
          {validation === 'get' && getQuest()}
          {validation === 'sucess' && questClear()}
          {validation === 'mission' && missionClear()}
        </AlertModal>
      </Modal>
    );
  };

  return <>{validation ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const RewardBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  p {
    font-size: 30px;
    color: #0d005c;
  }
  img {
    width: 50px;
    height: 50px;
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 30px;
    color: #0d005c;
  }
`;

export default MissionModal;
