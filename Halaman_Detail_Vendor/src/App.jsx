import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuFilter from "./components/MenuFilter";
import MenuCard from "./components/MenuCard";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import { menuItems } from "./data/menuItems";
import { ShoppingBasket } from "lucide-react";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // Filter menu berdasarkan kategori aktif
  const filteredMenu = useMemo(() => {
    if (activeCategory === "All") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Tambah item ke cart
  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { ...item, qty: 1, note: "" }];
    });
  };

  // Update qty (hapus jika qty <= 0)
  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((c) => c.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((c) => (c.id === id ? { ...c, qty: newQty } : c))
      );
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#FDFCF0]">
      <Navbar
        cartCount={totalCartCount}
        onCartOpen={() => setIsMobileCartOpen(true)}
      />

      <Hero />

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Section Header */}
        <div className="bg-gray-100 rounded-2xl px-5 py-3 mb-6">
          <h2 className="font-semibold text-[#1A2E1A] text-lg">
            Signature Packages
          </h2>
        </div>

        {/* 2-column layout: Menu + Cart */}
        <div className="flex gap-6 items-start">
          {/* Left: Menu */}
          <div className="flex-1 min-w-0">
            <MenuFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <div className="space-y-4">
              {filteredMenu.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <p>Tidak ada menu di kategori ini.</p>
                </div>
              ) : (
                filteredMenu.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right: Sticky Cart (desktop only) */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <CartSidebar
              cartItems={cartItems}
              onUpdateQty={handleUpdateQty}
              onClose={() => setIsMobileCartOpen(false)}
              isMobileOpen={false}
            />
          </div>
        </div>
      </main>

      {/* Mobile: Floating Bottom Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden p-4">
          <button
            onClick={() => setIsMobileCartOpen(true)}
            className="w-full bg-[#1A2E1A] text-white py-4 rounded-2xl font-semibold flex items-center justify-between px-5 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <span className="bg-white text-[#1A2E1A] text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
              <span>Lihat Keranjang</span>
            </div>
            <ShoppingBasket size={20} />
          </button>
        </div>
      )}

      {/* Mobile Cart Drawer */}
      <div className="md:hidden">
        <CartSidebar
          cartItems={cartItems}
          onUpdateQty={handleUpdateQty}
          onClose={() => setIsMobileCartOpen(false)}
          isMobileOpen={isMobileCartOpen}
        />
      </div>

      <Footer />
    </div>
  );
}
