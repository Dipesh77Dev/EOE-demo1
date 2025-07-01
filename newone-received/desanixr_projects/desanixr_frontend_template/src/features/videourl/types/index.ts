import { BaseEntity } from '@/types';

export type VideoUrl = {
  urlPath: string;
  playStatus: number;
  updatedAt: number;
} & BaseEntity;
