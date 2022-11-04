import { atom } from 'recoil';

export const loggedinState = atom({
  key: `loggedin`,
  default: sessionStorage.getItem('accessToken') ? true : false,
});

export const userInfoState = atom({
  key: 'userInfo',
  default: {
    memberNickname: '',
    memberCoin: -1,
    memberTicket: -1,
    memberGender: -1,
    memberTop: '',
    memberBottom: '',
    memberPet: -1,
    memberChapter: -1,
    memberCheckpoint: -1,
  },
});
