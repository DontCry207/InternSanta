import React, { useEffect, useRef, useState } from 'react';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import infoGuy from '../../assets/npc/infoGuy.glb';
import storeGuy from '../../assets/npc/storeGuy.glb';
import trainGuy from '../../assets/npc/trainGuy.glb';
import yellowGuy from '../../assets/npc/yellowGuy.glb';
import greenGuy from '../../assets/npc/greenGuy.glb';
import minSeo from '../../assets/npc/minSeo.glb';
import yb from '../../assets/npc/yb.glb';
import speech from '../../assets/speech.glb';
import { useRecoilState } from 'recoil';
import { modalState } from '../../Atom';

const NpcLocation = {
  infoGuy: [-14.68914, 0.28, 19.2158622],
  storeGuy: [-12.437863349, 0.55, 4.4225573539],
  trainGuy: [-21.2908630375, 0.28, 3.7027873992],
  yellowGuy: [-6.591402912139893, 0.4, 0.029304206371307373],
  greenGuy: [-5.367114543914795, 0.4, -0.16970063745975494],
  minSeo: [-7.36607027053833, 0.4, 0.8801453709602356],
  yb: [-4.543894290924072, 0.3, 0.4514186978340149],
};
const NpcRotation = {
  infoGuy: [0, 4 * Math.PI, 0],
  storeGuy: [0, 0.4 * Math.PI, 0],
  trainGuy: [0, 0.4 * Math.PI, 0],
  yellowGuy: [0, 0.25 * Math.PI, 0],
  greenGuy: [0, -0.1 * Math.PI, 0],
  minSeo: [0, 0.4 * Math.PI, 0],
  yb: [0, -0.3 * Math.PI, 0],
};
const NpcModel = {
  infoGuy: infoGuy,
  storeGuy: storeGuy,
  trainGuy: trainGuy,
  yellowGuy: yellowGuy,
  greenGuy: greenGuy,
  minSeo: minSeo,
  yb: yb,
};

const NpcAnimation = {
  infoGuy: 'Idle',
  storeGuy: 'Idle',
  trainGuy: 'Idle',
  yellowGuy: 'Song Jump',
  greenGuy: 'Song Jump',
  minSeo: 'Song Jump',
  yb: 'Song Jump',
};

const Npc = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(NpcModel[props.type]);
  const { actions } = useAnimations(animations, group);
  const [x, y, z] = NpcRotation[props.type];
  nodes.Scene.rotation.set(x, y, z);
  nodes.Scene.scale.set(0.65, 0.65, 0.65);
  const location1 = NpcLocation[props.type];
  const location2 = [location1[0], location1[1] + 1.1, location1[2]];
  const location3 = [location1[0], location1[1] + 0.4, location1[2]];
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const buble = useLoader(GLTFLoader, speech);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    if (clicked) {
      setModal(props.type);
      setClick(!clicked);
    }
  }, [clicked]);

  const { camera } = useThree();

  useEffect(() => {
    actions[NpcAnimation[props.type]].play().setEffectiveTimeScale(1.3);
  }, []);

  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <primitive ref={group} object={nodes.Scene} position={location1} />
      </RigidBody>
      <mesh
        position={location3}
        onClick={() => setClick(!clicked)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial
          color={(0, 0, 0, 0)}
          opacity={0}
          transparent={true}
        />
      </mesh>
      {hovered ? (
        <primitive
          object={buble.scene}
          position={location2}
          rotation={camera.rotation}
          scale={[0.43, 0.43, 0.43]}
        />
      ) : null}
    </>
  );
};

export default Npc;
