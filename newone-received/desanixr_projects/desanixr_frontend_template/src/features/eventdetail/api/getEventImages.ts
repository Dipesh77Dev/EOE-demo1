import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { EventImagesDetail } from '../types';

export const getEventImages = ({ eventId }: { eventId?: string }): Promise<EventImagesDetail[]> => {
  return axios.get(`/eventdetail/geteventimages/${eventId}`);
};

type QueryFnType = typeof getEventImages;

type UseEventImageOptions = {
  eventId?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useEventImages = ({ eventId, config }: UseEventImageOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['eventimage', eventId],
    queryFn: () => getEventImages({ eventId }),
  });
};
