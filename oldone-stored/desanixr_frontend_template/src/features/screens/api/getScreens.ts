import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Screen } from '../types';

export const getScreens = (): Promise<Screen[]> => {
  return axios.get('/screens');
};

type QueryFnType = typeof getScreens;

type UseScreensOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useScreens = ({ config }: UseScreensOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['screens'],
    queryFn: () => getScreens(),
  });
};
