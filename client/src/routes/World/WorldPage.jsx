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
import CarolZone from './CarolZone';
import MainModal from '../Common/MainModal';
import AlertModal from '../Common/AlertModal';
import MovieRecPage from '../CarolZone/MovieRecPage';
import FortunePage from '../CarolZone/FortunePage';
import Tree from '../CarolZone/Tree';

const WorldPage = () => {
  const [modal, setModal] = useState(null);
  const [onMovieModal, setOnMovieModal] = useState(null);
  const [onFortuneModal, setOnFortuneModal] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <Container>
      {loading ? <LoadingPage /> : null}
      {modal ? <ChatModal modal={modal} setModal={(e) => setModal(e)} /> : null}
      {onMovieModal ? console.log('hi2') : null}
      {onFortuneModal ? console.log('hi') : null}
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
              <CarolZone
                movieModalOpen={() => setOnMovieModal(true)}
                fortuneModalOpen={() => setOnFortuneModal(true)}
              />
              <Player loading={loading} />
              <InfoGuy setModal={(e) => setModal(e)} />
              <YellowGuy />
              <ReinDeer />
              <ReinDeerRed setModal={(e) => setModal(e)} />
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
