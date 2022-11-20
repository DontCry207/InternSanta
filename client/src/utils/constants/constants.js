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
import greenGuyImg from '../../assets/images/GreenGuy.png';
import minSeoImg from '../../assets/images/minSeo.png';
import ybImg from '../../assets/images/yb.png';
import commetImg from '../../assets/images/commet.png';
import Tortoise from '../../assets/pet/Tortoise.glb';
import Cat from '../../assets/pet/Cat.glb';
import Dog from '../../assets/pet/Dog.glb';
import Fox from '../../assets/pet/Fox.glb';
import PolarBear from '../../assets/pet/PolarBear.glb';
import Rabbit from '../../assets/pet/Rabbit.glb';
import Reindeer from '../../assets/pet/Reindeer.glb';
import Rhino from '../../assets/pet/Rhino.glb';
import reindeerProfileImg from '../../assets/images/profiles/reindeer.png';
import reindeerRedProfileImg from '../../assets/images/profiles/reindeerRed.png';
import reindeerOrangeProfileImg from '../../assets/images/profiles/reindeerOrange.png';
import reindeerYellowProfileImg from '../../assets/images/profiles/reindeerYellow.png';
import reindeerGreenProfileImg from '../../assets/images/profiles/reindeerGreen.png';
import reindeerBlueProfileImg from '../../assets/images/profiles/reindeerBlue.png';
import reindeerPurpleProfileImg from '../../assets/images/profiles/reindeerPurple.png';
import reindeerWhiteProfileImg from '../../assets/images/profiles/reindeerWhite.png';
import reindeerPinkProfileImg from '../../assets/images/profiles/reindeerPink.png';
import DogImg from '../../assets/images/pets/Dog.png';
import CatImg from '../../assets/images/pets/Cat.png';
import RabbitImg from '../../assets/images/pets/Rabbit.png';
import FoxImg from '../../assets/images/pets/Fox.png';
import ReindeerImg from '../../assets/images/pets/Reindeer.png';
import PolarBearImg from '../../assets/images/pets/PolarBear.png';
import TortoiseImg from '../../assets/images/pets/Tortoise.png';
import RhinoImg from '../../assets/images/pets/Rhino.png';
import carolzoneProfile from '../../assets/images/profiles/carolzone.png';
import clothesProfile from '../../assets/images/profiles/clothes.png';
import commetProfile from '../../assets/images/profiles/commet.png';
import greenGuyProfile from '../../assets/images/profiles/greenGuy.png';
import storeGuyProfile from '../../assets/images/profiles/storeGuy.png';
import trainGuyProfile from '../../assets/images/profiles/trainGuy.png';
import yellowGuyProfile from '../../assets/images/profiles/yellowGuy.png';

export const NpcLocation = {
  null: [0, -10, 0],
  doorOut: [12.2, 3.7, -4.2],
  doorIn: [22, 1.4, -12.05],
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
  reindeerPurple: [-11.200315, 0.279665, 2.5480184],
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
  reindeerPurple: [0, 2.3 * Math.PI, 0],
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

export const NpcProfileImages = {
  reindeer: reindeerProfileImg,
  reindeerRed: reindeerRedProfileImg,
  reindeerOrange: reindeerOrangeProfileImg,
  reindeerYellow: reindeerYellowProfileImg,
  reindeerGreen: reindeerGreenProfileImg,
  reindeerBlue: reindeerBlueProfileImg,
  reindeerPurple: reindeerPurpleProfileImg,
  reindeerPink: reindeerPinkProfileImg,
  reindeerWhite: reindeerWhiteProfileImg,
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
  storeGuy: '정민호 문방구아저씨',
  trainGuy: '양경섭 역무장',
  yellowGuy: '원재호 단무지',
  greenGuy: '최하영 동물보호 운동가',
  minSeo: '강민서 동네누나',
  yb: '김영범 박사',
  commet: '김혜성 노는누나',
};

export const NormalDialog = {
  null: ['초기값'],
  reindeer: ['복장은 개성있게! 몰개성한 옷은 봐 줄 수가 없어!'],
  reindeerRed: ['안녕? 새로운 산타는 언제나 환영이야.'],
  reindeerOrange: ['후후후… 너는… 썰매를 탈 자격이 있을까…? 후후….'],
  reindeerYellow: ['아 썰매 없으면 일 못하지~'],
  reindeerGreen: ['하하하하! 나는 은퇴하면 고향에 돌아가서 펫샵을 열 것이야!!'],
  reindeerBlue: ['히히 영화는 근무시간에 봐야 제 맛… 헉! 들었어?'],
  reindeerPurple: ['꺄아아아앙 귀여워 ㅎㅎ'],
  reindeerPink: [
    '나는 여기서 산타 자격이 충분한 인턴들의 사진을 찍어주고 있어.',
  ],
  reindeerWhite: [
    '왜 나만 일하고 있는 것 같지? 왜 나만 일하고 있는 것 같지?? 헉헉…',
  ],
  infoGuy: [
    '안녕! 우리마을에 온걸 환영해!',
    '인사팀장 루돌프님이 기다리고 계셔! 그분께 가봐.',
  ],
  storeGuy: ['안녕, 오늘도 뽑기하러왔니? 호호호'],
  trainGuy: ['이번에 마을로 가져온 재료가 참많답니다~'],
  yellowGuy: ['신난다! 게임이 최고야 유후우우'],
  greenGuy: ['동물들을 보호해야해...'],
  minSeo: ['안녕하세요, 인턴산타 팀장입니다... 많이 사랑해주세요'],
  yb: ['싸피의 명물 알쓸싸잡 주인공 김영범입니다. 인턴산타 화이팅!'],
  commet: ['너, 나랑같이 사진찍을래?'],
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
  trainGuy: '나무 얻기',
  yellowGuy: '미니게임',
  greenGuy: '펫분양',
  minSeo: null,
  yb: null,
  commet: '산타네컷',
};

export const NpcQuest = {
  0: 'reindeerRed',
  1: 'reindeer',
  2: 'reindeerGreen',
  3: 'reindeerOrange',
  4: 'reindeerYellow',
  5: 'reindeerPurple',
  6: 'reindeerBlue',
  7: 'reindeerWhite',
  8: 'reindeerPink',
  9: 'reindeerRed',
};

export const UserPet = {
  Dog: Dog,
  Cat: Cat,
  Rabbit: Rabbit,
  Fox: Fox,
  Reindeer: Reindeer,
  PolarBear: PolarBear,
  Tortoise: Tortoise,
  Rhino: Rhino,
};

export const PetIndex = {
  0: 'null',
  1: 'Dog',
  2: 'Cat',
  3: 'Rabbit',
  4: 'Fox',
  5: 'Reindeer',
  6: 'PolarBear',
  7: 'Tortoise',
  8: 'Rhino',
};

export const SealImg = [
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/rudolf_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/snow_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/candle_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/bell_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/candy_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/tree_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/snowman_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/cookie_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/santa_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/choco_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/socks_seal.png',
  'https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/gift_seal.png',
];

export const PetImage = {
  0: null,
  1: DogImg,
  2: CatImg,
  3: RabbitImg,
  4: FoxImg,
  5: ReindeerImg,
  6: PolarBearImg,
  7: TortoiseImg,
  8: RhinoImg,
};

export const missionClearText = {
  1: [
    '멋진 옷을 입었군요!',
    '다시 프랜서에게 돌아가',
    '미션을 클리어 해주세요',
  ],
  2: [
    '똑 닮은 펫을 얻었네요!',
    '다시 블리즌에게 돌아가',
    '미션을 클리어 해주세요',
  ],
  3: [
    '오늘은 어떤 운세를 받았나요?',
    '다시 도너에게 돌아가',
    '미션을 클리어 해주세요',
  ],
  4: [
    '한 그림솜씨 하시네요!',
    '다시 빅슨에게 돌아가',
    '미션을 클리어 해주세요',
  ],
  5: [
    '멋진 씰을 다 모아봅시다!',
    '다시 큐피드에게 돌아가',
    '미션을 클리어 해주세요',
  ],
  6: [
    '크리스마스엔 집에서 영화나 한편!',
    '다시 코멧에게 돌아가',
    '미션을 클리어 해주세요',
  ],
  7: [
    '더 높이 쌓을때까지 계속 고우~고우~',
    '다시 대셔에게 돌아가',
    '미션을 클리어 해주세요',
  ],
  8: [
    '내 캐릭터와 함께 추억으로 남겨봐요~',
    '다시 댄서에게 돌아가',
    '미션을 클리어 해주세요',
  ],
};

export const reward = {
  0: 1000,
  1: 1500,
  2: 2000,
  3: 2500,
  4: 3000,
  5: 3500,
  6: 4000,
  7: 4500,
  8: 5000,
  9: 6000,
  10: 100,
};

export const questText = {
  1: ['옷을 갈아입어 봅시다!', '오른쪽 상단 옷 아이콘을 클릭하세요'],
  2: [
    '이제 나와 닮은 펫을 얻을 수 있어요!',
    '초록옷의 동물보호장을 찾아가세요',
  ],
  3: [
    '산타라면 오늘의 운세정도는 알아야죠',
    '계단 위집의 캐럴존에서 벽난로를 클릭하세요',
  ],
  4: ['그림을 그려 나무를 얻어봅시다!', '기차앞 역무원 아저씨를 찾아가세요'],
  5: ['씰을 뽑아 카드를 채워볼까요?', '맵중앙 상점을 클릭하세요'],
  6: [
    '쉬는 날엔 집에 콕박혀서 영화한편?',
    '계단 위집의 캐럴존에서 텔레비전을 클릭하세요',
  ],
  7: [
    '선물을 가득 쌓아 코인을 얻어볼까요?',
    '노란옷의 게임광 원재호를 찾아가세요',
  ],
  8: [
    '내캐릭터와 함께 산타네컷 한장!',
    '핑크옷의 김혜성 노는언니를 찾아가세요',
  ],
};

export const missionImg = {
  1: clothesProfile,
  2: greenGuyProfile,
  3: carolzoneProfile,
  4: trainGuyProfile,
  5: storeGuyProfile,
  6: carolzoneProfile,
  7: yellowGuyProfile,
  8: commetProfile,
};
