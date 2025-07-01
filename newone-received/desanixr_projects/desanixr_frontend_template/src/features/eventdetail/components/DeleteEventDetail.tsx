import { TrashIcon } from '@heroicons/react/outline';

import { DxrButton, ConfirmationDialog } from '@/components/Elements';
// import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteEventDetail } from '../api/deleteEventDetail';

type DeleteEventDetailProps = {
  _id: string;
};

export const DeleteEventDetail = ({ _id }: DeleteEventDetailProps) => {
  const deleteEventDetailMutation = useDeleteEventDetail();
  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
    <ConfirmationDialog
      icon="danger"
      title="Delete Event Detail"
      body="Are you sure you want to delete this event-detail?"
      triggerButton={
        <DxrButton variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}></DxrButton>
      }
      confirmButton={
        <DxrButton
          isLoading={deleteEventDetailMutation.isLoading}
          type="button"
          variant="danger"
          onClick={async () => await deleteEventDetailMutation.mutateAsync({ eventDetailId: _id })}
        >
          Delete Event Detail
        </DxrButton>
      }
    />
    // </Authorization>
  );
};
