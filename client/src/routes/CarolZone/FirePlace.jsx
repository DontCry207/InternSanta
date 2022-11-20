import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import fireplace from '../../assets/fireplace.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { fortuneModalState } from '../../Atom';

const FirePlace = () => {
  const ktxLoader = new KTX2Loader();
  const location = [24, 1, -14.5];
  const boxLocation = [23, 1.5158779382705688, -15.257784843444824];
  const scale = [0.8, 0.8, 0.8];
  const [hovered, setHover] = useState(false);
  const [modal, setModal] = useRecoilState(fortuneModalState);

  const hover = (e) => {
    setHover(true);
  };
  const unhover = (e) => {
    setHover(false);
  };

  const click = (e) => {
    setModal(!modal);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const { gl } = useThree();
  const fireplaceGltf = useLoader(GLTFLoader, fireplace, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.5/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath(
        `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`,
      )
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
    ktxLoader.dispose();
  });
  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={boxLocation}
          rotation={[0, 1.57, 0]}
          onClick={(e) => click(e)}
          onPointerOver={(e) => hover(e)}
          onPointerOut={(e) => unhover(e)}>
          <boxGeometry args={[0.17, 1, 1.4]} />
          <meshStandardMaterial
            color={[0, 0, 0, 0]}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
      <primitive
        object={fireplaceGltf.scene}
        position={location}
        scale={scale}
      />
    </>
  );
};

const Temp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 100;
`;

export default FirePlace;
