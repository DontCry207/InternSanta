import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import pet from '../../assets/Cat_Walk.gltf';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import {
  OrbitControls,
  MapControls,
} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';
extend({ OrbitControls, MapControls });

const Pet = () => {
  const SPEED = 4;
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const ref = useRef();

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();
  const [, get] = useKeyboardControls();
  const [location, setLocation] = useState([10, 10, -2]);
  const [location2, setLocation2] = useState([10, 10, -1]);
  const controls = useRef();

  const group = useRef();
  const { nodes, animations } = useGLTF(pet);
  const { actions } = useAnimations(animations, group);
  nodes.Rig.rotation.copy(camera.rotation);

  var arr = [];

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();
    const velocity = ref.current.linvel();
    // update camera
    const [x, y, z] = [...ref.current.translation()];
    setLocation([x, y + 0.6, z]);
    setLocation2([x, y - 0.1, z]);

    const Player = scene.children[3];
    arr.push(Player.position);
    console.log(arr);

    if (Player.position.distanceTo(nodes.Rig.position) > 1.5) {
      const position = arr.shift();
      nodes.Rig.position.set(position.x, position.y - 0.2, position.z);
    } else {
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
        position={[0, 1, 0]}>
        <CuboidCollider args={[0.1, 0.1, 0.1]} />
      </RigidBody>
    </>
  );
};

useGLTF.preload(pet);

export default Pet;
