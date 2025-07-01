import { ContentLayout } from '@/components/Layout';

import { CreateScene } from '../components/CreateScene';
import { ScenesList } from '../components/SceneList';

export const Scenes = () => {
  return (
    <ContentLayout title="Scenes">
      <div className="flex justify-end">
        <CreateScene />
      </div>
      <div className="mt-4">
        <ScenesList />
      </div>
    </ContentLayout>
  );
};
