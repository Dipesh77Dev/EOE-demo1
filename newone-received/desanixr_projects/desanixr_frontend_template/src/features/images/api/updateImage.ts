import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Image } from '../types';

export type UpdateImageDTO = {
  data: {
    // imageTitle: string;
    fileData: FileList;
  };
  imageId?: string;
};

export const updateImage = ({ data, imageId }: UpdateImageDTO): Promise<Image> => {
  const formData = new FormData();
  // formData.append('imageTitle', data.imageTitle);
  formData.append('fileData', data.fileData[0]);
  // return axios.patch(`/images/${imageId}`, data);
  return axios.patch(`/images/${imageId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UseUpdateImageOptions = {
  config?: MutationConfig<typeof updateImage>;
};

export const useUpdateImage = ({ config }: UseUpdateImageOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingImage: any) => {
      await queryClient.cancelQueries(['image', updatingImage?.imageId]);

      const previousImages = queryClient.getQueryData<Image>(['image', updatingImage?.imageId]);

      queryClient.setQueryData(['image', updatingImage?.imageId], {
        ...previousImages,
        ...updatingImage.data,
        _id: updatingImage.imageId,
      });

      return { previousImages };
    },
    onError: (_, __, context: any) => {
      if (context?.previousImages) {
        queryClient.setQueryData(['image', context.previousImages._id], context.previousImages);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['image', data._id]);
      addNotification({
        type: 'success',
        title: 'Image Updated',
      });
    },
    ...config,
    mutationFn: updateImage,
  });
};
