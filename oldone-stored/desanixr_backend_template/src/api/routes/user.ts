import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { Container } from 'typedi';
import AuthService from '@/services/auth';
import { IUserInputDTO } from '@/interfaces/IUser';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Users from '../../models/user';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  // route.get('/me',  async (req: Request, res: Response)
  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response) => {
    const userRecord = await Users.findById(req.currentUser._id);
    const user = { ...userRecord.toObject(), role: 'ADMIN' };
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return res.json(user).status(200);
  });
  // route.post("/update", middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
  //   return res.json({ message: "Update is working fine"}).status(200);
  // });

  //Get all users
  // route.get('/', async (req: Request, res: Response)
  route.get('/', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response) => {
    try {
      const users = await Users.find({}, { __v: 0 });
      res.send(users);
    } catch (error) {
      console.log(error.message);
    }
  });

  //Deleting user
  route.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await Users.findByIdAndDelete(id);
      res.send(user);
    } catch (error) {
      console.log(error.message);
    }
  });

  //Updating user
  route.patch(
    '/profile/:userId',
    celebrate({
      body: Joi.object({
        email: Joi.string(),
        password: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        contact: Joi.string(),
        bio: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Update endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(AuthService);
        const userId: String = req.params.userId;
        let { user } = await authServiceInstance.Update(userId, req.body as IUserInputDTO);
        console.log('After Update', user);
        // return res.status(201).json({ user });
        return res.json({ user }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};

/*
todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
*/

/*
  rest.patch<ProfileBody>(`${API_URL}/users/profile`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const result = db.user.update({
        where: {
          id: {
            equals: user.id,
          },
        },
        data,
      });
      persistDb('user');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
*/
