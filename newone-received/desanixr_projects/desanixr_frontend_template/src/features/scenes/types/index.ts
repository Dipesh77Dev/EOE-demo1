import { BaseEntity } from '@/types';

export type Scene = {
  sceneName: string;
  description: string;
  imageId: string;
  imageTitle: string;
} & BaseEntity;
