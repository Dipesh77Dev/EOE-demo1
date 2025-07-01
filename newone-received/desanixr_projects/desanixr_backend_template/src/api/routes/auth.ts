import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { IUserInputDTO } from '@/interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import loginhistory from '../../models/loginhistory';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/register',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        contact: Joi.string(),
        teamId: Joi.number(),
        teamName: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
        return res.status(201).json({ user, token });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/login',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignIn(email, password);
        return res.json({ user, token }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post(
    '/logout',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request<never, never, never, never>, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
      try {
        //@TODO AuthService.Logout(req.user) do some clever stuff
        const filter = { userId: req.currentUser._id, logout: '' }; //, logout: ''
        const update = { logout: new Date() };
        await loginhistory.updateMany(filter, update);
        // console.log(filter, update, result);
        return res.status(200).json({ message: 'User has successfully logout, for visiting please login again' }).end();
      } catch (e) {
        logger.error('🔥 error %o', e);
        return next(e);
      }
    },
  );

  route.get('/loginhistory/:userId', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const userId = req.params.userId;
      //console.log('userId', userId);
      // const userId = '6365e527e02e2b00246ab78e';
      const loginHistory = await loginhistory.aggregate([
        { $match: { userId: userId } },
        {
          $lookup: {
            from: 'users',
            let: { userObjectId: { $toObjectId: '$userId' } },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$userObjectId'] } } },
              { $project: { _id: 1, email: 1, role: 1 } },
            ],
            as: 'userRecord',
          },
        },
        { $unwind: '$userRecord' },
        {
          $project: {
            userId: 1,
            email: '$userRecord.email',
            role: '$userRecord.role',
            loginTime: '$createdAt',
            logoutTime: '$logout',
          },
        },
      ]);
      return res.status(200).json(loginHistory).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};
