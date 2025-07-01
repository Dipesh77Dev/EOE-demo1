import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateVideoUrlDTO, useCreateVideoUrl } from '../api/createVideoUrl';

const schema = z.object({
  urlPath: z.string().min(1, 'Required'),
  playStatus: z.number(),
});

export const CreateVideoUrl = () => {
  const createVideoUrlMutation = useCreateVideoUrl();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createVideoUrlMutation.isSuccess}
        triggerButton={<DxrButton size="sm">Change VideoUrl</DxrButton>}
        title="Change VideoUrl"
        submitButton={
          <DxrButton
            form="create-videourl"
            type="submit"
            size="sm"
            isLoading={createVideoUrlMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<CreateVideoUrlDTO['data'], typeof schema>
          id="create-videourl"
          onSubmit={async (values) => {
            await createVideoUrlMutation.mutateAsync({ data: values });
          }}
          schema={schema}
          options={{
            defaultValues: {
              urlPath: '',
              playStatus: 0,
            },
          }}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Url Path"
                error={formState.errors['urlPath']}
                registration={register('urlPath')}
              />
            </>
          )}
        </DxrForm>
      </FormDrawer>
    </Authorization>
  );
};
