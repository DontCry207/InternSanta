import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsThreeDots } from 'react-icons/bs';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  animalModalState,
  gameModalState,
  gotchaModalState,
  infoUpdateState,
  missionModalState,
  modalState,
  npcScriptState,
  photoModalState,
  questIndicatorState,
  questInfoState,
  quickDrawModalState,
  userInfoState,
} from '../../../Atom';
import {
  NormalDialog,
  NpcFeatButton,
  NpcImages,
  NpcNames,
  NpcQuest,
  reward,
} from '../../../utils/constants/constants';
import { fetchData } from '../../../utils/apis/api';

const ChatModal = () => {
  const [cnt, setCnt] = useState(0);
  const [lengthScript, setLengthScript] = useState(0);
  const [modal, setModal] = useRecoilState(modalState);
  const [update, setUpdate] = useRecoilState(infoUpdateState);
  const setMissionModal = useSetRecoilState(missionModalState);
  const setAnimalModal = useSetRecoilState(animalModalState);
  const setGameModal = useSetRecoilState(gameModalState);
  const setPhotoModal = useSetRecoilState(photoModalState);
  const setGotchaModal = useSetRecoilState(gotchaModalState);
  const setQuickDrawModal = useSetRecoilState(quickDrawModalState);
  const [indicator, setIndicator] = useRecoilState(questIndicatorState);
  const scripts = useRecoilValue(npcScriptState);
  const quest = useRecoilValue(questInfoState);
  const userInfo = useRecoilValue(userInfoState);
  const targetNpc = NpcQuest[quest.questNpc];
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

  const getReward = async (num) => {
    const res = await fetchData.patch('/api/v1/member/coin', {
      memberCoin: num,
    });
    setUpdate(!update);
  };

  const check = (e) => {
    if (e === targetNpc) {
      if (chapter === 0 || chapter === 9) {
        clearQuest();
        setMissionModal('sucess');
        getReward(reward[chapter]);
        setIndicator(true);
      } else if (chapter === 10) {
        console.log('스토리종료');
        getReward(reward[10]);
        setIndicator(true);
      } else if (checkPoint === 0) {
        proceedCheckPoint();
        setMissionModal('get');
        setIndicator(true);
      } else if (checkPoint >= 2) {
        clearQuest();
        setMissionModal('sucess');
        getReward(reward[chapter]);
        setIndicator(true);
      }
    }
  };

  const featureModal = (e) => {
    if (e === 'greenGuy') {
      setAnimalModal(true);
    } else if (e === 'storeGuy') {
      setGotchaModal(true);
    } else if (e === 'yellowGuy') {
      setGameModal(true);
    } else if (e === 'commet') {
      setPhotoModal(true);
    } else if (e === 'trainGuy') {
      setQuickDrawModal(true);
    }
    setModal(null);
  };

  useEffect(() => {
    setCnt(0);
    if (targetNpc === modal) {
      setLengthScript(scripts.length - 1);
    } else {
      setLengthScript(NormalDialog[modal].length - 1);
    }
  }, [modal]);

  const render = () => {
    return (
      <>
        <Modal>
          <NpcImage>
            <img src={NpcImages[modal]} alt="" />
          </NpcImage>
          <ChatBox>
            <ChatBoxIcon>
              <BsThreeDots color="white" size={30} />
            </ChatBoxIcon>
            <p className="name">{NpcNames[modal]}</p>
            {(targetNpc === modal && (
              <p className="dialog">{scripts[cnt]}</p>
            )) ||
              (targetNpc !== modal && (
                <p className="dialog">{NormalDialog[modal][cnt]}</p>
              ))}
            <Buttons>
              {lengthScript === cnt && NpcFeatButton[modal] ? (
                <FeatBtn
                  onClick={() => {
                    featureModal(modal);
                  }}>
                  {NpcFeatButton[modal]}
                </FeatBtn>
              ) : null}
              {lengthScript === cnt ? (
                <CloseBtn
                  onClick={() => {
                    setTimeout(() => {
                      check(modal);
                    }, 900);
                    setModal(null);
                  }}>
                  닫기
                </CloseBtn>
              ) : (
                <BsFillCaretDownFill
                  className="next"
                  color="#DE6363"
                  size={30}
                  onClick={() => {
                    setCnt(cnt + 1);
                  }}
                />
              )}
            </Buttons>
          </ChatBox>
        </Modal>
      </>
    );
  };

  return <>{modal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.404);
  z-index: 4;
`;

const ChatBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 60%;
  margin: 40px;
  padding: 30px;
  max-width: 900px;
  height: 30%;
  background-color: #f3f3f3;
  z-index: 5;

  .name {
    width: 100%;
    height: 20%;
    font-size: 40px;
  }

  .dialog {
    width: 90%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    color: #0d005c;
  }

  .next {
    cursor: pointer;
  }
`;

const NpcImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  img {
    object-fit: cover;
  }
`;

const Buttons = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
  gap: 10px;
`;

const CloseBtn = styled.div`
  height: 100%;
  border-radius: 30px;
  background-color: #60c783;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 26px;
  cursor: pointer;
  padding: 0 20px;
`;

const FeatBtn = styled.div`
  height: 100%;
  border-radius: 30px;
  background: ${(props) => props.theme.colors.gradientOrange};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 26px;
  cursor: pointer;
  padding: 0 20px;
`;

const ChatBoxIcon = styled.div`
  position: absolute;
  top: -24px;
  right: -12px;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #de6363;
  border-radius: 10px;
  transform: rotate(30deg);
`;

export default ChatModal;
