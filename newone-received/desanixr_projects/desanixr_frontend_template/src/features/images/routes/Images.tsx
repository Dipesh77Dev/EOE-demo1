import { ContentLayout } from '@/components/Layout';

import { CreateImage } from '../components/CreateImage';
import { ImagesList } from '../components/ImagesList';

export const Images = () => {
  return (
    <ContentLayout title="Images">
      <div className="flex justify-end">
        <CreateImage />
      </div>
      <div className="mt-4">
        <ImagesList />
      </div>
    </ContentLayout>
  );
};
