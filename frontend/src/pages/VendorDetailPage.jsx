import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Hero from "../features/vendor-detail/components/Hero";
import MenuFilter from "../features/vendor-detail/components/MenuFilter";
import MenuCard from "../features/vendor-detail/components/MenuCard";
import CartSidebar from "../features/vendor-detail/components/CartSidebar";
import Footer from "../features/vendor-detail/components/Footer";
import { menuItems } from "../features/vendor-detail/data/menuItems";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../styles/vendor-detail.css";

const menuListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function VendorDetailPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  const {
    cartItems,
    totalItems,
    addToCart,
    updateQty,
  } = useCart();

  const filteredMenu = useMemo(() => {
    if (activeCategory === "All") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="vendor-detail-page">
      <section className="vendor-detail-hero-wrap">
        <Hero />
      </section>

      <main className="vendor-detail-content">
        <div className="vendor-detail-layout">
          <section>
            <div className="vendor-detail-menu-header">
              <h2>Signature Packages</h2>
            </div>

            <div className="vendor-detail-filter-wrap">
              <MenuFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            <motion.div
              key={activeCategory}
              className="vendor-detail-menu-list"
              variants={menuListVariants}
              initial="hidden"
              animate="show"
            >
              {filteredMenu.length === 0 ? (
                <div className="rounded-3xl border border-[#E6E6DE] bg-white px-6 py-16 text-center shadow-sm">
                  <p className="text-sm text-gray-500">
                    Tidak ada menu di kategori ini.
                  </p>
                </div>
              ) : (
                filteredMenu.map((item) => (
                  <motion.div key={item.id} variants={menuItemVariants}>
                    <MenuCard item={item} onAddToCart={addToCart} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </section>

          <aside className="vendor-detail-cart-wrap">
            <CartSidebar
              cartItems={cartItems}
              onUpdateQty={updateQty}
              onClose={() => setIsMobileCartOpen(false)}
              isMobileOpen={false}
            />
          </aside>
        </div>
      </main>

      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
          <button
            onClick={() => setIsMobileCartOpen(true)}
            className="flex w-full items-center justify-between rounded-2xl bg-[#184D2C] px-5 py-4 font-semibold text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:bg-[#113B22]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#184D2C]">
                {totalItems}
              </span>
              <span>Lihat Keranjang</span>
            </div>

            <ShoppingBasket size={20} />
          </button>
        </div>
      )}

      <div className="lg:hidden">
        <CartSidebar
          cartItems={cartItems}
          onUpdateQty={updateQty}
          onClose={() => setIsMobileCartOpen(false)}
          isMobileOpen={isMobileCartOpen}
        />
      </div>

      <Footer />
    </div>
  );
}