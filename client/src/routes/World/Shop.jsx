import React, { useState } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import ShopModel from '../../assets/shop.glb';
import { RigidBody } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Shop = () => {
  const { gl } = useThree();
  const ktxLoader = new KTX2Loader();
  const shopGltf = useLoader(GLTFLoader, ShopModel, (loader) => {
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
