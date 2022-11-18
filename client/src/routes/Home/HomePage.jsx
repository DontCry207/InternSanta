import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
const HomePage = () => {
  const navigate = useNavigate();
  const logout = () => {
    setUserInfo({
      memberNickname: '',
      memberCoin: -1,
      memberTicket: -1,
      memberTop: null,
      memberPet: -1,
      memberChapter: -1,
      memberCheckpoint: -1,
    });
    setloggedIn(false);
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    console.log('로그아웃');
  };

  return (
    <Container>
      <NavBar>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#service">Service</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <ConnectBtn>
          {/* <button onClick={() => logout()}>로그아웃</button> */}
          <button onClick={() => navigate('/main')}>접속하기</button>
        </ConnectBtn>
      </NavBar>
      <Main>
        <TitleBox id="home">
          <h1>Intern Santa</h1>
        </TitleBox>
        <section id="about">2</section>
        <section id="service">3</section>
        <section id="contact">4</section>
      </Main>
      <footer></footer>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  background-color: #55669e;
`;
const NavBar = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    font-size: 24px;
    color: #edefff;
  }
`;
const Logo = styled.div`
  padding: 10px;
  img {
    width: 60px;
  }
`;
const ConnectBtn = styled.div`
  padding-right: 30px;
  button {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    background-color: #edefff;
    color: #55669e;
    font-size: 18px;
    /* font-weight: 600; */
  }
`;
const Main = styled.main`
  section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: lime; */
    scroll-snap-align: center;
  }
`;

const TitleBox = styled.section`
  h1 {
    font-size: 120px;
    color: #edefff;
  }
`;
export default HomePage;
