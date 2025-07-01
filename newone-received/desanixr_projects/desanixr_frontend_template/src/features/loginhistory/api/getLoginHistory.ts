import { useQuery } from 'react-query';

import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { LoginHistory } from '../types';

export const getLoginHistory = (userId: string): Promise<LoginHistory[]> => {
  return axios.get(`/auth/loginhistory/${userId}`);
};

type QueryFnType = typeof getLoginHistory;

type UseLoginHistoryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useLoginHistory = ({ config }: UseLoginHistoryOptions = {}) => {
  const { user } = useAuth();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['loginHistory'],
    queryFn: () => getLoginHistory(user?._id ?? ''),
  });
};
