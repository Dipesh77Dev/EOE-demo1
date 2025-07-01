import { IScreen } from '@/interfaces/IScreen';
import mongoose from 'mongoose';

const Screen = new mongoose.Schema(
  {
    screenName: {
      type: String,
      unique: true,
      index: true,
    },
    description: String,
    imageId: String,
  },
  { timestamps: true },
);

export default mongoose.model<IScreen & mongoose.Document>('Screen', Screen);
