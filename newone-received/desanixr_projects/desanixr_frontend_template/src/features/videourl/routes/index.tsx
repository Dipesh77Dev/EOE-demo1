import { Navigate, Route, Routes } from 'react-router-dom';

import { VideoUrl } from './VideoUrl';

export const VideoUrlRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<VideoUrl />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
