import { Document, Model } from 'mongoose';
import { IUser } from '@/interfaces/IUser';
import { IDiscussion } from '@/interfaces/IDiscussion';
import { IComment } from '@/interfaces/IComment';
import { IScreen } from '@/interfaces/IScreen';
import { IImage } from '@/interfaces/IImage';
import { IScene } from '@/interfaces/IScene';




declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type DiscussionModel = Model<IDiscussion & Document>;
    export type ImageModel = Model<IImage & Document>
    export type SceneModel = Model<IScene & Document>
    export type CommentModel = Model<IComment & Document>;
    export type ScreenModel = Model<IScreen & Document>;
  }


}
