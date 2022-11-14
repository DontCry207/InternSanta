import React from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import boneFire from '../../assets/boneFire.glb';
import { RigidBody } from '@react-three/rapier';

const BoneFire = () => {
  const { gl } = useThree();
  const ktxLoader = new KTX2Loader();
  const boneFireGltf = useLoader(GLTFLoader, boneFire, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      '/node_modules/three/examples/js/libs/draco/gltf/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath('/node_modules/three/examples/js/libs/basis/')
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
    ktxLoader.dispose();
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
