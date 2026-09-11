// app/providers.tsx
"use client";

import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "./Pages/Wishlist/WhislistContext";
import { CartProvider } from "./Pages/Cart/CartContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <Toaster position="top-center" />
      </WishlistProvider>
    </CartProvider>
  );
}
