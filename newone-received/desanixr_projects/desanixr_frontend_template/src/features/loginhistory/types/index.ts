import { BaseEntity } from '@/types';

export type LoginHistory = {
  userId: string;
  email: string;
  role: string;
  loginTime: number;
  logoutTime: number;
} & BaseEntity;
