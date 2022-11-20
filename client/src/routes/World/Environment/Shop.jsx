import React, { useState } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import ShopModel from '../../../assets/shop.glb';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Shop = () => {
  const { gl } = useThree();
  const shopGltf = useLoader(GLTFLoader, ShopModel, (loader) => {
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
  shopGltf.scene.rotation.set(0, 0.37 * Math.PI, 0);

  return (
    <>
      <primitive
        object={shopGltf.scene}
        scale={[0.7, 0.7, 0.7]}
        position={[-12.43786334991455, 0.21, 4.422557353973389]}
      />
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={[-12.43786334991455, 0.51, 4.422557353973389]}
          rotation={[0, 0.37 * Math.PI, 0]}>
          <boxGeometry args={[2, 0.8, 2]} />
          <meshStandardMaterial
            color={(0, 0, 0, 0)}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Shop;
