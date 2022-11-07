import React from 'react';
import styled from 'styled-components';
import { IoIosCloseCircle } from 'react-icons/io';
const MainModal = (props) => {
  const { closeBtnControl, bgColor } = props;
  return (
    <>
      <BackGround></BackGround>
      <ModalBox bgColor={bgColor}>
        <CloseBtn>
          <IoIosCloseCircle
            color={'white'}
            size={50}
            onClick={() => closeBtnControl()}
          />
        </CloseBtn>
        <MainContents>{props.children}</MainContents>
      </ModalBox>
    </>
  );
};

MainModal.defaultProps = {
  closeBtnControl: () => {},
  bgColor: 'black',
};

const BackGround = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
`;
const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1050px;
  height: 850px;
  border-radius: 40px;
  background: linear-gradient(
    180deg,
    ${(props) => `${props.bgColor}`} 25%,
    #ffffff 100%
  );

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const MainContents = styled.div`
  padding: 40px 20px;
  display: flex;
  justify-content: center;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  svg {
    cursor: pointer;
  }
`;
export default MainModal;