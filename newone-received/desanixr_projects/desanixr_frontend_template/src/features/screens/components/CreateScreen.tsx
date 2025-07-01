import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField, DxrSelectField, TextAreaField } from '@/components/Form';
import { useImages } from '@/features/images';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateScreenDTO, useCreateScreen } from '../api/createScreen';

const schema = z.object({
  screenName: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  imageId: z.string(),
});

export const CreateScreen = () => {
  const createScreenMutation = useCreateScreen();
  const imagesQuery = useImages();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createScreenMutation.isSuccess}
        triggerButton={
          <DxrButton
            size="sm"
            className="dxr-button-reduce-mt"
            startIcon={<PlusIcon className="h-4 w-4" />}
          >
            Create Screen
          </DxrButton>
        }
        title="Create Screen"
        submitButton={
          <DxrButton
            form="create-screen"
            type="submit"
            size="sm"
            isLoading={createScreenMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<CreateScreenDTO['data'], typeof schema>
          id="create-screen"
          onSubmit={async (values) => {
            await createScreenMutation.mutateAsync({ data: values });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Sceen Name"
                error={formState.errors['screenName']}
                registration={register('screenName')}
              />

              <TextAreaField
                label="Description"
                error={formState.errors['description']}
                registration={register('description')}
              />
              {imagesQuery.data ? (
                <div>
                  <DxrSelectField
                    label="Image"
                    error={formState.errors['imageId']}
                    registration={register('imageId')}
                    options={imagesQuery.data
                      .filter((e) => {
                        return (
                          e.imageType === 1 &&
                          (e.fileName.toLowerCase().indexOf('.gltf') <= 0 ||
                            e.fileName.toLowerCase().indexOf('.glb') <= 0)
                        );
                      })
                      .map((image) => ({
                        label: image.imageTitle,
                        value: image._id,
                      }))}
                  />
                </div>
              ) : (
                'No Image Found'
              )}
            </>
          )}
        </DxrForm>
      </FormDrawer>
    </Authorization>
  );
};
