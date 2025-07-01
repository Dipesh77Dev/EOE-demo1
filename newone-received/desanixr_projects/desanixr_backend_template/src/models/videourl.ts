import mongoose from 'mongoose';
import { IVideoUrl } from '@/interfaces/IVideoUrl';

const VideoUrl = new mongoose.Schema(
  {
    urlPath: {
      type: String,
    },
    playStatus: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IVideoUrl & mongoose.Document>('VideoUrl', VideoUrl);
