import { useParams as useMockParams } from 'react-router-dom';

import {
  render,
  screen,
  userEvent,
  waitFor,
  createScreen,
  createUser,
  within,
} from '@/test/test-utils';

import { Screen } from '../Screen';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // keep the rest of the exports intact
  useParams: jest.fn(),
}));

const renderScreen = async () => {
  const fakeUser = await createUser();
  const fakeScreen = await createScreen({ teamId: fakeUser.teamId });

  (useMockParams as jest.Mock).mockImplementation(() => ({
    screenId: fakeScreen._id,
  }));

  const utils = await render(<Screen />, {
    user: fakeUser,
  });

  await screen.findByText(fakeScreen.screenName);

  return {
    ...utils,
    fakeUser,
    fakeScreen,
  };
};

test('should render screen', async () => {
  const { fakeScreen } = await renderScreen();
  expect(screen.getByText(fakeScreen.description)).toBeInTheDocument();
});

test('should update screen', async () => {
  const { fakeScreen } = await renderScreen();

  const screenNameUpdate = '-Updated';
  const descriptionUpdate = '-Updated';

  userEvent.click(screen.getByRole('button', { name: /update screen/i }));

  const drawer = screen.getByRole('dialog', {
    name: /update screen/i,
  });

  const screenNameField = within(drawer).getByText(/title/i);
  const descriptionField = within(drawer).getByText(/body/i);

  userEvent.type(screenNameField, screenNameUpdate);
  userEvent.type(descriptionField, descriptionUpdate);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const newScreenname = `${fakeScreen.screenName}${screenNameUpdate}`;
  const newDescription = `${fakeScreen.description}${descriptionUpdate}`;

  expect(screen.getByText(newScreenname)).toBeInTheDocument();
  expect(screen.getByText(newDescription)).toBeInTheDocument();
});

test('should create and delete a comment on the screen', async () => {
  await renderScreen();

  const comment = 'Hello World';

  userEvent.click(screen.getByRole('button', { name: /create comment/i }));

  const drawer = screen.getByRole('dialog', {
    name: /create comment/i,
  });

  const bodyField = within(drawer).getByText(/body/i);

  userEvent.type(bodyField, comment);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const commentsList = screen.getByRole('list', {
    name: 'comments',
  });

  const commentElements = within(commentsList).getAllByRole('listitem');

  const commentElement = commentElements[0];

  expect(commentElement).toBeInTheDocument();

  const deleteCommentButton = within(commentElement).getByRole('button', {
    name: /delete comment/i,
    exact: false,
  });

  userEvent.click(deleteCommentButton);

  const confirmationDialog = screen.getByRole('dialog', {
    name: /delete comment/i,
  });

  const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
    name: /delete/i,
  });

  userEvent.click(confirmationDeleteButton);

  await screen.findByText(/comment deleted/i);

  expect(within(commentsList).queryByText(comment)).not.toBeInTheDocument();
});
