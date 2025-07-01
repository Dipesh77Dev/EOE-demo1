import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Scene } from '../types';

export const getScene = ({ sceneId }: { sceneId: string }): Promise<Scene> => {
  return axios.get(`/scenes/${sceneId}`);
};

type QueryFnType = typeof getScene;

type UseSceneOptions = {
  sceneId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useScene = ({ sceneId, config }: UseSceneOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['scene', sceneId],
    queryFn: () => getScene({ sceneId }),
  });
};
