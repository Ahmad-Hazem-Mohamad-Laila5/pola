"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

type OrderItem = {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: OrderStatus;
  total: number;
  itemsCount: number;
  items: OrderItem[];
  estimatedDelivery?: string;
};

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "1",
        orderNumber: "#ORD-ABC123",
        orderDate: "2024-09-05",
        status: "delivered",
        total: 468.6,
        itemsCount: 3,
        estimatedDelivery: "2024-09-10",
        items: [
          {
            id: "1",
            image: "/shoe1.jpg",
            title: "Nike Air Max",
            price: 120,
            quantity: 2,
          },
          {
            id: "2",
            image: "/shoe2.jpg",
            title: "Adidas Ultraboost",
            price: 180,
            quantity: 1,
          },
        ],
      },
      {
        id: "2",
        orderNumber: "#ORD-XYZ789",
        orderDate: "2024-09-08",
        status: "shipped",
        total: 299.99,
        itemsCount: 2,
        estimatedDelivery: "2024-09-12",
        items: [
          {
            id: "3",
            image: "/shoe3.jpg",
            title: "Puma Running Shoes",
            price: 149.99,
            quantity: 2,
          },
        ],
      },
      {
        id: "3",
        orderNumber: "#ORD-DEF456",
        orderDate: "2024-09-09",
        status: "processing",
        total: 599.5,
        itemsCount: 4,
        estimatedDelivery: "2024-09-15",
        items: [
          {
            id: "4",
            image: "/shoe4.jpg",
            title: "New Balance 574",
            price: 199.5,
            quantity: 3,
          },
          {
            id: "5",
            image: "/shoe5.jpg",
            title: "Reebok Classic",
            price: 100,
            quantity: 1,
          },
        ],
      },
      {
        id: "4",
        orderNumber: "#ORD-GHI321",
        orderDate: "2024-09-01",
        status: "cancelled",
        total: 150.0,
        itemsCount: 1,
        items: [
          {
            id: "6",
            image: "/shoe6.jpg",
            title: "Vans Old Skool",
            price: 75,
            quantity: 2,
          },
        ],
      },
    ];

    setOrders(mockOrders);
    setIsLoading(false);
  }, []);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "solar:box-linear";
      case "shipped":
        return "solar:truck-linear";
      case "delivered":
        return "solar:check-circle-linear";
      case "cancelled":
        return "solar:close-circle-linear";
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "shipped":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownloadInvoice = (orderNumber: string) => {
    const invoiceContent = `
      ORDER INVOICE
      =============
      
      Order Number: ${orderNumber}
      Date: ${new Date().toLocaleDateString()}
      
      Thank you for your order!
      
      This is a sample invoice.
      In production, this would be a real PDF.
    `;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: "cancelled" as OrderStatus }
            : order,
        ),
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="text-gray-500">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5%] lg:px-[10%] py-16 md:py-20 mt-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          My Orders
        </h1>
        <p className="text-gray-500">
          Track and manage all your orders in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50">
              <Icon
                icon="solar:box-linear"
                width={24}
                className="text-yellow-600"
              />
            </div>
            <span className="text-sm text-gray-600">Processing</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter((o) => o.status === "processing").length}
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <Icon
                icon="solar:truck-linear"
                width={24}
                className="text-blue-600"
              />
            </div>
            <span className="text-sm text-gray-600">Shipped</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter((o) => o.status === "shipped").length}
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <Icon
                icon="solar:check-circle-linear"
                width={24}
                className="text-green-600"
              />
            </div>
            <span className="text-sm text-gray-600">Delivered</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter((o) => o.status === "delivered").length}
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
              <Icon
                icon="solar:list-linear"
                width={24}
                className="text-gray-600"
              />
            </div>
            <span className="text-sm text-gray-600">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === "all"
              ? "bg-black text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          All Orders
        </button>

        <button
          onClick={() => setFilter("processing")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === "processing"
              ? "bg-yellow-500 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Processing
        </button>

        <button
          onClick={() => setFilter("shipped")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === "shipped"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Shipped
        </button>

        <button
          onClick={() => setFilter("delivered")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === "delivered"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Delivered
        </button>

        <button
          onClick={() => setFilter("cancelled")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === "cancelled"
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="mb-4 inline-flex items-center justify-center">
              <Icon
                icon="solar:box-linear"
                width={64}
                height={64}
                className="text-gray-300"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === "all"
                ? "You haven't placed any orders yet."
                : `No ${filter} orders at the moment.`}
            </p>
            <Link
              href="/Pages/MensProducts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
            >
              <Icon icon="solar:bag-3-linear" width={20} />
              Start Shopping
            </Link>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {order.orderNumber}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        <Icon icon={getStatusIcon(order.status)} width={14} />
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.orderDate)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-all"
                      aria-label={
                        expandedOrderId === order.id
                          ? "Collapse details"
                          : "Expand details"
                      }
                    >
                      <Icon
                        icon={
                          expandedOrderId === order.id
                            ? "solar:alt-arrow-up-linear"
                            : "solar:alt-arrow-down-linear"
                        }
                        width={20}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {order.status !== "cancelled" && (
                    <button
                      onClick={() => handleDownloadInvoice(order.orderNumber)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <Icon icon="solar:download-linear" width={16} />
                      Download Invoice
                    </button>
                  )}

                  {order.status === "processing" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <Icon icon="solar:close-circle-linear" width={16} />
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Order Details - Expandable */}
              {expandedOrderId === order.id && (
                <div className="border-t border-gray-100">
                  <div className="p-6 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">
                      Order Items ({order.itemsCount})
                    </h4>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-white rounded-xl"
                        >
                          {/* Product Icon بدل الصورة */}
                          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            <Icon
                              icon="solar:box-linear"
                              width={40}
                              height={40}
                              className="text-gray-400"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                            </h5>
                            <p className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon
                          icon="solar:map-point-linear"
                          width={20}
                          className="text-gray-400"
                        />
                        <h4 className="text-sm font-semibold text-gray-700">
                          Shipping Address
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>John Doe</p>
                        <p>123 Main Street, Apt 4B</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon
                          icon="solar:truck-linear"
                          width={20}
                          className="text-gray-400"
                        />
                        <h4 className="text-sm font-semibold text-gray-700">
                          Delivery Info
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          Estimated: {formatDate(order.estimatedDelivery || "")}
                        </p>
                        <p>Shipping: Standard (5-7 days)</p>
                        <p>Tracking: Available soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="px-6 pb-6">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium text-gray-900">
                            ${(order.total * 0.9).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium text-gray-900">
                            $15.00
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span className="font-medium text-gray-900">
                            ${(order.total * 0.08).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="font-bold text-gray-900">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
