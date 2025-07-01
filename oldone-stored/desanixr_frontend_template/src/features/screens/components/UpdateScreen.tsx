import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField, TextAreaField, DxrSelectField } from '@/components/Form';
import { useImages } from '@/features/images'; // N
import { Authorization, ROLES } from '@/lib/authorization';

import { useScreen } from '../api/getScreen';
import { UpdateScreenDTO, useUpdateScreen } from '../api/updateScreen';

type UpdateScreenProps = {
  screenId: string;
};

const schema = z.object({
  screenName: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  imageId: z.string().min(1, 'Required'),
});

export const UpdateScreen = ({ screenId }: UpdateScreenProps) => {
  const screenQuery = useScreen({ screenId });
  const updateScreenMutation = useUpdateScreen();
  const imagesQuery = useImages(); // N

  //console.log('UpdateScreen');
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateScreenMutation.isSuccess}
        triggerButton={
          <DxrButton startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
            Update Screen
          </DxrButton>
        }
        title="Update Screen"
        submitButton={
          <DxrButton
            form="update-screen"
            type="submit"
            size="sm"
            isLoading={updateScreenMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<UpdateScreenDTO['data'], typeof schema>
          id="update-screen"
          onSubmit={async (values) => {
            console.log('values', values);
            await updateScreenMutation.mutateAsync({ data: values, screenId });
          }}
          options={{
            defaultValues: {
              screenName: screenQuery.data?.screenName,
              imageId: screenQuery.data?.imageId,
              imageTitle: screenQuery.data?.imageTitle,
              description: screenQuery.data?.description,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="ScreenName"
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
                        return e.fileName.toLowerCase().indexOf('.png') >= 0;
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
