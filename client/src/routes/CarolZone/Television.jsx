import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRecoilState } from 'recoil';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import television from '../../assets/television.glb';
import { RigidBody } from '@react-three/rapier';
import { movieModalState } from '../../Atom';
import * as THREE from 'three';

const Television = () => {
  const ktxLoader = new KTX2Loader();
  const boxLocation = [
    21.429622268676758, 1.3018462657928467, -15.259762954711914,
  ];
  const scale = [0.8, 0.8, 0.8];
  const location = [24, 1, -14.5];
  const [modal, setModal] = useRecoilState(movieModalState);
  const [hovered, setHover] = useState(false);
  const { gl } = useThree();

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

  const televisionGltf = useLoader(GLTFLoader, television, (loader) => {
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
          <boxGeometry args={[0.4, 1.1, 0.65]} />
          <meshStandardMaterial
            color={[0, 0, 0, 0]}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
      <primitive
        object={televisionGltf.scene}
        position={location}
        scale={scale}
      />
    </>
  );
};

export default Television;
