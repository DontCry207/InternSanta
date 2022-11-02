import React from 'react';
import styled from 'styled-components';
import christmasTown from '../../assets/images/christmasTown.jpg';
const GameConnectPage = () => {
  return (
    <Container img={christmasTown}>
      <MainTitle>INTERN SANTA</MainTitle>
      <BtnSet>
        <button>로그인</button>
        <button>회원가입</button>
      </BtnSet>
    </Container>
  );
};

const Container = styled.main`
  background: url(${(props) => props.img}) no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainTitle = styled.h1`
  font-size: 150px;
  overflow: hidden;
  display: inline-block;
  text-align: center;
  width: 100%;
  padding: 0 20px 100px;
  font-weight: 700;
  color: white;
  text-shadow: 5px 5px 8px #ffffff4a;
`;

const BtnSet = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  button {
    margin: 0;
    display: inline-block;
    width: 220px;
    height: 70px;
    border: none;
    border-radius: 15px;
    font-size: 40px;
    color: white;
    background: ${(props) => props.theme.colors.gradientOrange};
    cursor: pointer;
    transform: scale(1);
    transition: 0.5s;
  }
  button:hover {
    transform: scale(1.05);
  }
`;

export default GameConnectPage;
