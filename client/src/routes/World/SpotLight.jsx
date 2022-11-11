import React, { useEffect, useRef } from 'react';
import { SpotLight } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import { ambientState } from '../../Atom';

const DanceLight = () => {
  const [ambient, setAmbient] = useRecoilState(ambientState);
  const light = useRef();
  const light2 = useRef();
  const light3 = useRef();

  useEffect(() => {
    light.current.target.position.set(-6.87, 0.66, 0.59);
    light2.current.target.position.set(-5.05, 0.78, -0.62);
    light3.current.target.position.set(-6.0126, 0.80224, 1.0203);
  }, []);

  return (
    <>
      <SpotLight
        ref={light}
        position={[-4.01268, 2.40224, 1.0203]}
        distance={5}
        angle={0.55}
        attenuation={ambient ? 0 : 3}
        intensity={ambient ? 0 : 2}
        color={'hotpink'}
      />
      <SpotLight
        ref={light2}
        position={[-8.01268, 2.40224, 2.62034]}
        distance={5}
        angle={0.55}
        attenuation={ambient ? 0 : 3}
        intensity={ambient ? 0 : 2}
        color={'skyblue'}
      />
      <SpotLight
        ref={light3}
        position={[-5.400948524475098, 2.3356146812438965, 3.872922658920288]}
        distance={4}
        angle={0.55}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 1}
        color={'green'}
      />
    </>
  );
};

export default DanceLight;
