import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDiscussion } from '../api/getDiscussion';
import { UpdateDiscussionDTO, useUpdateDiscussion } from '../api/updateDiscussion';

type UpdateDiscussionProps = {
  discussionId: string;
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export const UpdateDiscussion = ({ discussionId }: UpdateDiscussionProps) => {
  const discussionQuery = useDiscussion({ discussionId });
  const updateDiscussionMutation = useUpdateDiscussion();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateDiscussionMutation.isSuccess}
        triggerButton={
          <DxrButton startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
            Update Discussion
          </DxrButton>
        }
        title="Update Discussion"
        submitButton={
          <DxrButton
            form="update-discussion"
            type="submit"
            size="sm"
            isLoading={updateDiscussionMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<UpdateDiscussionDTO['data'], typeof schema>
          id="update-discussion"
          onSubmit={async (values) => {
            await updateDiscussionMutation.mutateAsync({ data: values, discussionId });
          }}
          options={{
            defaultValues: {
              title: discussionQuery.data?.title,
              body: discussionQuery.data?.body,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />
              <TextAreaField
                label="Body"
                error={formState.errors['body']}
                registration={register('body')}
              />
            </>
          )}
        </DxrForm>
      </FormDrawer>
    </Authorization>
  );
};
