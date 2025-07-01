import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { EventDetail } from '../types';

export type UpdateEventDetailDTO = {
  data: {
    name: string;
    description: string;
    eventType: string;
    startTime: Date;
    endTime: Date;
    nftAccess: string;
    nftPurchaseUrl: string;
    nftAddress: string;
    eventContent: string;
    imagePath: string;
    fileData: FileList;
  };
  eventDetailId?: string;
};

export const updateEventDetail = ({
  data,
  eventDetailId,
}: UpdateEventDetailDTO): Promise<EventDetail> => {
  return axios.patch(`/eventdetail/${eventDetailId}`, data);
};

type UseUpdateEventDetailOptions = {
  config?: MutationConfig<typeof updateEventDetail>;
};

export const useUpdateEventDetail = ({ config }: UseUpdateEventDetailOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingEventDetail: any) => {
      await queryClient.cancelQueries(['eventdetail', updatingEventDetail?.eventDetailId]);

      const previousEventDetail = queryClient.getQueryData<EventDetail>([
        'eventdetail',
        updatingEventDetail?.eventDetailId,
      ]);

      queryClient.setQueryData(['eventdetail', updatingEventDetail?.eventDetailId], {
        ...previousEventDetail,
        ...updatingEventDetail.data,
        _id: updatingEventDetail.eventDetailId,
      });

      return { previousEventDetail };
    },
    onError: (_, __, context: any) => {
      if (context?.previousEventDetail) {
        queryClient.setQueryData(
          ['eventdetail', context.previousEventDetail._id],
          context.previousEventDetail
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['eventdetail', data._id]);
      addNotification({
        type: 'success',
        title: 'EventDetail Updated',
      });
    },
    ...config,
    mutationFn: updateEventDetail,
  });
};
