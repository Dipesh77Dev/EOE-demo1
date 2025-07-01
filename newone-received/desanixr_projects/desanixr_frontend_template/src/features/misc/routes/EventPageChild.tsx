import { EventDetail } from '@/features/eventdetail';
import { formatCustom, formatTime } from '@/utils/format';

import { Image } from '../../images/types';

type EventPageChildProps = {
  item: EventDetail;
  idx: number;
  images: Image[] | undefined;
};

export const EventPageChild = (props: EventPageChildProps) => {
  function getImagePath(eventDetailId: string) {
    if (props.images) {
      const tmpImage = props.images.filter((x) => x.imageTitle === eventDetailId);
      if (tmpImage && tmpImage.length > 0) {
        return tmpImage[0].filePath;
      }
    }
    return 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg';
  }
  return (
    <>
      <div
        className="break-inside flex flex-col justify-between max-w-sm w-96 h-96 max-h-96 group"
        key={'card-' + props.idx}
      >
        <div className="transition-all bg-gray-400 mx-2 rounded-2xl group-hover:scale-[1.05]">
          <div className="relative flex flex-col justify-between text-yellow-100 min-h-[13rem] max-h-[13rem] rounded-t-2xl">
            <img
              className="rounded-t-2xl min-h-[13rem] max-h-[13rem]"
              src={getImagePath(props.item._id)}
              alt=""
            />
            <div className="absolute opacity-70 bottom-0 left-0 bg-gray-900 rounded-tl-2xl rounded-br-2xl p-2">
              <div className="flex flex-col items-start">
                <span>{formatCustom(props.item.startTime, 'DD-MMM')}</span>
                <span>{formatTime(props.item.startTime)}</span>
              </div>
            </div>
            <div className="absolute opacity-70 bottom-0 right-0 bg-gray-900 rounded-tr-2xl rounded-bl-2xl p-2">
              <div className="flex flex-col items-end">
                <span>{formatCustom(props.item.endTime, 'DD-MMM')}</span>
                <span>{formatTime(props.item.endTime)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-sm px-1 my-1 min-h-[3rem] max-h-[3rem]">
            <div className="flex justify-between">
              <span>({props.item.eventType})</span>
              {props.item.nftPurchaseUrl && (
                <a
                  target="_blank"
                  href={props.item.nftPurchaseUrl}
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  rel="noreferrer"
                >
                  Purchage Token
                </a>
              )}
            </div>
            <h2 className="text-gray-900 text-2xl font-medium">{props.item.name}</h2>
          </div>
          <span className="px-1 my-1 inline-block text-justify break-words overflow-hidden leading-4 min-h-[6rem] max-h-[6rem]">
            {props.item.description}
          </span>
        </div>
      </div>
    </>
  );
};
