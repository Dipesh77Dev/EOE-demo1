import { Navigate, Route, Routes } from 'react-router-dom';

import { Scene } from './Scene';
import { Scenes } from './Scenes';

export const ScenesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Scenes />} />
      <Route path=":sceneId" element={<Scene />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
