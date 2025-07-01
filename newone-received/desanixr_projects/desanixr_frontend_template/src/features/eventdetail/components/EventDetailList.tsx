import { EyeIcon } from '@heroicons/react/outline';

import { DxrTable, DxrSpinner, DxrLink, DxrButton } from '@/components/Elements';
import { formatDateTime } from '@/utils/format';
// import { formatDateTime } from '@/utils/format';

import { useEventDetails } from '../api/getEventDetails';
import { EventDetail } from '../types';

import { DeleteEventDetail } from './DeleteEventDetail';

export const EventDetailsList = () => {
  const eventDetailsQuery = useEventDetails();

  if (eventDetailsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!eventDetailsQuery.data) return null;

  return (
    <DxrTable<EventDetail>
      data={eventDetailsQuery.data}
      columns={[
        {
          title: '',
          field: '_id',
          Cell({ entry: { _id: _id } }) {
            return (
              <DxrLink className="flex justify-center" to={`./${_id}`}>
                <DxrButton
                  variant="inverse"
                  startIcon={<EyeIcon className="h-4 w-4" />}
                ></DxrButton>
              </DxrLink>
            );
          },
        },
        {
          title: '',
          field: '_id',
          Cell({ entry: { _id: _id } }) {
            return (
              <div className="flex justify-center">
                <DeleteEventDetail _id={_id} />
              </div>
            );
          },
        },
        {
          title: 'Event Name',
          field: 'name',
        },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Event Type',
          field: 'eventType',
          alignment: 'text-center',
        },
        {
          title: 'Start-Time',
          field: 'startTime',
          Cell({ entry: { startTime } }) {
            return <span>{formatDateTime(startTime)}</span>;
          },
        },
        {
          title: 'End-Time',
          field: 'endTime',
          Cell({ entry: { endTime } }) {
            return <span>{formatDateTime(endTime)}</span>;
          },
        },
        {
          title: 'Event Content URL',
          field: 'eventContent',
        },
        {
          title: 'Is NFT Access',
          field: 'nftAccess',
          alignment: 'text-center',
        },
        {
          title: 'NFT Purchase URL',
          field: 'nftPurchaseUrl',
        },
        {
          title: 'NFT Address',
          field: 'nftAddress',
        },
      ]}
    />
  );
};
