import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState, npcHoverState, sponPositionState } from '../../../Atom';

const SnowMan = () => {
  const boxLocation = [5.05, 1, 1.22];
  const setHover = useSetRecoilState(npcHoverState);
  const setModal = useSetRecoilState(modalState);

  return (
    <mesh
      position={boxLocation}
      onPointerOver={() => setHover('snowMan')}
      onPointerOut={() => setHover(null)}
      onClick={() => {
        setModal('snowMan');
      }}>
      <cylinderGeometry args={[0.4, 0.4, 1.6, 10]} />
      <meshStandardMaterial
        color={[0, 0, 0, 0]}
        opacity={0}
        transparent={true}
      />
    </mesh>
  );
};

export default SnowMan;
