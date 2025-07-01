import { Navigate, Route, Routes } from 'react-router-dom';

import { Screen } from './Screen';
import { Screens } from './Screens';

export const ScreensRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Screens />} />
      <Route path=":screenId" element={<Screen />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
