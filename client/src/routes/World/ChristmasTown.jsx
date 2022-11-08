import React, { useState } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import Town from '../../assets/Map1.glb';
import { RigidBody } from '@react-three/rapier';

const ChristmasTown = () => {
  const ktxLoader = new KTX2Loader();
  const { gl } = useThree();

  const gltf = useLoader(GLTFLoader, Town, (loader) => {
    ktxLoader
      .setTranscoderPath('../node_modules/three/examples/js/libs/basis/')
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
  });

  return (
    <RigidBody type="fixed" colliders={'trimesh'}>
      <primitive object={gltf.scene} scale={[9, 9, 9]} />
    </RigidBody>
  );
};

export default ChristmasTown;
