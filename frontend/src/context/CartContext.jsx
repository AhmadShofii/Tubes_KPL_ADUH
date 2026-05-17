import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "foodora_cart";

const DEFAULT_CART_ITEMS = [];

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return DEFAULT_CART_ITEMS;
    }

    const parsedCart = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? parsedCart : DEFAULT_CART_ITEMS;
  } catch (error) {
    console.error("Gagal membaca cart dari localStorage:", error);
    return DEFAULT_CART_ITEMS;
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(item) {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          desc: item.desc ?? item.description ?? "",
          price: item.price,
          qty: 1,
          image: item.image ?? "",
        },
      ];
    });
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    totalItems,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }

  return context;
}