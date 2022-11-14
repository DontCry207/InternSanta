import { useRef, useState } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import PetGltf from '../../assets/pet/Tortoise.glb';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { useKeyboardControls, useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../Atom';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Pet = () => {
  const { scene, gl } = useThree();
  const [, get] = useKeyboardControls();
  const group = useRef();
  const ktxLoader = new KTX2Loader();
  ktxLoader
    .setTranscoderPath(
      `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`,
    )
    .detectSupport(gl);
  const { nodes, animations } = useLoader(GLTFLoader, PetGltf, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.setKTX2Loader(ktxLoader);
    ktxLoader.dispose();
  });

  const [playerIdx, setPlayerIdx] = useState(0);
  const { actions } = useAnimations(animations, group);
  const player = scene.children[playerIdx];
  nodes.Rig.scale.setZ(-0.1);
  const userInfo = useRecoilValue(userInfoState);
  const { memberPet } = userInfo;

  useEffect(() => {
    const result = scene.children.findIndex((data) => {
      return data.name === 'player';
    });
    setPlayerIdx(result);
    return () => {};
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, left, right, dash, dance } = get();
    if (!dance && playerIdx) {
      group.current.rotation.copy(player.rotation);
    }
    group.current.position.set(
      player.position.x,
      player.position.y - 0.02,
      player.position.z + 0.3,
    );

    if (forward || backward || left || right) {
      // Walk, Run , Roll
      actions.Sit.stop();
      if (dash) {
        actions.Run.stop();
        actions.Roll.play().setEffectiveTimeScale(0.6);
      } else {
        actions.Roll.stop();
        actions.Run.play().setEffectiveTimeScale(1);
      }
    } else if (dance) {
      actions.Sit.stop();
      actions.Spin.play().setEffectiveTimeScale(0.7);
    } else {
      actions.Roll.stop();
      actions.Spin.stop();
      actions.Run.stop();
      actions.Sit.play().setEffectiveTimeScale(1);
    }
  });

  return (
    <>
      <primitive
        ref={group}
        object={nodes.Rig}
        position={[0, 0, 0]}
        scale={(0.1, 0.1, 0.1)}
      />
    </>
  );
};

export default Pet;
