import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { sponPositionState } from '../../Atom';
import { RigidBody } from '@react-three/rapier';

const PortalDoor = () => {
  const boxLocation = [12.4, 3.63, -4.41];
  const boxLocation2 = [21.97, 1.65, -11.95];
  const [hovered, setHover] = useState(false);
  const [sponPosition, setSponPosition] = useRecoilState(sponPositionState);

  const hover = (e) => {
    setHover(true);
  };
  const unhover = (e) => {
    setHover(false);
  };

  const click = (e) => {
    setSponPosition(e);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  return (
    <>
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={boxLocation}
          rotation={[0, 0.77, 0]}
          onClick={() => click('carolZoneIn')}
          onPointerOver={(e) => hover(e)}
          onPointerOut={(e) => unhover(e)}>
          <boxGeometry args={[0.1, 1.94, 1.3]} />
          <meshStandardMaterial
            color={[0, 0, 0, 0]}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders={'hull'}>
        <mesh
          position={boxLocation2}
          rotation={[0, 1.5707, 0]}
          onClick={() => click('carolZoneFront')}
          onPointerOver={(e) => hover(e)}
          onPointerOut={(e) => unhover(e)}>
          <boxGeometry args={[0.1, 1.4, 0.6]} />
          <meshStandardMaterial
            color={[0, 0, 0, 0]}
            opacity={0}
            transparent={true}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

export default PortalDoor;
