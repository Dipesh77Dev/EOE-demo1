import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField, FileField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateImageDTO, useCreateImage } from '../api/createImage';

const schema = z.object({
  imageTitle: z.string().min(1, 'Required'),
  fileData: z.any(),
});

export const CreateImage = () => {
  const createImageMutation = useCreateImage();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createImageMutation.isSuccess}
        triggerButton={
          <DxrButton
            className="sm dxr-button-reduce-mt"
            size="sm"
            startIcon={<PlusIcon className="h-4 w-4" />}
          >
            Create Image
          </DxrButton>
        }
        title="Create Image"
        submitButton={
          <DxrButton
            form="create-image"
            type="submit"
            size="sm"
            isLoading={createImageMutation.isLoading}
          >
            Submit Image
          </DxrButton>
        }
      >
        <DxrForm<CreateImageDTO['data'], typeof schema>
          id="create-image"
          onSubmit={async (values) => {
            await createImageMutation.mutateAsync({ data: values });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="imageTitle"
                error={formState.errors['imageTitle']}
                registration={register('imageTitle')}
              />

              <FileField
                type="file"
                label="Select File"
                // error={formState.errors['fileData']}
                registration={register('fileData')}
                isMultiple={false}
              />
            </>
          )}
        </DxrForm>
      </FormDrawer>
    </Authorization>
  );
};
