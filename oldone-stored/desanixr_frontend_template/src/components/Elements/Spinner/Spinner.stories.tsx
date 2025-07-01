import { Meta, Story } from '@storybook/react';

import { DxrSpinner, SpinnerProps } from './Spinner';

const meta: Meta = {
  title: 'Components/Elements/Spinner',
  component: DxrSpinner,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SpinnerProps> = (props) => <DxrSpinner {...props} />;

export const Default = Template.bind({});
Default.args = {};
