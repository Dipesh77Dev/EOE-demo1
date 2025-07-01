import { Router, Request, Response, NextFunction } from 'express';
import { ISceneInputDTO } from '@/interfaces/IScene';
import { Container } from 'typedi';
import SceneService from '../../services/scene';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import Scene from '../../models/scene';

const route = Router();

export default (app: Router) => {
  app.use('/scenes', route);

  route.get('/', async (req: Request, res: Response) => {
    try {
      const scene = await Scene.find({}, { __v: 0 });
      res.send(scene);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const scene = await Scene.findById(id);
      res.send({ ...scene.toObject(), imageTitle: scene.imageId });
    } catch (error) {
      console.log(error.message);
    }
  });

  route.delete('/:id', middlewares.isAuth, async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const scene = await Scene.findByIdAndDelete(id);
      res.send(scene);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.post(
    '/',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        sceneName: Joi.string().required(),
        description: Joi.string().required(),
        imageId: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling scene endpoint with body: %o', req.body);
      try {
        const sceneServiceInstance = Container.get(SceneService);
        const { scene } = await sceneServiceInstance.CreateScene(req.body as ISceneInputDTO);
        return res.status(201).json({ scene });
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
        sceneName: Joi.string(),
        description: Joi.string(),
        imageId: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Update endpoint with body: %o', req.body);
      try {
        const scenesServiceInstance = Container.get(SceneService);
        const id: string = req.params.id;
        const { scene } = await scenesServiceInstance.Update(id, req.body as ISceneInputDTO);
        // return res.status(201).json({ user });
        return res.status(201).json({ message: 'Update is working fine', scene });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
