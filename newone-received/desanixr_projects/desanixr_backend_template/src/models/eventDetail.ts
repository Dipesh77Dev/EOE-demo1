import { IEventDetail } from '@/interfaces/IEventDetail';
import mongoose from 'mongoose';

const EventDetail = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    eventType: {
      type: String,
    },
    startTime: {
      type: Date, // String
    },
    endTime: {
      type: Date, // String
    },
    nftAccess: {
      type: String, // Boolean
      default: false,
    },
    nftPurchaseUrl: {
      type: String,
    },
    nftAddress: {
      type: String,
    },
    eventContent: {
      type: String,
    },
    imagePath: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IEventDetail & mongoose.Document>('EventDetail', EventDetail);
