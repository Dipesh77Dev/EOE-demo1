import { Meta, Story } from '@storybook/react';

import { useDisclosure } from '@/hooks/useDisclosure';

import { DxrButton } from '../Button';

import { Drawer } from './Drawer';

const meta: Meta = {
  title: 'Components/Elements/Drawer',
  component: Drawer,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Demo: Story = () => {
  const { close, open, isOpen } = useDisclosure();

  return (
    <>
      <DxrButton onClick={open}>Open Drawer</DxrButton>
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title="Sample Drawer"
        size="md"
        renderFooter={() => (
          <>
            <DxrButton variant="inverse" size="sm" onClick={close}>
              Cancel
            </DxrButton>
          </>
        )}
      >
        Hello
      </Drawer>
    </>
  );
};
