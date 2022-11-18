import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInState, userInfoState } from '../../Atom';

const HomePage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loggedIn, setloggedIn] = useRecoilState(loggedInState);
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
    <div>
      Home
      {loggedIn ? (
        <div>
          {userInfo.memberNickname}님 안녕하세요
          <br />
          보유코인: {userInfo.memberCoin}
          <button onClick={logout}>로그아웃</button>
          <button onClick={() => navigate('/game')}>게임</button>
        </div>
      ) : (
        <button onClick={() => navigate('/main')}>접속</button>
      )}
    </div>
  );
};

export default HomePage;
