import { Meta, Story } from '@storybook/react';

import { Notification, NotificationProps } from './Notification';

const meta: Meta = {
  title: 'Components/Notifications',
  component: Notification,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<NotificationProps> = (props) => <Notification {...props} />;

export const Info = Template.bind({});
Info.args = {
  notification: {
    _id: '1',
    type: 'info',
    title: 'Hello Info',
    message: 'This is info notification',
  },
  onDismiss: (_id) => alert(`Dismissing Notification with _id: ${_id}`),
};
export const Success = Template.bind({});
Success.args = {
  notification: {
    _id: '1',
    type: 'success',
    title: 'Hello Success',
    message: 'This is success notification',
  },
  onDismiss: (_id) => alert(`Dismissing Notification with _id: ${_id}`),
};
export const Warning = Template.bind({});
Warning.args = {
  notification: {
    _id: '1',
    type: 'warning',
    title: 'Hello Warning',
    message: 'This is warning notification',
  },
  onDismiss: (_id) => alert(`Dismissing Notification with _id: ${_id}`),
};
export const Error = Template.bind({});
Error.args = {
  notification: {
    _id: '1',
    type: 'error',
    title: 'Hello Error',
    message: 'This is error notification',
  },
  onDismiss: (_id) => alert(`Dismissing Notification with _id: ${_id}`),
};
