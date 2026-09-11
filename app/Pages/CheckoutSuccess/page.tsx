"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import menspro from "@/public/Mens-product1.jpg";
import menspro2 from "@/public/Mens-product2.jpg";

type OrderItem = {
  id: string;
  image: any;
  title: string;
  price: number;
  quantity: number;
};

type OrderDetails = {
  orderNumber: string;
  orderDate: string;
  status: "processing" | "shipped" | "delivered";
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: OrderItem[];
};

const CheckoutSuccess = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);

  const order: OrderDetails = {
    orderNumber: `#ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    orderDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    status: "shipped",
    subtotal: 420.0,
    shipping: 15.0,
    tax: 33.6,
    total: 468.6,
    items: [
      {
        id: "1",
        image: menspro,
        title: "Nike Air Max",
        price: 120,
        quantity: 2,
      },
      {
        id: "2",
        image: menspro2,
        title: "Adidas Ultraboost",
        price: 180,
        quantity: 1,
      },
    ],
  };
  

   
  return (
    <div className="px-[5%] lg:px-[10%]   mt-30 mb-10">
      {/* Success Header */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Thank You with Checkmark */}
        <div className="mb-6 inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-md">
            <Icon
              icon="solar:check-linear"
              width={24}
              height={24}
              className="text-white"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Thank You!
          </h1>
        </div>

        <p className="text-xl text-gray-600 mb-8">
          Your order has been placed successfully
        </p>

        {/* Order Info - تنسيق واحد */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 bg-green-50 border border-green-200 rounded-2xl mb-8">
          <div className="flex items-center gap-2">
            <Icon
              icon="solar:ticket-linear"
              width={20}
              className="text-green-600"
            />
            <span className="text-green-700 font-medium">Order Number:</span>
            <span className="font-bold text-green-900">
              {order.orderNumber}
            </span>
          </div>
          <span className="hidden sm:block w-px h-6 bg-green-300"></span>
          <div className="flex items-center gap-2">
            <Icon
              icon="solar:truck-linear"
              width={20}
              className="text-green-600"
            />
            <span className="text-green-700 font-medium">Status:</span>
            <span className="font-bold text-green-900">Shipped</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-left">
            Order Summary
          </h2>

          {/* Products */}
          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-1 right-1 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="font-bold text-gray-900">Total Paid</span>
            <span className="font-bold text-xl text-green-600">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-8">
          <Icon
            icon="solar:map-point-linear"
            width={24}
            className="text-green-600"
          />
          <p className="text-sm">
            Estimated delivery:{" "}
            <span className="font-semibold">3-5 business days</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/Pages/MensProducts"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            <Icon icon="solar:bag-3-linear" width={20} />
            Continue Shopping
          </Link>

          <Link
            href="/Pages/MyOrders"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            <Icon icon="solar:list-linear" width={20} />
            View My Orders
          </Link>
        </div>

        {/* Redirect Timer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Icon icon="solar:clock-circle-linear" width={18} />
          <span>Redirecting to homepage in {timeLeft}s...</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
