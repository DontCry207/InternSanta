import { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import PetGltf from '../../assets/pet/Tortoise.gltf';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

const Pet = () => {
  const ref = useRef();

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();
  const [, get] = useKeyboardControls();
  const [location2, setLocation2] = useState([10, 10, 10]);
  const [playerIdx, setPlayerIdx] = useState(0);
  const group = useRef();
  const player = scene.children[playerIdx];
  const { nodes, animations } = useGLTF(PetGltf);
  const { actions } = useAnimations(animations, group);
  nodes.Rig.rotation.copy(camera.rotation);

  useEffect(() => {
    const result = scene.children.findIndex((data) => {
      return data.name === 'player';
    });
    console.log(result);
    setPlayerIdx(result);
    return () => {};
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();

    // update camera
    setLocation2([
      player.position.x,
      player.position.y,
      player.position.z + 0.3,
    ]);

    if (forward || backward || left || right) {
      // Walk, Run , Roll
      actions.Sit.stop();
      actions.Walk.play().setEffectiveTimeScale(0.9);
    } else {
      actions.Walk.stop();
      actions.Sit.play().setEffectiveTimeScale(1);
    }

    nodes.Rig.rotateY(Math.PI);
    if (forward && left) {
      nodes.Rig.rotateY(Math.PI / 4);
    } else if (backward && left) {
      nodes.Rig.rotateY((3 * Math.PI) / 4);
    } else if (left) {
      nodes.Rig.rotateY(Math.PI / 2);
    } else if (forward && right) {
      nodes.Rig.rotateY(-Math.PI / 4);
    } else if (backward && right) {
      nodes.Rig.rotateY((-3 * Math.PI) / 4);
    } else if (right) {
      nodes.Rig.rotateY(-Math.PI / 2);
    } else if (backward) {
      nodes.Rig.rotateY(Math.PI);
    }
  });

  return (
    <>
      <primitive
        ref={group}
        object={nodes.Rig}
        position={location2}
        scale={(0.1, 0.1, 0.1)}
      />
      <RigidBody
        ref={ref}
        mass={1}
        type="dynamic"
        colliders={false}
        position={[-15.7, 4, 21.4]}>
        <CuboidCollider args={[0.3, 0.3, 0.3]} />
      </RigidBody>
    </>
  );
};

useGLTF.preload(PetGltf);

export default Pet;
