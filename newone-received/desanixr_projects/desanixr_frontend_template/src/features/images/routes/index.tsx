import { Navigate, Route, Routes } from 'react-router-dom';

import { Image } from './Image';
import { Images } from './Images';

export const ImagesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Images />} />
      <Route path=":imageId" element={<Image />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
