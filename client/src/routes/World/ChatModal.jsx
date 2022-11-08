import React from 'react';
import styled from 'styled-components';
import reindeerRed from '../../assets/images/reindeerRed.png';

const dialog = {};

const npcImages = {};

const ChatModal = (props) => {
  return (
    <Modal>
      <NpcImage>
        <img src={reindeerRed} alt="" />
      </NpcImage>
      <ChatBox>
        <p className="name">안녕 나는 루돌프야</p>
        <p className="name">뭘봐 저리가</p>
        <button
          onClick={() => {
            props.setModal();
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
