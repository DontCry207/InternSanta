import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import room from '../../assets/room.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import Tree from '../CarolZone/Tree';
import TeddyBear from '../CarolZone/TeddyBear';
import Television from '../CarolZone/Television';
import FirePlace from '../CarolZone/FirePlace';

const CarolZone = (props) => {
  const { camera, gl, scene } = useThree();
  const ktxLoader = new KTX2Loader();
  const roomGltf = useLoader(GLTFLoader, room, (loader) => {
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

  const location = [0, -100, 0]; //[-15, 1, 21.4];
  const scale = [0.8, 0.8, 0.8];

  const fireLight = new THREE.PointLight(0xc06020, 2, 1.5);
  fireLight.position.set(-1.17, 0.3, -1.1);
  roomGltf.scene.add(fireLight);
  roomGltf.scene.rotation.y = -0.5;

  console.log('CAROLZONE');

  return (
    <>
      <pointLight castShadow intensity={0.25} position={[-2, -98, 1]} />
      <RigidBody type="fixed" colliders={'trimesh'}>
        <primitive object={roomGltf.scene} position={location} scale={scale} />
      </RigidBody>
      <FirePlace />
      <Television />
      <TeddyBear />
      <Tree /> 
    </>
  );
};

export default CarolZone;
