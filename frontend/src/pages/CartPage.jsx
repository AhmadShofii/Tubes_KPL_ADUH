import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "../features/cart/components/CartItem";
import OrderSummary from "../features/cart/components/OrderSummary";
import "../features/cart/styles/cart.css";

const initialCart = [
  {
    id: 1,
    name: "Paket B (Nasi Ayam Bakar)",
    desc: "Ayam Bakar Madu, Nasi Putih, Lalapan, Sambal Terasi",
    price: 45000,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
  },
  {
    id: 2,
    name: "Air Mineral (600ml)",
    desc: "Kemasan botol dingin",
    price: 6000,
    qty: 2,
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&q=80",
  },
];

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const summaryVariants = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.18,
    },
  },
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);

  function handleUpdateQty(id, qty) {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function handleDelete(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="cart-page">
      <main className="cart-main">
        <div className="cart-container">
          <motion.header
            className="cart-page-header"
            variants={headerVariants}
            initial="hidden"
            animate="show"
          >
            <h1>Keranjang Saya</h1>
            <p>
              Periksa kembali pesanan Anda sebelum melanjutkan ke pembayaran.
            </p>
          </motion.header>

          <section className="cart-content-layout">
            <div className="cart-left-column">
              <AnimatePresence mode="wait">
                {cartItems.length === 0 ? (
                  <motion.div
                    key="empty-cart"
                    className="cart-empty-state"
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.div
                      className="empty-icon"
                      initial={{ scale: 0.8, rotate: -8 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      🛒
                    </motion.div>

                    <h2>Keranjang kamu kosong</h2>
                    <p>Tambahkan menu favoritmu untuk melanjutkan.</p>

                    <Link to="/vendor-detail" className="empty-back-link">
                      Kembali ke menu
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cart-list"
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                  >
                    <div className="cart-items-wrapper">
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQty={handleUpdateQty}
                            onDelete={handleDelete}
                          />
                        ))}
                      </AnimatePresence>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.35 }}
                      whileHover={{ y: -2 }}
                    >
                      <Link to="/vendor-detail" className="add-more-button">
                        <span className="add-more-icon">+</span>
                        Tambah Menu Lainnya
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              variants={summaryVariants}
              initial="hidden"
              animate="show"
            >
              <OrderSummary cartItems={cartItems} />
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}