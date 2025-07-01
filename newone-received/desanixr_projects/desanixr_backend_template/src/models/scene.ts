import { IScene } from '@/interfaces/IScene';
import mongoose from 'mongoose';

const Scene = new mongoose.Schema(
  {
    sceneName: {
      type: String,
      unique: true,
      index: true,
    },
    description: String,
    imageId: String,
  },
  { timestamps: true },
);

export default mongoose.model<IScene & mongoose.Document>('Scene', Scene);
