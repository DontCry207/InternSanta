import React, { useEffect } from 'react';
import MainCharacter from '../../assets/MainCharacter.glb';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';

const Npc2 = (props) => {
  const gltf = useLoader(GLTFLoader, MainCharacter);
  gltf.scene.scale.set(0.8, 0.8, 0.8);

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  useEffect(() => {
    gltf.scene.rotateY((3 * Math.PI) / 4);
  }, []);

  async function Npc2Touch() {
    props.setQuickDraw(true);
    // props.setMiniDraw(true);
  }

  return (
    <>
      <RigidBody>
        <primitive
          object={gltf.scene}
          position={[-10, 2, -3]}
          type="fixed"
          colliders={'trimesh'}
          onClick={() => Npc2Touch()}
        />
      </RigidBody>
    </>
  );
};

export default Npc2;
