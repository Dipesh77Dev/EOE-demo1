import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Screen } from '../types';

export type UpdateScreenDTO = {
  data: {
    screenName: string;
    description: string;
    imageId: string;
    imageTitle: string;
  };
  screenId?: string;
};

export const updateScreen = ({ data, screenId }: UpdateScreenDTO): Promise<Screen> => {
  return axios.patch(`/screens/${screenId}`, data);
};

type UseUpdateScreenOptions = {
  config?: MutationConfig<typeof updateScreen>;
};

export const useUpdateScreen = ({ config }: UseUpdateScreenOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingScreen: any) => {
      await queryClient.cancelQueries(['screen', updatingScreen?.screenId]);

      const previousScreen = queryClient.getQueryData<Screen>(['screen', updatingScreen?.screenId]);

      queryClient.setQueryData(['screen', updatingScreen?.screenId], {
        ...previousScreen,
        ...updatingScreen.data,
        _id: updatingScreen.screenId,
      });

      return { previousScreen };
    },
    onError: (_, __, context: any) => {
      if (context?.previousScreen) {
        queryClient.setQueryData(['screen', context.previousScreen._id], context.previousScreen);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['screen', data._id]);
      addNotification({
        type: 'success',
        title: 'Screen Updated',
      });
    },
    ...config,
    mutationFn: updateScreen,
  });
};
