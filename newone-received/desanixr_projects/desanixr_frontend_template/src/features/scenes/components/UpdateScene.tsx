import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField, TextAreaField, DxrSelectField } from '@/components/Form';
import { useImages } from '@/features/images'; // N
import { Authorization, ROLES } from '@/lib/authorization';

import { useScene } from '../api/getScene';
import { UpdateSceneDTO, useUpdateScene } from '../api/updateScene';

type UpdateSceneProps = {
  sceneId?: string;
};

const schema = z.object({
  sceneName: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  imageId: z.string().min(1, 'Required'),
});

export const UpdateScene = ({ sceneId }: UpdateSceneProps) => {
  const sceneQuery = useScene({ sceneId });
  const updateSceneMutation = useUpdateScene();
  const imagesQuery = useImages(); // N

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateSceneMutation.isSuccess}
        triggerButton={
          <DxrButton
            className="dxr-button-reduce-mt"
            startIcon={<PencilIcon className="h-4 w-4" />}
            size="sm"
          >
            Update Scene
          </DxrButton>
        }
        title="Update Scene"
        submitButton={
          <DxrButton
            form="update-scene"
            type="submit"
            size="sm"
            isLoading={updateSceneMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<UpdateSceneDTO['data'], typeof schema>
          id="update-scene"
          onSubmit={async (values) => {
            await updateSceneMutation.mutateAsync({ data: values, sceneId });
          }}
          options={{
            defaultValues: {
              sceneName: sceneQuery.data?.sceneName,
              imageId: sceneQuery.data?.imageId,
              imageTitle: sceneQuery.data?.imageTitle,
              description: sceneQuery.data?.description,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="SceneName"
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
                        return (
                          e.imageType === 1 &&
                          (e.fileName.toLowerCase().indexOf('.gltf') >= 0 ||
                            e.fileName.toLowerCase().indexOf('.glb') >= 0)
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

              {/* <InputField
                label="Select Image"
                error={formState.errors['imageId']}
                registration={register('imageId')}
              /> */}
            </>
          )}
        </DxrForm>
      </FormDrawer>
    </Authorization>
  );
};
