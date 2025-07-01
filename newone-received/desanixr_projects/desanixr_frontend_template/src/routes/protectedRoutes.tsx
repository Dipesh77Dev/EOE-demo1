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
const { LoginHistoryRoutes } = lazyImport(
  () => import('@/features/loginhistory'),
  'LoginHistoryRoutes'
);
const { VideoUrlRoutes } = lazyImport(() => import('@/features/videourl'), 'VideoUrlRoutes');
const { ScenesRoutes } = lazyImport(() => import('@/features/scenes'), 'ScenesRoutes');
const { ScreensRoutes } = lazyImport(() => import('@/features/screens'), 'ScreensRoutes');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
const { Users } = lazyImport(() => import('@/features/users'), 'Users');
const { EventDetailRoute } = lazyImport(() => import('@/features/eventdetail'), 'EventDetailRoute');

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
      { path: '/app/discussions/*', element: <DiscussionsRoutes /> },
      { path: '/app/images/*', element: <ImagesRoutes /> },
      { path: '/app/videoUrl/*', element: <VideoUrlRoutes /> },
      { path: '/app/loginHistory/*', element: <LoginHistoryRoutes /> },
      { path: '/app/scenes/*', element: <ScenesRoutes /> },
      { path: '/app/screens/*', element: <ScreensRoutes /> },
      { path: '/app/users', element: <Users /> },
      { path: '/app/profile', element: <Profile /> },
      { path: '/app/eventdetail/*', element: <EventDetailRoute /> },
      { path: '/app/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
