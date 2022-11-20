import React, { forwardRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loggedInState, userInfoState } from '../../Atom';
import { fetchData } from '../../utils/apis/api';
import styled from 'styled-components';
const LoginPage = (props) => {
  const { closeFnc } = props;
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loggedIn, setloggedIn] = useRecoilState(loggedInState);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPwd, setMemberPwd] = useState('');
  const navigate = useNavigate();
  const loginFnc = async () => {
    try {
      const res = await fetchData.post('/api/v1/member/login', {
        memberEmail,
        memberPwd,
      });
      const {
        memberNickname,
        memberCoin,
        memberTicket,
        memberTop,
        memberPet,
        memberChapter,
        memberCheckpoint,
        accessToken,
        refreshToken,
      } = await res.data;
      setUserInfo({
        memberNickname,
        memberCoin,
        memberTicket,
        memberTop,
        memberPet,
        memberChapter,
        memberCheckpoint,
      });
      localStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('accessToken', accessToken);
      setloggedIn(true);
      navigate('/game');
    } catch {
      alert('아이디 혹은 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginFnc();
        }}>
        <InputBox>
          <label htmlFor="memberEmail">이메일</label>
          <input
            id="memberEmail"
            type="text"
            value={memberEmail}
            onChange={(e) => {
              setMemberEmail(e.target.value);
            }}
          />
        </InputBox>
        <InputBox>
          <label htmlFor="memberPwd">비밀번호</label>
          <input
            id="memberPwd"
            type="password"
            value={memberPwd}
            onChange={(e) => {
              setMemberPwd(e.target.value);
            }}
          />
        </InputBox>
        <BtnSet>
          <button className="leftBtn" type="button" onClick={() => closeFnc()}>
            닫기
          </button>
          <button className="rightBtn" type="submit">
            시작하기
          </button>
        </BtnSet>
      </form>
    </>
  );
};
const InputBox = styled.div`
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  label {
    font-size: 22px;
    text-align: center;
    width: 100%;
  }
  input {
    border: none;
    background-color: #d9d9d9;
    height: 40px;
    border-radius: 20px;
    width: 200px;
    font-size: 18px;
    padding: 5px 15px;
    &:focus {
      outline: 0;
    }
  }
`;
const BtnSet = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: center;
  gap: 10px;
  transform: translate(0, 50%);

  button {
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
  }
  .leftBtn {
    background-color: #cfcfcf;
  }
  .rightBtn {
    background-color: #60c783;
    color: white;
  }
`;
export default LoginPage;
