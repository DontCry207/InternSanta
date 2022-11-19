import { KeyboardControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import ChristmasTown from './Environment/ChristmasTown';
import Player from './Player';
import Snow from './Environment/Snow';
import PlayUi from './PlayUi';
import LazyLoading from './System/LazyLoading';
import LoadingPage from './LoadingPage';
import Shop from './Environment/Shop';
import BoneFire from './Environment/BoneFire';
import MainLight from './Environment/MainLight';
import DanceLight from './Environment/SpotLight';
import Moon from './Environment/Moon';
import DialogBubble from './System/DialogBubble';
import CarolZone from './Environment/CarolZone';
import FirePlace from '../CarolZone/FirePlace';
import Television from '../CarolZone/Television';
import Tree from '../CarolZone/Tree';
import TeddyBear from '../CarolZone/TeddyBear';
import QuestBubble from './System/QuestBubble';
import PortalDoor from './Environment/PortalDoor';
import PetDistributor from './NPC/PetDistributor';
import NpcDistributor from './NPC/NpcDistributor';
import ReinDeerDistributor from './NPC/ReinDeerDistributor';
import ModalDistributor from './Modals/ModalDistributor';

const WorldPage = () => {
  return (
    <Container>
      <LoadingPage />
      <ModalDistributor />
      <PlayUi />
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'dash', keys: ['ShiftLeft'] },
          { name: 'position', keys: ['q', 'Q'] },
          { name: 'dance', keys: ['f', 'F'] },
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
          <DialogBubble />
          <QuestBubble />
          <MainLight />
          <DanceLight />
          <Physics gravity={[0, -30, 0]} colliders={false}>
            <Suspense fallback={<LazyLoading />}>
              <ChristmasTown />
              <CarolZone />
              <Player />
              <Shop />
              <BoneFire />
              <PortalDoor />
              <PetDistributor />
              <NpcDistributor />
              <ReinDeerDistributor />
              <FirePlace />
              <Television />
              <Tree />
              <TeddyBear />
            </Suspense>
          </Physics>
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
