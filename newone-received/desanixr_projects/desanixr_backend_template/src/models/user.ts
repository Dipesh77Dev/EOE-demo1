import { IUser } from '@/interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: String,
    salt: String,
    role: {
      type: String,
      default: 'USER',
    },
    contact: {
      type: String,
      maxlength: 10,
      // max: 10
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
