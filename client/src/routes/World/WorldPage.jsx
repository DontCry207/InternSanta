import { KeyboardControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import ChristmasTown from './ChristmasTown';
import YellowGuy from './Npc/YellowGuy';
import Player from './Player';
import Pet from './Pet';
import ReinDeer from './ReinDeer';
import Snow from './Snow';
import ChatModal from './ChatModal';
import PlayUi from './PlayUi';
import LazyLoading from './LazyLoading';
import LoadingPage from './LoadingPage';
import InfoGuy from './NPC/InfoGuy';
import Shop from './Shop';

const WorldPage = () => {
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <ambientLight intensity={0.5} color={'#c8cce7'} />
          <pointLight castShadow intensity={0.5} position={[0, 10, 0]} />
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
              <Pet />
              <Player loading={loading} />
              <InfoGuy setModal={(e) => setModal(e)} />
              <YellowGuy />
              <Shop />
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
