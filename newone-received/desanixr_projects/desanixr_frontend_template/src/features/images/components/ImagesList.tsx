import { EyeIcon } from '@heroicons/react/outline';

import { DxrTable, DxrSpinner, DxrLink, DxrButton } from '@/components/Elements';
import { FormDrawer } from '@/components/Form';
import { formatDateTime } from '@/utils/format';

import { useImages } from '../api/getImages';
import { Image } from '../types';

import { DeleteImage } from './DeleteImage';

export const ImagesList = () => {
  const ImagesQuery = useImages();

  const getImageFilePath = (imageId: string): any => {
    if (ImagesQuery?.data) {
      const tmpImage = ImagesQuery.data.filter((x) => x._id === imageId);
      if (tmpImage && tmpImage.length > 0) {
        return tmpImage[0];
      }
    }
    return { filePath: 'Not Found', fileName: 'Not Found' };
  };

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
          title: '',
          field: '_id',
          alignment: 'max-w-4',
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
                <DeleteImage _id={_id} />
              </div>
            );
          },
        },
        {
          title: 'ImageTitle',
          field: 'imageTitle',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDateTime(createdAt)}</span>;
          },
        },
        {
          title: 'Image',
          field: '_id',
          Cell({ entry: { _id: imageId } }) {
            const file = getImageFilePath(imageId);
            return (
              <div>
                <FormDrawer
                  isDone={false}
                  triggerButton={
                    <div className="flex justify-center">
                      <DxrButton variant="cancel" startIcon={<EyeIcon className="h-4 w-4" />}>
                        Preview
                      </DxrButton>
                    </div>
                  }
                  title="Preview Image"
                  submitButton={<div />}
                >
                  <h2 className="text-2xl">{file.imageTitle}</h2>
                  <img src={file.filePath} alt="Not found" />
                </FormDrawer>
              </div>
            );
          },
        },
      ]}
    />
  );
};
