"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import brand1 from "@/public/logo1.svg";
import brand2 from "@/public/logo2.svg";
import brand3 from "@/public/logo3.svg";
import brand4 from "@/public/logo4.svg";
import brand5 from "@/public/logo5.svg";
import brand6 from "@/public/logo6.svg";
import brand7 from "@/public/logo7.svg";
import brand8 from "@/public/logo8.svg";
import brand9 from "@/public/logo9.svg";
import brand10 from "@/public/logo10.svg";
import Image from "next/image";

const BrandsData = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
];

const Brands = () => {
  return (
    <>
      <div className="px-[5%] lg:px-[10%] py-0 md:py-10 pb-0">
        <Swiper
          slidesPerView={8}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 1000 }}
          modules={[Autoplay]}
          breakpoints={{
            1200: { slidesPerView: 8 },
            1000: { slidesPerView: 5 },
            600: { slidesPerView: 3 },
            575: { slidesPerView: 3 },
            0: { slidesPerView: 2 },
          }}
        >
          {BrandsData.map((brand, idx) => (
            <SwiperSlide key={idx} className="group">
              <div className="brand-image relative overflow-hidden">
                {/* Original Image */}
                <Image
                  src={brand}
                  alt={`brand-${idx + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full opacity-100 group-hover:opacity-0 transition-all duration-300"
                />

                {/* Hover Image */}
                <Image
                  src={brand}
                  alt={`brand-${idx + 1}`}
                  width={500}
                  height={500}
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Brands;
