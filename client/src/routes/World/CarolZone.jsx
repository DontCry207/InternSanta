import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import room from '../../assets/room.glb';
import television from '../../assets/television.glb';
import fireplace from '../../assets/fireplace.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const CarolZone = (props) => {
  const roomGltf = useLoader(GLTFLoader, room);
  const televisionGltf = useLoader(GLTFLoader, television);
  const fireplaceGltf = useLoader(GLTFLoader, fireplace);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  const location = [-1.5, 0, -1.2];
  const [televisionScale, setTelevisionScale] = useState([0.8, 0.8, 0.8]);
  const scale = [0.8, 0.8, 0.8];

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  roomGltf.scene.rotation.y = 1.9;
  televisionGltf.scene.rotation.y = 1.9;
  fireplaceGltf.scene.rotation.y = 1.9;

  roomGltf.scene.children[1].intensity = 0.0;
  roomGltf.scene.children[2].intensity = 0.6;
  roomGltf.scene.children[1].castShadow = false;
  roomGltf.scene.children[2].castShadow = false;

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    setTelevisionScale(hovered ? [0.803, 0.803, 0.803] : [0.8, 0.8, 0.8]);
  }, [hovered]);

  useEffect(() => {
    if (clicked) {
      props.setMovieModal();
      setClick(!clicked);
    }
  }, [clicked]);

  return (
    <>
      <RigidBody type="fixed" colliders={'trimesh'}>
        <primitive object={roomGltf.scene} position={location} scale={scale} />
      </RigidBody>
      <RigidBody type="fixed" colliders={'trimesh'}>
        <primitive
          object={televisionGltf.scene}
          position={location}
          scale={televisionScale}
          onClick={(event) => setClick(!clicked)}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders={'trimesh'}>
        <primitive
          object={fireplaceGltf.scene}
          position={location}
          scale={scale}
        />
      </RigidBody>
    </>
  );
};

export default CarolZone;
