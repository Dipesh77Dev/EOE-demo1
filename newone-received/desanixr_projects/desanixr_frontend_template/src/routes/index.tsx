import { useRoutes } from 'react-router-dom';

import { EventPage, Landing } from '@/features/misc';
import { useAuth } from '@/lib/auth';
import UploadImageToS3WithReactS3 from '@/lib/UploadImageToS3WithReactS3';

import { protectedRoutes } from './protectedRoutes';
import { publicRoutes } from './publicRoutes';

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];
  const testPage = [
    { path: '/eventpage', element: <EventPage /> },
    { path: '/testpage', element: <UploadImageToS3WithReactS3 /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes, ...testPage]);

  return <>{element}</>;
};
