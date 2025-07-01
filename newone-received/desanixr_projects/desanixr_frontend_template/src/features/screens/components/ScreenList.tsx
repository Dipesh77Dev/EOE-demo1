import { EyeIcon } from '@heroicons/react/outline';

import { DxrTable, DxrSpinner, DxrLink, DxrButton } from '@/components/Elements';
import { useImages } from '@/features/images';
import { formatDateTime } from '@/utils/format';

import { useScreens } from '../api/getScreens';
import { Screen } from '../types';

import { DeleteScreen } from './DeleteScreen';

export const ScreensList = () => {
  const screensQuery = useScreens();
  const imagesQuery = useImages();

  const getImageFilePath = (imageId: string): any => {
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
                <DeleteScreen _id={_id} />
              </div>
            );
          },
        },
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
                <img width={200} height={200} src={file.filePath} alt={'Not found'} />
                <span>{file.imageTitle}</span>
              </div>
            );
          },
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
