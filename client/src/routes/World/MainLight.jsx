import React from 'react';
import { useRecoilState } from 'recoil';
import { ambientState } from '../../Atom';

const MainLight = () => {
  const [ambient, setAmbient] = useRecoilState(ambientState);
  return (
    <>
      <ambientLight
        intensity={ambient ? 0.5 : 0.05}
        color={'#c8cce7'}
        penumbra={2}
      />
      <pointLight
        intensity={ambient ? 0.5 : 0.05}
        position={[0, 10, 0]}
        shadow={0.1}
      />
    </>
  );
};

export default MainLight;
