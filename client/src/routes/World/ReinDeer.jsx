import React, { useEffect } from 'react';
import reindeer from '../../assets/reindeer.glb';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';

const ReinDeer = () => {
  const gltf = useLoader(GLTFLoader, reindeer);
  gltf.scene.children[0].scale.set(0.13, 0.13, 0.13);
  const location = [-2.222305202484131, 0.1, 19.57008934020996];
  gltf.scene.rotation.set(0, (1.2 * Math.PI) / 2, 0);
  useEffect(() => {}, []);

  return (
    <>
      <RigidBody type="fixed" colliders={'trimesh'}>
        <primitive object={gltf.scene} position={location} />
      </RigidBody>
    </>
  );
};

export default ReinDeer;
