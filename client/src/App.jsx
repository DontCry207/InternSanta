import { Helmet, HelmetProvider } from 'react-helmet-async';
import GlobalStyle from './style/GlobalStyle';
import { RecoilRoot } from 'recoil';
import Router from './Router';
function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>인턴산타</title>
      </Helmet>
      <GlobalStyle />
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
