import { Service, Inject } from 'typedi';
import { IComment, ICommentInputDTO } from '@/interfaces/IComment';

@Service()
export default class CommentService {
  constructor(@Inject('commentModel') private commentModel: Models.CommentModel, @Inject('logger') private logger) {}

  public async CreateComment(commentInputDTO: ICommentInputDTO): Promise<{ comment: IComment }> {
    try {
      //this.logger.silly('Creating comment db record');
      const commentRecord = await this.commentModel.create({
        ...commentInputDTO,
      });
      if (!commentRecord) {
        throw new Error('comment cannot be created');
      }
      const comment = commentRecord.toObject();
      return { comment };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(commentId: string, commentInputDTO: ICommentInputDTO): Promise<{ comment: IComment }> {
    try {
      //this.logger.silly('Updating comment');
      const commentRecord = await this.commentModel.findByIdAndUpdate(commentId, {
        ...commentInputDTO,
      });
      const comment = commentRecord.toObject();
      return { comment };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
