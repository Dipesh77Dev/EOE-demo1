import { IComment } from '@/interfaces/IComment';
import mongoose from 'mongoose';

const Comment = new mongoose.Schema(
  {
    body: {
      type: String,
      index: true,
    },
    discussionId: String,
  },
  { timestamps: true },
);

export default mongoose.model<IComment & mongoose.Document>('Comment', Comment);
