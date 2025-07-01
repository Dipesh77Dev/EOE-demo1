import { IDiscussion } from '@/interfaces/IDiscussion';
import mongoose from 'mongoose';

const Discussion = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      index: true,
    },
    body: String
  },
  { timestamps: true },
);

export default mongoose.model<IDiscussion & mongoose.Document>('Discussion', Discussion);
