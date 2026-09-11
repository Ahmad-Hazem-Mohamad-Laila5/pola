"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";

type WishlistContextType = {
  wishlist: string[];
  toggleWishlist: (id: string | number) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
  wishlistCount: number;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

const WISHLIST_STORAGE_KEY = "pola-wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

      if (storedWishlist) {
        const parsedWishlist: unknown = JSON.parse(storedWishlist);

        if (
          Array.isArray(parsedWishlist) &&
          parsedWishlist.every((item) => typeof item === "string")
        ) {
          setWishlist(parsedWishlist);
        }
      }
    } catch (error) {
      console.error("Could not load wishlist from localStorage:", error);
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  const toggleWishlist = (id: string | number) => {
    if (!id) return;

    const productId = String(id);
    const alreadyExists = wishlist.includes(productId);

    if (alreadyExists) {
      setWishlist((currentWishlist) =>
        currentWishlist.filter((item) => item !== productId),
      );
      toast.success("Removed from wishlist.");
    } else {
      setWishlist((currentWishlist) => [...currentWishlist, productId]);
      toast.success("Added to wishlist.");
    }
  };

  const removeFromWishlist = (id: string | number) => {
    const productId = String(id);
    const wasInWishlist = wishlist.includes(productId);

    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item !== productId),
    );

    if (wasInWishlist) {
      toast.success("Removed from wishlist.");
    }
  };

  const isInWishlist = (id: string | number) => {
    const productId = String(id);
    return wishlist.includes(productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success("Wishlist cleared.");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider.");
  }

  return context;
};
