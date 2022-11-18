import React, { useEffect, useState } from 'react';
import speech from '../../../assets/speech.glb';
import star from '../../../assets/star.glb';
import check from '../../../assets/check.glb';
import question from '../../../assets/question.glb';
import { useFrame, useThree } from '@react-three/fiber';
import { NpcLocation, NpcQuest } from '../../../utils/constants/constants';
import { useRecoilState, useRecoilValue } from 'recoil';
import { questInfoState, userInfoState } from '../../../Atom';
import { useGLTF } from '@react-three/drei';

const QuestBubble = () => {
  const { camera } = useThree();
  const speechBuble = useGLTF(speech);
  const starBuble = useGLTF(star);
  const checkBuble = useGLTF(check);
  const questionBuble = useGLTF(question);
  const quest = useRecoilValue(questInfoState);
  const targetNpc = NpcQuest[quest.questNpc];
  const [buble, setBuble] = useState(speechBuble);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useFrame(() => {
    buble.nodes.Scene.rotation.copy(camera.rotation);
  });

  useEffect(() => {
    if (userInfo.memberChapter !== 10 && userInfo.memberCheckpoint === 0) {
      setBuble(speechBuble);
    } else if (userInfo.memberCheckpoint === 1) {
      setBuble(questionBuble);
    } else if (userInfo.memberCheckpoint === 2) {
      setBuble(checkBuble);
    } else if (userInfo.memberChapter === 10) {
      setBuble(starBuble);
    }
  }, [userInfo]);

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

export default QuestBubble;
