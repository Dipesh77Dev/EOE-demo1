import { IImage } from '@/interfaces/IImage';
import mongoose from 'mongoose';

const Image = new mongoose.Schema(
  {
    imageTitle: {
      type: String,
      required: true,
      unique: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IImage & mongoose.Document>('Image', Image);
