import React from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import tree from '../../assets/tree.glb';
import { RigidBody } from '@react-three/rapier';

const Tree = () => {
  const location = [24, 1, -14.5];
  const boxLocation = [23.930875778198242, 1.5, -14.514251708984375];
  const scale = [0.8, 0.8, 0.8];
  const { gl } = useThree();
  const treeGltf = useLoader(GLTFLoader, tree, (loader) => {
    const dracoLoader = new DRACOLoader();
    const ktxLoader = new KTX2Loader();
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
  return (
    <>
      <primitive object={treeGltf.scene} position={location} scale={scale} />
    </>
  );
};

export default Tree;
