import { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import pet from '../../assets/Cat_Walk.gltf';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';

const Pet = () => {
  const ref = useRef();

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();
  const [, get] = useKeyboardControls();
  const [location, setLocation] = useState([10, 10, 10]);
  const [location2, setLocation2] = useState([10, 10, 10]);

  const group = useRef();
  const { nodes, animations } = useGLTF(pet);
  const { actions } = useAnimations(animations, group);
  nodes.Rig.rotation.copy(camera.rotation);

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();
    const player = scene.children[8];

    // update camera
    const [x, y, z] = [...ref.current.translation()];
    setLocation([x, y + 0.6, z]);
    setLocation2([
      player.position.x,
      player.position.y,
      player.position.z - 0.3,
    ]);

    // nodes.Rig.position.set(
    //   player.position.x,
    //   player.position.y - 0.2,
    //   player.position.z - 0.3,
    // );

    if (forward || backward || left || right) {
      actions.Animation.play().setEffectiveTimeScale(1.3);
    } else {
      actions.Animation.stop();
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
  console.log(scene);

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

useGLTF.preload(pet);

export default Pet;
