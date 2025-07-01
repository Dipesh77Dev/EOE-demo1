import { Service, Inject } from 'typedi';
import { IScene, ISceneInputDTO } from '@/interfaces/IScene';

@Service()
export default class SceneService {
  constructor(@Inject('sceneModel') private sceneModel: Models.SceneModel, @Inject('logger') private logger) {}

  public async CreateScene(sceneInputDTO: ISceneInputDTO): Promise<{ scene: IScene }> {
    try {
      this.logger.silly('Creating scene db record');
      const sceneRecord = await this.sceneModel.create({
        ...sceneInputDTO,
      });
      if (!sceneRecord) {
        throw new Error('scene cannot be created');
      }
      const scene = sceneRecord.toObject();
      return { scene };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(sceneId: String, sceneInputDTO: ISceneInputDTO): Promise<{ scene: IScene }> {
    try {
      this.logger.silly('Updating scene');
      const sceneRecord = await this.sceneModel.findByIdAndUpdate(sceneId, {
        ...sceneInputDTO,
      });
      const scene = sceneRecord.toObject();
      return { scene };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
