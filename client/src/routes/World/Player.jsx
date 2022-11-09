import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import character from '../../assets/character.glb';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import {
  OrbitControls,
  MapControls,
} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';
extend({ OrbitControls, MapControls });

const Player = (props) => {
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
  const [location, setLocation] = useState([10, 10, 10]);
  const [location2, setLocation2] = useState([10, 10, 10]);
  const [maxPolarAngle, setMaxPolarAngle] = useState(1.8);
  const controls = useRef();

  useEffect(() => {
    controls.current.enableRotate = true;
    controls.current.rotateSpeed = 0.5;
  }, []);

  useEffect(() => {
    if (!props.loading) {
      controls.current.minAzimuthAngle = 0;
      controls.current.maxAzimuthAngle = Infinity;
    }
  }, [props]);

  const group = useRef();
  const { nodes, materials, animations } = useGLTF(character);
  const { actions } = useAnimations(animations, group);
  nodes.Scene.rotation.copy(camera.rotation);
  nodes.Scene.name = 'player';

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();
    const velocity = ref.current.linvel();
    // update camera
    const [x, y, z] = [...ref.current.translation()];
    setLocation([x, y + 0.4, z]);
    setLocation2([x, y - 0.3, z]);

    if (forward || backward || left || right) {
      actions.Idle.stop();
      actions.Run.play().setEffectiveTimeScale(1.3);
      if (maxPolarAngle < 2.45) {
        setMaxPolarAngle(maxPolarAngle + 0.1);
      }
    } else {
      actions.Run.stop();
      actions.Idle.play().setEffectiveTimeScale(2);
      setMaxPolarAngle(1.7);
    }

    if (forward && left) {
      nodes.Scene.rotateY(-(3 * Math.PI) / 4);
    } else if (backward && left) {
      nodes.Scene.rotateY(-Math.PI / 4);
    } else if (left) {
      nodes.Scene.rotateY(-Math.PI / 2);
    } else if (forward && right) {
      nodes.Scene.rotateY((3 * Math.PI) / 4);
    } else if (backward && right) {
      nodes.Scene.rotateY(Math.PI / 4);
    } else if (right) {
      nodes.Scene.rotateY(Math.PI / 2);
    } else if (backward) {
      nodes.Scene.rotateY(2 * Math.PI);
    } else {
      nodes.Scene.rotateY(Math.PI);
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
        minAzimuthAngle={-Math.PI * 0.25}
        maxAzimuthAngle={-Math.PI * 0.25}
        maxPolarAngle={Math.PI / maxPolarAngle}
        minPolarAngle={Math.PI / 2.45}
        enableRotate={false}
        enablePan={false}
      />
      <primitive
        ref={group}
        object={nodes.Scene}
        position={location2}
        scale={(0.55, 0.55, 0.55)}
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

useGLTF.preload(character);

export default Player;
