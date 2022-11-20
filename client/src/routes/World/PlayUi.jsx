import React, { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import {
  BsExclamationLg,
  BsQuestionLg,
  BsCheckLg,
  BsFillStarFill,
} from 'react-icons/bs';
import { FaTshirt } from 'react-icons/fa';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  clothesModalState,
  infoUpdateState,
  logoutModalState,
  musicModalState,
  npcScriptState,
  questIndicatorState,
  questInfoState,
  sealModalState,
  userInfoState,
} from '../../Atom';
import { useEffect } from 'react';
import { fetchData } from '../../utils/apis/api';
import {
  missionImg,
  NpcProfileImages,
  NpcQuest,
} from '../../utils/constants/constants';
import stickerCard from '../../assets/images/StickerCard.png';
import ticket from '../../assets/images/ticket.png';
import coin from '../../assets/images/coin.png';
import music from '../../assets/EpicChristmas.mp3';
import MusicControlModal from './Modals/MusicControlModal';

const PlayUi = () => {
  const [prog, setProg] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [questInfo, setQuestInfo] = useRecoilState(questInfoState);
  const setScript = useSetRecoilState(npcScriptState);
  const setModal = useSetRecoilState(clothesModalState);
  const setSealModal = useSetRecoilState(sealModalState);
  const setLogoutModal = useSetRecoilState(logoutModalState);
  const update = useRecoilValue(infoUpdateState);
  const [indicator, setIndicator] = useRecoilState(questIndicatorState);
  const [coinNum, setCoinNum] = useState(userInfo.memberCoin);
  const [ticketNum, setTicketNum] = useState(userInfo.memberTicket);
  const [musicModal, setMusicModal] = useRecoilState(musicModalState);

  const [volume, setVolume] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (volume) {
      audioRef.current.play();
    }
    audioRef.current.volume = volume;
  }, [volume]);

  const animationProgress = () => {
    setProg(true);
    setTimeout(() => {
      setProg(false);
      setIndicator(false);
    }, 3000);
  };

  useEffect(() => {
    animationProgress();
  }, [indicator]);

  const getScript = async () => {
    const res = await fetchData.get('/api/v1/quest/script');
    setScript(res.data.questScriptList);
  };

  const getQuest = async () => {
    const res = await fetchData.get('/api/v1/quest');
    setQuestInfo(res.data);
  };

  const getUserInfo = async () => {
    const res = await fetchData.get('/api/v1/member');
    setUserInfo(res.data);
  };

  useEffect(() => {
    console.log(userInfo);
    setCoinNum(userInfo.memberCoin);
    setTicketNum(userInfo.memberTicket);
  }, [userInfo]);

  useEffect(() => {
    getUserInfo();
    getQuest();
    getScript();
  }, [update]);

  return (
    <ContainerUi>
      <audio id="audio" src={music} ref={audioRef} loop volume={0} />
      <MusicControlModal volume={volume} setVolume={setVolume} />
      <LeftTopBox>
        <Logo>
          <p>INTERN</p>
          <p>SANTA</p>
        </Logo>
        <ProgressButton
          prog={prog}
          onClick={() => {
            setProg(!prog);
          }}>
          <IconBox>
            {userInfo.memberChapter !== 10 &&
            userInfo.memberCheckpoint === 0 ? (
              <BsExclamationLg size={30} color={'#DE6363'} />
            ) : null}
            {userInfo.memberCheckpoint === 1 ? (
              <BsQuestionLg size={30} color={'#666666'} />
            ) : null}
            {userInfo.memberCheckpoint === 2 ? (
              <BsCheckLg size={30} color={'#59864C'} />
            ) : null}
            {userInfo.memberChapter === 10 ? (
              <BsFillStarFill size={40} color={'#FFC827'} />
            ) : null}
          </IconBox>
          <QuestDescription>
            <p className="qtitle">{questInfo.questTitle}</p>
            <p className="qsub">{questInfo.questSub}</p>
          </QuestDescription>
          <ProfileBox>
            {userInfo.memberCheckpoint === 1 ? (
              <img src={missionImg[userInfo.memberChapter]} />
            ) : (
              <img src={[NpcProfileImages[NpcQuest[questInfo.questNpc]]]} />
            )}
          </ProfileBox>
        </ProgressButton>
      </LeftTopBox>
      <RightTopBox>
        <IconBorder onClick={() => setModal(true)}>
          <FaTshirt size={40} color={'white'} />
        </IconBorder>
        {!volume ? (
          <IconBorder onClick={() => setMusicModal(true)}>
            <HiVolumeOff size={40} color={'white'} />
          </IconBorder>
        ) : (
          <IconBorder onClick={() => setMusicModal(true)}>
            <HiVolumeUp size={40} color={'white'} />
          </IconBorder>
        )}
        <IconBorder onClick={() => setLogoutModal(true)}>
          <AiOutlinePoweroff size={40} color={'white'} />
        </IconBorder>
      </RightTopBox>
      <RightBottomBox>
        <StickerBox onClick={() => setSealModal(true)}>
          <img src={stickerCard} alt="" />
        </StickerBox>
        <CoinBox>
          <img src={coin} alt="" />
          <p>{coinNum}</p>
          <img src={ticket} alt="" />
          <p>{ticketNum}</p>
        </CoinBox>
      </RightBottomBox>
    </ContainerUi>
  );
};

const ContainerUi = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`;

const LeftTopBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const RightTopBox = styled.div`
  height: 120px;
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const RightBottomBox = styled.div`
  position: absolute;
  background-color: white;
  border: solid #9991b1;
  width: 300px;
  height: 300px;
  bottom: -80px;
  right: -60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 40px 0 0 0;
  padding: 20px;
  gap: 20px;
  rotate: -10deg;
`;

const StickerBox = styled.div`
  width: 170px;
  height: auto;
  position: absolute;
  top: -90px;
  left: 50px;
  rotate: 4deg;
  pointer-events: auto;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
  img {
    width: 170px;
    border: 2px solid #9991b1;
    border-radius: 10px;
  }
`;

const CoinBox = styled.div`
  position: absolute;
  top: 166px;
  left: 16px;
  rotate: 10deg;
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 26px;
  }
  img {
    width: 34px;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 44px;
    color: white;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
    -webkit-text-stroke: 1px #000;
  }
`;

const ProgressButton = styled.div`
  width: ${(props) => (props.prog ? '500px' : '80px')};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 60px;
  border: solid 1px grey;
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.15s;
  overflow: hidden;
  box-sizing: border-box;
`;

const IconBorder = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: transparent;
  border: solid 4px #ffffff;
  pointer-events: auto;
  cursor: pointer;

  &:hover {
    scale: 1.1;
  }
`;

const QuestDescription = styled.div`
  width: 340px;
  min-width: 320px;
  height: 80px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    overflow: hidden;
    white-space: nowrap;
  }
  .qtitle {
    font-size: 24px;
    color: #0d005c;
  }
  .qsub {
    font-size: 18px;
  }
`;

const IconBox = styled.div`
  width: 80px;
  min-width: 80px;
  height: 80px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 80px;
  min-width: 80px;
  height: 80px;
  min-height: 80px;
  border-radius: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 72px;
    border-radius: 60px;
    border: #9991b1 2px solid;
  }
`;

export default PlayUi;
