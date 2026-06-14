import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  PackageCheck,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

import CartItem from "../features/cart/components/CartItem";
import OrderSummary from "../features/cart/components/OrderSummary";
import { useCart } from "../context/CartContext";
import "../features/cart/styles/cart.css";

const recommendedMenus = [
  {
    id: 105,
    id_menu: 105,
    name: "Es Teh Serai Lemon",
    nama_menu: "Es Teh Serai Lemon",
    desc: "Minuman segar pendamping makanan pedas.",
    price: 16000,
    harga: 16000,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 104,
    id_menu: 104,
    name: "Bakwan Jagung Crispy",
    nama_menu: "Bakwan Jagung Crispy",
    desc: "Gorengan renyah untuk sharing.",
    price: 22000,
    harga: 22000,
    image:
      "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 106,
    id_menu: 106,
    name: "Sambal Trio Nusantara",
    nama_menu: "Sambal Trio Nusantara",
    desc: "Sambal hijau, sambal matah, dan sambal terasi untuk tambah rasa.",
    price: 15000,
    harga: 15000,
    image:
      "https://images.unsplash.com/photo-1606914501491-6a8d4d9bdf23?q=80&w=900&auto=format&fit=crop",
  },
];

function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

export default function CartPage() {
  const { cartItems, updateQty, removeFromCart, addToCart, totalItems } =
    useCart();

  const subtotal = cartItems.reduce((sum, item) => {
    return (
      sum +
      Number(item.price || item.harga || 0) *
        Number(item.qty || item.jumlah || 1)
    );
  }, 0);

  const filteredRecommended = recommendedMenus.filter(
    (menu) => !cartItems.some((item) => item.id === menu.id)
  );

  return (
    <div className="cart-page">
      <main className="cart-main">
        <div className="cart-container">
          <motion.header
            className="cart-hero"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="cart-hero-copy">
              <span className="cart-hero-badge">
                <ShoppingBag size={16} /> Foodora Cart
              </span>

              <h1>Keranjang Saya</h1>

              <p>
                Cek lagi pesanan kamu, atur jumlah menu, pakai voucher, lalu
                lanjut checkout dengan tampilan yang lebih rapi.
              </p>
            </div>

            <motion.div
              className="cart-hero-total"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span>Total sementara</span>
              <strong>{formatRp(subtotal)}</strong>
              <p>{totalItems || 0} item di keranjang</p>
            </motion.div>
          </motion.header>

          <motion.div
            className="cart-benefits"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {[
              {
                icon: Truck,
                title: "Fast Delivery",
                text: "Estimasi 20-30 menit",
              },
              {
                icon: BadgePercent,
                title: "Voucher Ready",
                text: "Diskon langsung tersedia",
              },
              {
                icon: PackageCheck,
                title: "Fresh Packed",
                text: "Pesanan aman sampai",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  className="cart-benefit-card"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div>
                    <Icon size={20} />
                  </div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <section className="cart-layout">
            <div className="cart-left">
              <AnimatePresence mode="wait">
                {cartItems.length === 0 ? (
                  <motion.div
                    key="empty"
                    className="cart-empty"
                    initial={{ opacity: 0, y: 22, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.98 }}
                  >
                    <motion.div
                      className="cart-empty-icon"
                      animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      🛒
                    </motion.div>

                    <h2>Keranjang kamu masih kosong</h2>
                    <p>
                      Pilih menu favorit dulu, nanti pesananmu muncul di sini.
                    </p>

                    <Link to="/vendor-detail" className="cart-empty-link">
                      Lihat Menu <ArrowRight size={17} />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    className="cart-list-area"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="cart-list-head">
                      <div>
                        <span>ITEM PESANAN</span>
                        <h2>{cartItems.length} menu dipilih</h2>
                      </div>

                      <Link to="/vendor-detail">Tambah menu</Link>
                    </div>

                    <div className="cart-items">
                      <AnimatePresence initial={false}>
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQty={updateQty}
                            onDelete={removeFromCart}
                          />
                        ))}
                      </AnimatePresence>
                    </div>

                    <Link to="/vendor-detail" className="cart-add-more">
                      <span>
                        <Plus size={17} />
                      </span>
                      Tambah Menu Lainnya
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {filteredRecommended.length > 0 && (
                <motion.section
                  className="cart-recommend"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                >
                  <div className="cart-recommend-head">
                    <span>
                      <Sparkles size={14} /> REKOMENDASI
                    </span>
                    <h2>Lengkapi Pesananmu</h2>
                  </div>

                  <div className="cart-recommend-grid">
                    {filteredRecommended.map((item) => (
                      <motion.article
                        key={item.id}
                        className="cart-recommend-card"
                        whileHover={{ y: -6 }}
                      >
                        <img src={item.image} alt={item.name} />

                        <div>
                          <h3>{item.name}</h3>
                          <p>{formatRp(item.price)}</p>

                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                          >
                            + Tambah
                          </button>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            <motion.div
              className="cart-summary-sticky"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              <OrderSummary cartItems={cartItems} />
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}