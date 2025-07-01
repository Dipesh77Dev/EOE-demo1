import { Service, Inject } from 'typedi';
import { IDiscussion, IDiscussionInputDTO } from '@/interfaces/IDiscussion';

@Service()
export default class DiscussionService {
  constructor(
    @Inject('discussionModel') private discussionModel: Models.DiscussionModel,
    @Inject('logger') private logger,
  ) {}

  public async CreateDiscussion(discussionInputDTO: IDiscussionInputDTO): Promise<{ discussion: IDiscussion }> {
    try {
      this.logger.silly('Creating discussion db record');
      const discussionRecord = await this.discussionModel.create({
        ...discussionInputDTO,
      });
      if (!discussionRecord) {
        throw new Error('Discussion cannot be created');
      }
      const discussion = discussionRecord.toObject();
      return { discussion };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(
    discussionId: String,
    discussionInputDTO: IDiscussionInputDTO,
  ): Promise<{ discussion: IDiscussion }> {
    try {
      this.logger.silly('Updating discussion');
      const discussionRecord = await this.discussionModel.findByIdAndUpdate(discussionId, {
        ...discussionInputDTO,
      });
      const discussion = discussionRecord.toObject();
      return { discussion };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
