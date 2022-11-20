import GlobalStyle from './style/GlobalStyle';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import Router from './Router';
import './style/font.css';

function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>인턴산타</title>
        </Helmet>
        <GlobalStyle />
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </HelmetProvider>
    </>
  );
}

export default App;
