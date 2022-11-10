import React, { useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import boneFire from '../../assets/boneFire.glb';
import { RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import * as THREE from 'three';

const BoneFire = (props) => {
  const gltf = useLoader(GLTFLoader, boneFire);
  gltf.scene.rotation.set(0, 0.37 * Math.PI, 0);
  const light = useRef();
  const light2 = useRef();
  const vec = new THREE.Vector3();
  const viewport = useThree((state) => state.viewport);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    if (clicked) {
      props.setAmbient();
      setClick(!clicked);
      light.current.visible = !light.current.visible;
      light2.current.visible = !light2.current.visible;
    }
  }, [clicked]);

  useEffect(() => {
    light.current.target.position.set(
      -6.012689590454102,
      0.4022400856018066,
      1.0203404426574707,
    );
    light2.current.target.position.set(
      -6.012689590454102,
      0.4022400856018066,
      1.0203404426574707,
    );
    light.current.visible = !light.current.visible;
    light2.current.visible = !light2.current.visible;
    console.log(light.current);
  }, []);

  // useFrame((state) => {
  //   light2.current.target.position.lerp(
  //     vec.set(
  //       (state.mouse.x * viewport.width) / 2,
  //       (state.mouse.y * viewport.height) / 2,
  //       0,
  //     ),
  //     0.1,
  //   );
  //   light2.current.target.updateMatrixWorld();
  //   light.current.target.position.lerp(
  //     vec.set(
  //       (state.mouse.x * viewport.width) / 2,
  //       (state.mouse.y * viewport.height) / 2,
  //       0,
  //     ),
  //     0.1,
  //   );
  //   light.current.target.updateMatrixWorld();
  // });

  return (
    <>
      <SpotLight
        ref={light}
        position={[-4.012689590454102, 2.4022400856018066, 1.0203404426574707]}
        distance={5}
        angle={0.55}
        attenuation={3}
        anglePower={5}
        color={'hotpink'}
      />
      <SpotLight
        ref={light2}
        position={[-8.012689590454102, 2.4022400856018066, 2.6203404426574707]}
        distance={5}
        angle={0.55}
        attenuation={3}
        anglePower={5}
        color={'skyblue'}
      />
      <RigidBody type="fixed" colliders={'hull'}>
        <primitive
          object={gltf.scene}
          scale={[0.7, 0.7, 0.7]}
          onClick={() => setClick(!clicked)}
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
