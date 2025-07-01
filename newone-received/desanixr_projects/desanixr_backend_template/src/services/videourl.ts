import { Service, Inject } from 'typedi';
import { IVideoUrl, IVideoUrlInputDTO } from '@/interfaces/IVideoUrl';

@Service()
export default class VideoUrlService {
  constructor(@Inject('videoUrlModel') private videoUrlModel: Models.VideoUrlModel, @Inject('logger') private logger) {}

  public async CreateVideoUrl(videoUrlInputDTO: IVideoUrlInputDTO): Promise<{ videourl: IVideoUrl }> {
    try {
      //this.logger.silly('Creating videourl db record');
      await this.videoUrlModel.deleteMany();
      const videourlRecord = await this.videoUrlModel.create({
        ...videoUrlInputDTO,
      });
      if (!videourlRecord) {
        throw new Error('videourl cannot be created');
      }
      const videourl = videourlRecord.toObject();
      return { videourl };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(videourlId: string, videoUrlInputDTO: IVideoUrlInputDTO): Promise<{ videourl: IVideoUrl }> {
    try {
      //this.logger.silly('Updating videourl');
      const videourlRecord = await this.videoUrlModel.findByIdAndUpdate(videourlId, {
        ...videoUrlInputDTO,
      });
      const videourl = videourlRecord.toObject();
      return { videourl };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
