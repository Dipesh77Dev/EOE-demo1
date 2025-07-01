import { Meta, Story } from '@storybook/react';

import { DxrLink } from './Link';

const meta: Meta = {
  title: 'Components/Elements/Link',
  component: DxrLink,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = (props) => (
  <DxrLink to="/" {...props}>
    Hello
  </DxrLink>
);

export const Default = Template.bind({});
Default.args = {};
