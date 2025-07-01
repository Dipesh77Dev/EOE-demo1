import { ILoginHistory } from '@/interfaces/ILoginHistory';
import mongoose from 'mongoose';

const LoginHistory = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    logout: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ILoginHistory & mongoose.Document>('LoginHistory', LoginHistory);
