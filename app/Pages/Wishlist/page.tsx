"use client";

import MensProductData from "@/app/JsonData/MensProduct.json";
import WomensProduct from "@/app/JsonData/WomensProduct.json";
import SneakersData from "@/app/JsonData/SneakersData.json";
import NewArrivals from "@/app/JsonData/NewArrivals.json";
import RandomProducts from "@/app/JsonData/RandomProducts.json";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "../Cart/CartContext";
import { useWishlist } from "./WhislistContext";
import { useRouter } from "next/navigation";

type Product = {
  id: string | number;
  image: string;
  title: string;
  price?: string;
  lessPrice?: string;
  off?: string;
  brand?: string;
};

const Wishlist = () => {
  const { addToCart, isInCart, removeFromCart } = useCart();
  const { toggleWishlist, removeFromWishlist, wishlist } = useWishlist();

  const [wishListProducts, setWishListProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!wishlist || wishlist.length === 0) {
      setWishListProducts([]);
      setIsLoading(false);
      return;
    }
    const products: Product[] = wishlist
      .map((id) => {
        return (
          MensProductData.find((p) => String(p.id) === String(id)) ||
          WomensProduct.find((p) => String(p.id) === String(id)) ||
          SneakersData.find((p) => String(p.id) === String(id)) ||
          NewArrivals.find((p) => String(p.id) === String(id)) ||
          RandomProducts.find((p) => String(p.id) === String(id))
        );
      })
      .filter(Boolean) as Product[];

    setWishListProducts(products);
    setIsLoading(false);
  }, [wishlist]);

  return (
    <>
      <div className="px-[5%] lg:px-[10%] py-16 md:py-20 mt-10">
        {isLoading ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
              <p className="text-gray-500">Loading your wishlist...</p>
            </div>
          </div>
        ) : wishListProducts.length === 0 ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <Icon
                icon="proicons:heart"
                width={80}
                height={80}
                className="text-gray-300"
              />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Your wishlist is empty
            </h3>

            <p className="mt-3 max-w-md text-gray-500">
              Start exploring our collections and save your favorite items to
              your wishlist for later.
            </p>

            <Link
              href="/Pages/MensProducts"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
            >
              <Icon icon="solar:bag-3-linear" width={20} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  My Wishlist
                </h2>
                <p className="mt-2 text-gray-500">
                  {wishListProducts.length}{" "}
                  {wishListProducts.length === 1 ? "item" : "items"} saved
                </p>
              </div>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear your wishlist?",
                    )
                  ) {
                    wishlist.forEach((id) => toggleWishlist(id));
                    toast.success("Wishlist cleared");
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Icon icon="solar:trash-bin-2-linear" width={18} />
                Clear All
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishListProducts.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  {/* Image */}
                  <Link
                    href={`/Pages/ShoesProduct/${item.id}`}
                    className="relative block aspect-square overflow-hidden bg-gray-50"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Actions Overlay */}
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <button
                        onClick={() => router.push(`/Pages/`)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 transition-all hover:bg-black hover:text-white"
                        aria-label="View product"
                      >
                        <Icon icon="lets-icons:view" width={20} />
                      </button>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    {item.brand && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {item.brand}
                      </span>
                    )}

                    <Link href={`/Pages/ShoesProduct/${item.id}`}>
                      <h3 className="mt-1 line-clamp-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-black">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
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

                      {item.off && (
                        <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                          {item.off}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => addToCart(item.id)}
                        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                          isInCart(item.id)
                            ? "bg-green-100 text-green-700"
                            : "bg-black text-white hover:bg-gray-800"
                        }`}
                      >
                        <Icon
                          icon={
                            isInCart(item.id)
                              ? "akar-icons:cart-check"
                              : "akar-icons:cart"
                          }
                          width={18}
                        />
                        {isInCart(item.id) ? "In Cart" : "Add to Cart"}
                      </button>

                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        aria-label="Remove"
                      >
                        <Icon icon="solar:trash-bin-2-linear" width={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
