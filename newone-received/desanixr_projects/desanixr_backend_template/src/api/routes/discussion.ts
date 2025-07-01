import { Router, Request, Response, NextFunction } from 'express';
import { IDiscussionInputDTO } from '@/interfaces/IDiscussion';
import { Container } from 'typedi';
import DiscussionService from '../../services/discussion';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import Discussion from '../../models/discussion';

const route = Router();

export default (app: Router) => {
  app.use('/discussions', route);

  route.get('/', async (req: Request, res: Response) => {
    console.log('tests');
    try {
      const discussion = await Discussion.find({}, { __v: 0 });
      res.send(discussion);
    } catch (error) {
      console.log(error.message);
    }
  });

  //Get discussion by id method
  route.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const discussion = await Discussion.findById(id);
      res.send(discussion);
    } catch (error) {
      console.log(error.message);
    }
  });

  //Deleting discussion
  route.delete('/:id', middlewares.isAuth, async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const discussion = await Discussion.findByIdAndDelete(id);
      res.send(discussion);
    } catch (error) {
      console.log(error.message);
    }
  });

  //to create  discussion by POST method
  route.post(
    '/',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling discussion endpoint with body: %o', req.body);
      try {
        const discussionServiceInstance = Container.get(DiscussionService);
        const { discussion } = await discussionServiceInstance.CreateDiscussion(req.body as IDiscussionInputDTO);
        return res.status(201).json({ discussion });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  //to update  discussion by PATCH method
  route.patch(
    '/:discussionId',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        title: Joi.string(),
        body: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Update endpoint with body: %o', req.body);
      try {
        const discussionServiceInstance = Container.get(DiscussionService);
        const discussionId: string = req.params.discussionId;
        const { discussion } = await discussionServiceInstance.Update(discussionId, req.body as IDiscussionInputDTO);
        // return res.status(201).json({ user });
        return res.status(201).json({ message: 'Update is working fine', discussion });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
