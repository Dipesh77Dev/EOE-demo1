import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { DxrSpinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { DiscussionsRoutes } = lazyImport(
  () => import('@/features/discussions'),
  'DiscussionsRoutes'
);
const { ImagesRoutes } = lazyImport(() => import('@/features/images'), 'ImagesRoutes');

const { ScenesRoutes } = lazyImport(() => import('@/features/scenes'), 'ScenesRoutes');
const { ScreensRoutes } = lazyImport(() => import('@/features/screens'), 'ScreensRoutes');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
const { Users } = lazyImport(() => import('@/features/users'), 'Users');

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <DxrSpinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/discussions/*', element: <DiscussionsRoutes /> },
      { path: '/images/*', element: <ImagesRoutes /> },
      { path: '/scenes/*', element: <ScenesRoutes /> },
      { path: '/screens/*', element: <ScreensRoutes /> },
      { path: '/users', element: <Users /> },
      { path: '/profile', element: <Profile /> },
      { path: '/testing2', element: <Profile /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
