import { DxrTable, DxrSpinner, DxrLink } from '@/components/Elements';
import { formatDate } from '@/utils/format';

import { useDiscussions } from '../api/getDiscussions';
import { Discussion } from '../types';

import { DeleteDiscussion } from './DeleteDiscussion';

export const DiscussionsList = () => {
  const discussionsQuery = useDiscussions();

  if (discussionsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!discussionsQuery.data) return null;

  return (
    <DxrTable<Discussion>
      data={discussionsQuery.data}
      columns={[
        {
          title: 'Title',
          field: 'title',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: '_id',
          Cell({ entry: { _id: _id } }) {
            return <DxrLink to={`./${_id}`}>View</DxrLink>;
          },
        },
        {
          title: '',
          field: '_id',
          Cell({ entry: { _id: _id } }) {
            return <DeleteDiscussion _id={_id} />;
          },
        },
      ]}
    />
  );
};
