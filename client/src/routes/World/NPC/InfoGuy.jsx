import React, { useEffect, useRef, useState } from 'react';
import infoGuy from '../../../assets/npc/infoGuy.glb';
import { RigidBody } from '@react-three/rapier';
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
  const location2 = [-15.301273727416992, 1.6, 19.988668060302734];
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  const buble = useLoader(GLTFLoader, speech);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    if (clicked) {
      props.setModal();
      setClick(!clicked);
    }
  }, [clicked]);

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  useEffect(() => {
    actions['Idle'].play().setEffectiveTimeScale(1.3);
  }, []);

  return (
    <RigidBody type="fixed" colliders={false}>
      <primitive
        ref={group}
        object={nodes.Scene}
        position={location1}
        onClick={(event) => setClick(!clicked)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      />
      {hovered ? (
        <primitive
          object={buble.scene}
          position={location2}
          rotation={camera.rotation}
          scale={[0.43, 0.43, 0.43]}
        />
      ) : null}
    </RigidBody>
  );
};

useGLTF.preload(infoGuy);

export default InfoGuy;
