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
    97.42610168457031, 1.2989263534545898, 99.24563293457031,
  ];
  const scale = [0.8, 0.8, 0.8];
  const location = [0, -100, 0];
  const [modal, setModal] = useRecoilState(movieModalState);
  const [hovered, setHover] = useState(false);
  const { camera, gl, scene } = useThree();

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
