import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import reindeerRed from '../../assets/images/reindeerRed.png';

const Images = {
  reindeerRed: reindeerRed,
};

const Dialog = {
  reindeerRed: '안녕 나는 루돌프야\n뭘봐 저리가',
};

const Name = {
  reindeerRed: '빨간코 루돌프',
};

const ChatModal = (props) => {
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
  border-radius: 20px;
  width: 90%;
  padding: 20px;
  max-width: 1000px;
  height: 30%;
  background-color: white;
  z-index: 5;

  .name {
    font-size: 40px;
  }

  .dialog {
    font-size: 30px;
  }
`;

const NpcImage = styled.div`
  position: absolute;
  bottom: 150px;
  img {
    width: 230px;
  }
`;

export default ChatModal;
