import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import reindeerRed from '../../assets/images/reindeerRed.png';
import infoGuy from '../../assets/images/infoGuy.png';

const Images = {
  reindeerRed: reindeerRed,
  infoGuy: infoGuy,
};

const Dialog = {
  reindeerRed: [
    '안녕 너가 새로온 인턴이구나? 나는 인사팀장 루돌프야.',
    '산타 정직원이 되기 위해 너는 순록 여덟 마리를 설득해서 너랑 같이 일할 수 있게 해야 해.',
    '너가 순록들 부탁을 하나씩 들어주면 너의 편이 될거야.',
    '옷 가게에 가면 너가 만들고 싶은 옷을 만들 수 있어',
  ],
  infoGuy:
    '안녕! 우리마을에 온걸 환영해! 인사팀장 루돌프님이 기다리고 계셔! 그분께 가봐.',
};

const Name = {
  reindeerRed: '루돌프 인사팀장',
  infoGuy: '제시카',
};

const ChatModal = (props) => {
  const [chapter, setChapter] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log(props);
  }, [props]);

  const getName = (e) => {
    return <p className="name">{Name[e]}</p>;
  };
  const getDialog = (e) => {
    return <p className="dialog">{Dialog[e]}</p>;
  };

  return (
    <Modal>
      <NpcImage>
        <img src={Images[props.modal]} alt="" />
      </NpcImage>
      <ChatBox>
        {getName(props.modal)}
        {getDialog(props.modal)}
        <button
          onClick={() => {
            props.setModal(null);
          }}>
          닫기
        </button>
        <button
          onClick={() => {
            setNum(num + 1);
          }}>
          다음
        </button>
      </ChatBox>
    </Modal>
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
  justify-content: start;
  align-items: start;
  border-radius: 20px;
  width: 90%;
  padding: 20px;
  max-width: 900px;
  height: 30%;
  background-color: white;
  gap: 20px;
  z-index: 5;

  .name {
    font-size: 40px;
  }

  .dialog {
    font-size: 30px;
  }
`;

const NpcImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default ChatModal;
