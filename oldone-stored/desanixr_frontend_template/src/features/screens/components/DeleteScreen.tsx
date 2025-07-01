import { TrashIcon } from '@heroicons/react/outline';

import { DxrButton, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteScreen } from '../api/deleteScreen';

type DeleteScreenProps = {
  _id: string;
};

export const DeleteScreen = ({ _id }: DeleteScreenProps) => {
  const deleteScreenMutation = useDeleteScreen();
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Screen"
        body="Are you sure you want to delete this screen?"
        triggerButton={
          <DxrButton variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Screen
          </DxrButton>
        }
        confirmButton={
          <DxrButton
            isLoading={deleteScreenMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteScreenMutation.mutateAsync({ screenId: _id })}
          >
            Delete Screen
          </DxrButton>
        }
      />
    </Authorization>
  );
};
