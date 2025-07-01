import { BaseEntity } from '@/types';

export type Screen = {
  screenName: string;
  description: string;
  imageId: string;
  imageTitle: string;
} & BaseEntity;
