import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField, DxrSelectField, TextAreaField } from '@/components/Form';
import { useImages } from '@/features/images';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateSceneDTO, useCreateScene } from '../api/createScene';

const schema = z.object({
  sceneName: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  imageId: z.string(),
});

export const CreateScene = () => {
  const createSceneMutation = useCreateScene();
  const imagesQuery = useImages();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createSceneMutation.isSuccess}
        triggerButton={
          <DxrButton size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Scene
          </DxrButton>
        }
        title="Create Scene"
        submitButton={
          <DxrButton
            form="create-scene"
            type="submit"
            size="sm"
            isLoading={createSceneMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<CreateSceneDTO['data'], typeof schema>
          id="create-scene"
          onSubmit={async (values) => {
            await createSceneMutation.mutateAsync({ data: values });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Scene Name"
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
                    // onChange={(data) => {
                    //   console.log('I am called', data);
                    // }}
                    options={imagesQuery.data
                      .filter((e) => {
                        return e.fileName.toLowerCase().indexOf('.gltf') >= 0;
                      })
                      .map((image) => ({
                        label: image.imageTitle,
                        value: image._id,
                      }))}
                  />
                  {/* <br />
                  <div>
                    <img
                      width={200}
                      height={200}
                      src={API_URL + '/' + imagesQuery.data[0].filePath}
                      alt={'Not found'}
                    />
                  </div> */}
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
