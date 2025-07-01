import { useDisclosure } from '@/hooks/useDisclosure';
import { rtlRender, screen, userEvent, waitFor } from '@/test/test-utils';

import { DxrButton } from '../../Button';
import { Drawer } from '../Drawer';

const openButtonText = 'Open Drawer';
const titleText = 'Drawer Title';
const cancelButtonText = 'Cancel';
const drawerContentText = 'Hello From Drawer';

const TestDrawer = () => {
  const { close, open, isOpen } = useDisclosure();

  return (
    <>
      <DxrButton onClick={open}>{openButtonText}</DxrButton>
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title={titleText}
        size="md"
        renderFooter={() => (
          <>
            <DxrButton variant="inverse" size="sm" onClick={close}>
              {cancelButtonText}
            </DxrButton>
          </>
        )}
      >
        {drawerContentText}
      </Drawer>
    </>
  );
};

test('should handle basic drawer flow', async () => {
  await rtlRender(<TestDrawer />);

  expect(screen.queryByText(titleText)).not.toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', {
      name: openButtonText,
    })
  );

  expect(screen.getByText(titleText)).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', {
      name: cancelButtonText,
    })
  );

  await waitFor(() => expect(screen.queryByText(titleText)).not.toBeInTheDocument());
});
