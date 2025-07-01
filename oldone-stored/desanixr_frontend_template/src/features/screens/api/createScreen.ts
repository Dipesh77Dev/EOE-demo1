import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Screen } from '../types';

export type CreateScreenDTO = {
  data: {
    screenName: string;
    description: string;
    imageId?: string;
  };
};

export const createScreen = ({ data }: CreateScreenDTO): Promise<Screen> => {
  return axios.post(`/screens`, data);
};

type UseCreateScreenOptions = {
  config?: MutationConfig<typeof createScreen>;
};

export const useCreateScreen = ({ config }: UseCreateScreenOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newScreen) => {
      await queryClient.cancelQueries('screens');

      const previousScreens = queryClient.getQueryData<Screen[]>('screen');

      queryClient.setQueryData('screen', [...(previousScreens || []), newScreen.data]);

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
        title: 'Screen Created',
      });
    },
    ...config,
    mutationFn: createScreen,
  });
};
