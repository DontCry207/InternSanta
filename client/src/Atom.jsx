import { atom, selectorFamily } from 'recoil';

export const loggedInState = atom({
  key: `loggedIn`,
  default: sessionStorage.getItem('accessToken') ? true : false,
});

export const userInfoState = atom({
  key: 'userInfo',
  default: {
    memberNickname: '',
    memberCoin: 0,
    memberTicket: 0,
    memberTop: null,
    memberPet: 0,
    memberChapter: 0,
    memberCheckpoint: 0,
  },
});

export const questInfoState = atom({
  key: 'questInfo',
  default: {
    questId: 0,
    questTitle: '',
    questSub: '',
    questNpc: 0,
  },
});

export const quickDrawModalState = atom({
  key: 'quickDrawModal',
  default: false,
});

export const musicModalState = atom({
  key: 'musicModal',
  default: false,
});

export const audioStartState = atom({
  key: 'audioStart',
  default: false,
});

export const logoutModalState = atom({
  key: 'logoutModal',
  default: false,
});

export const clothesModalState = atom({
  key: 'clothesModal',
  default: false,
});

export const fortuneModalState = atom({
  key: `fortuneModalState`,
  default: false,
});

export const movieModalState = atom({
  key: `movieModal`,
  default: false,
});

export const sealModalState = atom({
  key: `sealModal`,
  default: false,
});

export const gotchaModalState = atom({
  key: `gotchaModal`,
  default: false,
});

export const missionModalState = atom({
  key: `missionModal`,
  default: null,
});

export const animalModalState = atom({
  key: `animalModal`,
  default: false,
});

export const gameModalState = atom({
  key: `gameModal`,
  default: false,
});

export const questIndicatorState = atom({
  key: `questIndicator`,
  default: false,
});

export const photoModalState = atom({
  key: `photoModal`,
  default: false,
});

export const modalState = atom({
  key: `modal`,
  default: null,
});

export const loadingState = atom({
  key: `loading`,
  default: true,
});

export const ambientState = atom({
  key: `ambient`,
  default: true,
});

export const npcHoverState = atom({
  key: `npcHover`,
  default: null,
});

export const npcScriptState = atom({
  key: 'npcScript',
  default: [],
});

export const infoUpdateState = atom({
  key: 'infoUpdate',
  default: false,
});

export const petState = atom({
  key: 'pet',
  default: 0,
});

export const sponPositionState = atom({
  key: 'sponPosition',
  default: 'start',
});

export const chapterConditionState = atom({
  key: 'chapterCondition',
  default: [false, false, false, false, false, false, false, false, false],
});
