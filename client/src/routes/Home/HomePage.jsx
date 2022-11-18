import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import section2 from '../../assets/images/landing/section2.png';
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
            <a href="#home">인턴산타</a>
          </li>
          <li>
            <a href="#seal">씰 뽑기</a>
          </li>
          <li>
            <a href="#photo">산타네컷</a>
          </li>
          <li>
            <a href="#carol">캐롤존</a>
          </li>
        </ul>
        <ConnectBtn>
          {/* <button onClick={() => logout()}>로그아웃</button> */}
          <button onClick={() => navigate('/main')}>접속하기</button>
        </ConnectBtn>
      </NavBar>
      <Main>
        <TitleBox id="home">
          <h1>INTERN SANTA</h1>
        </TitleBox>
        <SealBox id="seal">
          <img src={section2} alt="" />
          <div>
            <h2>크리스마스 씰을 모으자</h2>
            <p>미션과 게임을 통해서 얻은 코인으로</p>
            <p>뽑기를 통해 크리스마스 씰을 모으고,</p>
            <p>다 모은 씰을 티켓으로 교환하여 선물을 받아보세요</p>
          </div>
        </SealBox>
        <SealBox id="photo">
          <div>
            <h2>나만의 캐릭터와 함께 찰칵</h2>
            <p>내가 직접 만든 옷을 입은 캐릭터와</p>
            <p>네컷 사진으로 추억을 남겨보세요</p>
          </div>
          <img src={section2} alt="" />
        </SealBox>
        <SealBox id="carol">
          <img src={section2} alt="" />
          <div>
            <h2>감성 가득한 캐롤존</h2>
            <p>크리스마스에 어울리는 영화를 추천 받고</p>
            <p>오늘의 운세까지 확인해보세요</p>
          </div>
        </SealBox>
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
  scroll-snap-type: y mandatory;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
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

const SealBox = styled.section`
  display: flex;
  width: 90%;
  img {
    width: 40%;
  }
  div {
    color: #edefff;
    h2 {
      font-size: 52px;
      font-weight: 700;
      padding-bottom: 30px;
    }
    p {
      font-size: 28px;
      padding: 5px 0;
    }
  }
`;
export default HomePage;
