import { Service, Inject } from 'typedi';
import { IImage, IImageInputDTO } from '@/interfaces/IImage';

@Service()
export default class ImageService {
  constructor(@Inject('imageModel') private imageModel: Models.ImageModel, @Inject('logger') private logger) {}

  public async CreateImage(imageInputDTO: IImageInputDTO): Promise<{ image: IImage }> {
    try {
      this.logger.silly('Creating image db record');
      const imageRecord = await this.imageModel.create({
        ...imageInputDTO,
      });
      if (!imageRecord) {
        throw new Error('Image cannot be created');
      }
      const image = imageRecord.toObject();
      return { image };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(imageId: String, imageInputDTO: IImageInputDTO): Promise<{ image: IImage }> {
    try {
      this.logger.silly('Updating image');
      const imageRecord = await this.imageModel.findByIdAndUpdate(imageId, {
        ...imageInputDTO,
      });
      const image = imageRecord.toObject();
      return { image };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
