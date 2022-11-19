import santa from '../../../assets/santa.glb';
import christmasLogo from '../../../assets/christmasLogo.glb';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ambientState } from '../../../Atom';
import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const Moon = () => {
  const [ambient, setAmbient] = useRecoilState(ambientState);
  const [hovered, setHover] = useState(false);
  const { nodes } = useGLTF(santa);
  const logo = useGLTF(christmasLogo);
  logo.nodes.Scene.scale.set(46, 46, 46);
  nodes.Scene.scale.set(12, 9, 12);
  nodes.Scene.rotation.set(0, 0, 0.6);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    logo.nodes.Scene.lookAt(-6.59, 0.484, 3.92);
  }, [ambient]);

  const click = (e) => {
    setAmbient(!ambient);
  };

  return (
    <>
      <primitive
        object={nodes.Scene}
        position={ambient ? [0, -20, 0] : [82, 93, 112]}
      />
      <primitive
        object={logo.nodes.Scene}
        position={ambient ? [0, -20, 0] : [92, 70, 22]}
      />
      <mesh
        position={[80, 90, 130]}
        onClick={(e) => click(e)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <sphereGeometry args={[14, 25, 25]} />
        <meshStandardMaterial
          color={ambient ? '#BF5B28' : 'yellow'}
          emissive={ambient ? '#BF5B28' : 'yellow'}
          emissiveIntensity={1}
        />
      </mesh>
    </>
  );
};

useGLTF.preload(santa, christmasLogo);

export default Moon;
