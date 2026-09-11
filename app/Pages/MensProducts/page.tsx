"use client";

import MensProductData from "@/app/JsonData/MensProduct.json";
import { useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useWishlist } from "../Wishlist/WhislistContext";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

type Product = (typeof MensProductData)[0];

const sortOptions = [
  { key: "default", label: "Default" },
  { key: "latest", label: "Latest" },
  { key: "oldest", label: "Oldest" },
  { key: "low", label: "Price: Low to High" },
  { key: "high", label: "Price: High to Low" },
];

const MensProduct = () => {
  const [sortOption, setSortOption] = useState("default");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const sortedProducts = [...MensProductData].sort((a, b) => {
    const getIdNumber = (id: string | number) =>
      typeof id === "string" ? parseInt(id.replace(/\D/g, "")) : id;

    switch (sortOption) {
      case "low":
        return (
          Number(a.price?.replace("$", "") || 0) -
          Number(b.price?.replace("$", "") || 0)
        );
      case "high":
        return (
          Number(b.price?.replace("$", "") || 0) -
          Number(a.price?.replace("$", "") || 0)
        );
      case "latest":
        return getIdNumber(b.id) - getIdNumber(a.id);
      case "oldest":
        return getIdNumber(a.id) - getIdNumber(b.id);
      case "default":
      default:
        return 0;
    }
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const handleAddToCart = (product: Product) => {
    addToCart(String(product.id));
  };

  const handleToggleWishlist = (product: Product) => {
    toggleWishlist(String(product.id));
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 16);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="page-section relative">
        <div className="px-[5%] lg:px-[10%] py-40 pb-10">
          <h2 className="text-5xl md:text-7xl lg:text-9xl text-gray-300 font-bold uppercase">
            Men Clothing
          </h2>
        </div>
        <div className="absolute   bottom-5 lg:top-1/2 right-0 translate-y-1/2 md:translate-y-1/1 w-[60%] md:w-[30%] bg-gray-100 h-5 lg:h-10"></div>
        <div className="absolute bottom-5 lg:top-1/2 left-0 translate-y-1/2 md:translate-y-1/1 w-[60%] md:w-[8%] bg-gray-100 h-5 lg:h-10"></div>
      </div>

      {/* Products Section */}
      <div className="px-[5%] lg:px-[10%] py-20">
        {/* Header */}
        <div className="py-5 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-2xl font-semibold text-gray-700">
            Showing ({visibleProducts.length}) products
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              className="px-4 py-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2 transition-all"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Icon icon="solar:sort-linear" width={20} />
              Sort: {sortOptions.find((o) => o.key === sortOption)?.label}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option.key}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-all text-sm"
                    onClick={() => {
                      setSortOption(option.key);
                      setDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <Link
                href={`/Pages/MensProducts/${product.id}`}
                className="relative block aspect-square overflow-hidden bg-gray-50"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleWishlist(product);
                  }}
                  className="absolute top-3 right-3 h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-all"
                >
                  <Icon
                    icon={
                      isInWishlist(product.id)
                        ? "solar:heart-bold"
                        : "solar:heart-linear"
                    }
                    width={20}
                    className={
                      isInWishlist(product.id)
                        ? "text-red-500"
                        : "text-gray-600"
                    }
                  />
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800"
                >
                  Add to Cart
                </button>

                {/* Off Badge */}
                {product.off && (
                  <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                    {product.off}
                  </span>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/Pages/ShoesProduct/${product.id}`}>
                  <h3 className="text-sm font-medium text-gray-900 hover:text-black line-clamp-1">
                    {product.title}
                  </h3>
                </Link>

                <div className="mt-2 flex items-center gap-2">
                  {product.lessPrice ? (
                    <>
                      <span className="text-lg font-bold text-gray-900">
                        {product.lessPrice}
                      </span>
                      {product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.price}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < sortedProducts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all"
            >
              <Icon icon="solar:arrow-down-linear" width={20} />
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MensProduct;
