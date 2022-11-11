import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { Theme } from './style/Theme';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <ThemeProvider theme={Theme}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>,
  //</React.StrictMode>,
);
