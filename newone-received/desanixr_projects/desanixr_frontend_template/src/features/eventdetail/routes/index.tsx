import { Navigate, Route, Routes } from 'react-router-dom';

import { EventDetail } from './EventDetail';
import { EventDetails } from './EventDetails';

export const EventDetailRoute = () => {
  return (
    <Routes>
      <Route path="" element={<EventDetails />} />
      <Route path=":eventDetailId" element={<EventDetail />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
