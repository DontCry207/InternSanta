import { KeyboardControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import ChristmasTown from './ChristmasTown';
import Player from './Player';
import Pet from './Pet';

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
          <Sky sunPosition={[30, 10, 10]} />
          <ambientLight intensity={0.3} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <Suspense fallback={null}>
            <Physics gravity={[0, -20, 0]}>
              <Player />
              <Pet />
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
