import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { loggedInState, userInfoState } from '../../Atom';
import { fetchData } from '../../utils/apis/api';
import ClothesPage from '../Clothes/ClothesPage';
import AnimalModal from '../AnimalPet/AnimalModal';
import MainModal from '../Common/MainModal';
import MiniGamePage from '../MiniGame/MiniGamePage';
import DrawModal from '../QuickDraw/DrawModal';
import MiniDrawModal from '../QuickDraw/MiniDrawModal';
import SantaFourCutPage from '../SantaFourCut/SantaFourCutPage';
import GetSealPage from '../Seal/GetSealPage';
import SealListPage from '../Seal/SealListPage';
const HomePage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loggedIn, setloggedIn] = useRecoilState(loggedInState);
  const navigate = useNavigate();

  const [onSantaFourCutModal, setOnSantaFourCutModal] = useState(false);
  const [onMiniGameModal, setOnMiniGameModal] = useState(false);

  const [onSealListModal, setOnSealListModal] = useState(false);
  const [onGetSealModal, setOnGetSealModal] = useState(false);

  const [onAnimalPet, setOnAnimalPet] = useState(false);
  const [onQuickDraw, setOnQuickDraw] = useState(false);
  const [onMiniDraw, setOnMiniDraw] = useState(false);
  const [onClothesModal, setOnClothesModal] = useState(false);

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
    if (onSealListModal) {
      return (
        <MainModal closeBtnControl={setOnSealListModal} bgColor="#2E2D56">
          <SealListPage />
        </MainModal>
      );
    }
    if (onGetSealModal) {
      return (
        <MainModal closeBtnControl={setOnGetSealModal} bgColor="#E47B81">
          <GetSealPage />
        </MainModal>
      );
    }
    if (onClothesModal) {
      return <ClothesPage closeBtnControl={setOnClothesModal} />;
    }
    if (onAnimalPet) {
      return (
        <MainModal closeBtnControl={setOnAnimalPet} bgColor="#639bb2">
          <AnimalModal setOnAnimalPet={setOnAnimalPet} />
        </MainModal>
      );
    }
    if (onQuickDraw) {
      return (
        <MainModal closeBtnControl={setOnQuickDraw} bgColor="#3E8887">
          <DrawModal setOnQuickDraw={setOnQuickDraw} />
        </MainModal>
      );
    }
    if (onMiniDraw) {
      return (
        <MainModal closeBtnControl={setOnMiniDraw} bgColor="#56668E">
          <MiniDrawModal setOnMiniDraw={setOnMiniDraw} />
        </MainModal>
      );
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
          <button onClick={() => setOnSealListModal(true)}>씰모으기</button>
          <button onClick={() => setOnGetSealModal(true)}>씰뽑기</button>
          <button onClick={() => setOnClothesModal(true)}>옷텍스쳐</button>
          <button onClick={() => setOnMiniDraw(true)}>미니게임_퀵드로우</button>
          <button onClick={() => setOnAnimalPet(true)}>Q2. 동물형분별</button>
          <button onClick={() => setOnQuickDraw(true)}>Q4. 썰매재료수급</button>
          {openModal()}
        </div>
      ) : (
        <button onClick={() => navigate('/main')}>접속</button>
      )}
    </div>
  );
};

export default HomePage;
