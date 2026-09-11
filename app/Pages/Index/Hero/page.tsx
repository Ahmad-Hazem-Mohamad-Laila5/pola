"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Icon } from "@iconify/react";
const Hero = () => {
  const texts = [
    "Free and Easy Returns. Every Day.",
    "Hassle-Free Returns. Anytime.",
    "Secure Checkout With Full Protection",
    "Satisfaction Guaranteed On Every Purchase",
    "Trusted Products. Reliable Service Always",
  ];
  return (
    <>
      <div className="hero">
        <div className="ps-[5%] lg:ps-[10%] px-5 lg:px-0 w-full flex flex-col lg:flex-row justify-between items-center gap-5">
          <div className=" w-full lg:w-1/2 hero-content pt-20">
            <div className="hero-content-wrap">
              <h1 className=" Luxur text-7xl font-bold text-gray-700">
                30% OFF
              </h1>
              <h3 className=" text-7xl font-light my-3 text-gray-700">
                Selected Styles
              </h3>
              <div className=" my-8">
                <p className=" text-gray-500 text-md">
                  An exclusive selection of this season's trends.
                </p>
                <p className=" text-gray-800 font-semibold text-md">
                  Exclusively online!
                </p>
              </div>
              <div className=" hero-btns flex gap-4">
                <button className="btn border btn-left">
                  <span>Shop For Men</span>
                </button>
                <button className="btn border btn-right">
                  <span>Shop For Women</span>
                </button>
              </div>
            </div>
            <div className=" mt-15">
              <h2 className=" text-gray-700 font-semibold text-3xl">
                GET 10% OFF
              </h2>
              <h2 className=" text-gray-500  text-2xl">YOUR FIRST PURCHASE</h2>

              <form className=" border-b-2 border-gray-700 my-5 flex justify-between items-center gap-3 w-full lg:w-[80%] px-5 py-3">
                <input
                  type="text"
                  placeholder="Your E-mail Address..."
                  className=" w-[80%] outline-none"
                  required
                />
                <button
                  type="submit"
                  className=" text-[14px] text-gray-700 hover:text-black cursor-pointer font-semibold"
                >
                  SIGN UP
                </button>
              </form>
            </div>
            <div className=" mt-10">
              <h2 className=" text-gray-500 font-semibold text-xl">
                FOLLOW US-ON
              </h2>
              <div className=" flex items-center gap-3 mt-4">
                <span className=" w-10 h-10 flex items-center justify-center cursor-pointer bg-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                  <Icon icon={"mdi:facebook"} width={20} />
                </span>
                <span className=" w-10 h-10 flex items-center justify-center cursor-pointer bg-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                  <Icon icon={"mdi:instagram"} width={20} />
                </span>
                <span className=" w-10 h-10 flex items-center justify-center cursor-pointer bg-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                  <Icon icon={"mdi:twitter"} width={20} />
                </span>
                <span className=" w-10 h-10 flex items-center justify-center cursor-pointer bg-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                  <Icon icon={"mdi:youtube"} width={20} />
                </span>
              </div>
            </div>
          </div>
          <div className=" w-full lg:w-[65%] hero-right lg:translate-x-20">
            <div className="hero-slide-wrapper">
              <div className="hero-slide-content">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={5}
                  loop={true}
                  autoplay={{
                    delay: 2000,
                  }}
                  navigation={{
                    nextEl: ".hero-next",
                    prevEl: ".hero-prev",
                  }}
                  modules={[Autoplay, Navigation]}
                  className="hero-swiper"
                >
                  <SwiperSlide>
                    <div className="hero-slide">
                      <div className="hero-slide-info absolute md:bottom-50 left-10">
                        <h2 className=" bg-prim px-4 py-3 pb-4 text-3xl font-semibold rounded-md">
                          JOGGING & RUNNING
                        </h2>
                        <button className="px-4 py-3 bg-gray-700 my-2 ms-5 cursor-pointer hover:bg-gray-800 transition-all duration-300 rounded-md text-white text-2xl">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="hero-slide2">
                      <div className="hero-slide-info absolute md:bottom-50 left-10">
                        <h2 className=" bg-prim px-4 py-3 pb-4 text-3xl font-semibold rounded-md">
                          FITNESS & YOGA
                        </h2>
                        <button className="px-4 py-3 bg-gray-700 my-2 ms-5 cursor-pointer hover:bg-gray-800 transition-all duration-300 rounded-md text-white text-2xl">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="hero-slide3">
                      <div className="hero-slide-info absolute md:bottom-50 left-10">
                        <h2 className=" bg-prim px-4 py-3 pb-4 text-3xl font-semibold rounded-md">
                          HIKING GEAR
                        </h2>
                        <button className="px-4 py-3 bg-gray-700 my-2 ms-5 cursor-pointer hover:bg-gray-800 transition-all duration-300 rounded-md text-white text-2xl">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className="flex">
                  <button className=" z-10 absolute bottom-10 left-10 hero-prev cursor-pointer w-12 h-12 bg-white backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-md">
                    <Icon icon={"mdi:chevron-left"} width={30} />
                  </button>
                  <button className=" z-10 absolute bottom-10  right-20 hero-next cursor-pointer w-12 h-12 bg-white backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-md">
                    <Icon icon={"mdi:chevron-right"} width={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[5%] lg:px-[10%] py-5">
        <div className=" bg-gray-200 flex justify-center items-center text-center py-4 rounded-2xl relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            navigation={{
              nextEl: ".hero-next2",
              prevEl: ".hero-prev2",
            }}
            modules={[Autoplay, Navigation]}
          >
            {texts.map((text, idx) => (
              <SwiperSlide className=" text-2xl text-gray-700" key={idx}>
                {text}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="md:flex hidden">
            <button className=" z-10 absolute bottom-1  left-10 hero-next2 cursor-pointer w-12 h-12   rounded-full flex items-center justify-center  hover:translate-x-2 transition-all duration-300">
              <Icon icon={"guidance:right-arrow"} width={30} />
            </button>
            <button className=" z-10 absolute bottom-1  right-20 hero-next2 cursor-pointer w-12 h-12   rounded-full flex items-center justify-center  hover:translate-x-2 transition-all duration-300">
              <Icon icon={"guidance:left-arrow"} width={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
