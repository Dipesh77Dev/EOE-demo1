import * as React from 'react';

import { useDisclosure } from '@/hooks/useDisclosure';
import { rtlRender, screen, userEvent, waitFor } from '@/test/test-utils';

import { DxrButton } from '../../Button';
import { DxrDialog, DialogTitle } from '../Dialog';

const openButtonText = 'Open Modal';
const cancelButtonText = 'Cancel';
const titleText = 'Modal Title';

const TestDialog = () => {
  const { close, open, isOpen } = useDisclosure();
  const cancelButtonRef = React.useRef(null);

  return (
    <>
      <DxrButton onClick={open}>{openButtonText}</DxrButton>
      <DxrDialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div>
          <DialogTitle as="h3">{titleText}</DialogTitle>

          <DxrButton type="button" onClick={close} ref={cancelButtonRef}>
            {cancelButtonText}
          </DxrButton>
        </div>
      </DxrDialog>
    </>
  );
};

test('should handle basic dialog flow', async () => {
  await rtlRender(<TestDialog />);

  expect(screen.queryByText(titleText)).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: openButtonText }));

  expect(screen.getByText(titleText)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: cancelButtonText }));

  await waitFor(() => expect(screen.queryByText(titleText)).not.toBeInTheDocument());
});
