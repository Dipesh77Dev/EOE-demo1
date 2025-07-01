import { Router, Request, Response, NextFunction } from 'express';
import { IScreenInputDTO } from '@/interfaces/IScreen';
import { Container } from 'typedi';
import ScreenService from '@/services/screen';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import Screen from '../../models/screen';

const route = Router();

export default (app: Router) => {
  app.use('/screens', route);

  route.get('/', middlewares.isAuth, async (req: Request, res: Response) => {
    try {
      const screen = await Screen.find({}, { __v: 0 });
      res.send(screen);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.get('/:id', middlewares.isAuth, async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const screen = await Screen.findById(id);
      res.send({ ...screen.toObject(), imageTitle: screen.imageId });
    } catch (error) {
      console.log(error.message);
    }
  });

  route.delete('/:id', middlewares.isAuth, async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const screen = await Screen.findByIdAndDelete(id);
      res.send(screen);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.post(
    '/',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        screenName: Joi.string().required(),
        description: Joi.string().required(),
        imageId: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling screen endpoint with body: %o', req.body);
      try {
        const screensServiceInstance = Container.get(ScreenService);
        const { screen } = await screensServiceInstance.CreateScreen(req.body as IScreenInputDTO);
        return res.status(201).json({ screen });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.patch(
    '/:id',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        screenName: Joi.string(),
        description: Joi.string(),
        imageId: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Update endpoint with body: %o', req.body);
      try {
        const screensServiceInstance = Container.get(ScreenService);
        const id: String = req.params.id;
        const { screen } = await screensServiceInstance.Update(id, req.body as IScreenInputDTO);
        // return res.status(201).json({ user });
        return res.status(201).json({ message: 'Update is working fine', screen });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
