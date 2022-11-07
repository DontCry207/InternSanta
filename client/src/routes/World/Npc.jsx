import React, { useEffect, useRef } from 'react';
import newCharacter from '../../assets/newCharacter.glb';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import { useAnimations, useGLTF } from '@react-three/drei';

const Npc = () => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(newCharacter);
  const { actions } = useAnimations(animations, group);
  nodes.Scene.rotation.set(0, -(2.9 * Math.PI) / 4, 0);
  nodes.Scene.scale.set(0.55, 0.55, 0.55);
  const location = [-0.34421640634536743, 0.2, 7.816373348236084];

  useEffect(() => {
    actions['Song Jump'].play().setEffectiveTimeScale(1.3);
  }, []);

  return (
    <RigidBody type="fixed" colliders={false}>
      <primitive ref={group} object={nodes.Scene} position={location} />
    </RigidBody>
  );
};

useGLTF.preload(newCharacter);

export default Npc;
