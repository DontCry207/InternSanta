import React from 'react';
import styled from 'styled-components';

const AlertModal = (props) => {
  const {
    title,
    leftBtnName,
    rightBtnName,
    setLeftBtnControl,
    setRightBtnControl,
  } = props;

  return (
    <>
      <BackGround></BackGround>
      <ModalBox>
        <Title>{title}</Title>
        <MainContents>{props.children}</MainContents>
        <BtnSet>
          {leftBtnName && (
            <button className="leftBtn" onClick={() => setLeftBtnControl()}>
              {leftBtnName}
            </button>
          )}
          {rightBtnName && (
            <button className="rightBtn" onClick={() => setRightBtnControl()}>
              {rightBtnName}
            </button>
          )}
        </BtnSet>
      </ModalBox>
    </>
  );
};

AlertModal.defaultProps = {
  leftBtnName: '',
  rightBtnName: '',
  setLeftBtnControl: () => {},
  setRightBtnControl: () => {},
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
  width: 600px;
  min-height: 200px;
  border-radius: 40px;
  background-color: #f3f3f3;

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
const Title = styled.div`
  background: ${(props) => props.theme.colors.gradientOrange};
  width: 200px;
  height: 60px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
  color: white;
  font-size: 36px;
`;
const MainContents = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BtnSet = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  gap: 10px;
  transform: translate(0, 50%);

  button {
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
  }
  .leftBtn {
    background-color: #cfcfcf;
  }
  .rightBtn {
    background-color: #60c783;
    color: white;
  }
`;
export default AlertModal;
