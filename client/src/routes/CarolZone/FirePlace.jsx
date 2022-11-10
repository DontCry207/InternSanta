import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import fireplace from '../../assets/fireplace.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const FirePlace = () => {
  const ktxLoader = new KTX2Loader();
  const boxLocation = [-0.55, -100, -1.05];
  const scale = [0.8, 0.8, 0.8];
  const location = [0, -100, 0];
  const [clicked, setClicked] = useState(false);
  const [hovered, setHover] = useState(false);
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
        <mesh position={boxLocation} rotation={[0, 1.05, 0]}>
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

export default FirePlace;
