import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FileField, FormDrawer } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

// import { useImage } from '../api/getImage';
import { UpdateImageDTO, useUpdateImage } from '../api/updateImage';

type UpdateImageProps = {
  imageId?: string;
};

const schema = z.object({
  // imageTitle: z.string().min(1, 'Required'),
  fileData: z.any(),
});

export const UpdateImage = ({ imageId }: UpdateImageProps) => {
  // const imageQuery = useImage({ imageId });
  const updateImageMutation = useUpdateImage();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateImageMutation.isSuccess}
        triggerButton={
          <DxrButton
            className="dxr-button-reduce-mt"
            startIcon={<PencilIcon className="h-4 w-4" />}
            size="sm"
          >
            Update Image
          </DxrButton>
        }
        title="Update Image"
        submitButton={
          <DxrButton
            form="update-image"
            type="submit"
            size="sm"
            isLoading={updateImageMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<UpdateImageDTO['data'], typeof schema>
          id="update-image"
          onSubmit={async (values) => {
            await updateImageMutation.mutateAsync({ data: values, imageId });
          }}
          options={{
            defaultValues: {
              // imageTitle: imageQuery.data?.imageTitle,
            },
          }}
          schema={schema}
        >
          {({ register }) => (
            <>
              {/* <InputField
                label="imageTitle"
                error={formState.errors['imageTitle']}
                registration={register('imageTitle')}
              /> */}
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
