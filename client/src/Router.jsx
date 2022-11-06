import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/Common/ProtectedRoute';
import HomePage from './routes/Home/HomePage';
import GameConnectPage from './routes/GameConnect/GameConnectPage';
import WorldPage from './routes/World/WorldPage';
import { useRecoilValue } from 'recoil';
import { loggedInState } from './Atom';

const Router = () => {
  const loggedIn = useRecoilValue(loggedInState);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute loggedin={!loggedIn} />}>
          <Route path="/main" element={<GameConnectPage />}></Route>
        </Route>
        <Route element={<ProtectedRoute loggedin={loggedIn} />}>
          <Route path="/game" element={<WorldPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
