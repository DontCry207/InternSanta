import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  infoUpdateState,
  missionModalState,
  userInfoState,
} from '../../../Atom';
import AlertModal from '../../Common/AlertModal';
import Coin from '../../../assets/images/coin.png';
import { useEffect } from 'react';
import { fetchData } from '../../../utils/apis/api';

const MissionModal = () => {
  const [missionNum, setMissionNum] = useRecoilState(missionModalState);
  const [validation, setValidation] = useState('');
  const [update, setUpdate] = useRecoilState(infoUpdateState);
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
    if (missionNum === chapter) {
      setValidation('mission');
      proceedCheckPoint();
    } else if (missionNum === 'sucess' || missionNum === 'get') {
      setValidation(missionNum);
    } else {
      setValidation(false);
    }
  };

  useEffect(() => {
    if (missionNum) {
      console.log(missionNum);
      isFirstTime();
    }
  }, [missionNum]);

  const title = {
    0: '퀘스트 성공',
    1: '퀘스트 수락',
    2: '미션 성공',
  };

  const missionClearText = {
    1: [
      '멋진 옷을 입었군요!',
      '다시 프랜서에게 돌아가',
      '미션을 클리어 해주세요',
    ],
    2: [
      '똑 닮은 펫을 얻었네요!',
      '다시 블리즌에게 돌아가',
      '미션을 클리어 해주세요',
    ],
    3: [
      '오늘은 어떤 운세를 받았나요?',
      '다시 도너에게 돌아가',
      '미션을 클리어 해주세요',
    ],
    4: [
      '한 그림솜씨 하시네요!',
      '다시 빅슨에게 돌아가',
      '미션을 클리어 해주세요',
    ],
    5: [
      '멋진 씰을 다 모아봅시다!',
      '다시 큐피드에게 돌아가',
      '미션을 클리어 해주세요',
    ],
    6: [
      '크리스마스엔 집에서 영화나 한편!',
      '다시 코멧에게 돌아가',
      '미션을 클리어 해주세요',
    ],
    7: [
      '더 높이 쌓을때까지 계속 고우~고우~',
      '다시 대셔에게 돌아가',
      '미션을 클리어 해주세요',
    ],
    8: [
      '내 캐릭터와 함께 추억으로 남겨봐요~',
      '다시 댄서에게 돌아가',
      '미션을 클리어 해주세요',
    ],
  };

  const reward = {
    0: 1000,
    1: 1500,
    2: 2000,
    3: 2500,
    4: 3000,
    5: 3500,
    6: 4000,
    7: 4500,
    8: 5000,
    9: 6000,
    10: 7000,
  };

  const questText = {
    1: ['옷을 갈아입어 봅시다!', '오른쪽 상단 옷 아이콘을 클릭하세요'],
    2: ['이제 나와 닮은 펫을 얻을 수 있어요!', '펫분양을 클릭하세요'],
    3: [
      '산타라면 오늘의 운세정도는 알아야죠',
      '계단 위집의 캐럴존에서 벽난로를 클릭하세요',
    ],
    4: ['그림을 그려 나무를 얻어봅시다!', '나무 얻기를 클릭하세요'],
    5: ['씰을 뽑아 카드를 채워볼까요?', '맵중앙 상점을 클릭하세요'],
    6: [
      '쉬는 날엔 집에 콕박혀서 영화한편?',
      '계단 위집의 캐럴존에서 텔레비전을 클릭하세요',
    ],
    7: ['선물을 가득 쌓아 코인을 얻어볼까요?', '미니게임을 클릭하세요'],
    8: ['내캐릭터와 함께 산타네컷 한장!', '산타네컷을 클릭하세요'],
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
    return (
      <RewardBox>
        <p>+{reward[chapter]}</p>
        <img src={Coin} alt="" />
      </RewardBox>
    );
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
