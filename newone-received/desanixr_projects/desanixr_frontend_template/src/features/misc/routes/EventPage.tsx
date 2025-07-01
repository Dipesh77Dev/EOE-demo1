import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import './EventPage.css';

import slider2 from '@/assets/accessibility-thumbnail.jpg';
import logos from '@/assets/badges (1).jpg';
import card from '@/assets/esplanade-eme-cards.png';
import slider1 from '@/assets/facilities-box-office-01.jpg';
import slider3 from '@/assets/family-and-kids-02.jpg';
import slider4 from '@/assets/general-advisory.jpg';
import { formatDateTime } from '@/utils/format';

import { useEventDetails } from '../../eventdetail/api/getEventDetails';
import { useImages } from '../../images/api/getImages';

import { EventPageChild } from './EventPageChild';

export const EventPage = () => {
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
      <header className="text-black body-font">
        <div className="flex flex-wrap p-5 flex-col md:flex-row items-center bg-yellow-200">
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center justify-center space-x-10">
            <a className="hover:text-blue-500" href="#events">
              Events Planned
            </a>
            <a className="hover:text-blue-500" href="#member">
              Member
            </a>
            <a className="hover:text-blue-500" href="#visit">
              Visit
            </a>
            <a className="hover:text-blue-500" href="#contactus">
              Contact Us
            </a>
          </nav>
        </div>
      </header>
      {/* Section - 1 */}
      <div className="flex w-screen h-[90vh] relative overflow-hidden bg-blue-200 text-blue-800">
        <div className="flex absolute justify-center bottom-2 w-full">
          <div className="flex items-center">
            <ArrowSmLeftIcon
              className="text-white cursor-pointer h-12 w-12 rounded-full bg-transperant border border-white bg-transparent-80 bg-black"
              onClick={prevSlide}
            />
            <div className="">
              <span className="slider-dot"></span>
              <span className="slider-dot"></span>
              <span className="slider-dot"></span>
              <span className="slider-dot"></span>
            </div>
            <ArrowSmRightIcon
              className="text-white cursor-pointer h-12 w-12 rounded-full bg-transperant border border-white bg-transparent-80 bg-black"
              onClick={nextSlide}
            />
          </div>
        </div>
        {eventDetailsQuery.data.map((item, idx) => {
          return (
            <>
              {idx === currentSlide && (
                <section className="w-full h-ful body-font">
                  <div className="m-3 flex flex-col min-h-[90%] max-h-[90%] md:flex-row place-items-stretch content-center justify-items-stretch overflow-hidden">
                    <div className="m-2 p-3 w-2/5 min-w-2/5 max-w-2/5 rounded-lg bg-yellow-100 bg-opacity-60">
                      <div className="flex flex-col relative text-sm px-1 my-1 h-20 rounded-t-2xl">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>({item.eventType})</span>
                          {item.nftPurchaseUrl && (
                            <a
                              target="_blank"
                              href={item.nftPurchaseUrl}
                              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                              rel="noreferrer"
                            >
                              Purchage Token
                            </a>
                          )}
                        </div>
                        <div className="absolute opacity-70 bottom-0 left-0 bg-gray-400 rounded-tl-2xl rounded-br-2xl p-2">
                          <div className="flex flex-col items-start">
                            <span>{formatDateTime(item.startTime)}</span>
                          </div>
                        </div>
                        <div className="absolute opacity-70 bottom-0 right-0 bg-gray-400 rounded-tr-2xl rounded-bl-2xl p-2">
                          <div className="flex flex-col items-end">
                            <span>{formatDateTime(item.endTime)}</span>
                          </div>
                        </div>
                      </div>
                      <h1 className="text-4xl text font-bold">{item.name}</h1>
                      <div className="text-right font-mono">
                        <p className="text-xl text-left mt-5" key={'d-' + idx}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="m-2 flex items-stretch justify-center overflow-hidden w-3/5 min-w-3/5 max-w-3/5">
                      <img
                        className="rounded-lg"
                        alt={item.name}
                        src={getImagePath(item._id)}
                        key={'img-' + idx}
                      />
                    </div>
                  </div>
                </section>
              )}
            </>
          );
        })}
      </div>
      <section className="pt-5 relative bg-yellow-200">
        <h2 className="font-bold ml-10 mb-2 text-4xl text-center" id="events">
          Events Planned
        </h2>
        <div className="flex justify-center flex-wrap">
          {eventDetailsQuery.data.map((item, idx) => (
            <EventPageChild item={item} idx={idx} key={item._id} images={ImagesQuery?.data} />
          ))}
          {eventDetailsQuery.data.map((item, idx) => (
            <EventPageChild item={item} idx={idx} key={item._id} images={ImagesQuery?.data} />
          ))}
        </div>
      </section>

      <section className="bg-[#7c47ff] text-white p-2" id="member">
        <h2 className="text-4xl font-bold text-center">Become a member</h2>
        <div className="flex relative items-center justify-evenly overflow-hidden">
          <div className="max-w-2xl text-justify">
            <div className="">
              <p className="text-lg">
                Great arts experiences begin with Esplanade&Me. Join this membership to enjoy ticket
                specials on shows at Esplanade, early bird specials, promotions at Esplanade Mall,
                unlimited access to Offstage and more.
              </p>
              <button className="mt-5 text-black bg-white h-10 w-40 rounded-lg hover:bg-slate-300 font-bold">
                Sign Up now
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={card} alt="" className="h-5/6 max-h-5/6 w-4/6 max-w-4/6" />
          </div>
        </div>
      </section>
      <section className="bg-[#ff96a8] pt-2" id="visit">
        <h2 className="text-4xl font-bold text-center">Plan your visit</h2>
        <div className="m-auto max-w-3xl text-center flex flex-col items-center box-border justify-evenly">
          <div className="flex">
            {/* card */}
            <div className="break-inside p-4 flex flex-col justify-between rounded-xl mb-4 text-sm bg-white dark:bg-slate-800 dark:text-slate-50 group flex-item cursor-pointer">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex-auto"></div>
                </div>
                <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400"></div>
              </div>
              <div className="py-6 space-y-3">
                <div className="relative rounded-xl overflow-hidden">
                  <img src={slider1} className="h-[14rem] w-full object-cover" alt="" />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#000000] to-[#00000000]">
                    <div className="flex items-center flex-row justify-between"></div>
                  </div>
                </div>

                <p className="font-bold text-xl">Facilities</p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-4"></div>
                <button className="flex items-center justify-center rounded-full p-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-700"></button>
              </div>
            </div>

            {/* card */}
            <div className="break-inside p-4 flex flex-col justify-between rounded-xl mb-4 text-sm bg-white dark:bg-slate-800 dark:text-slate-50 group flex-item cursor-pointer">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex-auto"></div>
                </div>
                <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400"></div>
              </div>
              <div className="py-6 space-y-3">
                <div className="relative rounded-xl overflow-hidden">
                  <img src={slider2} className="h-[14rem] w-full object-cover" alt="" />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#000000] to-[#00000000]">
                    <div className="flex items-center flex-row justify-between"></div>
                  </div>
                </div>

                <p className="font-bold text-xl">Accessibility</p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-4"></div>
                <button className="flex items-center justify-center rounded-full p-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-700"></button>
              </div>
            </div>

            {/* card */}
            <div className="break-inside p-4 flex flex-col justify-between rounded-xl mb-4 text-sm bg-white dark:bg-slate-800 dark:text-slate-50 group flex-item cursor-pointer">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex-auto"></div>
                </div>
                <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400"></div>
              </div>
              <div className="py-6 space-y-3">
                <div className="relative rounded-xl overflow-hidden">
                  <img src={slider3} className="h-[14rem] w-full object-cover" alt="" />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#000000] to-[#00000000]">
                    <div className="flex items-center flex-row justify-between"></div>
                  </div>
                </div>

                <p className="font-bold text-xl">Family & Kids</p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-4"></div>
                <button className="flex items-center justify-center rounded-full p-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-700"></button>
              </div>
            </div>

            {/* card */}
            <div className="break-inside p-4 flex flex-col justify-between rounded-xl mb-4 text-sm bg-white dark:bg-slate-800 dark:text-slate-50 group flex-item cursor-pointer">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex-auto"></div>
                </div>
                <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400"></div>
              </div>
              <div className="py-6 space-y-3">
                <div className="relative rounded-xl overflow-hidden">
                  <img src={slider4} className="h-[14rem] w-full object-cover" alt="" />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#000000] to-[#00000000]">
                    <div className="flex items-center flex-row justify-between"></div>
                  </div>
                </div>

                <p className="font-bold text-xl">General Advisory</p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-4"></div>
                <button className="flex items-center justify-center rounded-full p-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-700"></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contactus">
        <section className="flex flex-wrap items-center py-8 justify-between bg-yellow-200">
          <div className="flex flex-wrap justify-center">
            {/* <img
              className="md:w-[3rem] lg:w-[4.75rem]"
              src="https://www.womex.com/virtual/image/logo/big/the_esplanade_co_ltd_big_63576.png"
              alt=""
            /> */}
            <ul className="flex items-center space-x-4 ml-2">
              <a href="">Donate </a>
              <a href="">Hire a venue </a>
              <a href="">Contact Us </a>
              <a href="">Who We Are </a>
              <a href="">The Esplanade </a>
            </ul>
          </div>
          <div className="flex justify-center mt-4 lg:mt-0 space-x-2">
            <a>
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6 text-blue-600"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6 text-blue-300"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6 text-pink-400"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-6 h-6 text-blue-500"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </div>
        </section>
        <div className="flex justify-center">
          <img src={logos} alt="" />
        </div>
      </footer>
    </>
  );
};
