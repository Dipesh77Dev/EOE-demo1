import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Scene } from '../types';

export const deleteScene = ({ sceneId }: { sceneId?: string }) => {
  return axios.delete(`/scenes/${sceneId}`);
};

type UseDeleteSceneOptions = {
  config?: MutationConfig<typeof deleteScene>;
};

export const useDeleteScene = ({ config }: UseDeleteSceneOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedScene) => {
      await queryClient.cancelQueries('scenes');

      const previousScenes = queryClient.getQueryData<Scene[]>('scenes');

      queryClient.setQueryData(
        'scenes',
        previousScenes?.filter((scene) => scene._id !== deletedScene.sceneId)
      );

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
        title: 'Scene Deleted',
      });
    },
    ...config,
    mutationFn: deleteScene,
  });
};
