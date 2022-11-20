import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useSetRecoilState } from 'recoil';
import { modalState, npcHoverState } from '../../../Atom';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import {
  NpcLocation,
  NpcRotation,
  NpcModel,
} from '../../../utils/constants/constants';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useThree } from '@react-three/fiber';

const ReinDeer = (props) => {
  const { gl } = useThree();
  const { nodes } = useLoader(GLTFLoader, NpcModel[props.type], (loader) => {
    const ktxLoader = new KTX2Loader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.5/',
    );
    dracoLoader.setDecoderConfig({ type: 'js' });
    ktxLoader
      .setTranscoderPath(
        `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`,
      )
      .detectSupport(gl);
    loader.setDRACOLoader(dracoLoader);
    loader.setKTX2Loader(ktxLoader);
    ktxLoader.dispose();
    dracoLoader.dispose();
  });
  nodes.Scene.children[0].scale.set(0.14, 0.14, 0.14);

  const [x, y, z] = NpcRotation[props.type];
  nodes.Scene.rotation.set(x, y, z);

  const ref = useRef();
  const location = NpcLocation[props.type];
  const setHover = useSetRecoilState(npcHoverState);
  const setModal = useSetRecoilState(modalState);

  return (
    <>
      <primitive ref={ref} object={nodes.Scene} position={location} />
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={location}
          onClick={() => setModal(props.type)}
          onPointerOver={() => setHover(props.type)}
          onPointerOut={() => setHover(null)}>
          <cylinderGeometry args={[0.5, 0.5, 2.4, 10]} />
          <meshStandardMaterial
            color={(0, 0, 0, 0)}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

export default ReinDeer;
