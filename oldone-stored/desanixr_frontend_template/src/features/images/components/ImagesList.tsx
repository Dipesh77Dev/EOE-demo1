import { DxrTable, DxrSpinner, DxrLink } from '@/components/Elements';
import { API_URL } from '@/config';
import { formatDate } from '@/utils/format';

import { useImages } from '../api/getImages';
import { Image } from '../types';

import { DeleteImage } from './DeleteImage';

export const ImagesList = () => {
  const ImagesQuery = useImages();

  if (ImagesQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!ImagesQuery.data) return null;

  return (
    <DxrTable<Image>
      data={ImagesQuery.data}
      columns={[
        {
          title: 'ImageTitle',
          field: 'imageTitle',
        },
        {
          title: 'Image',
          field: '_id',
          Cell({ entry: { filePath } }) {
            return (
              <div>
                <img width={200} height={200} src={API_URL + '/' + filePath} alt={'Not found'} />
              </div>
            );
          },
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
            return <DeleteImage _id={_id} />;
          },
        },
      ]}
    />
  );
};
