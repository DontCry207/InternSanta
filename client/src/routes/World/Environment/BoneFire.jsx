import React from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import boneFire from '../../../assets/boneFire.glb';
import { RigidBody } from '@react-three/rapier';

const BoneFire = () => {
  const { gl } = useThree();
  const boneFireGltf = useLoader(GLTFLoader, boneFire, (loader) => {
    const ktxLoader = new KTX2Loader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.5/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    ktxLoader
      .setTranscoderPath(
        `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`,
      )
      .detectSupport(gl);
    loader.setDRACOLoader(dracoLoader);
    loader.setKTX2Loader(ktxLoader);
    ktxLoader.dispose();
    dracoLoader.dispose();
  });
  boneFireGltf.scene.rotation.set(0, 0.37 * Math.PI, 0);

  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <primitive
          object={boneFireGltf.scene}
          scale={[0.7, 0.7, 0.7]}
          position={[
            -6.012689590454102, 0.4022400856018066, 1.0203404426574707,
          ]}
        />
      </RigidBody>
    </>
  );
};

export default BoneFire;
