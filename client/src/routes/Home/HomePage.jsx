import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { loggedInState, userInfoState } from '../../Atom';
import { fetchData } from '../../utils/apis/api';
import ClothesPage from '../Clothes/ClothesPage';
import MainModal from '../Common/MainModal';
import MiniGamePage from '../MiniGame/MiniGamePage';
import SantaFourCutPage from '../SantaFourCut/SantaFourCutPage';
const HomePage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loggedIn, setloggedIn] = useRecoilState(loggedInState);
  const navigate = useNavigate();

  const [onSantaFourCutModal, setOnSantaFourCutModal] = useState(false);
  const [onMiniGameModal, setOnMiniGameModal] = useState(false);
  const [onClothModal, setOnClothModal] = useState(false);

  const openModal = () => {
    if (onSantaFourCutModal) {
      return (
        <MainModal closeBtnControl={setOnSantaFourCutModal} bgColor="#30314B">
          <SantaFourCutPage />
        </MainModal>
      );
    }
    if (onMiniGameModal) {
      return (
        <MainModal closeBtnControl={setOnMiniGameModal} bgColor="#56668E">
          <MiniGamePage />
        </MainModal>
      );
    }
    if (onClothModal) {
      return <ClothesPage closeBtnControl={setOnClothModal} />;
    }
  };

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
          <button onClick={() => setOnSantaFourCutModal(true)}>산타네컷</button>
          <button onClick={() => setOnMiniGameModal(true)}>미니게임</button>
          <button onClick={() => setOnClothModal(true)}>옷텍스쳐</button>
          {openModal()}
        </div>
      ) : (
        <button onClick={() => navigate('/main')}>접속</button>
      )}
    </div>
  );
};

export default HomePage;
