import { useParams } from 'react-router-dom';

import { DxrSpinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
import { formatDate } from '@/utils/format';

import { useScreen } from '../api/getScreen';
import { UpdateScreen } from '../components/UpdateScreen';

export const Screen = () => {
  const { screenId } = useParams();
  const screenQuery = useScreen({ screenId });

  if (screenQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!screenQuery.data) return null;

  return (
    <>
      <Head title={screenQuery.data.screenName} />
      <ContentLayout title={screenQuery.data.screenName}>
        <span className="text-xs font-bold">{formatDate(screenQuery.data.createdAt)}</span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateScreen screenId={screenId} />
          </div>
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                  <MDPreview value={screenQuery.data.description} />
                  {'My Testing'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
