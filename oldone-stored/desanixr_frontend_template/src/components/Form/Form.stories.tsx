import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { DxrButton } from '../Elements';

import { DxrForm } from './Form';
import { FormDrawer } from './FormDrawer';
import { InputField } from './InputField';
import { DxrSelectField } from './SelectField';
import { TextAreaField } from './TextareaField';

type FormValues = {
  title: string;
  description: string;
  type: string;
  content: string;
};

const MyForm = ({ hideSubmit = false }: { hideSubmit?: boolean }) => {
  return (
    <DxrForm<FormValues>
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <InputField
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />
          <TextAreaField
            label="Description"
            error={formState.errors['description']}
            registration={register('description')}
          />
          <DxrSelectField
            label="Team"
            error={formState.errors['type']}
            registration={register('type')}
            options={['A', 'B', 'C'].map((type) => ({
              label: type,
              value: type,
            }))}
          />

          {!hideSubmit && (
            <div>
              <DxrButton type="submit" className="w-full">
                Submit
              </DxrButton>
            </div>
          )}
        </>
      )}
    </DxrForm>
  );
};

const meta: Meta = {
  title: 'Components/Form',
  component: MyForm,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = () => <MyForm />;

export const Default = Template.bind({});
Default.args = {};

export const AsFormDrawer = () => {
  return (
    <FormDrawer
      triggerButton={<DxrButton>Open Form</DxrButton>}
      isDone={true}
      title="My Form"
      size="lg"
      submitButton={
        <DxrButton form="my-form" type="submit">
          Submit
        </DxrButton>
      }
    >
      <MyForm hideSubmit />
    </FormDrawer>
  );
};
