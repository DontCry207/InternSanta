import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Home/HomePage';
import GameConnectPage from './routes/GameConnect/GameConnectPage';
import WorldPage from './routes/World/WorldPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<GameConnectPage />}></Route>
        <Route path="/game" element={<WorldPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
