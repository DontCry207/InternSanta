import React, { useEffect, useRef, useState } from 'react';
import reindeerRed from '../../../assets/reindeer/reindeerRed.glb';
import speech from '../../../assets/speech.glb';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';

const ReinDeerRed = (props) => {
  const gltf = useLoader(GLTFLoader, reindeerRed);
  gltf.scene.children[0].scale.set(0.13, 0.13, 0.13);
  const location = [-0.4390983581542969, 0.1, 7.885971546173096];
  const location2 = [-0.8364703059196472, 1.6, 8.023627281188965];
  gltf.scene.rotation.set(0, (1.9 * Math.PI) / 2, 0);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  const ref = useRef();

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  const buble = useLoader(GLTFLoader, speech);

  useEffect(() => {}, []);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    if (clicked) {
      props.setModal();
      setClick(!clicked);
    }
  }, [clicked]);

  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <primitive
          ref={ref}
          object={gltf.scene}
          position={location}
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
    </>
  );
};

export default ReinDeerRed;
