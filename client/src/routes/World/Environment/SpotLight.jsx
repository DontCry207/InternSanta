import React, { useEffect, useRef } from 'react';
import { SpotLight } from '@react-three/drei';
import { useRecoilValue } from 'recoil';
import { ambientState } from '../../../Atom';

const DanceLight = () => {
  const ambient = useRecoilValue(ambientState);
  const light = useRef();
  const light2 = useRef();
  const light3 = useRef();
  const light4 = useRef();
  const light5 = useRef();
  const light6 = useRef();
  const light7 = useRef();
  const light8 = useRef();
  const light9 = useRef();
  const light10 = useRef();

  useEffect(() => {
    light.current.target.position.set(-7.47, 0.6, 0.99);
    light2.current.target.position.set(-5.25, 0.4, -0.62);
    light3.current.target.position.set(-6.126, 0.6, 0.7203);
    light4.current.target.position.set(3.252, 2.489, 8.31);
    light5.current.target.position.set(-0.184, 2.489, 12.0468);
    light6.current.target.position.set(0.8563, 2.4901, 8.619);
    light7.current.target.position.set(-0.75, 2.48, 9.24);
    light8.current.target.position.set(13.137, 9.85, -3.09);
    light9.current.target.position.set(-3.17, 4.808, 20.6039);
    light10.current.target.position.set(92, 66, 22);
  }, []);

  return (
    <>
      <SpotLight
        ref={light}
        position={[-6.6249921798706055, 2.5, 3.109746074676514]}
        distance={5}
        angle={0.55}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 1}
        color={'hotpink'}
      />
      <SpotLight
        ref={light2}
        position={[-4.0580058097839355, 2.5, 2.124199390411377]}
        distance={5}
        angle={0.55}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 1}
        color={'#8DAB1D'}
      />
      <SpotLight
        ref={light3}
        position={[-5.295711898803711, 2.5, 2.49038553237915]}
        distance={5}
        angle={0.55}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 1}
        color={'#28A4C6'}
      />
      <SpotLight
        ref={light4}
        position={[3.71, 0.2, 4.8778]}
        distance={9}
        angle={0.75}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 2}
        color={'orange'}
      />
      <SpotLight
        ref={light5}
        position={[-3.5714, 0.2, 13.17]}
        distance={9}
        angle={0.75}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 2}
        color={'orange'}
      />
      <SpotLight
        ref={light6}
        position={[-1.127, 0.2, 4.082]}
        distance={9}
        angle={0.75}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 2}
        color={'orange'}
      />
      <SpotLight
        ref={light7}
        position={[-4.743, 0.2, 7.586]}
        distance={9}
        angle={0.75}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 2}
        color={'orange'}
      />
      <SpotLight
        ref={light8}
        position={[9.459, 2.548, 1.3302]}
        distance={10}
        angle={0.75}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 2}
        color={'orange'}
      />
      <SpotLight
        ref={light9}
        position={[-0.3594, 0.286, 15.094]}
        distance={12}
        angle={0.75}
        attenuation={ambient ? 0 : 2}
        intensity={ambient ? 0 : 2}
        color={'orange'}
      />
      <SpotLight
        ref={light10}
        position={[27.317, 7.46, 18.309]}
        distance={103}
        angle={0.4}
        attenuation={0}
        intensity={ambient ? 0 : 3}
        color={'white'}
      />
    </>
  );
};

export default DanceLight;
