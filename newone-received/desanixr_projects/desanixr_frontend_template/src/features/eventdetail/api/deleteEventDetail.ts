import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { EventDetail } from '../types';

export const deleteEventDetail = ({ eventDetailId }: { eventDetailId: string }) => {
  return axios.delete(`/eventdetail/${eventDetailId}`);
};

type UseDeleteEventDetailOptions = {
  config?: MutationConfig<typeof deleteEventDetail>;
};

export const useDeleteEventDetail = ({ config }: UseDeleteEventDetailOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedEventDetail) => {
      await queryClient.cancelQueries('eventdetails');

      const previousEventDetails = queryClient.getQueryData<EventDetail[]>('eventdetails');

      queryClient.setQueryData(
        'eventdetails',
        previousEventDetails?.filter(
          (eventDetail) => eventDetail._id !== deletedEventDetail.eventDetailId
        )
      );

      return { previousEventDetails };
    },
    onError: (_, __, context: any) => {
      if (context?.previousEventDetails) {
        queryClient.setQueryData('eventdetails', context.previousEventDetails);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('eventdetails');
      addNotification({
        type: 'success',
        title: 'EventDetail Deleted',
      });
    },
    ...config,
    mutationFn: deleteEventDetail,
  });
};
