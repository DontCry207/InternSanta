import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import television from '../../assets/television.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const Television = () => {
  const ktxLoader = new KTX2Loader();
  const boxLocation = [-1.9, -100, -1.85];
  const scale = [0.8, 0.8, 0.8];
  const location = [0, -100, 0];
  const [clicked, setClicked] = useState(false);
  const [hovered, setHover] = useState(false);
  const { camera, gl, scene } = useThree();

  const televisionGltf = useLoader(GLTFLoader, television, (loader) => {
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
  });
  televisionGltf.scene.rotation.y = -0.5;

  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh position={boxLocation} rotation={[0, 1.05, 0]}>
          <boxGeometry args={[0.3, 1.7, 0.65]} />
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
