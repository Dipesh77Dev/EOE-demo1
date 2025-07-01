import { authHandlers } from './auth';
import { commentsHandlers } from './comments';
import { discussionsHandlers } from './discussions';
import { scenesHandlers } from './scenes';
import { screensHandlers } from './screens';
import { teamsHandlers } from './teams';
import { usersHandlers } from './users';

export const handlers = [
  ...authHandlers,
  ...commentsHandlers,
  ...discussionsHandlers,
  ...scenesHandlers,
  ...screensHandlers,
  ...teamsHandlers,
  ...usersHandlers,
];
