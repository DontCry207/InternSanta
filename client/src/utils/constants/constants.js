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

export const NpcLocation = {
  null: [0, -10, 0],
  infoGuy: [-14.68914, 0.28, 19.2158622],
  storeGuy: [-12.437863349, 0.55, 4.4225573539],
  trainGuy: [-21.2908630375, 0.28, 3.7027873992],
  yellowGuy: [-6.591402912139893, 0.4, 0.029304206371307373],
  greenGuy: [-5.367114543914795, 0.4, -0.16970063745975494],
  minSeo: [-7.36607027053833, 0.4, 0.8801453709602356],
  yb: [-4.543894290924072, 0.3, 0.4514186978340149],
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
};
