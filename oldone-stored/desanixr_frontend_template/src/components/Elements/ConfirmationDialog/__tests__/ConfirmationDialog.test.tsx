import { rtlRender, screen, userEvent, waitFor } from '@/test/test-utils';

import { DxrButton } from '../../Button';
import { ConfirmationDialog } from '../ConfirmationDialog';

test('should handle confirmation flow', async () => {
  const titleText = 'Are you sure?';
  const bodyText = 'Are you sure you want to delete this item?';
  const confirmationButtonText = 'Confirm';
  const openButtonText = 'Open';

  await rtlRender(
    <ConfirmationDialog
      icon="danger"
      title={titleText}
      body={bodyText}
      confirmButton={<DxrButton>{confirmationButtonText}</DxrButton>}
      triggerButton={<DxrButton>{openButtonText}</DxrButton>}
    />
  );

  expect(screen.queryByText(titleText)).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: openButtonText }));

  expect(screen.getByText(titleText)).toBeInTheDocument();

  expect(screen.getByText(bodyText)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

  await waitFor(() => expect(screen.queryByText(titleText)).not.toBeInTheDocument());

  expect(screen.queryByText(bodyText)).not.toBeInTheDocument();
});
