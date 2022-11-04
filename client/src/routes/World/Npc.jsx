import React, { useEffect } from 'react';
import newCharacter from '../../assets/newCharacter.glb';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';

const Npc = () => {
  const gltf = useLoader(GLTFLoader, newCharacter);
  gltf.scene.rotateY((3 * Math.PI) / 4);
  gltf.scene.scale.set(0.8, 0.8, 0.8);

  useEffect(() => {
    console.log(gltf.scene);
  }, []);

  return (
    <RigidBody type="fixed" colliders={'trimesh'}>
      <primitive object={gltf.scene} position={[10, 0, 10]} />
    </RigidBody>
  );
};

export default Npc;
