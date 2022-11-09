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
