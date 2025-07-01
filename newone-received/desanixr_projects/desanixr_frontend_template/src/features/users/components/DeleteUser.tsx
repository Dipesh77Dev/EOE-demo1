import { TrashIcon } from '@heroicons/react/outline';

import { DxrButton, ConfirmationDialog } from '@/components/Elements';
import { useAuth } from '@/lib/auth';

import { useDeleteUser } from '../api/deleteUser';

type DeleteUserProps = {
  _id: string;
};

export const DeleteUser = ({ _id }: DeleteUserProps) => {
  const { user } = useAuth();
  const deleteUserMutation = useDeleteUser();

  if (user?._id === _id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Are you sure you want to delete this user?"
      triggerButton={
        <DxrButton variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
          Delete
        </DxrButton>
      }
      confirmButton={
        <DxrButton
          isLoading={deleteUserMutation.isLoading}
          type="button"
          variant="danger"
          onClick={() => deleteUserMutation.mutate({ userId: _id })}
        >
          Delete User
        </DxrButton>
      }
    />
  );
};
