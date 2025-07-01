import { ContentLayout } from '@/components/Layout';

import { CreateScreen } from '../components/CreateScreen';
import { ScreensList } from '../components/ScreenList';

export const Screens = () => {
  return (
    <ContentLayout title="Screens">
      <div className="flex justify-end">
        <CreateScreen />
      </div>
      <div className="mt-4">
        <ScreensList />
      </div>
    </ContentLayout>
  );
};
