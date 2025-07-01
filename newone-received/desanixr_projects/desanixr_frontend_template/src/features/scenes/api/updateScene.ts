import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Scene } from '../types';

export type UpdateSceneDTO = {
  data: {
    sceneName: string;
    description: string;
    imageId: string;
    imageTitle: string;
  };
  sceneId?: string;
};

export const updateScene = ({ data, sceneId }: UpdateSceneDTO): Promise<Scene> => {
  return axios.patch(`/scenes/${sceneId}`, data);
};

type UseUpdateSceneOptions = {
  config?: MutationConfig<typeof updateScene>;
};

export const useUpdateScene = ({ config }: UseUpdateSceneOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingScene: any) => {
      await queryClient.cancelQueries(['scene', updatingScene?.sceneId]);

      const previousScene = queryClient.getQueryData<Screen>(['scene', updatingScene?.sceneId]);

      queryClient.setQueryData(['scene', updatingScene?.sceneId], {
        ...previousScene,
        ...updatingScene.data,
        _id: updatingScene.sceneId,
      });

      return { previousScene };
    },
    onError: (_, __, context: any) => {
      if (context?.previousScene) {
        queryClient.setQueryData(['scene', context.previousScene._id], context.previousScene);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['scene', data._id]);
      addNotification({
        type: 'success',
        title: 'Scene Updated',
      });
    },
    ...config,
    mutationFn: updateScene,
  });
};
