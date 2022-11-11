import React, { useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import boneFire from '../../assets/boneFire.glb';
import { RigidBody } from '@react-three/rapier';
import { useRecoilState } from 'recoil';
import { ambientState } from '../../Atom';
import { useEffect } from 'react';
import * as THREE from 'three';

const BoneFire = () => {
  const gltf = useLoader(GLTFLoader, boneFire);
  gltf.scene.rotation.set(0, 0.37 * Math.PI, 0);
  const [ambient, setAmbient] = useRecoilState(ambientState);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const click = () => {
    setAmbient(!ambient);
  };

  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <primitive
          object={gltf.scene}
          scale={[0.7, 0.7, 0.7]}
          onClick={() => click()}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          position={[
            -6.012689590454102, 0.4022400856018066, 1.0203404426574707,
          ]}
        />
      </RigidBody>
    </>
  );
};

export default BoneFire;
