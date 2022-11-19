import React from 'react';
import AnimalModal from './AnimalModal';
import ChatModal from './ChatModal';
import ClothesModal from './ClothesModal';
import FortuneModal from './FortuneModal';
import GotchaModal from './GotchaModal';
import MiniGameModal from './MiniGameModal';
import MissionModal from './MissionModal';
import MovieModal from './MovieModal';
import QuickDrawModal from './QuickDrawModal';
import SantaFourCutModal from './SantaFourCutModal';
import SealModal from './SealModal';
import LogoutModal from './LogoutModal';

const ModalDistributor = () => {
  return (
    <>
      <SealModal />
      <ChatModal />
      <MissionModal />
      <ClothesModal />
      <AnimalModal />
      <FortuneModal />
      <QuickDrawModal />
      <GotchaModal />
      <MovieModal />
      <MiniGameModal />
      <SantaFourCutModal />
      <LogoutModal />
    </>
  );
};

export default ModalDistributor;
