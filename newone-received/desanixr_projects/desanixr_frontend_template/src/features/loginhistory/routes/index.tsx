import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginHistory } from './LoginHistory';

export const LoginHistoryRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<LoginHistory />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
