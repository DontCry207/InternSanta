import React, { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ShopModel from '../../assets/Shop.glb';
import { RigidBody } from '@react-three/rapier';

const Shop = () => {
  const gltf = useLoader(GLTFLoader, ShopModel);
  gltf.scene.rotation.set(0, 0.37 * Math.PI, 0);

  return (
    <>
      <primitive
        object={gltf.scene}
        scale={[0.7, 0.7, 0.7]}
        position={[-12.43786334991455, 0.21, 4.422557353973389]}
      />
      <RigidBody type="fixed" colliders={'trimesh'}>
        <mesh
          position={[-12.43786334991455, 1.21, 4.422557353973389]}
          rotation={[0, 0.37 * Math.PI, 0]}>
          <boxGeometry args={[2.1, 2.1, 2.1]} />
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
