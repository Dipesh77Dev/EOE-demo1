import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, TextAreaField } from '@/components/Form';

import { CreateCommentDTO, useCreateComment } from '../api/createComment';

const schema = z.object({
  body: z.string().min(1, 'Required'),
});

type CreateCommentProps = {
  discussionId?: string;
};

export const CreateComment = ({ discussionId }: CreateCommentProps) => {
  const createCommentMutation = useCreateComment({ discussionId });
  return (
    <>
      <FormDrawer
        isDone={createCommentMutation.isSuccess}
        triggerButton={
          <DxrButton
            size="sm"
            className="dxr-button-reduce-mt"
            startIcon={<PlusIcon className="h-4 w-4" />}
          >
            Create Comment
          </DxrButton>
        }
        title="Create Comment"
        submitButton={
          <DxrButton
            isLoading={createCommentMutation.isLoading}
            form="create-comment"
            type="submit"
            size="sm"
            disabled={createCommentMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<CreateCommentDTO['data'], typeof schema>
          id="create-comment"
          onSubmit={async (values) => {
            await createCommentMutation.mutateAsync({
              data: {
                body: values.body,
                discussionId,
              },
            });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <TextAreaField
              label="Body"
              error={formState.errors['body']}
              registration={register('body')}
            />
          )}
        </DxrForm>
      </FormDrawer>
    </>
  );
};
