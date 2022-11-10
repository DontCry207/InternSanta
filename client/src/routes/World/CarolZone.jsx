import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import room from '../../assets/room.glb';
import television from '../../assets/television.glb';
import fireplace from '../../assets/fireplace.glb';
import teddybear from '../../assets/teddybear.glb';
import tree from '../../assets/tree.glb';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const CarolZone = (props) => {
  const { camera, gl, scene } = useThree();
  const ktxLoader = new KTX2Loader();
  const roomGltf = useLoader(GLTFLoader, room, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      '../node_modules/three/examples/js/libs/draco/gltf/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath('../node_modules/three/examples/js/libs/basis/')
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
  });
  const televisionGltf = useLoader(GLTFLoader, television, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      '../node_modules/three/examples/js/libs/draco/gltf/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath('../node_modules/three/examples/js/libs/basis/')
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
  });
  const fireplaceGltf = useLoader(GLTFLoader, fireplace, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      '../node_modules/three/examples/js/libs/draco/gltf/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath('../node_modules/three/examples/js/libs/basis/')
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
  });
  const teddybearGltf = useLoader(GLTFLoader, teddybear, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      '../node_modules/three/examples/js/libs/draco/gltf/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath('../node_modules/three/examples/js/libs/basis/')
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
  });
  const treeGltf = useLoader(GLTFLoader, tree, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      '../node_modules/three/examples/js/libs/draco/gltf/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath('../node_modules/three/examples/js/libs/basis/')
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
  });
  const [hovered, setHover] = useState(false);
  const [tvClicked, setTvClick] = useState(false);
  const [fireClicked, setFireClick] = useState(false);
  const location = [0, -100, 0]; //[-15, 1, 21.4];
  const box1Location = [-1.9, -100, -1.85];
  const box2Location = [-0.55, -100, -1.05];
  const box3Location = [-0.1, -100, 0];
  const [televisionScale, setTelevisionScale] = useState([0.8, 0.8, 0.8]);
  const scale = [0.8, 0.8, 0.8];
  const fireLight = new THREE.PointLight(0xc06020, 2, 1.5);
  fireLight.position.set(-1.17, 0.3, -1.1);
  roomGltf.scene.add(fireLight);

  roomGltf.scene.rotation.y = -0.5;
  televisionGltf.scene.rotation.y = -0.5;
  fireplaceGltf.scene.rotation.y = -0.5;
  teddybearGltf.scene.rotation.y = -0.5;
  treeGltf.scene.rotation.y = -0.5;

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
      // setTelevisionScale(hovered ? [0.803, 0.803, 0.803] : [0.8, 0.8, 0.8]);
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [hovered]);

  useEffect(() => {
    if (tvClicked) {
      // props.setModal(true);
      props.movieModalOpen();
      setTvClick(!tvClicked);
    }
  }, [tvClicked]);

  useEffect(() => {
    if (fireClicked) {
      // props.setModal(true);
      props.fortuneModalOpen();
      setFireClick(!fireClicked);
    }
  }, [fireClicked]);

  return (
    <>
      <pointLight castShadow intensity={0.25} position={[-2, -98, 1]} />
      <RigidBody type="fixed" colliders={'trimesh'}>
        <primitive object={roomGltf.scene} position={location} scale={scale} />
      </RigidBody>
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={box1Location}
          rotation={[0, 1.05, 0]}
          onClick={() => setTvClick(!tvClicked)}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}>
          <boxGeometry args={[0.3, 1.7, 0.65]} />
          <meshStandardMaterial
            color={[0, 0, 0, 0]}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
      <primitive
        object={televisionGltf.scene}
        position={location}
        scale={televisionScale}
      />
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={box2Location}
          rotation={[0, 1.05, 0]}
          onClick={() => setFireClick(!fireClicked)}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}>
          <boxGeometry args={[0.2, 1.7, 1.4]} />
          <meshStandardMaterial
            color={[0, 0, 0, 0]}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
      <primitive
        object={fireplaceGltf.scene}
        position={location}
        scale={scale}
      />
      <RigidBody type="fixed" colliders={'hull'}>
        <primitive
          object={teddybearGltf.scene}
          position={location}
          scale={scale}
        />
      </RigidBody>

      <RigidBody type="fixed" colliders={'hull'}>
        <mesh position={box3Location} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.9, 2.8, 0.9]} />
          <meshStandardMaterial
            color={[0, 0, 0, 0]}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
      <primitive object={treeGltf.scene} position={location} scale={scale} />
    </>
  );
};

export default CarolZone;
