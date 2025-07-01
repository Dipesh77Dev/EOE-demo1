import { BaseEntity } from '@/types';

export type EventDetail = {
  name: string;
  description: string;
  eventType: string;
  startTime: Date;
  endTime: Date;
  nftAccess: string; // boolean
  nftPurchaseUrl: string;
  nftAddress: string;
  eventContent: string;
  imagePath: string;
  fileData: File;
} & BaseEntity;

export type EventImagesDetail = {
  fileName: string;
  filePath: string;
} & BaseEntity;
