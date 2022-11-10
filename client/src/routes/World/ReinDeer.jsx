import React, { useEffect, useRef, useState } from 'react';
import reindeer from '../../assets/reindeer/reindeer.glb';
import reindeerRed from '../../assets/reindeer/reindeerRed.glb';
import reindeerOrange from '../../assets/reindeer/reindeerOrange.glb';
import reindeerYellow from '../../assets/reindeer/reindeerYellow.glb';
import reindeerGreen from '../../assets/reindeer/reindeerGreen.glb';
import reindeerBlue from '../../assets/reindeer/reindeerBlue.glb';
import reindeerPurple from '../../assets/reindeer/reindeerPurple.glb';
import reindeerWhite from '../../assets/reindeer/reindeerWhite.glb';
import reindeerPink from '../../assets/reindeer/reindeerPink.glb';
import speech from '../../assets/speech.glb';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';

const DeerLocation = {
  reindeer: [-2.722, 0.1, 19.57],
  reindeerRed: [-1.0570511817, 0.18911657929, 8.15925],
  reindeerOrange: [0.6253691315, 0.21557761430, -1.4708287715],
  reindeerYellow: [-18.0778160095, 0.06303104996, 10.8201217651],
  reindeerGreen: [15.0341844558, 2.44612274169, 0.82147848606],
  reindeerBlue: [10.74005413, 0, 12.8185195922],
  reindeerPurple: [-5.8828038215, 1.32455928325, -6.9365248680],
  reindeerWhite: [-5.8828038215, 1.32455928325, -6.9365248680],
  reindeerPink: [-7.6799707412, 1.5212489128, 26.7339458465],
};

const DeerRotation = {
  reindeer: [0, 0.9 * Math.PI, 0],
  reindeerRed: [0, 1.2 * Math.PI, 0],
  reindeerOrange: [0, 1.85 * Math.PI, 0],
  reindeerYellow: [0, 0.5 * Math.PI, 0],
  reindeerGreen: [0, 1.35 * Math.PI, 0],
  reindeerBlue: [0, 1.35 * Math.PI, 0],
  reindeerPurple: [0, 2.05 * Math.PI, 0],
  reindeerWhite: [0, 2.05 * Math.PI, 0],
  reindeerPink: [0, 0.66 * Math.PI, 0],
};

const DeerModel = {
  reindeer: reindeer,
  reindeerRed: reindeerRed,
  reindeerOrange: reindeerOrange,
  reindeerYellow: reindeerYellow,
  reindeerGreen: reindeerGreen,
  reindeerBlue: reindeerBlue,
  reindeerPurple: reindeerPurple,
  reindeerWhite: reindeerWhite,
  reindeerPink: reindeerPink,
};

const ReinDeer = (props) => {
  const { nodes } = useGLTF(DeerModel[props.type]);
  nodes.Scene.children[0].scale.set(0.14, 0.14, 0.14);
  const [x, y, z] = DeerRotation[props.type];
  nodes.Scene.rotation.set(x, y, z);
  const location = DeerLocation[props.type];
  const location2 = [
    DeerLocation[props.type][0],
    DeerLocation[props.type][1] + 1.9,
    DeerLocation[props.type][2],
  ];
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  const ref = useRef();

  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();

  const buble = useLoader(GLTFLoader, speech);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    if (clicked) {
      props.setModal(props.type);
      setClick(!clicked);
    }
  }, [clicked]);

  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <primitive
          ref={ref}
          object={nodes.Scene}
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
            scale={[0.55, 0.55, 0.55]}
          />
        ) : null}
      </RigidBody>
    </>
  );
};

export default ReinDeer;
