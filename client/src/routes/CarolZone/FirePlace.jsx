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

const FirePlace = (props) => {
  const ktxLoader = new KTX2Loader();
  const boxLocation = [-0.55, -100, -1.05];
  const scale = [0.8, 0.8, 0.8];
  const location = [0, -100, 0];
  const [hovered, setHover] = useState(false);
  const [modal, setModal] = useRecoilState(fortuneModalState);

  const hover = (e) => {
    e.stopPropagation();
    setHover(true);
  };
  const unhover = (e) => {
    e.stopPropagation();
    setHover(false);
  };

  const click = (e) => {
    e.stopPropagation();
    setModal(!modal);
  };

  useEffect(() => {
    console.log('hover');
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const { camera, gl, scene } = useThree();
  const fireplaceGltf = useLoader(GLTFLoader, fireplace, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      '../node_modules/three/examples/js/libs/draco/gltf/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath('../node_modules/three/examples/js/libs/basis/')
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
    ktxLoader.dispose();
  });
  fireplaceGltf.scene.rotation.y = -0.5;
  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={boxLocation}
          rotation={[0, 1.05, 0]}
          onClick={(e) => click(e)}
          onPointerOver={(e) => hover(e)}
          onPointerOut={(e) => unhover(e)}>
          <boxGeometry args={[0.2, 1.7, 1.4]} />
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
