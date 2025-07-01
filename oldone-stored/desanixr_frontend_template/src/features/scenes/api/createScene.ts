import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Scene } from '../types';

export type CreateSceneDTO = {
  data: {
    sceneName: string;
    description: string;
    imageId?: string;
  };
};

export const createScene = ({ data }: CreateSceneDTO): Promise<Screen> => {
  return axios.post(`/scenes`, data);
};

type UseCreateSceneOptions = {
  config?: MutationConfig<typeof createScene>;
};

export const useCreateScene = ({ config }: UseCreateSceneOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newScene) => {
      await queryClient.cancelQueries('scenes');

      const previousScenes = queryClient.getQueryData<Scene[]>('scene');

      queryClient.setQueryData('scene', [...(previousScenes || []), newScene.data]);

      return { previousScenes };
    },
    onError: (_, __, context: any) => {
      if (context?.previousScenes) {
        queryClient.setQueryData('scenes', context.previousScenes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('scenes');
      addNotification({
        type: 'success',
        title: 'Scene Created',
      });
    },
    ...config,
    mutationFn: createScene,
  });
};
