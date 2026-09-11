"use client";

import { Icon } from "@iconify/react";
import ista1 from "@/public/Instagram-1.jpg";
import ista2 from "@/public/Instagram-2.jpg";
import ista3 from "@/public/Instagram-3.jpg";
import ista4 from "@/public/Instagram-4.jpg";
import ista5 from "@/public/Instagram-5.jpg";
import ista6 from "@/public/Instagram-6.jpg";
import ista7 from "@/public/Instagram-7.jpg";
import Image from "next/image";
import Link from "next/link";

const FollowUs = () => {
  const instaImages = [ista1, ista2, ista3, ista4, ista5, ista6, ista7];

  return (
    <>
      <div className="px-[5%] lg:px-[10%] py-10 lg:py-20">
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center mb-10">
          {/* Instagram Icon */}
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg">
            <Icon icon="akar-icons:instagram-fill" width={32} height={32} />
          </div>

          {/* Text */}
          <p className="w-full lg:w-[50%] text-base md:text-lg font-medium text-gray-700 leading-relaxed">
            Remember to show off your new purchase on insta by tagging us and{" "}
            <span className="font-bold text-gray-900">get $20 off</span> your
            next order.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {instaImages.map((insta, idx) => (
            <Link
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square overflow-hidden rounded-xl ${
                idx === 6 ? "hidden lg:block" : ""
              }`}
            >
              <Image
                src={insta}
                alt={`Instagram post ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 14vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <Icon
                  icon="akar-icons:instagram-fill"
                  className="text-white text-4xl transform scale-75 group-hover:scale-100 transition-all duration-300"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA - في الأسفل */}
        <div className="mt-8 flex justify-center">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
          >
            FOLLOW US ON INSTAGRAM
            <Icon
              icon="guidance:left-arrow"
              width={24}
              height={24}
              className="transition-transform group-hover:-translate-x-1"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default FollowUs;
