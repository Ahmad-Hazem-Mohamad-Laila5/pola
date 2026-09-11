"use client";

import NewArrivalsData from "@/app/JsonData/NewArrivals.json";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../Cart/CartContext";
import { useWishlist } from "../../Wishlist/WhislistContext";

const NewArrivals = () => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  return (
    <>
      <div className="px-[5%] lg:px-[10%] py-10 lg:py-20">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-5 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl uppercase font-bold text-gray-900 tracking-tight">
              New Arrivals
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Discover our latest collection
            </p>
          </div>

          <Link
            href="/Pages/NewArrivals"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-300"
          >
            Shop Now
            <Icon
              icon="solar:arrow-right-linear"
              width={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {NewArrivalsData.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                {/* Main Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Second Image on Hover */}
                {item.secondImage && (
                  <Image
                    src={item.secondImage}
                    alt={`${item.title} second`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}

                {/* Discount Badge */}
                {item.off && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
                    {item.off}
                  </div>
                )}

                {/* New Badge */}
                <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
                  NEW
                </div>

                {/* Quick Actions - Show on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/Pages/NewArrivals/${item.id}`}
                      className="flex items-center justify-center w-10 h-10 bg-white text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg"
                      aria-label="View product"
                    >
                      <Icon icon="solar:eye-linear" width={18} />
                    </Link>

                    <button
                      onClick={() => toggleWishlist(item.id)}
                      type="button"
                      className="flex items-center justify-center w-10 h-10 bg-white   text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg"
                      aria-label="Add to wishlist"
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
                      onClick={() => addToCart(item.id)}
                      type="button"
                      className="flex items-center justify-center w-10 h-10 bg-white text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg"
                      aria-label="Add to cart"
                    >
                      <Icon
                        icon={
                          isInCart(item.id)
                            ? "bi:cart-check-fill"
                            : "akar-icons:cart"
                        }
                        width={20}
                        className={
                          isInCart(item.id)
                            ? "text-green-500"
                            : "text-gray-700"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Brand */}
                {item.brand && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {item.brand}
                  </span>
                )}

                {/* Title */}
                <Link href={`/Pages/NewArrivals/${item.id}`}>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900 hover:text-black transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                </Link>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                  {item.lessPrice ? (
                    <>
                      <span className="text-lg font-bold text-gray-900">
                        {item.lessPrice}
                      </span>
                      {item.price && (
                        <span className="text-sm text-gray-400 line-through">
                          {item.price}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {item.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
