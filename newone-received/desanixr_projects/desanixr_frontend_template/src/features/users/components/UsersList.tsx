import { DxrTable, DxrSpinner } from '@/components/Elements';
import { formatDateTime } from '@/utils/format';

import { useUsers } from '../api/getUsers';
import { User } from '../types';

import { DeleteUser } from './DeleteUser';

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!usersQuery.data) return null;

  return (
    <div className="userList">
      <DxrTable<User>
        data={usersQuery.data}
        columns={[
          {
            title: 'First Name',
            field: 'firstName',
          },
          {
            title: 'Last Name',
            field: 'lastName',
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
            title: 'Contact',
            field: 'contact',
          },
          {
            title: 'Created At',
            field: 'createdAt',
            Cell({ entry: { createdAt } }) {
              return <span>{formatDateTime(createdAt)}</span>;
            },
          },
          {
            title: '',
            field: '_id',
            Cell({ entry: { _id: _id } }) {
              return (
                <div className="flex justify-center">
                  <DeleteUser _id={_id} />
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};
