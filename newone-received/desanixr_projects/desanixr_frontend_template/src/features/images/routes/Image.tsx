import { useParams } from 'react-router-dom';

import { DxrSpinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
// import { Comments } from '@/features/comments';
import { formatDateTime } from '@/utils/format';

import { useImage } from '../api/getImage';
import { UpdateImage } from '../components/UpdateImage';

export const Image = () => {
  const { imageId }: { imageId?: string } = useParams();
  const imageQuery = useImage({ imageId });

  if (imageQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!imageQuery.data) return null;

  return (
    <>
      <Head title={imageQuery.data.imageTitle} />
      <ContentLayout title={imageQuery.data.imageTitle}>
        <span className="text-xs font-bold">{formatDateTime(imageQuery.data.createdAt)}</span>
        <div className="flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateImage imageId={imageId} />
          </div>
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 view-contentlayout">
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                  <MDPreview value={imageQuery.data.fileName} />
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <Comments discussionId={discussionId} />
          </div> */}
        </div>
      </ContentLayout>
    </>
  );
};
