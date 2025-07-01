import { useParams } from 'react-router-dom';

import { DxrSpinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
import { formatDateTime } from '@/utils/format';

import { useScene } from '../api/getScene';
import { UpdateScene } from '../components/UpdateScene';

export const Scene = () => {
  const { sceneId }: { sceneId?: string } = useParams();
  const sceneQuery = useScene({ sceneId });

  if (sceneQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!sceneQuery.data) return null;

  return (
    <>
      <Head title={sceneQuery.data.sceneName} />
      <ContentLayout title={sceneQuery.data.sceneName}>
        <span className="text-xs font-bold">{formatDateTime(sceneQuery.data.createdAt)}</span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateScene sceneId={sceneId} />
          </div>
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 view-contentlayout">
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                  <MDPreview value={sceneQuery.data.description} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
