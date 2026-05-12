import { useState } from "react";
import { PlusCircle, ShoppingBasket } from "lucide-react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { initialCartItems } from "../data/cartData";

/**
 * CartPage — parent component halaman "Keranjang Saya".
 * Mengelola semua state keranjang dan mendistribusikan ke child components.
 */
export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Tambah qty item
  const handleIncreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Kurangi qty — hapus otomatis jika qty sudah 1
  const handleDecreaseQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (item.qty === 1) {
      const confirmed = window.confirm(
        `Hapus "${item.name}" dari keranjang?`
      );
      if (confirmed) handleRemoveItem(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
    );
  };

  // Hapus item dari keranjang
  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-[#FDFCF0]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1A2E1A] mb-1">
            Keranjang Saya
          </h1>
          <p className="text-gray-500 text-sm">
            Periksa kembali pesanan Anda sebelum melanjutkan ke pembayaran.
          </p>
        </div>

        {/* 2-column layout: lg = 2/3 list + 1/3 summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Kiri: Daftar Item */}
          <div className="lg:col-span-2 space-y-4">
            {isEmpty ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                <ShoppingBasket
                  size={48}
                  className="mx-auto mb-4 text-gray-300"
                />
                <p className="text-gray-400 font-medium">
                  Keranjang kamu kosong
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Yuk tambahkan menu favoritmu!
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))
            )}

            {/* Tambah Menu Button */}
            <button className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-2 text-gray-400 hover:border-[#1A2E1A] hover:text-[#1A2E1A] transition-colors text-sm font-medium">
              <PlusCircle size={18} />
              Tambah Menu Lainnya
            </button>
          </div>

          {/* Kanan: Order Summary — sticky di desktop, di bawah di mobile */}
          <div className="lg:col-span-1 lg:sticky lg:top-6">
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
