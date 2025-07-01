import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Image } from '../types';

export const deleteImage = ({ imageId }: { imageId: string }) => {
  return axios.delete(`/images/${imageId}`);
};

type UseDeleteImageOptions = {
  config?: MutationConfig<typeof deleteImage>;
};

export const useDeleteImage = ({ config }: UseDeleteImageOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedImage) => {
      await queryClient.cancelQueries('images');

      const previousImages = queryClient.getQueryData<Image[]>('images');

      queryClient.setQueryData(
        'images',
        previousImages?.filter((image) => image._id !== deletedImage.imageId)
      );

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
        title: 'image Deleted',
      });
    },
    ...config,
    mutationFn: deleteImage,
  });
};
