import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/Common/ProtectedRoute';
import HomePage from './routes/Home/HomePage';
import GameConnectPage from './routes/GameConnect/GameConnectPage';
import WorldPage from './routes/World/WorldPage';
import { loggedinState } from './Atom';
import { useRecoilValue } from 'recoil';

const Router = () => {
  const loggedin = useRecoilValue(loggedinState);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute loggedin={!loggedin} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<GameConnectPage />}></Route>
        </Route>
        <Route element={<ProtectedRoute loggedin={loggedin} />}>
          <Route path="/game" element={<WorldPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
