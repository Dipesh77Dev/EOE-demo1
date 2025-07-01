import { Meta, Story } from '@storybook/react';

import { DxrTable, TableProps } from './Table';

const meta: Meta = {
  title: 'Components/Elements/Table',
  component: DxrTable,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type User = {
  _id: string;
  name: string;
  title: string;
  role: string;
  email: string;
};

const data: User[] = [
  {
    _id: '1',
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'jane.cooper@example.com',
  },
  {
    _id: '2',
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    role: 'Owner',
    email: 'cody.fisher@example.com',
  },
];

const Template: Story<TableProps<User>> = (props) => <DxrTable<User> {...props} />;

export const Default = Template.bind({});
Default.args = {
  data,
  columns: [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Title',
      field: 'title',
    },
    {
      title: 'Role',
      field: 'role',
    },
    {
      title: 'Email',
      field: 'email',
    },
  ],
};
