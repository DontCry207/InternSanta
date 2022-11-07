import { Helmet, HelmetProvider } from 'react-helmet-async';
import GlobalStyle from './style/GlobalStyle';
import { RecoilRoot, useRecoilState } from 'recoil';
import Router from './Router';
import { useEffect } from 'react';
import { userInfoState } from './Atom';
function App() {
  const [userInfo, serUserInfo] = useRecoilState(userInfoState);
  const token = sessionStorage.getItem('accessToken');
  useEffect(() => {
    // if (token) {
    //   fetchData.get('/api/v1/member/info').then((res) => {
    //     setMyInformation(res.data);
    //   });
    // }
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>인턴산타</title>
      </Helmet>
      <GlobalStyle />
      <Router />
    </HelmetProvider>
  );
}

export default App;
