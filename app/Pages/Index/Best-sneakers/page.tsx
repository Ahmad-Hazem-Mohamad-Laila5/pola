"use client";

import SneakersData from "@/app/JsonData/SneakersData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../Cart/CartContext";
import { useWishlist } from "../../Wishlist/WhislistContext";


const Sneakers = () => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <>
      <div className="px-[5%] lg:px-[10%] py-10 lg:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl uppercase font-bold text-gray-900 tracking-tight">
              Best Selling Sneakers
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Discover our most popular footwear collection
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                className="sneaker-prev group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                aria-label="Previous"
              >
                <Icon
                  icon="guidance:right-arrow"
                  width={24}
                  height={24}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </button>

              <div className="h-px w-12 bg-gray-300"></div>

              <button
                className="sneaker-next group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                aria-label="Next"
              >
                <Icon
                  icon="guidance:left-arrow"
                  width={24}
                  height={24}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </button>
            </div>

            {/* Shop More Button */}
            <Link
              href="/Pages/ShoesProduct"
              className="group relative inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              Shop More
              <Icon
                icon="solar:arrow-right-linear"
                width={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          slidesPerView={6}
          spaceBetween={16}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".sneaker-next",
            prevEl: ".sneaker-prev",
          }}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            1400: { slidesPerView: 6 },
            1200: { slidesPerView: 5 },
            1000: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            600: { slidesPerView: 2 },
            0: { slidesPerView: 1.2 },
          }}
        >
          {SneakersData.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="group relative">
                {/* Product Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gray-50 transition-all duration-500 group-hover:shadow-xl">
                  {/* Image */}
                  <div className="relative block aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Link
                        href={`/Pages/ShoesProduct/${item.id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-all hover:bg-black hover:text-white"
                        aria-label="View"
                      >
                        <Icon icon="lets-icons:view" width={20} />
                      </Link>

                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:bg-black"
                        aria-label="Wishlist"
                      >
                        <Icon
                          icon={
                            isInWishlist(item.id)
                              ? "eva:heart-fill"
                              : "eva:heart-outline"
                          }
                          width={20}
                          className={
                            isInWishlist(item.id)
                              ? "text-red-500"
                              : "text-gray-700"
                          }
                        />
                      </button>

                      <button
                        onClick={() =>
                          isInCart(item.id)
                            ? removeFromCart(item.id)
                            : addToCart(item.id)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:bg-black"
                        aria-label="Cart"
                      >
                        <Icon
                          icon={
                            isInCart(item.id)
                              ? "akar-icons:cart-check"
                              : "akar-icons:cart"
                          }
                          width={20}
                          className={
                            isInCart(item.id)
                              ? "text-green-600"
                              : "text-gray-700"
                          }
                        />
                      </button>
                    </div>

                    {/* Wishlist Badge */}
                    {isInWishlist(item.id) && (
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                        <Icon icon="eva:heart-fill" width={16} />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link href={`/Pages/ShoesProduct/${item.id}`}>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {item.brand}
                      </span>
                      <h3 className="mt-1 line-clamp-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-black">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        {item.price}
                      </span>

                      {isInCart(item.id) && (
                        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          <Icon icon="akar-icons:cart-check" width={14} />
                          In Cart
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Sneakers;
