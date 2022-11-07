import { Cloud, KeyboardControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import ChristmasTown from './ChristmasTown';
import Npc from './Npc';
import Player from './Player';
import ReinDeer from './ReinDeer';
import ReinDeerRed from './ReinDeerRed';
import Snow from './Snow';
import reindeerRed from '../../assets/images/reindeerRed.png';

const WorldPage = () => {
  const [modal, setModal] = useState(false);
  return (
    <Container>
      {modal ? (
        <Modal>
          <NpcImage>
            <img src={reindeerRed} alt="" />
          </NpcImage>
          <ChatBox>
            <p className="name">안녕 나는 루돌프야</p>
            <p className="name">뭘봐 저리가 꺼져</p>
            <button
              onClick={() => {
                setModal(!modal);
              }}>
              닫기
            </button>
          </ChatBox>
        </Modal>
      ) : null}
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        ]}>
        <Canvas camera={{ fov: 70 }}>
          <Snow />
          <Stars
            radius={100}
            depth={30}
            count={3000}
            factor={4}
            saturation={1}
            fade
            speed={5}
          />
          <Sky sunPosition={[-100, -100, 2800]} />
          <ambientLight intensity={0.3} color={'white'} />
          <pointLight castShadow intensity={0.7} position={[1, 10, 1]} />
          <Suspense fallback={null}>
            <Physics gravity={[0, -30, 0]}>
              <Player />
              <Npc />
              <ReinDeer />
              <ReinDeerRed setModal={() => setModal(!modal)} />
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

const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.404);
  z-index: 1;
`;

const ChatBox = styled.div`
  position: absolute;
  border-radius: 20px;
  width: 90%;
  padding: 20px;
  max-width: 1000px;
  height: 30%;
  background-color: white;
  z-index: 2;

  .name {
    font-size: 30px;
  }
`;

const NpcImage = styled.div`
  position: absolute;
  top: 60px;
  img {
    width: 300px;
  }
`;

export default WorldPage;
