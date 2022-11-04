import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import ilbuni from '../../assets/ilbuni.glb';
import MainCharacter from '../../assets/MainCharacter.glb';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import {
  OrbitControls,
  MapControls,
} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';
extend({ OrbitControls, MapControls });

const Player = () => {
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
  const [location2, setLocation2] = useState([10, 10, -2]);
  const controls = useRef();

  const group = useRef();
  const { nodes, materials, animations } = useGLTF(ilbuni);
  const { actions } = useAnimations(animations, group);
  nodes.Armature.rotation.copy(camera.rotation);

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();
    const velocity = ref.current.linvel();
    // update camera
    const [x, y, z] = [...ref.current.translation()];
    setLocation([x, y + 0.6, z]);
    setLocation2([x, y - 0.1, z]);

    if (forward || backward || left || right) {
      actions.default.stop();
      actions.walk.play().setEffectiveTimeScale(1.3);
    } else {
      actions.walk.stop();
      actions.default.play();
    }

    nodes.Armature.rotateY(Math.PI);
    if (forward && left) {
      nodes.Armature.rotateY(Math.PI / 4);
    } else if (backward && left) {
      nodes.Armature.rotateY((3 * Math.PI) / 4);
    } else if (left) {
      nodes.Armature.rotateY(Math.PI / 2);
    } else if (forward && right) {
      nodes.Armature.rotateY(-Math.PI / 4);
    } else if (backward && right) {
      nodes.Armature.rotateY((-3 * Math.PI) / 4);
    } else if (right) {
      nodes.Armature.rotateY(-Math.PI / 2);
    } else if (backward) {
      nodes.Armature.rotateY(Math.PI);
    }
    controls.current.update();
    // movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
  });

  return (
    <>
      <orbitControls
        ref={controls}
        makeDefaults
        args={[camera, domElement]}
        target={location}
        minDistance={1.6}
        maxDistance={1.6}
        maxPolarAngle={Math.PI / 2.6}
        minPolarAngle={Math.PI / 2.6}
        enableRotate={false}
        enablePan={false}
      />
      <primitive
        ref={group}
        object={nodes.Armature}
        position={location2}
        scale={(0.2, 0.2, 0.2)}
      />
      <RigidBody
        ref={ref}
        mass={1}
        type="dynamic"
        colliders={false}
        position={[0, 2, 0]}>
        <CuboidCollider args={[0.3, 0.3, 0.3]} />
      </RigidBody>
    </>
  );
};

useGLTF.preload(ilbuni);

export default Player;
