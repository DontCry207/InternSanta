import React, { useEffect, useRef, useState } from 'react';
import infoGuy from '../../../assets/npc/infoGuy.glb';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import speech from '../../../assets/speech.glb';

const InfoGuy = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(infoGuy);
  const { actions } = useAnimations(animations, group);
  nodes.Scene.rotation.set(0, 4 * Math.PI, 0);
  nodes.Scene.scale.set(0.6, 0.6, 0.6);
  const location1 = [-15.301273727416992, 0.2, 19.988668060302734];
  const location2 = [-15.301273727416992, 1.2, 19.988668060302734];
  const location3 = [-15.301273727416992, 0.6, 19.988668060302734];
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  const buble = useLoader(GLTFLoader, speech);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    if (clicked) {
      props.setModal('infoGuy');
      setClick(!clicked);
    }
  }, [clicked]);

  const { camera } = useThree();

  useEffect(() => {
    actions['Idle'].play().setEffectiveTimeScale(1.3);
  }, []);

  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <primitive ref={group} object={nodes.Scene} position={location1} />
        <CuboidCollider args={[0.3, 0.3, 0.3]} />
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

useGLTF.preload(infoGuy);

export default InfoGuy;
