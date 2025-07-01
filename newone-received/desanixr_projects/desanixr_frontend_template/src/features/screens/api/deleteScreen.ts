import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Screen } from '../types';

export const deleteScreen = ({ screenId }: { screenId: string }) => {
  return axios.delete(`/screens/${screenId}`);
};

type UseDeleteScreenOptions = {
  config?: MutationConfig<typeof deleteScreen>;
};

export const useDeleteScreen = ({ config }: UseDeleteScreenOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedScreen) => {
      await queryClient.cancelQueries('screens');

      const previousScreens = queryClient.getQueryData<Screen[]>('screens');

      queryClient.setQueryData(
        'screens',
        previousScreens?.filter((screen) => screen._id !== deletedScreen.screenId)
      );

      return { previousScreens };
    },
    onError: (_, __, context: any) => {
      if (context?.previousScreens) {
        queryClient.setQueryData('screens', context.previousScreens);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('screens');
      addNotification({
        type: 'success',
        title: 'Screen Deleted',
      });
    },
    ...config,
    mutationFn: deleteScreen,
  });
};
