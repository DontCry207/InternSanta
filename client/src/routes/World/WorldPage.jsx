import { KeyboardControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import ChristmasTown from './ChristmasTown';
import Player from './Player';
import Pet from './Pet';
import ReinDeer from './ReinDeer';
import Snow from './Snow';
import ChatModal from './ChatModal';
import PlayUi from './PlayUi';
import LazyLoading from './LazyLoading';
import LoadingPage from './LoadingPage';
import Npc from './Npc';
import Shop from './Shop';
import BoneFire from './BoneFire';

const WorldPage = () => {
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ambient, setAmbient] = useState(true);

  return (
    <Container>
      {loading ? <LoadingPage /> : null}
      {modal ? <ChatModal modal={modal} setModal={(e) => setModal(e)} /> : null}
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
          <Sky sunPosition={[-100, -100, 2800]} />
          <ambientLight
            intensity={ambient ? 0.5 : 0.05}
            color={'#c8cce7'}
            penumbra={2}
          />
          <pointLight
            intensity={ambient ? 0.5 : 0.05}
            position={[0, 10, 0]}
            shadow={0.1}
          />
          <Suspense
            fallback={
              <LazyLoading
                setLoading={() => {
                  setLoading(!loading);
                }}
              />
            }>
            <Physics gravity={[0, -30, 0]}>
              <ChristmasTown />
              <Player loading={loading} />
              <Pet />
              <Shop />
              <BoneFire setAmbient={() => setAmbient(!ambient)} />
              <Npc type={'infoGuy'} setModal={(e) => setModal(e)} />
              <Npc type={'storeGuy'} setModal={(e) => setModal(e)} />
              <Npc type={'trainGuy'} setModal={(e) => setModal(e)} />
              <Npc type={'yellowGuy'} setModal={(e) => setModal(e)} />
              <Npc type={'greenGuy'} setModal={(e) => setModal(e)} />
              <Npc type={'minSeo'} setModal={(e) => setModal(e)} />
              <Npc type={'yb'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeer'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeerRed'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeerOrange'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeerYellow'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeerGreen'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeerBlue'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeerPurple'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeerWhite'} setModal={(e) => setModal(e)} />
              <ReinDeer type={'reindeerPink'} setModal={(e) => setModal(e)} />
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
`;

export default WorldPage;
