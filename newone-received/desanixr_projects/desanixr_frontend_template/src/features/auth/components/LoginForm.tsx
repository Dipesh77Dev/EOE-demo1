import * as z from 'zod';

import { DxrButton, DxrLink } from '@/components/Elements';
import { DxrForm, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  return (
    <div>
      <DxrForm<LoginValues, typeof schema>
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <DxrButton isLoading={isLoggingIn} type="submit" className="w-full">
                Log in
              </DxrButton>
            </div>
          </>
        )}
      </DxrForm>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <DxrLink to="../register" className="font-medium">
            Register
          </DxrLink>
        </div>
      </div>
    </div>
  );
};
