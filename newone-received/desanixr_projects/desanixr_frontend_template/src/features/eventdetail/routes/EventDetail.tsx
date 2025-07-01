import { useParams } from 'react-router-dom';

import { DxrSpinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';

import { useEventDetail } from '../api/getEventDetail';
// import { useEventImages } from '../api/getEventImages';
import { UpdateEventDetail } from '../components/UpdateEventDetail';

export const EventDetail = () => {
  const { eventDetailId }: { eventDetailId?: string } = useParams();
  const eventDetailQuery = useEventDetail({ eventDetailId });
  // const eventImagesQuery = useEventImages({ eventId: eventDetailId });

  if (eventDetailQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!eventDetailQuery.data) return null;

  return (
    <>
      <Head title={eventDetailQuery.data.name} />
      <ContentLayout title={eventDetailQuery.data.name}>
        {/* <span className="text-xs font-bold">{formatDateTime(eventDetailQuery.data.createdAt)}</span> */}
        <div className="flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateEventDetail eventDetailId={eventDetailId} />
          </div>
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 view-contentlayout">
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                  <MDPreview value={eventDetailQuery.data.description} />
                </div>
              </div>
              {eventDetailQuery.data.imagePath !== undefined ? (
                <div className="p-4 bg-gray-200">
                  <img
                    width={800}
                    height={800}
                    src={eventDetailQuery.data.imagePath}
                    alt="Not found"
                  />
                </div>
              ) : (
                ''
              )}
              {/* {eventImagesQuery.data !== undefined ? (
                <ul>
                  {eventImagesQuery.data.map(function (item, index) {
                    return (
                      <li className="eventDetailImage" key={'li-' + index}>
                        {item.fileName}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ''
              )} */}
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
