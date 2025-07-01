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
      triggerButton={<DxrButton variant="danger">Delete</DxrButton>}
      confirmButton={
        <DxrButton
          isLoading={deleteUserMutation.isLoading}
          type="button"
          className="bg-red-600"
          onClick={() => deleteUserMutation.mutate({ userId: _id })}
        >
          Delete User
        </DxrButton>
      }
    />
  );
};
