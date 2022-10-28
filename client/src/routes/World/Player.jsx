import { useRef } from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ilbuni from '../../assets/ilbuni.glb';
import { RigidBody, BallCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useKeyboardControls } from '@react-three/drei';

const Player = () => {
  const gltf = useLoader(GLTFLoader, ilbuni);
  gltf.scene.scale.set(0.5, 0.5, 0.5);
  const SPEED = 5;
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();

  const ref = useRef();
  const { camera } = useThree();
  const [, get] = useKeyboardControls();
  useFrame((state) => {
    const { forward, backward, left, right } = get();
    const velocity = ref.current.linvel();
    // update camera
    const [x, y, z] = [...ref.current.translation()];
    camera.position.set(x, y + 1, z + 2);
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
    <RigidBody ref={ref} type="dynamic" colliders={false} position={[0, 3, 0]}>
      <primitive object={gltf.scene} />
      <BallCollider args={[0.3, 0.3]} />
    </RigidBody>
  );
};

export default Player;
