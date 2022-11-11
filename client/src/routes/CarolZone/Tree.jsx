import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import tree from '../../assets/tree.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const Tree = () => {
  const ktxLoader = new KTX2Loader();
  const boxLocation = [-0.1, -100, 0];
  const scale = [0.8, 0.8, 0.8];
  const location = [0, -100, 0];
  const { camera, gl, scene } = useThree();
  const treeGltf = useLoader(GLTFLoader, tree, (loader) => {
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
  treeGltf.scene.rotation.y = -0.5;
  return (
    <>
      <primitive object={treeGltf.scene} position={location} scale={scale} />
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh position={boxLocation} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.9, 2.8, 0.9]} />
          <meshStandardMaterial
            color={[0, 0, 0, 0]}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Tree;
