import { TrashIcon } from '@heroicons/react/outline';

import { DxrButton, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteImage } from '../api/deleteImage';

type DeleteImageProps = {
  _id: string;
};

export const DeleteImage = ({ _id }: DeleteImageProps) => {
  const deleteImageMutation = useDeleteImage();
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Image"
        body="Are you sure you want to delete this Image?"
        triggerButton={
          <DxrButton variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Image
          </DxrButton>
        }
        confirmButton={
          <DxrButton
            isLoading={deleteImageMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteImageMutation.mutateAsync({ imageId: _id })}
          >
            Delete Image
          </DxrButton>
        }
      />
    </Authorization>
  );
};
