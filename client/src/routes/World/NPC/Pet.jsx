import { useRef, useState } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { useKeyboardControls, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PetIndex, UserPet } from '../../../utils/constants/constants';
import { useRecoilValue } from 'recoil';
import { petState, userInfoState } from '../../../Atom';

const Pet = (props) => {
  const { scene, gl } = useThree();
  const [, get] = useKeyboardControls();
  const group = useRef(null);
  const PetGltf = UserPet[props.type];
  const userInfo = useRecoilValue(userInfoState);
  const { nodes, animations } = useLoader(GLTFLoader, PetGltf, (loader) => {
    const ktxLoader = new KTX2Loader();
    ktxLoader
      .setTranscoderPath(
        `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`,
      )
      .detectSupport(gl);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.setKTX2Loader(ktxLoader);
    ktxLoader.dispose();
  });
  nodes.Rig.scale.set(0.1, 0.1, -0.1);

  const [playerIdx, setPlayerIdx] = useState(0);
  const { actions } = useAnimations(animations, group);
  const player = scene.children[playerIdx];

  useEffect(() => {
    if (props.type !== PetIndex[userInfo.memberPet]) {
      nodes.Rig.visible = false;
    } else {
      nodes.Rig.visible = true;
    }
    const result = scene.children.findIndex((data) => {
      return data.name === 'player';
    });
    setPlayerIdx(result);
  }, [userInfo]);

  useFrame((state, delta) => {
    const { forward, backward, left, right, dash, dance } = get();
    if (!dance && playerIdx) {
      group.current.rotation.copy(player.rotation);
    }
    group.current.position.set(
      player.position.x,
      player.position.y,
      player.position.z + 0.3,
    );

    if (forward || backward || left || right) {
      // Walk, Run , Roll
      actions.Sit.stop();
      if (dash) {
        actions.Run.stop();
        if (props.type === 'Rhino') {
          actions.Roll.play().setEffectiveTimeScale(3.6);
        } else {
          actions.Roll.play().setEffectiveTimeScale(0.6);
        }
      } else {
        actions.Roll.stop();
        if (props.type === 'Rhino') {
          actions.Run.play().setEffectiveTimeScale(3);
        } else {
          actions.Run.play().setEffectiveTimeScale(1);
        }
      }
    } else if (dance) {
      actions.Sit.stop();
      if (props.type === 'Rhino') {
        actions.Spin.play().setEffectiveTimeScale(3);
      } else {
        actions.Spin.play().setEffectiveTimeScale(1);
      }
    } else {
      actions.Roll.stop();
      actions.Spin.stop();
      actions.Run.stop();
      if (props.type === 'Rhino') {
        actions.Sit.play().setEffectiveTimeScale(3);
      } else {
        actions.Sit.play().setEffectiveTimeScale(1);
      }
    }
  });

  return (
    <>
      <primitive ref={group} object={nodes.Rig} />
    </>
  );
};

export default Pet;
