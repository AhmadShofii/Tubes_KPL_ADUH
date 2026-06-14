import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "foodora_cart";

function normalizeCartItem(item) {
  const idMenu = Number(item.id_menu || item.id);
  const qty = Number(item.qty || item.jumlah || 1);
  const price = Number(item.price || item.harga || 0);

  if (!idMenu || Number.isNaN(idMenu)) {
    return null;
  }

  return {
    id: idMenu,
    id_menu: idMenu,
    name: item.name || item.nama_menu || "Menu Foodora",
    nama_menu: item.nama_menu || item.name || "Menu Foodora",
    desc: item.desc || item.description || item.deskripsi || "",
    deskripsi: item.deskripsi || item.desc || item.description || "",
    price,
    harga: price,
    qty: qty > 0 ? qty : 1,
    jumlah: qty > 0 ? qty : 1,
    image: item.image || item.img || "",
    img: item.img || item.image || "",
  };
}

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart
      .map((item) => normalizeCartItem(item))
      .filter(Boolean);
  } catch (error) {
    console.error("Gagal membaca cart dari localStorage:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(item) {
    setCartItems((prev) => {
      const normalizedItem = normalizeCartItem(item);

      if (!normalizedItem) {
        console.error("Item tidak punya id_menu valid:", item);
        return prev;
      }

      const existingItem = prev.find(
        (cartItem) => Number(cartItem.id_menu) === normalizedItem.id_menu
      );

      if (existingItem) {
        return prev.map((cartItem) =>
          Number(cartItem.id_menu) === normalizedItem.id_menu
            ? {
                ...cartItem,
                qty: Number(cartItem.qty || 1) + 1,
                jumlah: Number(cartItem.qty || 1) + 1,
              }
            : cartItem
        );
      }

      return [...prev, normalizedItem];
    });
  }

  function updateQty(id, qty) {
    const idMenu = Number(id);
    const newQty = Number(qty);

    if (!idMenu || Number.isNaN(idMenu)) {
      return;
    }

    if (newQty <= 0) {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id_menu || item.id) !== idMenu)
      );
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        Number(item.id_menu || item.id) === idMenu
          ? {
              ...item,
              qty: newQty,
              jumlah: newQty,
            }
          : item
      )
    );
  }

  function removeFromCart(id) {
    const idMenu = Number(id);

    setCartItems((prev) =>
      prev.filter((item) => Number(item.id_menu || item.id) !== idMenu)
    );
  }

  function clearCart() {
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.qty || item.jumlah || 1);
    }, 0);
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