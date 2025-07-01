import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Image } from '../../images/types';
import { EventDetail } from '../types';

export type AddEventImagesDTO = {
  data: {
    eventId: string;
    fileData: FileList;
  };
};

export const addEventImages = ({ data }: AddEventImagesDTO): Promise<EventDetail> => {
  const formData = new FormData();
  formData.append('eventId', data.eventId);
  formData.append('fileData', data.fileData[0]);
  return axios.post(`/eventdetail/updateimage`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UseCreateImageOptions = {
  config?: MutationConfig<typeof addEventImages>;
};

export const useAddEventImages = ({ config }: UseCreateImageOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newImage) => {
      await queryClient.cancelQueries('images');
      queryClient.refetchQueries(['eventdetail', newImage.data.eventId]);

      const previousImages = queryClient.getQueryData<Image[]>('images');

      queryClient.setQueryData('images', [...(previousImages || []), newImage.data]);

      return { previousImages };
    },
    onError: (_, __, context: any) => {
      if (context?.previousImages) {
        queryClient.setQueryData('images', context.previousImages);
      }
    },
    onSuccess: (eventId) => {
      queryClient.invalidateQueries('images');
      console.log('Test-naresh onsuccess', eventId);
      // queryClient.refetchQueries(['eventdetail', eventId]);

      addNotification({
        type: 'success',
        title: 'Image Created',
      });
    },
    ...config,
    mutationFn: addEventImages,
  });
};
