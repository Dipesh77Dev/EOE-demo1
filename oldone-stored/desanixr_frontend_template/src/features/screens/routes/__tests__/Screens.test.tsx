import { screenGenerator } from '@/test/data-generators';
import { render, screen, userEvent, waitFor, within } from '@/test/test-utils';
import { formatDate } from '@/utils/format';

import { Screens } from '../Screens';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

test('should create, render and delete screens', async () => {
  await render(<Screens />);

  const newScreens = screenGenerator();

  expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /create screen/i }));

  const drawer = screen.getByRole('dialog', {
    name: /create screen/i,
  });

  const screenNameField = within(drawer).getByText(/screenName/i);
  const descriptionField = within(drawer).getByText(/description/i);

  userEvent.type(screenNameField, newScreens.screenName);
  userEvent.type(descriptionField, newScreens.description);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const row = screen.getByRole('row', {
    name: `${newScreens.screenName} ${formatDate(newScreens.createdAt)} View Delete Screen`,
  });

  expect(
    within(row).getByRole('cell', {
      name: newScreens.screenName,
    })
  ).toBeInTheDocument();

  userEvent.click(
    within(row).getByRole('button', {
      name: /delete screen/i,
    })
  );

  const confirmationDialog = screen.getByRole('dialog', {
    name: /delete screen/i,
  });

  const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
    name: /delete screen/i,
  });

  userEvent.click(confirmationDeleteButton);

  await screen.findByText(/screen deleted/i);

  expect(
    within(row).queryByRole('cell', {
      name: newScreens.screenName,
    })
  ).not.toBeInTheDocument();
});
