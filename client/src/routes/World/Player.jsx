import { useRef, useState } from 'react';
import { useLoader, useThree, useFrame, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ilbuni from '../../assets/ilbuni.glb';
import { RigidBody, BallCollider } from '@react-three/rapier';
import {
  OrbitControls,
  MapControls,
} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useKeyboardControls } from '@react-three/drei';
extend({ OrbitControls, MapControls });

const Player = () => {
  const gltf = useLoader(GLTFLoader, ilbuni);
  gltf.scene.scale.set(0.5, 0.5, 0.5);
  const SPEED = 5;
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const ref = useRef();
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const [, get] = useKeyboardControls();
  const [location, setLocation] = useState([0, 2, 2]);
  const controls = useRef();

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();
    const velocity = ref.current.linvel();
    // update camera
    const [x, y, z] = [...ref.current.translation()];
    setLocation([x, y + 0.8, z]);
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
      <mapControls
        ref={controls}
        args={[camera, domElement]}
        target={location}
        minDistance={2}
        maxDistance={2}
        maxPolarAngle={Math.PI / 2.7}
        minPolarAngle={Math.PI / 2.7}
      />
      <RigidBody
        ref={ref}
        type="dynamic"
        colliders={false}
        position={[0, 3, 0]}>
        <primitive object={gltf.scene} />
        <BallCollider args={[0.3, 0.3]} />
      </RigidBody>
    </>
  );
};

export default Player;
