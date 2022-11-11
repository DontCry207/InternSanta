import { atom } from 'recoil';

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

export const fortuneModalState = atom({
  key: `fortuneModalState`,
  default: false,
});

export const movieModalState = atom({
  key: `movieModal`,
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