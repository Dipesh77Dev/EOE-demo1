import { EyeIcon } from '@heroicons/react/outline';

import { DxrTable, DxrSpinner, DxrLink, DxrButton } from '@/components/Elements';
import { formatDateTime } from '@/utils/format';

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
          title: '',
          field: '_id',
          Cell({ entry: { _id: _id } }) {
            return (
              <DxrLink className="flex justify-center" to={`./${_id}`}>
                <DxrButton
                  variant="inverse"
                  startIcon={<EyeIcon className="h-4 w-4" />}
                ></DxrButton>
              </DxrLink>
            );
          },
        },
        {
          title: '',
          field: '_id',
          Cell({ entry: { _id: _id } }) {
            return (
              <div className="flex justify-center">
                <DeleteDiscussion _id={_id} />
              </div>
            );
          },
        },
        {
          title: 'Title',
          field: 'title',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDateTime(createdAt)}</span>;
          },
        },
      ]}
    />
  );
};
