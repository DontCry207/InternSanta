import { atom, selectorFamily } from 'recoil';

export const loggedInState = atom({
  key: `loggedIn`,
  default: sessionStorage.getItem('accessToken') ? true : false,
});

export const userInfoState = atom({
  key: 'userInfo',
  default: {
    memberNickname: '',
    memberCoin: -1,
    memberTicket: -1,
    memberTop: null,
    memberPet: -1,
    memberChapter: -1,
    memberCheckpoint: -1,
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

export const missionModalState = atom({
  key: `missionModal`,
  default: false,
});

export const animalModalState = atom({
  key: `animalModal`,
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

export const sponPositionState = atom({
  key: 'sponPosition',
  default: 'start',
});

export const chapter1ConditionState = atom({
  key: 'chapter1Condition',
  default: false,
});
export const chapter2ConditionState = atom({
  key: 'chapter2Condition',
  default: false,
});
export const chapter3ConditionState = atom({
  key: 'chapter3Condition',
  default: false,
});
export const chapter4ConditionState = atom({
  key: 'chapter4Condition',
  default: false,
});
export const chapter5ConditionState = atom({
  key: 'chapter5Condition',
  default: false,
});
export const chapter6ConditionState = atom({
  key: 'chapter6Condition',
  default: false,
});
export const chapter7ConditionState = atom({
  key: 'chapter7Condition',
  default: false,
});
export const chapter8ConditionState = atom({
  key: 'chapter8Condition',
  default: false,
});
