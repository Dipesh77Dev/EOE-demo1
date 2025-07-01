import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { EventDetail } from '../types';

export const getEventDetail = ({
  eventDetailId,
}: {
  eventDetailId?: string;
}): Promise<EventDetail> => {
  return axios.get(`/eventdetail/${eventDetailId}`);
};

type QueryFnType = typeof getEventDetail;

type UseEventDetailOptions = {
  eventDetailId?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useEventDetail = ({ eventDetailId, config }: UseEventDetailOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['eventdetail', eventDetailId],
    queryFn: () => getEventDetail({ eventDetailId }),
  });
};
