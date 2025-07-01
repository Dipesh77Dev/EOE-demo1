import { nanoid } from 'nanoid';
import create from 'zustand';

export type Notification = {
  _id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
};

type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, '_id'>) => void;
  dismissNotification: (_id: string) => void;
};

export const useNotificationStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, { _id: nanoid(), ...notification }],
    })),
  dismissNotification: (_id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification._id !== _id),
    })),
}));
