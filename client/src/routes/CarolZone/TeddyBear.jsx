import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import teddybear from '../../assets/teddybear.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const TeddyBear = () => {
  const ktxLoader = new KTX2Loader();
  const scale = [0.8, 0.8, 0.8];
  const location = [24.05, 1, -14.54];
  const { camera, gl, scene } = useThree();
  const teddybearGltf = useLoader(GLTFLoader, teddybear, (loader) => {
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
  teddybearGltf.scene.rotation.y = -0.5;
  return (
    <>
      <primitive
        object={teddybearGltf.scene}
        position={location}
        scale={scale}
      />
    </>
  );
};

export default TeddyBear;
