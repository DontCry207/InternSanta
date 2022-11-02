import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Home/HomePage';
import GameConnectPage from './routes/GameConnect/GameConnectPage';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GameConnectPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
