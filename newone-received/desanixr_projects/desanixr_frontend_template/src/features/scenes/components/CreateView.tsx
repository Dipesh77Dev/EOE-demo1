import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField, DxrSelectField, TextAreaField } from '@/components/Form';
import { useImages } from '@/features/images';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateViewDTO, useCreateView } from '../api/createView';

const schema = z.object({
  viewName: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  imageId: z.string(),
});

export const CreateView = () => {
  const createViewMutation = useCreateView();
  const imagesQuery = useImages();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createViewMutation.isSuccess}
        triggerButton={
          <DxrButton
            size="sm"
            className="dxr-button-reduce-mt"
            startIcon={<PlusIcon className="h-4 w-4" />}
          >
            Create View
          </DxrButton>
        }
        title="Create View"
        submitButton={
          <DxrButton
            form="create-view"
            type="submit"
            size="sm"
            isLoading={createViewMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<CreateViewDTO['data'], typeof schema>
          id="create-view"
          onSubmit={async (values) => {
            await createViewMutation.mutateAsync({ data: values });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="View Name"
                error={formState.errors['sceneName']}
                registration={register('sceneName')}
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
                        return e.imageType === 1 && e.fileName.toLowerCase().indexOf('.gltf') >= 0;
                      })
                      .map((image) => ({
                        label: image.imageTitle,
                        value: image._id,
                      }))}
                  />
                  <br />
                  <div>
                    <img
                      width={200}
                      height={200}
                      src={imagesQuery.data[0].filePath}
                      alt={'Not found'}
                    />
                  </div>
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
