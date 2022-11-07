import { KeyboardControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import ChristmasTown from './ChristmasTown';
import Npc from './Npc';
import Player from './Player';
import Snow from './Snow';

const WorldPage = () => {
  return (
    <Container>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        ]}>
        <Canvas camera={{ fov: 70 }}>
          <Snow />
          <Sky sunPosition={[-100, -100, 0]} />
          <ambientLight intensity={0.3} />
          <pointLight castShadow intensity={0.4} position={[0, 100, 100]} />
          <Suspense fallback={null}>
            <Physics gravity={[0, -30, 0]}>
              <Player />
              <Npc />
              <ChristmasTown />
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
