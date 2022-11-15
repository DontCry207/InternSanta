import { KeyboardControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense } from 'react';
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
import FirePlace from '../CarolZone/FirePlace';
import Television from '../CarolZone/Television';
import Tree from '../CarolZone/Tree';
import TeddyBear from '../CarolZone/TeddyBear';

const WorldPage = () => {
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
          { name: 'carol', keys: ['p', 'P'] },
          { name: 'world', keys: ['o', 'O'] },
        ]}>
        <Canvas camera={{ fov: 70 }}>
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
          <Moon />
          <BubbleModal />
          <MainLight />
          <DanceLight />
          <Suspense fallback={<LazyLoading />}>
            <Physics gravity={[0, -30, 0]} colliders={false}>
              <CarolZone />
              <ChristmasTown />
              <FirePlace />
              <Television />
              <Tree />
              <TeddyBear />
              <Player />
              <Pet />
              <Shop />
              <BoneFire />
              <Npc type={'infoGuy'} />
              <Npc type={'storeGuy'} />
              <Npc type={'trainGuy'} />
              <Npc type={'yellowGuy'} />
              <Npc type={'greenGuy'} />
              <Npc type={'minSeo'} />
              <Npc type={'yb'} />
              <Npc type={'commet'} />
              <ReinDeer type={'reindeer'} />
              <ReinDeer type={'reindeerRed'} />
              <ReinDeer type={'reindeerOrange'} />
              <ReinDeer type={'reindeerYellow'} />
              <ReinDeer type={'reindeerGreen'} />
              <ReinDeer type={'reindeerBlue'} />
              <ReinDeer type={'reindeerPurple'} />
              <ReinDeer type={'reindeerWhite'} />
              <ReinDeer type={'reindeerPink'} />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`;

export default WorldPage;
