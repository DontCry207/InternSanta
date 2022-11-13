import { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import PetGltf from '../../assets/pet/Tortoise.gltf';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

const Pet = () => {
  const { scene } = useThree();
  const group = useRef();
  const [, get] = useKeyboardControls();
  const { nodes, animations } = useGLTF(PetGltf);
  const [playerIdx, setPlayerIdx] = useState(0);
  const { actions } = useAnimations(animations, group);
  const player = scene.children[playerIdx];
  nodes.Rig.scale.setZ(-0.1);

  useEffect(() => {
    const result = scene.children.findIndex((data) => {
      return data.name === 'player';
    });
    setPlayerIdx(result);
    return () => {};
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();
    group.current.rotation.copy(player.rotation);
    group.current.position.set(
      player.position.x,
      player.position.y - 0.02,
      player.position.z + 0.3,
    );

    if (forward || backward || left || right) {
      // Walk, Run , Roll
      actions.Sit.stop();
      actions.Walk.play().setEffectiveTimeScale(0.9);
    } else {
      actions.Walk.stop();
      actions.Sit.play().setEffectiveTimeScale(1);
    }
  });

  return (
    <>
      <primitive
        ref={group}
        object={nodes.Rig}
        position={[0, 0, 0]}
        scale={(0.1, 0.1, 0.1)}
      />
    </>
  );
};

export default Pet;
