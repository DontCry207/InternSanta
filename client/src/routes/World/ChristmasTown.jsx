import React from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import Town from '../../assets/ChristmasTown.glb';
import { PointLight } from 'three';
import { useEffect } from 'react';
import * as THREE from 'three';

const ChristmasTown = () => {
  const gltf = useLoader(GLTFLoader, Town);
  gltf.scene.scale.set(9, 9, 9);

  const { camera, gl, scene } = useThree();

  let tree = gltf.scene.children.find((ele) => {
    if (ele.name === 'Tree') return true;
  });
  let red = tree.children.find((ele) => {
    if (ele.name === 'Cylinder001_2') return true;
  });
  let blue = tree.children.find((ele) => {
    if (ele.name === 'Cylinder001_3') return true;
  });
  let yellow = tree.children.find((ele) => {
    if (ele.name === 'Cylinder001_4') return true;
  });

  useEffect(() => {
    console.log(gl);
    gl.outputEncoding = THREE.sRGBEncoding;
    console.log(red, blue, yellow);
  }, []);

  return (
    <>
      <RigidBody type="fixed" colliders={'trimesh'}>
        <primitive object={gltf.scene} />
      </RigidBody>
    </>
  );
};

export default ChristmasTown;
