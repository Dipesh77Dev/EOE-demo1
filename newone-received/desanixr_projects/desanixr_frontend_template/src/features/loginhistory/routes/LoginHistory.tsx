import { ContentLayout } from '@/components/Layout';

import { LoginHistoryList } from '../components/LoginHistoryList';

export const LoginHistory = () => {
  return (
    <ContentLayout title="LoginHistory">
      <div className="mt-4">
        <LoginHistoryList />
      </div>
    </ContentLayout>
  );
};
