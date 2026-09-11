"use client";

import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MensProductData from "@/app/JsonData/MensProduct.json";
import WomensProduct from "@/app/JsonData/WomensProduct.json";
import SneakersData from "@/app/JsonData/SneakersData.json";
import NewArrivals from "@/app/JsonData/NewArrivals.json";
import RandomProducts from "@/app/JsonData/RandomProducts.json";
import { useCart } from "../Cart/CartContext";

type Product = {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
};

type CheckoutFormData = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
};

type FormErrors = Partial<Record<keyof CheckoutFormData, string>>;

const initialFormData: CheckoutFormData = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  country: "",
  state: "",
  zipCode: "",
  cardNumber: "",
  cardName: "",
  expiryDate: "",
  cvv: "",
};

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "apple" | "cod"
  >("card");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // دالة تنظيف السعر
  const parsePrice = (price: string | undefined): number => {
    if (!price) return 0;
    const cleanPrice = price.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleanPrice);
    return isNaN(parsed) ? 0 : parsed;
  };

  // جلب المنتجات من JSON
  useEffect(() => {
    const fetchCartItems = () => {
      if (!cart || cart.length === 0) {
        setCartItems([]);
        setIsLoading(false);
        return;
      }

      const itemsWithDetails: Product[] = cart
        .map((cartItem) => {
          const product =
            MensProductData.find((p) => String(p.id) === cartItem.id) ||
            WomensProduct.find((p) => String(p.id) === cartItem.id) ||
            SneakersData.find((p) => String(p.id) === cartItem.id) ||
            NewArrivals.find((p) => String(p.id) === cartItem.id) ||
            RandomProducts.find((p) => String(p.id) === cartItem.id);

          if (!product) return null;

          return {
            id: product.id,
            image: product.image,
            title: product.title,
            price: parsePrice(String(product.price || product.lessPrice)),
            quantity: cartItem.quantity,
          };
        })
        .filter(Boolean) as Product[];

      setCartItems(itemsWithDetails);
      setIsLoading(false);
    };

    fetchCartItems();
  }, [cart]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const codFee = paymentMethod === "cod" ? 5 : 0;
  const total = subtotal + shipping + tax + codFee;

  const validateField = (
    name: keyof CheckoutFormData,
    value: string,
  ): string => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";

      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\+?[\d\s-]{10,}$/.test(value)) return "Invalid phone number";
        return "";

      case "firstName":
      case "lastName":
        if (!value)
          return `${name === "firstName" ? "First" : "Last"} name is required`;
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";

      case "address":
        if (!value) return "Address is required";
        if (value.length < 5) return "Address is too short";
        return "";

      case "city":
      case "country":
      case "state":
        if (!value)
          return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        return "";

      case "zipCode":
        if (!value) return "ZIP code is required";
        if (!/^\d{5}(-\d{4})?$/.test(value)) return "Invalid ZIP code";
        return "";

      case "cardNumber":
        if (!value) return "Card number is required";
        if (!/^\d{16}$/.test(value.replace(/\s/g, "")))
          return "Invalid card number";
        return "";

      case "cardName":
        if (!value) return "Name on card is required";
        return "";

      case "expiryDate":
        if (!value) return "Expiry date is required";
        if (!/^\d{2}\/\d{2}$/.test(value)) return "Use MM/YY format";
        return "";

      case "cvv":
        if (!value) return "CVV is required";
        if (!/^\d{3,4}$/.test(value)) return "Invalid CVV";
        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name as keyof CheckoutFormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, "").substring(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "").substring(0, 4);
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2)}`;
    }
    return v;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const requiredFields: (keyof CheckoutFormData)[] = [
      "email",
      "phone",
      "firstName",
      "lastName",
      "address",
      "city",
      "country",
      "zipCode",
    ];

    if (paymentMethod === "card") {
      requiredFields.push("cardNumber", "cardName", "expiryDate", "cvv");
    }

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "cod") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Order placed! Pay when you receive your items.");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success("Payment successful!");
      }

      clearCart();
      router.push("/Pages/CheckoutSuccess");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="px-[5%] lg:px-[10%] py-16 md:py-20 mt-10">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
            <p className="text-gray-500">Loading your order...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="px-[5%] lg:px-[10%] py-16 md:py-20 mt-10">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Icon
              icon="solar:cart-cross-linear"
              width={80}
              height={80}
              className="text-gray-300"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Your cart is empty
          </h3>
          <p className="mt-3 max-w-md text-gray-500">
            Add some items to your cart before checking out.
          </p>
          <Link
            href="/Pages/MensProducts"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800"
          >
            <Icon icon="solar:bag-3-linear" width={20} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5%] lg:px-[10%]  mt-30  mb-5">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Checkout
        </h1>
        <p className="mt-2 text-gray-500">Complete your order securely</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <section className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.firstName
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.lastName
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.address
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                    placeholder="123 Main St"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                    placeholder="Apt 4B"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.city
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.state
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                    placeholder="NY"
                  />
                  {errors.state && (
                    <p className="mt-1 text-xs text-red-600">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.zipCode
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.zipCode}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                      errors.country
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black"
                    }`}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Payment Method
              </h2>

              {/* Payment Options */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-xl transition-all ${
                    paymentMethod === "card"
                      ? "border-black bg-black/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon icon="logos:visa" width={40} />
                  <span className="text-xs font-medium">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-xl transition-all ${
                    paymentMethod === "paypal"
                      ? "border-black bg-black/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon icon="logos:paypal" width={40} />
                  <span className="text-xs font-medium">PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("apple")}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-xl transition-all ${
                    paymentMethod === "apple"
                      ? "border-black bg-black/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon icon="logos:apple-pay" width={40} />
                  <span className="text-xs font-medium">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-xl transition-all ${
                    paymentMethod === "cod"
                      ? "border-black bg-black/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon icon="solar:cash-linear" width={40} />
                  <span className="text-xs font-medium">Cash on Delivery</span>
                </button>
              </div>

              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            cardNumber: formatted,
                          }));
                          const error = validateField("cardNumber", formatted);
                          setErrors((prev) => ({ ...prev, cardNumber: error }));
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                          errors.cardNumber
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-black"
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      <Icon
                        icon="solar:card-linear"
                        width={24}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cardName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                        errors.cardName
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-black"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            expiryDate: formatted,
                          }));
                          const error = validateField("expiryDate", formatted);
                          setErrors((prev) => ({ ...prev, expiryDate: error }));
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                          errors.expiryDate
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-black"
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        CVV *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 ${
                            errors.cvv
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-black"
                          }`}
                          placeholder="123"
                          maxLength={4}
                        />
                        <Icon
                          icon="solar:lock-password-linear"
                          width={20}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                      </div>
                      {errors.cvv && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
                  <p>
                    You will be redirected to PayPal to complete your payment
                    securely.
                  </p>
                </div>
              )}

              {paymentMethod === "apple" && (
                <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-700">
                  <p>
                    Use Touch ID or Face ID to complete your payment with Apple
                    Pay.
                  </p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="p-4 bg-green-50 rounded-xl text-sm text-green-700">
                  <div className="flex items-start gap-3">
                    <Icon
                      icon="solar:cash-linear"
                      width={24}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="font-semibold mb-1">Cash on Delivery</p>
                      <p>
                        Pay with cash when you receive your order. Additional
                        fee: <span className="font-bold">$5.00</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Products - FIXED HEIGHT */}
              <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="64px"
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
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cash on Delivery Fee</span>
                    <span className="font-semibold text-gray-900">
                      ${codFee.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 text-base font-bold text-white rounded-xl transition-all shadow-lg ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 hover:shadow-xl"
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Processing...
                    </span>
                  ) : paymentMethod === "cod" ? (
                    "Place Order - Pay on Delivery"
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </button>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Icon icon="solar:shield-check-linear" width={20} />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Icon icon="solar:lock-linear" width={20} />
                  <span>SSL encrypted</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Icon icon="solar:refresh-linear" width={20} />
                  <span>30-day returns</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex items-center gap-3 text-xs text-green-600">
                    <Icon icon="solar:cash-linear" width={20} />
                    <span>Pay when you receive</span>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-100">
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
                  <div className="h-8 px-3 bg-gray-100 rounded flex items-center">
                    <Icon icon="solar:cash-linear" width={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Back to Cart */}
      <div className="mt-12 text-center">
        <Link
          href="/Pages/Cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-700 transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" width={18} />
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
