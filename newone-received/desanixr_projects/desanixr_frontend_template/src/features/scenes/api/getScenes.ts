import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Scene } from '../types';

export const getScenes = (): Promise<Scene[]> => {
  return axios.get('/scenes');
};

type QueryFnType = typeof getScenes;

type UseScenesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useScenes = ({ config }: UseScenesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['scenes'],
    queryFn: () => getScenes(),
  });
};
