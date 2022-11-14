import React, { useEffect } from 'react';
import newCharacter from '../../assets/newCharacter.glb';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';

const Npc3 = (props) => {
  const gltf = useLoader(GLTFLoader, newCharacter);
  gltf.scene.scale.set(0.8, 0.8, 0.8);

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  useEffect(() => {
    gltf.scene.rotateY((3 * Math.PI) / 4);
  }, []);

  async function touch() {
    props.setAnimalPet(true);
  }

  return (
    <>
      <RigidBody>
        <primitive
          object={gltf.scene}
          position={[-8, 2, -3]}
          type="fixed"
          colliders={'trimesh'}
          onClick={() => touch()}
        />
      </RigidBody>
    </>
  );
};

export default Npc3;
