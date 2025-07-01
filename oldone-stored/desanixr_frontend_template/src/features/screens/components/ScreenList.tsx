import { DxrTable, DxrSpinner, DxrLink } from '@/components/Elements';
import { API_URL } from '@/config';
import { useImages } from '@/features/images';
import { formatDate } from '@/utils/format';

import { useScreens } from '../api/getScreens';
import { Screen } from '../types';

import { DeleteScreen } from './DeleteScreen';

export const ScreensList = () => {
  const screensQuery = useScreens();
  const imagesQuery = useImages();

  const getImageFilePath = (imageId: string): any => {
    // console.log('imagesQuery :', imagesQuery.data);
    if (imagesQuery?.data) {
      const tmpImage = imagesQuery.data.filter((x) => x._id === imageId);
      if (tmpImage && tmpImage.length > 0) {
        return tmpImage[0];
      }
    }
    return { filePath: 'Not Found', fileName: 'Not Found' };
  };

  if (screensQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!screensQuery.data) return null;

  return (
    <DxrTable<Screen>
      data={screensQuery.data}
      columns={[
        {
          title: 'Screen Name',
          field: 'screenName',
        },
        {
          title: 'Image',
          field: 'imageId',
          Cell({ entry: { imageId: imageId } }) {
            const file = getImageFilePath(imageId);
            return (
              <div>
                {file.imageTitle}
                <img
                  width={200}
                  height={200}
                  src={API_URL + '/' + file.filePath}
                  alt={'Not found'}
                />
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
            return <DeleteScreen _id={_id} />;
          },
        },
      ]}
    />
  );
};
