import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { EventDetail } from '../types';

export type CreateEventDetailDTO = {
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
    // imagePath: string;
    fileData: FileList;
  };
};

export const createEventDetail = ({ data }: CreateEventDetailDTO): Promise<EventDetail> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('eventType', data.eventType);
  formData.append('startTime', data.startTime.toUTCString());
  formData.append('endTime', data.endTime.toUTCString());
  formData.append('nftAccess', data.nftAccess);
  formData.append('nftPurchaseUrl', data.nftPurchaseUrl);
  formData.append('nftAddress', data.nftAddress);
  formData.append('eventContent', data.eventContent);
  // formData.append('imagePath', data.imagePath);
  formData.append('fileData', data.fileData[0]);
  return axios.post(`/eventdetail`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UseCreateEventDetailOptions = {
  config?: MutationConfig<typeof createEventDetail>;
};

export const useCreateEventDetail = ({ config }: UseCreateEventDetailOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newEventDetail) => {
      await queryClient.cancelQueries('eventdetails');

      const previousEventDetails = queryClient.getQueryData<EventDetail[]>('eventdetails');

      queryClient.setQueryData('eventdetails', [
        ...(previousEventDetails || []),
        newEventDetail.data,
      ]);

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
        title: 'EventDetail Created',
      });
    },
    ...config,
    mutationFn: createEventDetail,
  });
};
