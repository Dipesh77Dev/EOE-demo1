// eslint-disable-next-line import/order
import View3D from '@egjs/react-view3d';
import '@egjs/react-view3d/css/view3d-bundle.min.css';

import { useState } from 'react';

import { DxrTable, DxrSpinner, DxrLink, DxrButton } from '@/components/Elements';
import { API_URL } from '@/config';
import { useImages } from '@/features/images';
import { formatDate } from '@/utils/format';

import { useScenes } from '../api/getScenes';
import { Scene } from '../types';

import { DeleteScene } from './DeleteScene';
import './SceneList.css';

export const ScenesList = () => {
  const [filePath, setFilePath] = useState('');
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
      {filePath ? (
        <div className="viewer">
          <View3D
            tag="div"
            src={filePath}
            className="view3d-9by1"
            // onReady={(e) => {
            //   console.log(e);
            // }}
          />
        </div>
      ) : (
        ''
      )}
      <DxrTable<Scene>
        data={scenesQuery.data}
        columns={[
          {
            title: 'Scene Name',
            field: 'sceneName',
          },
          {
            title: 'Model',
            field: 'imageId',
            Cell({ entry: { imageId: imageId } }) {
              const file = getImageFilePath(imageId);
              return (
                <div>
                  <DxrButton
                    onClick={() => {
                      setFilePath(API_URL + '/' + file.filePath);
                      //API_URL + '/' + file.filePath;
                    }}
                  >
                    {file.imageTitle}
                  </DxrButton>
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
              return <DeleteScene _id={_id} />;
            },
          },
        ]}
      />
    </div>
  );
};
