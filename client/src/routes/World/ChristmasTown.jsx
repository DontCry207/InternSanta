import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import Town from '../../assets/ChristmasTown.glb';

const ChristmasTown = () => {
  const gltf = useLoader(GLTFLoader, Town);
  gltf.scene.scale.set(9, 9, 9);
  return (
    <RigidBody type="fixed" colliders={'trimesh'}>
      <primitive object={gltf.scene} />
    </RigidBody>
  );
};

export default ChristmasTown;
