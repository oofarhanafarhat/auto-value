"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ New import

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
  setCartCount: (count: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: () => {},
  setCartCount: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname(); // ✅ Call hook here

  const refreshCart = async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await res.json();
      setCartCount(data?.length || 0);
    } catch (err) {
      console.error("❌ Failed to fetch cart count", err);
    }
  };

 useEffect(() => {
  const hasPaid = sessionStorage.getItem("hasPaid");

  if (pathname === "/success") {
    setCartCount(0);
    sessionStorage.setItem("hasPaid", "true"); // 🔒 Mark as paid (frontend-only)
  } else {
    if (hasPaid === "true") {
      // Don't fetch again after success
      setCartCount(0);
    } else {
      refreshCart(); // Normal fetch
    }
  }
}, [pathname]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
