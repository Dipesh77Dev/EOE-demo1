import { TrashIcon } from '@heroicons/react/outline';

import { DxrButton, ConfirmationDialog } from '@/components/Elements';

import { useDeleteComment } from '../api/deleteComment';

type DeleteCommentProps = {
  _id: string;
  discussionId?: string;
};

export const DeleteComment = ({ _id, discussionId }: DeleteCommentProps) => {
  const deleteCommentMutation = useDeleteComment({ discussionId });

  return (
    <ConfirmationDialog
      isDone={deleteCommentMutation.isSuccess}
      icon="danger"
      title="Delete Comment"
      body="Are you sure you want to delete this comment?"
      triggerButton={
        <DxrButton variant="danger" size="sm" startIcon={<TrashIcon className="h-4 w-4" />}>
          Delete Comment
        </DxrButton>
      }
      confirmButton={
        <DxrButton
          isLoading={deleteCommentMutation.isLoading}
          type="button"
          variant="danger"
          onClick={async () => await deleteCommentMutation.mutateAsync({ commentId: _id })}
        >
          Delete Comment
        </DxrButton>
      }
    />
  );
};
