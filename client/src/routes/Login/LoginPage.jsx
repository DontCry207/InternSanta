import React, { forwardRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userInfoState } from '../../Atom';
import { fetchData } from '../../utils/apis/api';
const LoginPage = forwardRef((props, ref) => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPwd, setMemberPwd] = useState('');
  const navigate = useNavigate();
  const loginFnc = () => {
    console.log(memberEmail, memberPwd);
    fetchData
      .post('/api/v1/member/login', {
        memberEmail,
        memberPwd,
      })
      .then((res) => {
        setUserInfo(res.data);
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginFnc();
        }}>
        <label htmlFor="memberEmail">이메일</label>
        <input
          id="memberEmail"
          type="text"
          value={memberEmail}
          onChange={(e) => {
            setMemberEmail(e.target.value);
          }}
        />
        <label htmlFor="memberPwd">비밀번호</label>
        <input
          id="memberPwd"
          type="password"
          value={memberPwd}
          onChange={(e) => {
            setMemberPwd(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
});

export default LoginPage;
