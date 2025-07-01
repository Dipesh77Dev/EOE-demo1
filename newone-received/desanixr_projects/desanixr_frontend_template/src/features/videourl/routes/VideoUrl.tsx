import { ContentLayout } from '@/components/Layout';

import { CreateVideoUrl } from '../components/CreateVideoUrl';
import { VideoUrlList } from '../components/VideoUrlList';

export const VideoUrl = () => {
  return (
    <ContentLayout title="VideoUrl">
      <div className="flex justify-end">
        <CreateVideoUrl />
      </div>
      <div className="mt-4">
        <VideoUrlList />
      </div>
    </ContentLayout>
  );
};
