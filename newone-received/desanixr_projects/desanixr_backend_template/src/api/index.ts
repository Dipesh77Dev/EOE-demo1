import { Router } from 'express';
import auth from './routes/auth';
import discussion from './routes/discussion';
import image from './routes/image';
import comment from './routes/comment';
import screen from './routes/screen';
import scene from './routes/scene';
import user from './routes/user';
import videourl from './routes/videourl';
import agendash from './routes/agendash';
import eventdetail from './routes/eventdetail';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  discussion(app);
  image(app);
  scene(app);
  comment(app);
  screen(app);
  user(app);
  agendash(app);
  videourl(app);
  eventdetail(app);

  return app;
};
