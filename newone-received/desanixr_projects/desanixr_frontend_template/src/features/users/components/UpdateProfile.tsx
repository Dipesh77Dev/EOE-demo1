import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import { DxrForm, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

import { UpdateProfileDTO, useUpdateProfile } from '../api/updateProfile';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  contact: z.string().min(1, 'Required'),
  bio: z.string(),
});

export const UpdateProfile = () => {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <DxrButton startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </DxrButton>
      }
      title="Update Profile"
      submitButton={
        <DxrButton
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isLoading}
        >
          Submit
        </DxrButton>
      }
    >
      <DxrForm<UpdateProfileDTO['data'], typeof schema>
        id="update-profile"
        onSubmit={async (values) => {
          await updateProfileMutation.mutateAsync({ data: values, userId: user?._id });
        }}
        options={{
          defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            contact: user?.contact,
            bio: user?.bio,
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              label="Email Address"
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              label="Contact Number"
              type="text"
              error={formState.errors['contact']}
              registration={register('contact')}
            />

            <TextAreaField
              label="Bio"
              error={formState.errors['bio']}
              registration={register('bio')}
            />
          </>
        )}
      </DxrForm>
    </FormDrawer>
  );
};
