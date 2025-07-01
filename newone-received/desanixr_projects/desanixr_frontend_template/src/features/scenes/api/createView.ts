import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Scene } from '../types';

export type CreateViewDTO = {
  data: {
    sceneName: string;
    description: string;
    imageId?: string;
  };
};

export const createView = ({ data }: CreateViewDTO): Promise<Screen> => {
  return axios.post(`/scenes`, data);
};

type UseCreateViewOptions = {
  config?: MutationConfig<typeof createView>;
};

export const useCreateView = ({ config }: UseCreateViewOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newView) => {
      await queryClient.cancelQueries('views');

      const previousViewes = queryClient.getQueryData<Scene[]>('view');

      queryClient.setQueryData('view', [...(previousViewes || []), newView.data]);

      return { previousViewes };
    },
    onError: (_, __, context: any) => {
      if (context?.previousViewes) {
        queryClient.setQueryData('viewes', context.previousViewes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('viewes');
      addNotification({
        type: 'success',
        title: 'Scene Created',
      });
    },
    ...config,
    mutationFn: createView,
  });
};
