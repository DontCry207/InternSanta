import React, { useEffect } from 'react';
import speech from '../../assets/speech.glb';
import { useFrame, useThree } from '@react-three/fiber';
import { NpcLocation, NpcQuest } from '../../utils/constants/constants';
import { useRecoilValue } from 'recoil';
import { questInfoState } from '../../Atom';
import { useGLTF } from '@react-three/drei';

const QuestBubbleModal = () => {
  const { camera } = useThree();
  const buble = useGLTF(speech);
  const quest = useRecoilValue(questInfoState);
  const targetNpc = NpcQuest[quest.questNpc];

  useFrame(() => {
    buble.nodes.Scene.rotation.copy(camera.rotation);
  });

  const location1 = NpcLocation[targetNpc];
  const location2 = [location1[0], location1[1] + 1.2, location1[2]];
  const location3 = [location1[0], location1[1] + 1.65, location1[2]];

  return (
    <>
      <primitive
        object={buble.nodes.Scene}
        position={
          (targetNpc.startsWith('reindeer') && location3) ||
          (!targetNpc.startsWith('reindeer') && location2)
        }
        rotation={camera.rotation}
        scale={[0.45, 0.45, 0.45]}
      />
    </>
  );
};

export default QuestBubbleModal;
