import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Home/HomePage';
import WorldPage from './routes/World/WorldPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<WorldPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
