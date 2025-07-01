import { ContentLayout } from '@/components/Layout';

import { CreateEventDetail } from '../components/CreateEventDetail';
import { EventDetailsList } from '../components/EventDetailList';

export const EventDetails = () => {
  return (
    <ContentLayout title="EventDetails">
      <div className="flex justify-end">
        <CreateEventDetail />
      </div>
      <div className="mt-4">
        <EventDetailsList />
      </div>
    </ContentLayout>
  );
};
