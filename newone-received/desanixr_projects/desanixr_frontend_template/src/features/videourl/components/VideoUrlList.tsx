import { EyeIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import io from 'socket.io-client';

import { DxrTable, DxrSpinner, DxrButton } from '@/components/Elements';
import { API_URL } from '@/config';
import { queryClient } from '@/lib/react-query';
import { formatDateTime } from '@/utils/format';

import { useVideoUrl } from '../api/getVideoUrl';
import { useUpdateVideoUrl } from '../api/updateVideoUrl';
import { VideoUrl } from '../types';

export const VideoUrlList = () => {
  const [currentPath, setCurrentPath] = useState({ urlPath: '', playStatus: 0, isPreview: 0 });
  const videoUrlQuery = useVideoUrl();
  const updateVideoUrlMutation = useUpdateVideoUrl();

  const socket = io(API_URL, { transports: ['websocket'] });

  useEffect(() => {
    socket.on('urlChanged', (newData) => {
      setCurrentPath({ ...currentPath, ...newData, isPreview: currentPath.isPreview });
      queryClient.invalidateQueries('videourl');
    });

    return () => {
      socket.off('urlChanged');
    };
  }, []);

  // const
  if (videoUrlQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <DxrSpinner size="lg" />
      </div>
    );
  }

  if (!videoUrlQuery.data) return null;

  const handlePlayStatus = async (_id: string, playStatus: number) => {
    const newPlayStatus = playStatus === 1 ? 0 : 1;
    await updateVideoUrlMutation.mutateAsync({
      videoUrlId: _id,
      data: { playStatus: newPlayStatus },
    });
    queryClient.invalidateQueries('videourl');
    setCurrentPath({ ...currentPath, playStatus: newPlayStatus });
  };

  console.log('currentPath - ', JSON.stringify(currentPath));
  return (
    <div>
      <DxrTable<VideoUrl>
        data={videoUrlQuery.data}
        columns={[
          {
            title: 'URL',
            field: 'urlPath',
          },
          {
            title: 'Action',
            field: 'playStatus',
            Cell({ entry: { playStatus, _id } }) {
              return (
                <div className="flex justify-center">
                  <DxrButton
                    variant="cancel"
                    onClick={() => {
                      return handlePlayStatus(_id, playStatus);
                    }}
                  >
                    {playStatus === 1 ? 'Pause' : 'Play'}
                  </DxrButton>
                </div>
              );
            },
          },
          {
            title: 'Video',
            field: '_id',
            Cell({ entry: { urlPath, playStatus } }) {
              return (
                <div className="flex justify-center">
                  <DxrButton
                    variant="cancel"
                    startIcon={<EyeIcon className="h-4 w-4" />}
                    onClick={() => {
                      setCurrentPath({
                        urlPath,
                        playStatus,
                        isPreview: currentPath.isPreview === 1 ? 0 : 1,
                      });
                    }}
                  >
                    Preview
                  </DxrButton>
                </div>
              );
            },
          },
          {
            title: 'Playing Status',
            field: 'playStatus',
            Cell({ entry: { playStatus } }) {
              return <span>{playStatus === 1 ? 'Playing' : 'Paused'}</span>;
            },
          },
          {
            title: 'Updated',
            field: 'updatedAt',
            Cell({ entry: { updatedAt } }) {
              return <span>{formatDateTime(updatedAt)}</span>;
            },
          },
        ]}
      />
      {currentPath.urlPath !== '' && currentPath.isPreview === 1 ? (
        <div className="mt-2 w-screen h-screen">
          <ReactPlayer
            url={currentPath.urlPath}
            className="w-screen h-screen"
            playing={currentPath.playStatus === 1 ? true : false}
            controls={false}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
