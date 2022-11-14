import React from 'react';
import { useRecoilValue } from 'recoil';
import { ambientState } from '../../Atom';

const MainLight = () => {
  const ambient = useRecoilValue(ambientState);
  return (
    <>
      <ambientLight intensity={ambient ? 0.5 : 0.03} color={'#c8cce7'} />
      <pointLight
        className="worldMap"
        intensity={ambient ? 0.6 : 0.03}
        position={[-0.6, 30, 9.1]}
        distance={80}
        color={'white'}
      />
      <pointLight
        className="shop"
        intensity={ambient ? 0 : 1.2}
        position={[-11.26, 1.6, 4.91]}
        distance={2}
        decay={1}
        color={'#FFF7C2'}
      />
      <pointLight
        className="startLeft"
        intensity={ambient ? 0 : 1.8}
        position={[-20.5, 4, 15.75]}
        distance={7}
        decay={2}
        color={'#FFF7C2'}
      />
      <pointLight
        className="startRight"
        intensity={ambient ? 0 : 1.8}
        position={[-12.34, 4, 24.56]}
        distance={7}
        decay={2}
        color={'#FFF7C2'}
      />
      <pointLight
        className="entrance"
        intensity={ambient ? 0 : 1.8}
        position={[-9.65, 4, 12.69]}
        distance={7}
        decay={3}
        color={'#FFF7C2'}
      />
      <pointLight
        intensity={ambient ? 0 : 1.8}
        position={[-9.65, 3, 12.69]}
        distance={7}
        decay={2}
        color={'#FFF7C2'}
      />
      <pointLight
        intensity={ambient ? 0 : 1.8}
        position={[-3.76, 3.6, -5.76]}
        distance={7}
        decay={2}
        color={'#FFF7C2'}
      />
      <pointLight
        intensity={ambient ? 0 : 1.8}
        position={[-18.45, 3, 2.73]}
        distance={7}
        decay={2}
        color={'#FFF7C2'}
      />
    </>
  );
};

export default MainLight;
