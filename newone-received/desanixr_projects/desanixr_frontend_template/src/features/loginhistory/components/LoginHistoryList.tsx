import { DxrTable, DxrSpinner } from '@/components/Elements';
import { formatDateTime } from '@/utils/format';

import { useLoginHistory } from '../api/getLoginHistory';
import { LoginHistory } from '../types';

export const LoginHistoryList = () => {
  const loginHistoryQuery = useLoginHistory();

  if (loginHistoryQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!loginHistoryQuery.data) return null;

  return (
    <div>
      <DxrTable<LoginHistory>
        data={loginHistoryQuery.data}
        columns={[
          {
            title: 'User Id',
            field: 'userId',
          },
          {
            title: 'Email',
            field: 'email',
          },
          {
            title: 'Role',
            field: 'role',
          },
          {
            title: 'Login Time',
            field: 'loginTime',
            Cell({ entry: { loginTime } }) {
              return <span>{formatDateTime(loginTime)}</span>;
            },
          },
          {
            title: 'Logout Time',
            field: 'logoutTime',
            Cell({ entry: { logoutTime } }) {
              return <span>{formatDateTime(logoutTime)}</span>;
            },
          },
        ]}
      />
    </div>
  );
};
