import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

export type UpdateVideoUrlDTO = {
  data: {
    playStatus: number;
  };
  videoUrlId: string;
};

export const updateVideoUrl = ({ videoUrlId, data }: UpdateVideoUrlDTO) => {
  return axios.patch(`/videourl/${videoUrlId}`, data);
};

type UseUpdateVideoUrlOptions = {
  config?: MutationConfig<typeof updateVideoUrl>;
};

export const useUpdateVideoUrl = ({ config }: UseUpdateVideoUrlOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('videourls');
      addNotification({
        type: 'success',
        title: 'VideoUrl Updated',
      });
    },
    ...config,
    mutationFn: updateVideoUrl,
  });
};
