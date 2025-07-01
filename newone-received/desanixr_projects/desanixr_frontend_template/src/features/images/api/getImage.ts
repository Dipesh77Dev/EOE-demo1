import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Image } from '../types';

export const getImage = ({ imageId }: { imageId?: string }): Promise<Image> => {
  return axios.get(`/images/${imageId}`);
};

type QueryFnType = typeof getImage;

type UseImageOptions = {
  imageId?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useImage = ({ imageId, config }: UseImageOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['image', imageId],
    queryFn: () => getImage({ imageId }),
  });
};
