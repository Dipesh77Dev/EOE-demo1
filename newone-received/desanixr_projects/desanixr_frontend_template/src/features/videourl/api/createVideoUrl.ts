import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { VideoUrl } from '../types';

export type CreateVideoUrlDTO = {
  data: {
    urlPath: string;
    playStatus: number;
  };
};

export const createVideoUrl = ({ data }: CreateVideoUrlDTO): Promise<VideoUrl> => {
  return axios.post(`/videourl`, data);
};

type UseCreateVideoUrlOptions = {
  config?: MutationConfig<typeof createVideoUrl>;
};

export const useCreateVideoUrl = ({ config }: UseCreateVideoUrlOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newVideoUrl) => {
      await queryClient.cancelQueries('videourls');

      const previousVideoUrls = queryClient.getQueryData<VideoUrl[]>('videourls');

      queryClient.setQueryData('videourls', [...(previousVideoUrls || []), newVideoUrl.data]);

      return { previousVideoUrls };
    },
    onError: (_, __, context: any) => {
      if (context?.previousVideoUrls) {
        queryClient.setQueryData('videourls', context.previousVideoUrls);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('videourls');
      addNotification({
        type: 'success',
        title: 'VideoUrl Created',
      });
    },
    ...config,
    mutationFn: createVideoUrl,
  });
};
