import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRecoilState } from 'recoil';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import television from '../../assets/television.glb';
import tv from '../../assets/tv.glb';
import { RigidBody } from '@react-three/rapier';
import { movieModalState } from '../../Atom';
import * as THREE from 'three';

const Television = () => {
  const boxLocation = [21.56, 1.46, -14.94];
  const scale = [0.8, 0.8, 0.8];
  const location = [21.42, 1.3, -15];
  const [modal, setModal] = useRecoilState(movieModalState);
  const [hovered, setHover] = useState(false);
  const { gl } = useThree();

  const hover = (e) => {
    setHover(true);
  };

  const unhover = (e) => {
    setHover(false);
  };

  const click = (e) => {
    setModal(!modal);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const televisionGltf = useLoader(GLTFLoader, tv, (loader) => {
    const dracoLoader = new DRACOLoader();
    const ktxLoader = new KTX2Loader();
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.5/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    ktxLoader
      .setTranscoderPath(
        `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`,
      )
      .detectSupport(gl);
    loader.setKTX2Loader(ktxLoader);
    ktxLoader.dispose();
    dracoLoader.dispose();
  });

  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={boxLocation}
          rotation={[0, 1.57, 0]}
          onClick={(e) => click(e)}
          onPointerOver={(e) => hover(e)}
          onPointerOut={(e) => unhover(e)}>
          <boxGeometry args={[0.23, 0.35, 0.5]} />
          <meshStandardMaterial
            color={'#e0d381'}
            emissive={'#71e1d6'}
            emissiveIntensity={1}
          />
        </mesh>
      </RigidBody>
      <primitive
        object={televisionGltf.scene}
        position={location}
        scale={scale}
        rotation={[0, -1.57, 0]}
      />
    </>
  );
};

export default Television;
