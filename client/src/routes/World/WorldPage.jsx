import { KeyboardControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import ChristmasTown from './ChristmasTown';
import Player from './Player';
import ReinDeer from './ReinDeer';
import Snow from './Snow';
import ChatModal from './ChatModal';
import PlayUi from './PlayUi';
import LazyLoading from './LazyLoading';
import LoadingPage from './LoadingPage';
import Npc from './Npc';
import Shop from './Shop';
import BoneFire from './BoneFire';
import FortuneModal from './FortuneModal';
import MainLight from './MainLight';
import DanceLight from './SpotLight';
import Moon from './Moon';
import BubbleModal from './BubbleModal';
import CarolZone from './CarolZone';
import Pet from './Pet';
///
import Npc3 from './Npc3';
import Npc2 from './Npc2';
import AnimalModal from '../AnimalPet/AnimalModal';
import DrawModal from '../QuickDraw/DrawModal';
import MiniDrawModal from '../QuickDraw/MiniDrawModal';
///

const WorldPage = () => {
  ///
  const [animalPet, setAnimalPet] = useState(false);
  const [quickDraw, setQuickDraw] = useState(false);
  const [miniDraw, setMiniDraw] = useState(false);
  ///
  return (
    <Container>
      <LoadingPage />
      <ChatModal />
      <FortuneModal />
      <PlayUi />
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLweft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'dash', keys: ['ShiftLeft'] },
          { name: 'position', keys: ['q', 'Q'] },
          { name: 'dance', keys: ['f', 'F'] },
        ]}>
        <Canvas performance={{ current: 0.5 }} camera={{ fov: 70 }}>
          <Snow />
          <Stars
            radius={30}
            depth={10}
            count={500}
            factor={4}
            saturation={1}
            fade
            speed={6}
          />
          <Sky sunPosition={[-10, -10, 0]} />
          <MainLight />
          <DanceLight />
          <Suspense fallback={<LazyLoading />}>
            <Physics gravity={[0, -30, 0]} colliders={false}>
              <Moon />
              <ChristmasTown />
              <BubbleModal />
              <Player />
              <Pet />
              {/* <CarolZone /> */}
              <Shop />
              <BoneFire />
              <Npc type={'infoGuy'} />
              <Npc type={'storeGuy'} />
              <Npc type={'trainGuy'} />
              <Npc type={'yellowGuy'} />
              <Npc type={'greenGuy'} />
              <Npc type={'minSeo'} />
              <Npc type={'yb'} />
              <ReinDeer type={'reindeer'} />
              <ReinDeer type={'reindeerRed'} />
              <ReinDeer type={'reindeerOrange'} />
              <ReinDeer type={'reindeerYellow'} />
              <ReinDeer type={'reindeerGreen'} />
              <ReinDeer type={'reindeerBlue'} />
              <ReinDeer type={'reindeerPurple'} />
              <ReinDeer type={'reindeerWhite'} />
              <ReinDeer type={'reindeerPink'} />
              {/*  */}
              <Npc3 setAnimalPet={setAnimalPet} />
              <Npc2 setQuickDraw={setQuickDraw} />
              {/* <Npc2 setMiniDraw={setMiniDraw} /> */}
              {/*  */}
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
      {/*  */}
      {miniDraw == false ? null : (
        <MiniDrawModal
          closeBtnControl={setMiniDraw}
          setMiniDraw={setMiniDraw}
        />
      )}
      {animalPet == false ? null : (
        <AnimalModal
          closeBtnControl={setAnimalPet}
          setAnimalPet={setAnimalPet}
        />
      )}
      {quickDraw == false ? null : (
        <DrawModal closeBtnControl={setQuickDraw} setQuickDraw={setQuickDraw} />
      )}
      {/*  */}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`;

export default WorldPage;
