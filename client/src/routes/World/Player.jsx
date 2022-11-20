import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame, extend, useLoader } from '@react-three/fiber';
import character from '../../assets/character.glb';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import {
  OrbitControls,
  MapControls,
} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useKeyboardControls, useAnimations, useGLTF } from '@react-three/drei';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  gameModalState,
  loadingState,
  sponPositionState,
  userInfoState,
} from '../../Atom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
extend({ OrbitControls, MapControls });

const Player = () => {
  const userInfo = useRecoilValue(userInfoState);
  const gameModal = useRecoilValue(gameModalState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [sponPosition, setSponPosition] = useRecoilState(sponPositionState);
  const [top, setTop] = useState(null);
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const ref = useRef();
  const controls = useRef();
  const group = useRef();

  const {
    camera,
    gl: { domElement },
  } = useThree();

  const [, get] = useKeyboardControls();

  const { nodes, animations, materials } = useLoader(
    GLTFLoader,
    character,
    (loader) => {
      loader.setMeshoptDecoder(MeshoptDecoder);
    },
  );

  nodes.Scene.scale.setZ(-0.6);
  nodes.Scene.scale.setX(-0.6);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    controls.current.enableRotate = true;
    controls.current.rotateSpeed = 0.4;
    nodes.Scene.name = 'player';
  }, []);

  useEffect(() => {
    const textureInsert = (obj) => {
      if (materials.characters.map != obj) {
        materials.characters.map.copy(obj);
        materials.characters.map.encoding = THREE.sRGBEncoding;
        materials.characters.map.flipY = false;
        materials.characters.map.updateMatrix();
      }
    };
    if (userInfo.memberTop) {
      const texture = new THREE.TextureLoader().load(userInfo.memberTop);
      textureInsert(texture);
    }
  }, [userInfo.memberTop]);

  useEffect(() => {
    if (!loading) {
      controls.current.minAzimuthAngle = 0;
      controls.current.maxAzimuthAngle = Infinity;
    }
  }, [loading]);

  useFrame((state, delta) => {
    let SPEED = 4;
    const { forward, backward, left, right, dash, position, dance } = !gameModal
      ? get()
      : null;
    const velocity = ref.current.linvel();
    const [x, y, z] = [...ref.current.translation()];

    if (!dance) {
      nodes.Scene.rotation.copy(camera.rotation);
    }

    if (position) {
      console.log([x, y, z]);
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
        position={
          (sponPosition === 'start' && [-15.7, 3, 21.4]) ||
          (sponPosition === 'carolZoneIn' && [22.34, 2.3, -13.59]) ||
          (sponPosition === 'carolZoneFront' && [11.21, 3.6, -3.34])
        }>
        <CuboidCollider args={[0.3, 0.3, 0.3]} />
      </RigidBody>
    </>
  );
};

export default Player;
