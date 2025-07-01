import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Image } from '../types';

export type CreateImageDTO = {
  data: {
    imageTitle: string;
    fileData: FileList;
  };
};

export const createImage = ({ data }: CreateImageDTO): Promise<Image> => {
  const formData = new FormData();
  formData.append('imageTitle', data.imageTitle);
  formData.append('fileData', data.fileData[0]);
  return axios.post(`/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UseCreateImageOptions = {
  config?: MutationConfig<typeof createImage>;
};

export const useCreateImage = ({ config }: UseCreateImageOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newImage) => {
      await queryClient.cancelQueries('images');

      const previousImages = queryClient.getQueryData<Image[]>('images');

      queryClient.setQueryData('images', [...(previousImages || []), newImage.data]);

      return { previousImages };
    },
    onError: (_, __, context: any) => {
      if (context?.previousImages) {
        queryClient.setQueryData('images', context.previousImages);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('images');
      addNotification({
        type: 'success',
        title: 'Image Created',
      });
    },
    ...config,
    mutationFn: createImage,
  });
};
