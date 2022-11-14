import React, { useEffect, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { SpotLight, useGLTF } from '@react-three/drei';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { modalState, ambientState, npcHoverState } from '../../Atom';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import {
  NpcLocation,
  NpcRotation,
  NpcModel,
} from '../../utils/constants/constants';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useThree } from '@react-three/fiber';

const ReinDeer = (props) => {
  const { scene, gl } = useThree();
  const ktxLoader = new KTX2Loader();
  const { nodes, animations } = useLoader(
    GLTFLoader,
    NpcModel[props.type],
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        '/node_modules/three/examples/js/libs/draco/gltf/',
      );
      dracoLoader.setDecoderConfig({ type: 'js' });
      loader.setDRACOLoader(dracoLoader);

      ktxLoader
        .setTranscoderPath('/node_modules/three/examples/js/libs/basis/')
        .detectSupport(gl);
      loader.setKTX2Loader(ktxLoader);
      ktxLoader.dispose();
    },
  );
  nodes.Scene.children[0].scale.set(0.14, 0.14, 0.14);

  const [x, y, z] = NpcRotation[props.type];
  nodes.Scene.rotation.set(x, y, z);

  const location = NpcLocation[props.type];
  const location3 = [
    NpcLocation[props.type][0],
    NpcLocation[props.type][1] + 2.9,
    NpcLocation[props.type][2],
  ];

  const setHover = useSetRecoilState(npcHoverState);
  const setModal = useSetRecoilState(modalState);
  const ambient = useRecoilValue(ambientState);
  const ref = useRef();
  const light = useRef();

  // useEffect(() => {
  //   light.current.target.position.set(location[0], location[1], location[2]);
  // }, []);

  return (
    <>
      {/* <SpotLight
        ref={light}
        position={location3}
        distance={5}
        angle={0.35}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 2}
        color={'white'}
      /> */}
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
