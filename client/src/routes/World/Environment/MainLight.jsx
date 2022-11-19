import React from 'react';
import { useRecoilValue } from 'recoil';
import { ambientState } from '../../../Atom';

const MainLight = () => {
  const ambient = useRecoilValue(ambientState);
  return (
    <>
      <ambientLight intensity={ambient ? 0.5 : 0.1} color={'#c8cce7'} />
      <pointLight
        className="worldMap"
        intensity={ambient ? 1 : 0.03}
        position={[-0.6, 10, 9.1]}
        distance={20}
        color={'white'}
      />
      <pointLight
        className="shop"
        intensity={ambient ? 0 : 1}
        position={[-11.26, 1.6, 4.91]}
        distance={3}
        decay={1.5}
        color={'#FFF7C2'}
      />
      <pointLight
        className="fire"
        intensity={1.2}
        distance={4}
        decay={1}
        position={[23, 1.4, -15]}
        color={'#e88b5d'}
      />
      {/*'최적화 문제로 조명 조절'*/}
      {/* <pointLight
        className="startLeft"
        intensity={ambient ? 0 : 1}
        position={[-20.5, 4, 15.75]}
        distance={5}
        decay={1}
        color={'#FFF7C2'}
      />
      <pointLight
        className="startRight"
        intensity={ambient ? 0 : 1}
        position={[-12.34, 4, 24.56]}
        distance={5}
        decay={1}
        color={'#FFF7C2'}
      />
      <pointLight
        className="entrance"
        intensity={ambient ? 0 : 1}
        position={[-9.65, 4, 12.69]}
        distance={4}
        decay={1}
        color={'#FFF7C2'}
      />
      <pointLight
        className="snowman"
        intensity={ambient ? 0 : 1}
        position={[-9.65, 3, 12.69]}
        distance={5}
        decay={1}
        color={'#FFF7C2'}
      />
      <pointLight
        className="reindeer"
        intensity={ambient ? 0 : 1}
        position={[-3.76, 3.6, -5.76]}
        distance={4}
        decay={1}
        color={'#FFF7C2'}
      />
      <pointLight
        className="train"
        intensity={ambient ? 0 : 1}
        position={[-18.45, 3, 2.73]}
        distance={4}
        decay={1}
        color={'#FFF7C2'}
      /> */}
    </>
  );
};

export default MainLight;
