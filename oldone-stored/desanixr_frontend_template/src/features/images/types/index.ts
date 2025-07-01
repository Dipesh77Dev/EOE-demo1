import { BaseEntity } from '@/types';

export type Image = {
  imageTitle: string;
  fileData: File;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
} & BaseEntity;
