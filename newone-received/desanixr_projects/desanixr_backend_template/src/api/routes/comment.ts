import { Router, Request, Response, NextFunction } from 'express';
import { ICommentInputDTO } from '@/interfaces/IComment';
import { Container } from 'typedi';
import CommentService from '../../services/comment';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import Comment from '../../models/comment';

const route = Router();

export default (app: Router) => {
  app.use('/comments', route);

  route.get('/:discussionId', async (req: Request, res: Response) => {
    try {
      const id: string = req.params.discussionId || '';
      if (id !== '') {
        res.send(await Comment.find({ discussionId: id }, { __v: 0 }));
      } else {
        res.send(await Comment.find({}, { __v: 0 }));
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  route.delete('/:id', middlewares.isAuth, async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const comment = await Comment.findByIdAndDelete(id);
      res.send(comment);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.post(
    '/',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        body: Joi.string().required(),
        discussionId: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      try {
        const commentServiceInstance = Container.get(CommentService);
        const { comment } = await commentServiceInstance.CreateComment(req.body as ICommentInputDTO);
        return res.status(201).json({ comment });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.patch(
    '/:commentId',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        body: Joi.string(),
        discussionId: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Update endpoint with body: %o', req.body);
      try {
        const commentServiceInstance = Container.get(CommentService);
        const commentId: string = req.params.commentId;
        const { comment } = await commentServiceInstance.Update(commentId, req.body as ICommentInputDTO);
        return res.status(201).json({ message: 'Update is working fine', comment });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
