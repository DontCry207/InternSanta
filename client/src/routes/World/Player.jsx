import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame, extend, useLoader } from '@react-three/fiber';
import character from '../../assets/character.glb';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import {
  OrbitControls,
  MapControls,
} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadingState, userInfoState } from '../../Atom';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
extend({ OrbitControls, MapControls });

const Player = () => {
  const userInfo = useRecoilValue(userInfoState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [sponPosition, setSponPosition] = useState(true);
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const ref = useRef();
  const controls = useRef();
  const group = useRef();
  let textureLoader = new THREE.TextureLoader();
  let texture = textureLoader.load(userInfo.memberTop);

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  const [, get] = useKeyboardControls();
  const { nodes, animations } = useLoader(GLTFLoader, character, (object) => {
    // object.Scene.Mesh017.material.map = texture;
    // object.Scene.Mesh017.material.needsUpdate = true;
  });
  const { actions } = useAnimations(animations, group);

  const debounce = (func, delay) => {
    let inDebounce;
    return function (...args) {
      if (inDebounce) {
        clearTimeout(inDebounce);
      }
      inDebounce = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    controls.current.enableRotate = true;
    controls.current.rotateSpeed = 0.4;
    nodes.Scene.name = 'player';
    console.log(nodes);
    console.log(texture);
  }, []);

  useEffect(() => {
    if (!loading) {
      controls.current.minAzimuthAngle = 0;
      controls.current.maxAzimuthAngle = Infinity;
    }
  }, [loading]);

  useFrame((state, delta) => {
    let SPEED = 4;
    const {
      forward,
      backward,
      left,
      right,
      dash,
      position,
      dance,
      carol,
      world,
    } = get();
    const velocity = ref.current.linvel();
    const [x, y, z] = [...ref.current.translation()];

    if (!dance) {
      nodes.Scene.rotation.copy(camera.rotation);
    }

    if (position) {
      console.log([x, y, z]);
    }

    if (carol) {
      debounce(setSponPosition(false), 1000);
    }

    if (world) {
      debounce(setSponPosition(true), 1000);
    }

    if (forward || backward || left || right) {
      actions.Idle.stop();
      if (dash) {
        SPEED = 6;
        actions.Run.play().setEffectiveTimeScale(2.6);
      } else {
        SPEED = 4;
        actions.Run.play().setEffectiveTimeScale(1.3);
      }
      if (controls.current.maxPolarAngle > Math.PI * 0.42) {
        controls.current.maxPolarAngle -= Math.PI * 0.02;
      } else {
        controls.current.maxPolarAngle = Math.PI * 0.42;
      }
    } else if (dance) {
      actions.Idle.stop();
      actions['Song Jump'].play().setEffectiveTimeScale(1.3);
    } else {
      actions.Run.stop();
      actions['Song Jump'].stop();
      actions.Idle.play().setEffectiveTimeScale(2);
      controls.current.maxPolarAngle = Math.PI * 0.65;
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

    // movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    group.current.position.set(x, y - 0.3, z);
    controls.current.target.set(x, y + 0.6, z);
    controls.current.update();
  });

  return (
    <>
      <orbitControls
        ref={controls}
        makeDefaults
        args={[camera, domElement]}
        minDistance={1.6}
        maxDistance={1.6}
        minAzimuthAngle={-Math.PI * 0.25}
        maxAzimuthAngle={-Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.42}
        minPolarAngle={Math.PI * 0.42}
        enableRotate={false}
        enablePan={false}
      />
      <primitive ref={group} object={nodes.Scene} scale={(0.6, 0.6, 0.6)} />
      <RigidBody
        ref={ref}
        mass={1}
        type="dynamic"
        colliders={false}
        position={sponPosition ? [-15.7, 3, 21.4] : [98.4, 3, 100.85]}>
        <CuboidCollider args={[0.3, 0.3, 0.3]} />
      </RigidBody>
    </>
  );
};

export default Player;
