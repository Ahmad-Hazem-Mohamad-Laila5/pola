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

import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

type Product = {
  id: string | number;
  image: string;
  title: string;
  price?: string;
  lessPrice?: string;
  off?: string;
  brand?: string;
};

type CartItemWithDetails = Product & {
  quantity: number;
  cartId: string;
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotalItems } =
    useCart();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    const itemsWithDetails: CartItemWithDetails[] = cart
      .map((cartItem) => {
        const product =
          MensProductData.find((p) => String(p.id) === cartItem.id) ||
          WomensProduct.find((p) => String(p.id) === cartItem.id) ||
          SneakersData.find((p) => String(p.id) === cartItem.id) ||
          NewArrivals.find((p) => String(p.id) === cartItem.id) ||
          RandomProducts.find((p) => String(p.id) === cartItem.id);

        if (!product) return null;

        return {
          ...product,
          quantity: cartItem.quantity,
          cartId: cartItem.id,
        };
      })
      .filter(Boolean) as CartItemWithDetails[];

    setCartItems(itemsWithDetails);
    setIsLoading(false);
  }, [cart]);

  const handleQuantityChange = (cartId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(cartId, newQuantity);
  };

  const handleRemoveItem = (cartId: string) => {
    removeFromCart(cartId);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "POLA10") {
      setDiscount(10);
      alert("Coupon applied! 10% discount.");
    } else {
      setDiscount(0);
      alert("Invalid coupon code.");
    }
  };

  const parsePrice = (price: string | undefined): number => {
    if (!price) return 0;

    const cleanPrice = price.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleanPrice);

    return isNaN(parsed) ? 0 : parsed;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parsePrice(item.lessPrice || item.price);
      return total + price * item.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    const shipping = subtotal > 0 ? 15 : 0;
    return subtotal - discountAmount + shipping;
  };

  // في الـ JSX
  const subtotal = calculateSubtotal();
  const total = calculateTotal();
  const shipping = subtotal > 0 ? 15 : 0;
  const discountAmount = (subtotal * discount) / 100;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="px-[5%] lg:px-[10%] py-16 md:py-20 mt-10">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Icon
              icon="solar:bag-3-linear"
              width={80}
              height={80}
              className="text-gray-300"
            />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Your cart is empty
          </h3>

          <p className="mt-3 max-w-md text-gray-500">
            Looks like you haven&apos;t added anything to your cart yet. Start
            exploring our collections and add your favorite items!
          </p>

          <Link
            href="/Pages/MensProducts"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
          >
            <Icon icon="solar:bag-3-linear" width={20} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5%] lg:px-[10%] py-16 md:py-20 mt-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Shopping Cart
        </h1>
        <p className="mt-2 text-gray-500">
          {cartTotalItems} {cartTotalItems === 1 ? "item" : "items"} in your
          cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartId}
              className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              {/* Product Image */}
              <Link
                href={`/Pages/ShoesProduct/${item.id}`}
                className="relative flex-shrink-0 w-full sm:w-32 h-32 sm:h-32 rounded-xl overflow-hidden bg-gray-50"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 128px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.off && (
                  <span className="absolute top-2 left-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    {item.off}
                  </span>
                )}
              </Link>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {item.brand && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          {item.brand}
                        </span>
                      )}
                      <Link
                        href={`/Pages/ShoesProduct/${item.id}`}
                        className="block mt-1"
                      >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-black transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.cartId)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Icon icon="solar:trash-bin-2-linear" width={20} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center gap-3">
                    {item.lessPrice ? (
                      <>
                        <span className="text-xl font-bold text-gray-900">
                          {item.lessPrice}
                        </span>
                        {item.price && (
                          <span className="text-sm text-gray-400 line-through">
                            {item.price}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        {item.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.cartId, item.quantity - 1)
                      }
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Icon icon="solar:minus-linear" width={18} />
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold text-gray-900 min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.cartId, item.quantity + 1)
                      }
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Icon icon="solar:add-linear" width={18} />
                    </button>
                  </div>

                  <span className="text-sm text-gray-500">
                    Total:{" "}
                    <span className="font-semibold text-gray-900">
                      $
                      {(
                        parseFloat(item.lessPrice || item.price || "0") *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Clear Cart Button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear your cart?")) {
                clearCart();
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all"
          >
            <Icon icon="solar:trash-bin-2-linear" width={18} />
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Coupon Code */}
            <div className="mb-6">
              <label
                htmlFor="coupon"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Have a coupon code?
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon"
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2.5 text-sm font-semibold text-white bg-black rounded-xl hover:bg-gray-800 transition-all"
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <p className="mt-2 text-xs text-green-600 font-medium">
                  ✓ Coupon applied! {discount}% off
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Discount ({discount}%)</span>
                  <span className="font-semibold text-green-600">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-gray-900">
                  ${shipping.toFixed(2)}
                </span>
              </div>

              {subtotal > 200 && (
                <p className="text-xs text-green-600 font-medium">
                  ✓ You&apos;ve qualified for free shipping!
                </p>
              )}
            </div>

            {/* Total */}
            <div className="pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => router.push("/Pages/Checkout")}
                className="w-full py-4 text-base font-bold text-white bg-black rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>

              {/* Trust Signals */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Icon icon="solar:shield-check-linear" width={20} />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Icon icon="solar:truck-linear" width={20} />
                  <span>Free shipping over $200</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Icon icon="solar:refresh-linear" width={20} />
                  <span>30-day returns</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3">We accept</p>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 px-3 bg-gray-100 rounded flex items-center">
                    <Icon icon="logos:visa" width={32} />
                  </div>
                  <div className="h-8 px-3 bg-gray-100 rounded flex items-center">
                    <Icon icon="logos:mastercard" width={32} />
                  </div>
                  <div className="h-8 px-3 bg-gray-100 rounded flex items-center">
                    <Icon icon="logos:paypal" width={32} />
                  </div>
                  <div className="h-8 px-3 bg-gray-100 rounded flex items-center">
                    <Icon icon="logos:apple-pay" width={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="mt-12 text-center">
        <Link
          href="/Pages/MensProducts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-700 transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" width={18} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
