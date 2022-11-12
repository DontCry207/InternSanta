import { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import PetGltf from '../../assets/pet/Tortoise.gltf';
import { RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

const Pet = (props) => {
  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  const ref = useRef();
  const group = useRef();
  const [, get] = useKeyboardControls();
  const { nodes, animations } = useGLTF(PetGltf);
  const { actions } = useAnimations(animations, group);
  nodes.Rig.rotation.copy(camera.rotation);

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();

    if (forward || backward || left || right) {
      // Walk, Run , Roll
      actions.Sit.stop();
      actions.Walk.play().setEffectiveTimeScale(0.9);
    } else {
      actions.Walk.stop();
      actions.Sit.play().setEffectiveTimeScale(1);
    }

    if (forward && left) {
      nodes.Rig.rotateY(Math.PI * 0.25);
    } else if (backward && left) {
      nodes.Rig.rotateY(Math.PI * 0.75);
    } else if (left) {
      nodes.Rig.rotateY(Math.PI * 0.5);
    } else if (forward && right) {
      nodes.Rig.rotateY(-Math.PI * 0.25);
    } else if (backward && right) {
      nodes.Rig.rotateY(-Math.PI * 0.75);
    } else if (right) {
      nodes.Rig.rotateY(-Math.PI * 0.5);
    } else if (backward) {
      nodes.Rig.rotateY(Math.PI);
    }
  });

  return (
    <>
      <primitive
        ref={group}
        object={nodes.Rig}
        position={[
          props.location[0],
          props.location[1] - 0.7,
          props.location[2] + 0.3,
        ]}
        scale={(0.1, 0.1, 0.1)}
      />
    </>
  );
};

useGLTF.preload(PetGltf);

export default Pet;
