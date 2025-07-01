import { TrashIcon } from '@heroicons/react/outline';

import { DxrButton, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteDiscussion } from '../api/deleteDiscussion';

type DeleteDiscussionProps = {
  _id: string;
};

export const DeleteDiscussion = ({ _id }: DeleteDiscussionProps) => {
  const deleteDiscussionMutation = useDeleteDiscussion();
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Discussion"
        body="Are you sure you want to delete this discussion?"
        triggerButton={
          <DxrButton variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Discussion
          </DxrButton>
        }
        confirmButton={
          <DxrButton
            isLoading={deleteDiscussionMutation.isLoading}
            type="button"
            variant="danger"
            onClick={async () => await deleteDiscussionMutation.mutateAsync({ discussionId: _id })}
          >
            Delete Discussion
          </DxrButton>
        }
      />
    </Authorization>
  );
};
