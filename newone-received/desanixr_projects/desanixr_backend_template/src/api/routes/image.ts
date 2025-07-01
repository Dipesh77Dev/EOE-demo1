import { Router, Request, Response, NextFunction } from 'express';
import { IImageInputDTO } from '@/interfaces/IImage';
import { Container } from 'typedi';
import ImageService from '../../services/image';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import Image from '../../models/image';
import { fileSizeFormatter, upload } from '../helpers/filehelper';

const route = Router();

export default (app: Router) => {
  app.use('/images', route);

  //to create  image by POST method
  route.post(
    '/',
    middlewares.isAuth,
    upload.single('fileData'),
    celebrate({
      body: Joi.object({
        imageTitle: Joi.string().required(),
        fileData: Joi.any(),
      }),
    }),
    async (req: any, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      // logger.silly('Calling image endpoint with body: %o', req.body);
      try {
        const input = req.body as IImageInputDTO;
        input.imageType = 1;
        input.fileName = req.file.key;
        input.filePath = req.file.location;
        input.fileType = req.file.mimetype;
        input.fileSize = fileSizeFormatter(req.file.size, 2);
        const imageServiceInstance = Container.get(ImageService);
        const { image } = await imageServiceInstance.CreateImage(input);
        return res.status(201).json({ image });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/', async (req: Request, res: Response) => {
    try {
      const image = await Image.find({}, { __v: 0 });
      res.send(image);
    } catch (error) {
      console.log(error.message);
    }
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const image = await Image.findById(id);
      if (image === undefined) {
        res.status(500).send({
          message: 'File not found.',
        });
        return;
      }
      download(res, image.fileName);
      res.send(image);
    } catch (error) {
      console.log(error.message);
    }
  });

  const download = (res: Response, fileName: string) => {
    const directoryPath = 'uploads/';

    res.download(directoryPath + fileName, fileName, err => {
      if (res.headersSent !== true) {
        if (err) {
          res.status(500).send({
            message: 'Could not download the file. ' + err,
          });
        }
      }
    });
  };
  //Deleting image
  route.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const image = await Image.findByIdAndDelete(id);
      res.send(image);
    } catch (error) {
      console.log(error.message);
    }
  });

  //to image  image by PATCH method
  route.patch(
    '/:imageId',
    middlewares.isAuth,
    upload.single('fileData'),
    celebrate({
      body: Joi.object({
        // imageTitle: Joi.string().required(),
        fileData: Joi.any(),
      }),
    }),
    async (req: any, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      //logger.debug('Calling Update endpoint with body: %o', req.body);
      try {
        const input = req.body as IImageInputDTO;
        input.imageType = 1;
        input.fileName = req.file.key;
        input.filePath = req.file.location;
        input.fileType = req.file.mimetype;
        input.fileSize = fileSizeFormatter(req.file.size, 2);
        const imageServiceInstance = Container.get(ImageService);
        const imageId: string = req.params.imageId;
        const { image } = await imageServiceInstance.Update(imageId, req.body as IImageInputDTO);
        // return res.status(201).json({ user });
        return res.status(201).json({ message: 'Update is working fine', image });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
