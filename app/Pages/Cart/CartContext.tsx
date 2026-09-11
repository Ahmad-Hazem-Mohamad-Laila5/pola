"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";

type CartItem = {
  id: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (id: string | number, quantity?: number) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  isInCart: (id: string | number) => boolean;
  getQuantity: (id: string | number) => number;
  cartCount: number;
  cartTotalItems: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "pola-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart: unknown = JSON.parse(storedCart);

        if (
          Array.isArray(parsedCart) &&
          parsedCart.every(
            (item) =>
              typeof item === "object" &&
              item !== null &&
              "id" in item &&
              "quantity" in item,
          )
        ) {
          setCart(parsedCart as CartItem[]);
        }
      }
    } catch (error) {
      console.error("Could not load cart from localStorage:", error);
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isLoaded]);

  const addToCart = (id: string | number, quantity = 1) => {
    if (!id || quantity < 1) return;

    const productId = String(id);
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
      toast.success("Quantity updated in cart.");
    } else {
      setCart((currentCart) => [...currentCart, { id: productId, quantity }]);
      toast.success("Added to cart.");
    }
  };

  const removeFromCart = (id: string | number) => {
    const productId = String(id);
    const wasInCart = cart.some((item) => item.id === productId);

    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );

    if (wasInCart) {
      toast.success("Removed from cart.");
    }
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (!id || quantity < 1) return;

    const productId = String(id);

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const isInCart = (id: string | number) => {
    const productId = String(id);
    return cart.some((item) => item.id === productId);
  };

  const getQuantity = (id: string | number) => {
    const productId = String(id);
    const item = cart.find((item) => item.id === productId);
    return item?.quantity || 0;
  };

  const cartCount = cart.length;
  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared.");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        getQuantity,
        cartCount,
        cartTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
};
