import { KeyboardControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import ChristmasTown from './ChristmasTown';
import YellowGuy from './Npc/YellowGuy';
import Player from './Player';
import ReinDeer from './ReinDeer/ReinDeer';
import ReinDeerRed from './ReinDeer/ReinDeerRed';
import Snow from './Snow';
import ChatModal from './ChatModal';
import PlayUi from './PlayUi';
import LazyLoading from './LazyLoading';
import LoadingPage from './LoadingPage';
import InfoGuy from './NPC/InfoGuy';

const WorldPage = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <Container>
      {loading ? <LoadingPage /> : null}
      {modal ? <ChatModal setModal={() => setModal(!modal)} /> : null}
      <PlayUi />
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLweft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        ]}>
        <Canvas camera={{ fov: 70 }}>
          <Snow />
          <Stars
            radius={50}
            depth={10}
            count={1000}
            factor={4}
            saturation={1}
            fade
            speed={5}
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
              <Player loading={loading} />
              <InfoGuy setModal={() => setModal(!modal)} />
              <YellowGuy />
              <ReinDeer />
              <ReinDeerRed setModal={() => setModal(!modal)} />
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
