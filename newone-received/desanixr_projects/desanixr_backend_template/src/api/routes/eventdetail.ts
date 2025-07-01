import { Router, Request, Response, NextFunction } from 'express';
import { IEventDetailInputDTO } from '@/interfaces/IEventDetail';
import { Container } from 'typedi';
import EventDetailService from '../../services/eventdetail';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import EventDetail from '../../models/eventDetail';
import Image from '../../models/image';
import { upload } from '../helpers/filehelper';
// import { IImageInputDTO } from '@/interfaces/IImage';
// import ImageService from '../../services/image';
// import { join } from 'path';

const route = Router();

export default (app: Router) => {
  app.use('/eventdetail', route);

  route.get('/', async (req: Request, res: Response) => {
    try {
      const eventdetail = await EventDetail.find({}, { __v: 0 });
      res.send(eventdetail);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const eventdetail = await EventDetail.findById(id);
      res.send(eventdetail);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.get('/geteventimages/:id', async (req: Request, res: Response) => {
    try {
      const eventId = req.params.id;
      const eventImage = await Image.aggregate([
        { $match: { imageTitle: eventId } },
        {
          $project: {
            fileName: '$fileName',
            filePath: '$filePath',
          },
        },
      ]);
      return res.status(200).json(eventImage).end();
    } catch (error) {
      console.log(error.message);
    }
  });

  route.delete('/:id', middlewares.isAuth, async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const eventdetail = await EventDetail.findByIdAndDelete(id);
      res.send(eventdetail);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.post(
    '/',
    middlewares.isAuth,
    upload.single('fileData'),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        eventType: Joi.string(),
        startTime: Joi.string(), // date
        endTime: Joi.string(), // date
        nftAccess: Joi.string(), // boolean
        nftPurchaseUrl: Joi.string(),
        nftAddress: Joi.string(),
        eventContent: Joi.string(),
        fileData: Joi.any(),
      }),
    }),
    async (req: any, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Create Event-Detail endpoint with body: %o', req.body);
      try {
        const eventdetailServiceInstance = Container.get(EventDetailService);
        const input = req.body as IEventDetailInputDTO;
        input.imagePath = '';
        if (req.file !== undefined) input.imagePath = req.file.location;
        const { eventdetail } = await eventdetailServiceInstance.CreateEventDetail(input);
        return res.status(201).json({ eventdetail });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // route.post(
  //   '/addeventimages',
  //   middlewares.isAuth,
  //   upload.array('fileData', 10),
  //   celebrate({
  //     body: Joi.object({
  //       eventId: Joi.string().required(),
  //       fileData: Joi.any(),
  //     }),
  //   }),
  //   async (req: any, res: Response, next: NextFunction) => {
  //     const logger: Logger = Container.get('logger');
  //     // logger.silly('Calling image endpoint with body: %o', req.body);
  //     try {
  //       const imageServiceInstance = Container.get(ImageService);
  //       const fileKeys = Object.keys(req.files);
  //       fileKeys.forEach(function (key) {
  //         const file = req.files[key];
  //         const input = { imageTitle: req.body.eventId } as IImageInputDTO;
  //         input.imageType = 2;
  //         input.fileName = file.key;
  //         input.filePath = file.location;
  //         input.fileType = file.mimetype;
  //         input.fileSize = fileSizeFormatter(file.size, 2);
  //         imageServiceInstance.CreateImage(input);
  //       });
  //       return res.status(201).json({ message: 'Image uploaded successfully', eventId: req.body.eventId });
  //     } catch (e) {
  //       logger.error('🔥 error: %o', e);
  //       return next(e);
  //     }
  //   },
  // );

  route.patch(
    '/:id',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        eventType: Joi.string(),
        startTime: Joi.string(), // date
        endTime: Joi.string(), // date
        nftAccess: Joi.string(), // boolean
        nftPurchaseUrl: Joi.string(),
        nftAddress: Joi.string(),
        eventContent: Joi.string(),
        imagePath: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Update Event-Detail endpoint with body: %o', req.body);
      try {
        const eventDetailServiceInstance = Container.get(EventDetailService);
        const id: string = req.params.id;
        const { eventdetail } = await eventDetailServiceInstance.UpdateEventDetail(
          id,
          req.body as IEventDetailInputDTO,
        );
        return res.status(201).json({ message: 'Update is working fine', eventdetail });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/updateimage',
    middlewares.isAuth,
    upload.single('fileData'),
    celebrate({
      body: Joi.object({
        eventId: Joi.string().required(),
        fileData: Joi.any(),
      }),
    }),
    async (req: any, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      try {
        const eventDetailServiceInstance = Container.get(EventDetailService);
        const eventId: string = req.body.eventId;
        const { eventdetail } = await eventDetailServiceInstance.UpdateEventImage(eventId, req.file.location);
        return res.status(201).json({ message: 'Image uploaded successfully', eventdetail });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
