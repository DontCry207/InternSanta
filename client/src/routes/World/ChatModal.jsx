import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsThreeDots } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { modalState } from '../../Atom';
import {
  NormalDialog,
  NpcImages,
  NpcNames,
} from '../../utils/constants/constants';

const ChatModal = () => {
  const [dialogCnt, setDialogCnt] = useState(0);
  const [lengthDialog, setLengthDialog] = useState(0);
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    if (modal) {
      setLengthDialog(NormalDialog[modal].length - 1);
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
            <p className="dialog">{NormalDialog[modal][dialogCnt]}</p>
            <Buttons>
              {lengthDialog === dialogCnt ? (
                <CloseBtn
                  onClick={() => {
                    setDialogCnt(0);
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
                    setDialogCnt(dialogCnt + 1);
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
  justify-content: top;
  align-items: center;
  padding: 40px;
  img {
    width: 220px;
  }
`;

const Buttons = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
`;

const CloseBtn = styled.div`
  width: 15%;
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
