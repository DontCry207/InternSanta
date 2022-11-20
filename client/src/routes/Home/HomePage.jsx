import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import section1 from '../../assets/images/landing/section1.png';
import section2 from '../../assets/images/landing/section2.png';
import section3 from '../../assets/images/landing/section3.png';
import { useRecoilState } from 'recoil';
import { loggedInState, userInfoState } from '../../Atom';
import Snowfall from 'react-snowfall';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
const HomePage = () => {
  const [loggedIn, setloggedIn] = useRecoilState(loggedInState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
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
      <Snowfall
        style={{ position: 'fixed' }}
        snowflakeCount={200}
        wind={[-0.5, 0.5]}
        radius={[1.0, 3.0]}
      />
      <NavBar>
        <Logo>
          <a href="#home">
            <img src={logo} alt="logo" />
          </a>
        </Logo>
        <ul>
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
          {loggedIn ? (
            <>
              <p>{userInfo.memberNickname}님</p>
              <button onClick={() => logout()}>로그아웃</button>
            </>
          ) : (
            <button onClick={() => navigate('/main')}>로그인</button>
          )}
        </ConnectBtn>
      </NavBar>
      <Main>
        <TitleBox id="home">
          <h1>INTERN SANTA</h1>
          {loggedIn ? (
            <>
              <button
                onClick={() => 
                  navigate('/game')

                }>
                게임 시작
              </button>
            </>
          ) : null}
        </TitleBox>
        <SealBox id="seal">
          <img src={section1} alt="" />
          <div>
            <h2>크리스마스 씰을 모으자</h2>
            <p>미션과 게임을 통해서 얻은 코인으로</p>
            <p>뽑기를 통해 크리스마스 씰을 모으고,</p>
            <p>다 모은 씰을 티켓으로 교환하여 선물을 받아보세요</p>
          </div>
        </SealBox>
        <PhotoBox id="photo">
          <div>
            <h2>나만의 캐릭터와 함께 찰칵</h2>
            <p>내가 직접 만든 옷을 입은 캐릭터와</p>
            <p>네컷 사진으로 추억을 남겨보세요</p>
          </div>
          <img src={section2} alt="" />
        </PhotoBox>
        <CarolBox id="carol">
          <img src={section3} alt="" />
          <div>
            <h2>감성 가득한 캐롤존</h2>
            <p>크리스마스에 어울리는 영화를 추천 받고</p>
            <p>오늘의 운세까지 확인해보세요</p>
          </div>
        </CarolBox>
        <GameConnect id="connect">
          <div>
            <p>이 모든 콘텐츠를</p>
            <p>지금 바로 인턴산타에서</p>
          </div>
          <p onClick={() => loggedIn ? navigate('/game'):navigate('/main')}>
            즐기러 가기&nbsp;
            <HiOutlineArrowNarrowRight />
          </p>
        </GameConnect>
      </Main>
      <footer></footer>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  /* height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory; */
  /* background-color: #55669e; */
  background: linear-gradient(180deg, #55669e 0%, #b5a4b7 100%);
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
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 30px;
  p {
    color: #edefff;
    font-size: 18px;
  }
  button {
    width: 90px;
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

    /* background-color: lime; */
    scroll-snap-align: center;
  }
`;

const TitleBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  h1 {
    font-size: 120px;
    color: #edefff;
  }
  button {
    width: 200px;
    height: 70px;
    /* margin-top: 20px; */
    border-radius: 10px;
    background-color: #edefff;
    color: #55669e;
    font-size: 32px;
    transition: 0.2s;
    /* font-weight: 600; */
    &:hover {
      transform: scale(1.08);
    }
  }
`;

const SealBox = styled.section`
  display: flex;
  width: 90%;
  gap: 50px;
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

const PhotoBox = styled.section`
  display: flex;
  width: 90%;
  gap: 50px;
  img {
    width: 35%;
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
const CarolBox = styled.section`
  display: flex;
  width: 90%;
  gap: 100px;
  img {
    width: 35%;
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

const GameConnect = styled.section`
  flex-direction: column;
  gap: 80px;
  & > div {
    font-size: 80px;
    text-align: center;
    color: #edefff;
    p {
      padding: 10px;
    }
  }
  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    border-bottom: 3px solid #353535;
    color: #353535;
    padding-bottom: 2px;
    cursor: pointer;
    /* text-decoration: underline; */
  }
`;
export default HomePage;
