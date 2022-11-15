import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import room from '../../assets/room.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useRef } from 'react';
import { useEffect } from 'react';

const CarolZone = () => {
  const { gl } = useThree();
  const ktxLoader = new KTX2Loader();
  const roomGltf = useLoader(GLTFLoader, room, (loader) => {
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
    dracoLoader.dispose();
  });

  const location = [100, 1, 100]; //[0, -100, 0];
  const location2 = [98.4, 1, 100.85]; //[0, -100, 0];
  const scale = [0.8, 0.8, 0.8];

  return (
    <>
      <RigidBody type="fixed" colliders={'trimesh'}>
        <primitive object={roomGltf.scene} position={location} scale={scale} />
      </RigidBody>
    </>
  );
};

export default CarolZone;
