import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsThreeDots } from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  animalModalState,
  missionModalState,
  modalState,
  npcScriptState,
  questInfoState,
  userInfoState,
} from '../../Atom';
import {
  NormalDialog,
  NpcFeatButton,
  NpcImages,
  NpcNames,
  NpcQuest,
} from '../../utils/constants/constants';

const ChatModal = () => {
  const [cnt, setCnt] = useState(0);
  const [lengthScript, setLengthScript] = useState(0);
  const [modal, setModal] = useRecoilState(modalState);
  const [missionModal, setMissionModal] = useRecoilState(missionModalState);
  const [animalModal, setAnimalModal] = useRecoilState(animalModalState);
  const scripts = useRecoilValue(npcScriptState);
  const quest = useRecoilValue(questInfoState);
  const userInfo = useRecoilValue(userInfoState);
  const targetNpc = NpcQuest[quest.questNpc];

  const check = (e) => {
    if (e === targetNpc) {
      setMissionModal(e);
    }
  };

  const featureModal = (e) => {
    console.log(e);
    if (e === 'reindeerGreen') {
      setAnimalModal(true);
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

  return (
    <>
      {modal ? (
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
              {NpcFeatButton[modal] ? (
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
                    }, 500);
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
      ) : null}
    </>
  );
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
  padding: 20px;
  max-width: 900px;
  height: 30%;
  background-color: #f3f3f3;
  z-index: 5;

  .name {
    width: 100%;
    height: 20%;
    font-size: 30px;
  }

  .dialog {
    width: 90%;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28px;
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
    width: 300px;
    object-fit: cover;
  }
`;

const Buttons = styled.div`
  width: 100%;
  height: 25%;
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
