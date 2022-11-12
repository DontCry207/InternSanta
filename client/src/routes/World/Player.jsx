import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import character from '../../assets/character.glb';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import {
  OrbitControls,
  MapControls,
} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import {
  useKeyboardControls,
  useGLTF,
  useAnimations,
  SpotLight,
} from '@react-three/drei';
import { useRecoilState } from 'recoil';
import { loadingState } from '../../Atom';
import Pet from './Pet';
extend({ OrbitControls, MapControls });

const Player = () => {
  const [SPEED, setSpeed] = useState(4);
  const [loading, setLoading] = useRecoilState(loadingState);
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const ref = useRef();
  const controls = useRef();
  const group = useRef();
  const light = useRef();

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  const [, get] = useKeyboardControls();
  const [location, setLocation] = useState([-15.7, 3, 21.4]); // 캐롤존 [-2.52, -98, 0.17]
  const [maxPolarAngle, setMaxPolarAngle] = useState(1.8);
  const { nodes, materials, animations } = useGLTF(character);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    controls.current.enableRotate = true;
    controls.current.rotateSpeed = 0.4;
  }, []);

  useEffect(() => {
    if (!loading) {
      controls.current.minAzimuthAngle = 0;
      controls.current.maxAzimuthAngle = Infinity;
    }
  }, [loading]);

  useFrame((state, delta) => {
    const { forward, backward, left, right, dash, position, dance } = get();
    const velocity = ref.current.linvel();
    // update camera
    const [x, y, z] = [...ref.current.translation()];
    setLocation([x, y + 0.4, z]);

    if (position) {
      console.log([x, y, z]);
    }

    if (dance) {
      actions.Idle.stop();
      actions['Song Jump'].play().setEffectiveTimeScale(1.3);
    } else {
      actions['Song Jump'].stop();
      actions.Idle.play().setEffectiveTimeScale(2);
    }

    nodes.Scene.rotation.copy(camera.rotation);
    if (forward || backward || left || right) {
      actions.Idle.stop();
      if (dash) {
        setSpeed(8);
        actions.Run.play().setEffectiveTimeScale(2.6);
      } else {
        setSpeed(4);
        actions.Run.play().setEffectiveTimeScale(1.3);
      }
      if (maxPolarAngle < 2.45) {
        setMaxPolarAngle(maxPolarAngle + 0.1);
      }
    } else {
      actions.Run.stop();
      actions.Idle.play().setEffectiveTimeScale(2);
      setMaxPolarAngle(1.7);
    }

    if (forward && left) {
      nodes.Scene.rotateY(Math.PI * 0.25);
    } else if (backward && left) {
      nodes.Scene.rotateY(Math.PI * 0.75);
    } else if (left) {
      nodes.Scene.rotateY(Math.PI * 0.5);
    } else if (forward && right) {
      nodes.Scene.rotateY(-Math.PI * 0.25);
    } else if (backward && right) {
      nodes.Scene.rotateY(-Math.PI * 0.75);
    } else if (right) {
      nodes.Scene.rotateY(-Math.PI * 0.5);
    } else if (backward) {
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
        receiveShadow
        position={[location[0], location[1] - 0.7, location[2]]}
        scale={(0.55, 0.55, 0.55)}
      />
      <RigidBody
        ref={ref}
        mass={1}
        type="dynamic"
        colliders={false}
        position={[-15.7, 3, 21.4]}>
        <CuboidCollider args={[0.3, 0.3, 0.3]} />
      </RigidBody>
      <Pet location={location} />
    </>
  );
};

export default Player;
