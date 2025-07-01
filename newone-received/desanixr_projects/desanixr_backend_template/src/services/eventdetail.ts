import { Service, Inject } from 'typedi';
import { IEventDetail, IEventDetailInputDTO } from '@/interfaces/IEventDetail';

@Service()
export default class EventDetailService {
  constructor(
    @Inject('eventDetailModel') private eventDetailModel: Models.EventDetailModel,
    @Inject('logger') private logger,
  ) {}

  public async CreateEventDetail(eventDetailInputDTO: IEventDetailInputDTO): Promise<{ eventdetail: IEventDetail }> {
    try {
      //this.logger.silly('Creating event details db record..');
      // await this.eventDetailModel.deleteMany();
      const eventdetailRecord = await this.eventDetailModel.create({
        ...eventDetailInputDTO,
      });
      if (!eventdetailRecord) {
        throw new Error('Event Details cannot be created..');
      }
      const eventdetail = eventdetailRecord.toObject();
      return { eventdetail };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async UpdateEventDetail(
    eventDetailId: string,
    eventDetailInputDTO: IEventDetailInputDTO,
  ): Promise<{ eventdetail: IEventDetail }> {
    try {
      //this.logger.silly('Updating Event Details..');
      const eventdetailRecord = await this.eventDetailModel.findByIdAndUpdate(eventDetailId, {
        ...eventDetailInputDTO,
      });
      const eventdetail = eventdetailRecord.toObject();
      return { eventdetail };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async UpdateEventImage(eventDetailId: string, newImagePath: string): Promise<{ eventdetail: IEventDetail }> {
    try {
      //this.logger.silly('Updating Event Details..');
      const eventdetailRecord = await this.eventDetailModel.findByIdAndUpdate(eventDetailId, {
        imagePath: newImagePath,
      });
      const eventdetail = eventdetailRecord.toObject();
      return { eventdetail };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
