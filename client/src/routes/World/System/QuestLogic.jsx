import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chapterConditionState,
  infoUpdateState,
  userInfoState,
} from '../../../Atom';
import { fetchData } from '../../../utils/apis/api';

const QuestLogic = () => {
  const [update, setUpdate] = useRecoilState(infoUpdateState);
  const condition = useRecoilValue(chapterConditionState);
  const userInfo = useRecoilValue(userInfoState);
  const chapter = userInfo.memberChapter;

  const proceedCheckPoint = async () => {
    const res = await fetchData.patch('/api/v1/member/checkpoint');
    setUpdate(!update);
  };

  useEffect(() => {
    console.log(condition);
    if (chapter < 9 && condition[chapter]) {
      proceedCheckPoint();
    }
  }, [condition]);

  return <></>;
};

export default QuestLogic;
