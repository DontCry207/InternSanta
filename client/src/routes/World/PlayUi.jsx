import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import {
  BsFillTreeFill,
  BsExclamationLg,
  BsQuestionLg,
  BsCheckLg,
  BsFillStarFill,
} from 'react-icons/bs';
import { BiSmile } from 'react-icons/bi';
import { HiVolumeUp } from 'react-icons/hi';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  infoUpdateState,
  npcScriptState,
  questInfoState,
  userInfoState,
} from '../../Atom';
import { useEffect } from 'react';
import { fetchData } from '../../utils/apis/api';

const PlayUi = () => {
  const [prog, setProg] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [questInfo, setQuestInfo] = useRecoilState(questInfoState);
  const [script, setScript] = useRecoilState(npcScriptState);
  const update = useRecoilValue(infoUpdateState);

  const getScript = async () => {
    const res = await fetchData.get('/api/v1/quest/script');
    setScript(res.data.questScriptList);
    return;
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
    getUserInfo();
    getQuest();
    getScript();
  }, [update]);

  return (
    <ContainerUi>
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
          <IconBox></IconBox>
        </ProgressButton>
      </LeftTopBox>
      <RightTopBox>
        <IconBorder>
          <BsFillTreeFill size={40} color={'white'} />
        </IconBorder>
        <IconBorder>
          <BiSmile size={44} color={'white'} />
        </IconBorder>
        <IconBorder>
          <HiVolumeUp size={40} color={'white'} />
        </IconBorder>
      </RightTopBox>
      <RightBottomBox>HI</RightBottomBox>
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
  width: ${(props) => (props.prog ? '460px' : '80px')};
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
  transition: all 0.1s;
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
  width: 300px;
  min-width: 300px;
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

const MissionProgress = styled.div``;
export default PlayUi;
