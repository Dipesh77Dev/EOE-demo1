import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { VideoUrl } from '../types';

export const getVideoUrl = (): Promise<VideoUrl[]> => {
  return axios.get(`/videourl`);
};

type QueryFnType = typeof getVideoUrl;

type UseVideoUrlOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useVideoUrl = ({ config }: UseVideoUrlOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['videourls'],
    queryFn: () => getVideoUrl(),
  });
};
