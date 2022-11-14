import React from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import Town from '../../assets/ChristmasTown.glb';
import { RigidBody } from '@react-three/rapier';

const ChristmasTown = () => {
  const ktxLoader = new KTX2Loader();
  const { gl } = useThree();

  const gltf = useLoader(GLTFLoader, Town, (loader) => {
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

  return (
    <RigidBody type="fixed" colliders={'trimesh'}>
      <primitive object={gltf.scene} scale={[9, 9, 9]} />
    </RigidBody>
  );
};

export default ChristmasTown;
