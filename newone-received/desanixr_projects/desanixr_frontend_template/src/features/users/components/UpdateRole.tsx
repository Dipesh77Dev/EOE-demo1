import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, DxrSelectField } from '@/components/Form';
import { useAuth } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';

import { UpdateRoleDTO, useUpdateRole } from '../api/updateRole';

const schema = z.object({
  role: z.string().min(1, 'Required'),
});

export const UpdateRole = () => {
  const { user } = useAuth();
  const updateRoleMutation = useUpdateRole();

  const roleArray = Object.keys(ROLES).map(function (x) {
    return ROLES[x];
  });
  return (
    <FormDrawer
      isDone={updateRoleMutation.isSuccess}
      triggerButton={
        <DxrButton startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Role
        </DxrButton>
      }
      title="Update Role"
      submitButton={
        <DxrButton
          form="update-role"
          type="submit"
          size="sm"
          isLoading={updateRoleMutation.isLoading}
        >
          Submit
        </DxrButton>
      }
    >
      <DxrForm<UpdateRoleDTO['data'], typeof schema>
        id="update-role"
        onSubmit={async (values) => {
          await updateRoleMutation.mutateAsync({ data: values, userId: user?._id });
        }}
        options={{
          defaultValues: {
            role: user?.role,
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <DxrSelectField
              label="Update Role"
              error={formState.errors['role']}
              registration={register('role')}
              options={roleArray.map((y) => ({
                label: y,
                value: y,
              }))}
            />
          </>
        )}
      </DxrForm>
    </FormDrawer>
  );
};
