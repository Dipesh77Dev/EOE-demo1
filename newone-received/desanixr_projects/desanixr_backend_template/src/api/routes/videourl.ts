import { Router, Request, Response, NextFunction } from 'express';
import { IVideoUrlInputDTO } from '@/interfaces/IVideoUrl';
import { Container } from 'typedi';
import VideoUrlService from '../../services/videourl';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import VideoUrl from '../../models/videourl';
import sio from '../helpers/sockets';

const route = Router();

export default (app: Router) => {
  app.use('/videourl', route);

  route.get(
    '/',
    // middlewares.isAuth,
    async (req: Request, res: Response) => {
      try {
        const videourl = await VideoUrl.find({}, { __v: 0 });
        res.send(videourl);
      } catch (error) {
        console.log(error.message);
      }
    },
  );

  route.get(
    '/:id',
    //middlewares.isAuth,
    async (req: Request, res: Response) => {
      const id = req.params.id;
      try {
        const videourl = await VideoUrl.findById(id);
        res.send(videourl);
      } catch (error) {
        console.log(error.message);
      }
    },
  );

  route.delete(
    '/:id',
    //middlewares.isAuth,
    async (req: Request, res: Response) => {
      const id = req.params.id;
      try {
        const videourl = await VideoUrl.findByIdAndDelete(id);
        const io = sio.getIO();
        io.emit('urlChanged', { urlPath: '', playStatus: 0 });

        res.send(videourl);
      } catch (error) {
        console.log(error.message);
      }
    },
  );

  route.post(
    '/',
    // middlewares.isAuth,
    celebrate({
      body: Joi.object({
        urlPath: Joi.string().required(),
        playStatus: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling videourl endpoint with body: %o', req.body);
      try {
        const videourlServiceInstance = Container.get(VideoUrlService);
        const { videourl } = await videourlServiceInstance.CreateVideoUrl(req.body as IVideoUrlInputDTO);
        const io = sio.getIO();
        io.emit('urlChanged', { urlPath: req.body.urlPath, playStatus: req.body.playStatus });
        return res.status(201).json({ videourl });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.patch(
    '/:id',
    // middlewares.isAuth,
    celebrate({
      body: Joi.object({
        urlPath: Joi.string(),
        playStatus: Joi.number(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Update endpoint with body: %o', req.body);
      try {
        const videourlServiceInstance = Container.get(VideoUrlService);
        const id: string = req.params.id;
        const { videourl } = await videourlServiceInstance.Update(id, req.body as IVideoUrlInputDTO);
        // return res.status(201).json({ user });
        if (videourl) {
          const io = sio.getIO();
          io.emit('urlChanged', { urlPath: videourl.urlPath, playStatus: req.body.playStatus });
        }
        return res.status(201).json({ message: 'Update is working fine', videourl });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
