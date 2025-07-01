import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Screen } from '../types';

export const getScreen = ({ screenId }: { screenId?: string }): Promise<Screen> => {
  return axios.get(`/screens/${screenId}`);
};

type QueryFnType = typeof getScreen;

type UseScreenOptions = {
  screenId?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useScreen = ({ screenId, config }: UseScreenOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['screen', screenId],
    queryFn: () => getScreen({ screenId }),
  });
};
