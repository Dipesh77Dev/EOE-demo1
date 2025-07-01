import View3D from '@egjs/react-view3d';
import '@egjs/react-view3d/css/view3d-bundle.min.css';
import { EyeIcon } from '@heroicons/react/outline';

import { DxrTable, DxrSpinner, DxrLink, DxrButton } from '@/components/Elements';
import { FormDrawer } from '@/components/Form';
import { useImages } from '@/features/images';
import { formatDateTime } from '@/utils/format';

import { useScenes } from '../api/getScenes';
import { Scene } from '../types';

import { DeleteScene } from './DeleteScene';

export const ScenesList = () => {
  const scenesQuery = useScenes();
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

  if (scenesQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!scenesQuery.data) return null;

  return (
    <div>
      <DxrTable<Scene>
        data={scenesQuery.data}
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
                  <DeleteScene _id={_id} />
                </div>
              );
            },
          },
          {
            title: 'Scene Name',
            field: 'sceneName',
          },
          {
            title: 'Created At',
            field: 'createdAt',
            Cell({ entry: { createdAt } }) {
              return <span>{formatDateTime(createdAt)}</span>;
            },
          },
          {
            title: 'Model',
            field: 'imageId',
            Cell({ entry: { imageId: imageId } }) {
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
                    title="Preview Model"
                    submitButton={<div />}
                  >
                    <h2 className="text-2xl">{file.imageTitle}</h2>
                    <View3D tag="div" src={file.filePath} />
                  </FormDrawer>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};
