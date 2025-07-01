// import './TestEventPage.css';
import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import { useState } from 'react';

// import './EventPage.css';

import { formatDateTime } from '@/utils/format';

import { useEventDetails } from '../../eventdetail/api/getEventDetails';
import { useImages } from '../../images/api/getImages';

export const TestEventPage = () => {
  const eventDetailsQuery = useEventDetails();
  const ImagesQuery = useImages();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = eventDetailsQuery.data ? eventDetailsQuery?.data.length : 0;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  if (!eventDetailsQuery.data) return null;

  function getImagePath(eventDetailId: string) {
    if (ImagesQuery.data) {
      const tmpImage = ImagesQuery.data.filter((x) => x.imageTitle === eventDetailId);
      if (tmpImage && tmpImage.length > 0) {
        return tmpImage[0].filePath;
      }
    }
    return 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg';
  }
  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden bg-gray-200">
        <div className="flex items-center space-x-4 absolute right-0 z-20 justify-between md:justify-end px-4 md:px-0 bottom-0 mb-5 md:mb-10 md:pr-20 mt-3">
          <div className="swiper-button-prev items-center mr-60">
            <ArrowSmLeftIcon
              className="arrow text-white cursor-pointer h-12 w-12 rounded-full absolute z-50 bg-transperant top-[50%] left-6 border border-white bg-transparent-80 bg-black"
              onClick={prevSlide}
            />
          </div>
          <div className="swiper-pagination grey-bullets swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal bg-black mr-8">
            <span className="swiper-pagination-bullet"></span>
            <span className="swiper-pagination-bullet  swiper-pagination-bullet-active"></span>
            <span className="swiper-pagination-bullet"></span>
            <span className="swiper-pagination-bullet"></span>
          </div>
          <div className="swiper-button-next items-center">
            <ArrowSmRightIcon
              className="arrow text-white cursor-pointer h-12 w-12 rounded-full absolute z-50 bg-transperant top-[50%] right-8 border border-white bg-transparent-80 bg-black"
              onClick={nextSlide}
            />
          </div>
        </div>

        {eventDetailsQuery.data.map((item, idx) => {
          return (
            <>
              {idx === currentSlide && (
                <div className="slide current" key={idx}>
                  <div>
                    <div className="md:row-start-1 md:col-start-1">
                      <div className="">
                        <img
                          src={getImagePath(item._id)}
                          alt={item.name}
                          key={'img-' + idx}
                          className="hidden md:block h-11 object-cover mt-40 ml-20"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col-reverse">
                      <div className="content absolute block  mr-20 text-right mt-28 left-10 right-8 opacity-0 w-2/4 h-1/4 p-4 invisible text-black font-mono">
                        <div className="text-left font-extrabold">
                          <p className="text-lg font-semibold" key={'et-' + idx}>
                            ({item.eventType})
                          </p>
                          <h3 className="text-3xl" key={'n-' + idx}>
                            {item.name}
                          </h3>
                        </div>

                        <div className="flex justify-between mt-3">
                          <p className="">{formatDateTime(item.startTime)}</p> -
                          <p className="mr-96">{formatDateTime(item.endTime)}</p>
                        </div>

                        <p className="description text-xl text-left mt-3" key={'d-' + idx}>
                          {item.description}
                        </p>

                        <div className="mt-9 mr-96  purchase">
                          <a
                            className="purchase underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                            href={item.nftPurchaseUrl}
                          >
                            Purchase Token
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};
