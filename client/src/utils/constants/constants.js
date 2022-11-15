import reindeer from '../../assets/reindeer/reindeer.glb';
import reindeerRed from '../../assets/reindeer/reindeerRed.glb';
import reindeerOrange from '../../assets/reindeer/reindeerOrange.glb';
import reindeerYellow from '../../assets/reindeer/reindeerYellow.glb';
import reindeerGreen from '../../assets/reindeer/reindeerGreen.glb';
import reindeerBlue from '../../assets/reindeer/reindeerBlue.glb';
import reindeerPurple from '../../assets/reindeer/reindeerPurple.glb';
import reindeerWhite from '../../assets/reindeer/reindeerWhite.glb';
import reindeerPink from '../../assets/reindeer/reindeerPink.glb';
import infoGuy from '../../assets/npc/infoGuy.glb';
import storeGuy from '../../assets/npc/storeGuy.glb';
import trainGuy from '../../assets/npc/trainGuy.glb';
import yellowGuy from '../../assets/npc/yellowGuy.glb';
import greenGuy from '../../assets/npc/greenGuy.glb';
import minSeo from '../../assets/npc/minSeo.glb';
import yb from '../../assets/npc/yb.glb';
import commet from '../../assets/npc/commet.glb';
import reindeerImg from '../../assets/images/reindeer.png';
import reindeerRedImg from '../../assets/images/reindeerRed.png';
import reindeerOrangeImg from '../../assets/images/reindeerOrange.png';
import reindeerYellowImg from '../../assets/images/reindeerYellow.png';
import reindeerGreenImg from '../../assets/images/reindeerGreen.png';
import reindeerBlueImg from '../../assets/images/reindeerBlue.png';
import reindeerPurpleImg from '../../assets/images/reindeerPurple.png';
import reindeerWhiteImg from '../../assets/images/reindeerWhite.png';
import reindeerPinkImg from '../../assets/images/reindeerPink.png';
import infoGuyImg from '../../assets/images/infoGuy.png';
import storeGuyImg from '../../assets/images/storeGuy.png';
import trainGuyImg from '../../assets/images/trainGuy.png';
import yellowGuyImg from '../../assets/images/yellowGuy.png';
import greenGuyImg from '../../assets/images/greenGuy.png';
import minSeoImg from '../../assets/images/minSeo.png';
import ybImg from '../../assets/images/yb.png';
import commetImg from '../../assets/images/commet.png';

export const NpcLocation = {
  null: [0, -10, 0],
  infoGuy: [-14.68914, 0.28, 19.2158622],
  storeGuy: [-12.437863349, 0.55, 4.4225573539],
  trainGuy: [-21.2908630375, 0.28, 3.7027873992],
  yellowGuy: [-6.591402912139893, 0.4, 0.029304206371307373],
  greenGuy: [-5.367114543914795, 0.4, -0.16970063745975494],
  minSeo: [-7.36607027053833, 0.4, 0.8801453709602356],
  yb: [-4.543894290924072, 0.3, 0.4514186978340149],
  commet: [-7.712, 0.4, 2],
  reindeer: [-2.722, 0.1, 19.57],
  reindeerRed: [-1.0570511817, 0.18911657929, 8.15925],
  reindeerOrange: [0.6253691315, 0.2155776143, -1.4708287715],
  reindeerYellow: [-18.0778160095, 0.06303104996, 10.8201217651],
  reindeerGreen: [15.0341844558, 2.44612274169, 0.82147848606],
  reindeerBlue: [10.74005413, 0, 12.8185195922],
  reindeerPurple: [-5.8828038215, 1.32455928325, -6.936524868],
  reindeerWhite: [-5.8828038215, 1.32455928325, -6.936524868],
  reindeerPink: [-7.6799707412, 1.5212489128, 26.7339458465],
};
export const NpcRotation = {
  infoGuy: [0, 4 * Math.PI, 0],
  storeGuy: [0, 0.4 * Math.PI, 0],
  trainGuy: [0, 0.4 * Math.PI, 0],
  yellowGuy: [0, 0.25 * Math.PI, 0],
  greenGuy: [0, -0.1 * Math.PI, 0],
  minSeo: [0, 0.4 * Math.PI, 0],
  yb: [0, -0.3 * Math.PI, 0],
  commet: [0, 0.4 * Math.PI, 0],
  reindeer: [0, 0.9 * Math.PI, 0],
  reindeerRed: [0, 1.2 * Math.PI, 0],
  reindeerOrange: [0, 1.85 * Math.PI, 0],
  reindeerYellow: [0, 0.5 * Math.PI, 0],
  reindeerGreen: [0, 1.35 * Math.PI, 0],
  reindeerBlue: [0, 1.35 * Math.PI, 0],
  reindeerPurple: [0, 2.05 * Math.PI, 0],
  reindeerWhite: [0, 2.05 * Math.PI, 0],
  reindeerPink: [0, 0.66 * Math.PI, 0],
};

export const NpcModel = {
  infoGuy: infoGuy,
  storeGuy: storeGuy,
  trainGuy: trainGuy,
  yellowGuy: yellowGuy,
  greenGuy: greenGuy,
  minSeo: minSeo,
  yb: yb,
  commet: commet,
  reindeer: reindeer,
  reindeerRed: reindeerRed,
  reindeerOrange: reindeerOrange,
  reindeerYellow: reindeerYellow,
  reindeerGreen: reindeerGreen,
  reindeerBlue: reindeerBlue,
  reindeerPurple: reindeerPurple,
  reindeerWhite: reindeerWhite,
  reindeerPink: reindeerPink,
};

export const NpcAnimation = {
  infoGuy: 'Idle',
  storeGuy: 'Idle',
  trainGuy: 'Idle',
  yellowGuy: 'Song Jump',
  greenGuy: 'Song Jump',
  minSeo: 'Song Jump',
  yb: 'Song Jump',
  commet: 'Song Jump',
};

export const NpcImages = {
  reindeer: reindeerImg,
  reindeerRed: reindeerRedImg,
  reindeerOrange: reindeerOrangeImg,
  reindeerYellow: reindeerYellowImg,
  reindeerGreen: reindeerGreenImg,
  reindeerBlue: reindeerBlueImg,
  reindeerPurple: reindeerPurpleImg,
  reindeerPink: reindeerPinkImg,
  reindeerWhite: reindeerWhiteImg,
  infoGuy: infoGuyImg,
  storeGuy: storeGuyImg,
  trainGuy: trainGuyImg,
  yellowGuy: yellowGuyImg,
  greenGuy: greenGuyImg,
  minSeo: minSeoImg,
  yb: ybImg,
  commet: commetImg,
};

export const NpcNames = {
  reindeer: '프랜서',
  reindeerRed: '루돌프 인사팀장',
  reindeerOrange: '도너',
  reindeerYellow: '빅슨',
  reindeerGreen: '블리즌',
  reindeerBlue: '코멧',
  reindeerPurple: '큐피드',
  reindeerPink: '댄서',
  reindeerWhite: '대셔',
  infoGuy: '박아영 정보과장',
  storeGuy: '정민호 상점주인',
  trainGuy: '양경섭 역무장',
  yellowGuy: '원재호 단무지',
  greenGuy: '최하영 착한누나',
  minSeo: '강민서 동네누나',
  yb: '김영범 박사',
  commet: '김혜성 노는누나',
};

export const NormalDialog = {
  null: ['초기값'],
  reindeer: ['안녕'],
  reindeerRed: ['안녕 너가 새로온 인턴이구나? 나는 인사팀장 루돌프야.'],
  reindeerOrange: ['안녕'],
  reindeerYellow: ['안녕'],
  reindeerGreen: ['안녕'],
  reindeerBlue: ['안녕'],
  reindeerPurple: ['안녕'],
  reindeerPink: ['안녕'],
  reindeerWhite: ['안녕'],
  infoGuy: [
    '안녕! 우리마을에 온걸 환영해!',
    '인사팀장 루돌프님이 기다리고 계셔! 그분께 가봐.',
  ],
  storeGuy: ['안녕, 오늘도 뽑기하러왔니? 호호호'],
  trainGuy: ['안녕'],
  yellowGuy: ['안녕'],
  greenGuy: ['안녕'],
  minSeo: ['안녕'],
  yb: ['안녕'],
  commet: ['안녕'],
};

export const NpcFeatButton = {
  reindeer: null,
  reindeerRed: null,
  reindeerOrange: null,
  reindeerYellow: null,
  reindeerGreen: null,
  reindeerBlue: null,
  reindeerPurple: null,
  reindeerPink: null,
  reindeerWhite: null,
  infoGuy: null,
  storeGuy: '뽑기',
  trainGuy: null,
  yellowGuy: null,
  greenGuy: null,
  minSeo: null,
  yb: null,
  commet: null,
};

export const NpcQuest = {
  reindeerRed: 0,
};
