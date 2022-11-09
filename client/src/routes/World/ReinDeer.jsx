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
  reindeerRed: [-1.057051181793213, 0.1891165792942047, 8.159258842468262],
  reindeerOrange: [0.625369131565094, 0.2155776143074036, -1.4708287715911865],
  reindeerYellow: [-18.077816009521484, 0.0630310499668122, 10.820121765136719],
  reindeerGreen: [15.034184455871582, 2.4461227416992187, 0.8214784860610962],
  reindeerBlue: [10.7400541305542, 0, 12.818519592285156],
  reindeerPurple: [-5.882803821563721, 1.3245592832565307, -6.936524868011475],
  reindeerWhite: [-5.882803821563721, 1.3245592832565307, -6.936524868011475],
  reindeerPink: [-7.679970741271973, 1.521248912811279, 26.733945846557617],
};

const DeerLotation = {
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
  nodes.Scene.children[0].scale.set(0.16, 0.16, 0.16);
  const [x, y, z] = DeerLotation[props.type];
  nodes.Scene.rotation.set(x, y, z);
  const location = DeerLocation[props.type];
  const location2 = [
    DeerLocation[props.type][0],
    DeerLocation[props.type][1] + 1.6,
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
            scale={[0.45, 0.45, 0.45]}
          />
        ) : null}
      </RigidBody>
    </>
  );
};

export default ReinDeer;
