import React, { useEffect, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useAnimations } from '@react-three/drei';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { useSetRecoilState } from 'recoil';
import { modalState, npcHoverState } from '../../../Atom';
import {
  NpcLocation,
  NpcRotation,
  NpcModel,
  NpcAnimation,
} from '../../../utils/constants/constants';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useThree } from '@react-three/fiber';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const Npc = (props) => {
  const { scene, gl } = useThree();
  const group = useRef();
  const { nodes, animations } = useLoader(
    GLTFLoader,
    NpcModel[props.type],
    (loader) => {
      const ktxLoader = new KTX2Loader();
      ktxLoader
        .setTranscoderPath(
          `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`,
        )
        .detectSupport(gl);
      loader.setMeshoptDecoder(MeshoptDecoder);
      loader.setKTX2Loader(ktxLoader);
      ktxLoader.dispose();
    },
  );
  const { actions } = useAnimations(animations, group);
  const [x, y, z] = NpcRotation[props.type];
  nodes.Scene.rotation.set(x, y, z);
  nodes.Scene.scale.set(0.65, 0.65, 0.65);
  const location1 = NpcLocation[props.type];
  const location2 = [location1[0], location1[1] + 0.4, location1[2]];
  const setHover = useSetRecoilState(npcHoverState);
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    actions[NpcAnimation[props.type]].play().setEffectiveTimeScale(1.3);
  }, []);

  return (
    <>
      <primitive ref={group} object={nodes.Scene} position={location1} />
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={location2}
          onClick={() => setModal(props.type)}
          onPointerOver={() => setHover(props.type)}
          onPointerOut={() => setHover(null)}>
          <cylinderGeometry args={[0.3, 0.3, 0.9, 10]} />
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

export default Npc;
