import { Service, Inject } from 'typedi';
import { IScreen, IScreenInputDTO } from '@/interfaces/IScreen';

@Service()
export default class ScreenService {
  constructor(@Inject('screenModel') private screenModel: Models.ScreenModel, @Inject('logger') private logger) {}

  public async CreateScreen(screenInputDTO: IScreenInputDTO): Promise<{ screen: IScreen }> {
    try {
      //this.logger.silly('Creating screen db record');
      const screenRecord = await this.screenModel.create({
        ...screenInputDTO,
      });
      if (!screenRecord) {
        throw new Error('screen cannot be created');
      }
      const screen = screenRecord.toObject();
      return { screen };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(screenId: string, screenInputDTO: IScreenInputDTO): Promise<{ screen: IScreen }> {
    try {
      //this.logger.silly('Updating screen');
      const screenRecord = await this.screenModel.findByIdAndUpdate(screenId, {
        ...screenInputDTO,
      });
      const screen = screenRecord.toObject();
      return { screen };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
