import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { EventDetail } from '../types';

export const getEventDetails = (): Promise<EventDetail[]> => {
  return axios.get('/eventdetail');
};

type QueryFnType = typeof getEventDetails;

type UseEventDetailsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useEventDetails = ({ config }: UseEventDetailsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['eventdetails'],
    queryFn: () => getEventDetails(),
  });
};
