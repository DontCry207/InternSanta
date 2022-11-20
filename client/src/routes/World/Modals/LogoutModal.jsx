import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loggedInState, logoutModalState, userInfoState } from '../../../Atom';
import AlertModal from '../../Common/AlertModal';

const LogoutModal = () => {
  const [logoutModal, setLogoutModal] = useRecoilState(logoutModalState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const setloggedIn = useSetRecoilState(loggedInState);

  const close = () => {
    logout();
    setLogoutModal(false);
    window.location.replace('/game');
  };

  const logout = () => {
    setUserInfo({
      memberNickname: '',
      memberCoin: -1,
      memberTicket: -1,
      memberTop: null,
      memberPet: -1,
      memberChapter: -1,
      memberCheckpoint: -1,
    });
    setloggedIn(false);
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    console.log('로그아웃');
  };

  const render = () => {
    return (
      <Modal>
        <AlertModal
          title={'로그아웃'}
          leftBtnName={'취소'}
          rightBtnName={'종료'}
          setLeftBtnControl={() => {
            setLogoutModal(false);
          }}
          setRightBtnControl={() => {
            close();
          }}>
          <Text>
            <p>종료 하시겠습니까?</p>
          </Text>
        </AlertModal>
      </Modal>
    );
  };

  return <>{logoutModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const Text = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 30px;
    color: #0d005c;
  }
`;

export default LogoutModal;
