import { TrashIcon } from '@heroicons/react/outline';

import { DxrButton, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteScene } from '../api/deleteScene';

type DeleteSceneProps = {
  _id: string;
};

export const DeleteScene = ({ _id }: DeleteSceneProps) => {
  const deleteSceneMutation = useDeleteScene();
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Scene"
        body="Are you sure you want to delete this scene?"
        triggerButton={
          <DxrButton variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Scene
          </DxrButton>
        }
        confirmButton={
          <DxrButton
            isLoading={deleteSceneMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteSceneMutation.mutateAsync({ sceneId: _id })}
          >
            Delete Scene
          </DxrButton>
        }
      />
    </Authorization>
  );
};
