"use client";

import { useParams } from "next/navigation";
import MensProductData from "@/app/JsonData/MensProduct.json";
import { useCart } from "../../Cart/CartContext";
import { useWishlist } from "../../Wishlist/WhislistContext";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";

const ProductDetails = () => {
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const product = MensProductData.find((item) => item.id.toString() === id);

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectSize, setSelectSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="px-[5%] py-20 text-center text-2xl font-semibold">
        Product Not Found
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectSize) return;

    addToCart(product.id);
  };

  const handleClearSize = () => {
    setSelectSize(null);
  };

  const relatedProducts = MensProductData.filter(
    (item) => item.brand === product.brand && item.id !== product.id,
  ).slice(0, 4);

  const productAlreadyInCart = isInCart(product.id);

  if (!product) {
    return (
      <div className="px-[5%] py-20 text-center text-2xl font-semibold">
        Product Not Found
      </div>
    );
  }

  return (
    <>
      <div className="page-section relative">
        <div className="px-[5%] lg:px-[10%] py-40 pb-10">
          <h2 className="text-5xl md:text-7xl lg:text-9xl text-gray-300 font-bold uppercase">
            Men Clothing
          </h2>
        </div>
        <div className="absolute   bottom-5 lg:top-1/2 right-0 translate-y-1/2 md:translate-y-1/1 w-[60%] md:w-[30%] bg-gray-100 h-5 lg:h-10"></div>
        <div className="absolute bottom-5 lg:top-1/2 left-0 translate-y-1/2 md:translate-y-1/1 w-[60%] md:w-[8%] bg-gray-100 h-5 lg:h-10"></div>
      </div>

      {/* Product Details Section */}
      <div className="px-[5%] lg:px-[10%] py-20 pt-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 group">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {product.off && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    {product.off} OFF
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 z-10 h-12 w-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-all hover:scale-110"
                >
                  <Icon
                    icon={
                      isInWishlist(product.id)
                        ? "solar:heart-bold"
                        : "solar:heart-linear"
                    }
                    width={24}
                    className={
                      isInWishlist(product.id)
                        ? "text-red-500"
                        : "text-gray-600"
                    }
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                {product.brand}
              </span>
              <span className="flex items-center gap-1 text-sm text-green-600">
                <Icon icon="solar:star-bold" width={16} />
                <span className="font-medium">4.8</span>
                <span className="text-gray-400">(124 reviews)</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {product.lessPrice || product.price}
              </span>
              {product.lessPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.price}
                </span>
              )}
              {product.off && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save {product.off}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Premium quality men&apos;s clothing crafted with attention to
                detail. Made from breathable, durable materials that ensure
                comfort throughout the day. Perfect for both casual and
                semi-formal occasions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Features modern fit design that complements your style while
                providing ease of movement. Easy to care for and maintains its
                shape after multiple washes.
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Size
                </h3>
                {selectSize && (
                  <button
                    onClick={handleClearSize}
                    className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <Icon icon="solar:close-circle-linear" width={16} />
                    Clear
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectSize(size)}
                    className={`w-14 h-14 rounded-lg border-2 font-semibold transition-all ${
                      selectSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-700 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Quantity
                </h3>
                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
                  >
                    <Icon icon="solar:minus-linear" width={20} />
                  </button>
                  <span className="px-6 py-3 font-semibold text-gray-900 min-w-[4rem] text-center border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
                  >
                    <Icon icon="solar:add-linear" width={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                disabled
                <button
                  onClick={handleAddToCart}
                  disabled={Boolean(!selectSize || isInCart(product.id))}
                  className={`flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    !selectSize || isInCart(product.id)
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 hover:scale-[1.02]"
                  }`}
                >
                  <Icon icon="solar:cart-linear" width={24} />
                  {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`px-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    isInWishlist(product.id)
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-700 hover:border-black"
                  }`}
                >
                  <Icon
                    icon={
                      isInWishlist(product.id)
                        ? "solar:heart-bold"
                        : "solar:heart-linear"
                    }
                    width={28}
                  />
                </button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                  <Icon
                    icon="solar:truck-linear"
                    width={24}
                    className="text-green-600"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-500">On orders over $200</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon
                    icon="solar:shield-check-linear"
                    width={24}
                    className="text-blue-600"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-500">
                    100% secure transactions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                  <Icon
                    icon="solar:refresh-linear"
                    width={24}
                    className="text-purple-600"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center">
                  <Icon
                    icon="solar:headphones-linear"
                    width={24}
                    className="text-orange-600"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">24/7 Support</p>
                  <p className="text-sm text-gray-500">
                    Dedicated support team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-gray-50 py-20">
        <div className="px-[5%] lg:px-[10%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Material & Care */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <Icon
                    icon="arcticons:perifit-care"
                    width={24}
                    className="text-blue-600"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Material & Care
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>100% Premium Cotton</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Machine washable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Tumble dry low</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Do not bleach</span>
                  </li>
                </ul>
              </div>

              {/* Shipping & Delivery */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <Icon
                    icon="carbon:delivery-truck"
                    width={24}
                    className="text-green-600"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Shipping & Delivery
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Free shipping on orders $200+</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Standard: 5-7 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Express: 2-3 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>International shipping available</span>
                  </li>
                </ul>
              </div>

              {/* Returns & Exchange */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                  <Icon
                    icon="solar:refresh-linear"
                    width={24}
                    className="text-purple-600"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Returns & Exchange
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>30-day return policy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Free exchanges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Item must be unworn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={16}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Original tags attached</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-[5%] lg:px-[10%] py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Related Products
            </h2>
            <Link
              href="/Pages/MensProducts"
              className="flex items-center gap-2 text-black font-semibold hover:text-gray-700"
            >
              View All
              <Icon icon="solar:arrow-right-linear" width={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/Pages/ShoesProduct/${relatedProduct.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {relatedProduct.off && (
                    <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                      {relatedProduct.off}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 hover:text-black line-clamp-1">
                    {relatedProduct.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    {relatedProduct.lessPrice ? (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          {relatedProduct.lessPrice}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {relatedProduct.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        {relatedProduct.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="bg-black py-20">
        <div className="px-[5%] lg:px-[10%] text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order plus
            exclusive access to new arrivals and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
