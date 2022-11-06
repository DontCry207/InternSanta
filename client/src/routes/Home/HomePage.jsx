import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { loggedInState, userInfoState } from '../../Atom';
import { fetchData } from '../../utils/apis/api';
import MainModal from '../Common/MainModal';
const HomePage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loggedIn, setloggedIn] = useRecoilState(loggedInState);
  const navigate = useNavigate();
  // const test = () => {
  //   fetchData.get('/api/v1/quest').then((res) => {
  //     console.log(res);
  //   });
  // };
  const logout = () => {
    setUserInfo({
      memberNickname: '',
      memberCoin: -1,
      memberTicket: -1,
      memberGender: -1,
      memberTop: '',
      memberBottom: '',
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
          <button onClick={logout}>로그아웃</button>
          <button
            onClick={() => {
              navigate('/game');
            }}>
            게임
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate('/main');
          }}>
          접속
        </button>
      )}
    </div>
  );
};

export default HomePage;
