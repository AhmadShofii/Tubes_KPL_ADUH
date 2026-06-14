import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock3,
  Flame,
  Heart,
  MapPin,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Truck,
  Utensils,
  X,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import "../styles/vendor-detail.css";

const menuCategories = ["Semua", "Paket Nasi", "Sate", "Snack", "Minuman"];

const menuItems = [
  {
    id: 1,
    name: "Paket Rendang Heritage",
    desc: "Rendang sapi, nasi hangat, daun singkong, telur balado, dan sambal hijau.",
    category: "Paket Nasi",
    price: 45000,
    oldPrice: 55000,
    rating: 4.9,
    time: "18 min",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sate Ayam Smoky",
    desc: "10 tusuk sate ayam bakar arang, lontong, bumbu kacang, dan acar segar.",
    category: "Sate",
    price: 38000,
    oldPrice: 46000,
    rating: 4.8,
    time: "15 min",
    badge: "Chef Pick",
    image:
      "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Nasi Goreng Rempah",
    desc: "Nasi goreng rempah kampung, ayam suwir, telur, kerupuk, dan sambal terasi.",
    category: "Paket Nasi",
    price: 35000,
    oldPrice: null,
    rating: 4.7,
    time: "14 min",
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Bakwan Jagung Crispy",
    desc: "Bakwan jagung renyah isi 6 pcs, cocok untuk sharing bareng teman.",
    category: "Snack",
    price: 22000,
    oldPrice: null,
    rating: 4.6,
    time: "10 min",
    badge: "Snack",
    image:
      "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Es Teh Serai Lemon",
    desc: "Es teh segar dengan aroma serai dan lemon. Cocok untuk menu pedas.",
    category: "Minuman",
    price: 16000,
    oldPrice: null,
    rating: 4.8,
    time: "5 min",
    badge: "Fresh",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Sambal Trio Nusantara",
    desc: "Sambal hijau, sambal matah, dan sambal terasi untuk tambah rasa.",
    category: "Snack",
    price: 15000,
    oldPrice: null,
    rating: 4.7,
    time: "5 min",
    badge: "Spicy",
    image:
      "https://images.unsplash.com/photo-1606914501491-6a8d4d9bdf23?q=80&w=1000&auto=format&fit=crop",
  },
];

function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

function getItemId(item) {
  return item.id || item.id_menu;
}

function getItemName(item) {
  return item.name || item.nama_menu || "Menu Foodora";
}

function getItemPrice(item) {
  return Number(item.price || item.harga || 0);
}

function getItemQty(item) {
  return Number(item.qty || item.jumlah || 1);
}

export default function VendorDetailPage() {
  const { cartItems, addToCart, updateQty } = useCart();

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  const filteredMenus = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        activeCategory === "Semua" || item.category === activeCategory;

      const keyword = query.trim().toLowerCase();

      const matchSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [activeCategory, query]);

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + getItemPrice(item) * getItemQty(item);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + getItemQty(item);
  }, 0);

  const serviceFee = cartItems.length > 0 ? 2000 : 0;
  const deliveryFee = cartItems.length > 0 ? 12000 : 0;
  const discount = subtotal >= 80000 ? 12000 : 0;
  const total = Math.max(subtotal + serviceFee + deliveryFee - discount, 0);

  function handleAdd(item) {
    addToCart({
      id: item.id,
      id_menu: item.id,
      name: item.name,
      nama_menu: item.name,
      desc: item.desc,
      description: item.desc,
      price: item.price,
      harga: item.price,
      image: item.image,
      img: item.image,
    });
  }

  function handleRemove(item) {
    updateQty(getItemId(item), 0);
  }

  return (
    <div className="vdx-page">
      <main className="vdx-container">
        <motion.section
          className="vdx-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="vdx-hero-bg" />
          <div className="vdx-hero-shade" />

          <motion.div
            className="vdx-floating-card vdx-floating-card-a"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame size={18} />
            Promo Hari Ini
          </motion.div>

          <motion.div
            className="vdx-floating-card vdx-floating-card-b"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Truck size={18} />
            20-30 menit
          </motion.div>

          <div className="vdx-hero-content">
            <div className="vdx-hero-left">
              <div className="vdx-hero-badges">
                <span>
                  <ShieldCheck size={15} />
                  Verified Vendor
                </span>

                <span>
                  <Star size={15} fill="currentColor" />
                  4.8 rating
                </span>
              </div>

              <h1>Dapur Ananda</h1>

              <p>
                Masakan Indonesia rumahan dengan rasa premium. Cocok untuk makan
                siang, keluarga, acara kecil, sampai meeting kantor.
              </p>

              <div className="vdx-hero-meta">
                <div>
                  <Clock3 size={17} />
                  <span>20-30 min</span>
                </div>

                <div>
                  <MapPin size={17} />
                  <span>1.2 km</span>
                </div>

                <div>
                  <Utensils size={17} />
                  <span>Indonesian Food</span>
                </div>
              </div>
            </div>

            <div className="vdx-hero-panel">
              <span>Mulai dari</span>
              <strong>Rp15.000</strong>
              <p>Gratis ongkir untuk pesanan mulai Rp80.000.</p>

              <button type="button">
                <Heart size={18} />
                Simpan Vendor
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="vdx-stats"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {[
            { icon: Star, value: "4.8/5", label: "Rating pelanggan" },
            { icon: Truck, value: "20-30", label: "Menit pengiriman" },
            { icon: Tag, value: "Gratis", label: "Ongkir min. 80rb" },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                className="vdx-stat-card"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5 }}
              >
                <div>
                  <Icon size={20} />
                </div>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.div>
            );
          })}
        </motion.section>

        <section className="vdx-layout">
          <div className="vdx-menu-area">
            <motion.div
              className="vdx-menu-header"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div>
                <span className="vdx-kicker">
                  <Sparkles size={15} />
                  Menu Pilihan
                </span>

                <h2>Pilih menu favoritmu</h2>

                <p>
                  Cari menu, pilih kategori, lalu tambahkan langsung ke
                  keranjang.
                </p>
              </div>

              <div className="vdx-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Cari rendang, sate, minuman..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")}>
                    <X size={16} />
                  </button>
                )}
              </div>
            </motion.div>

            <div className="vdx-category-tabs">
              {menuCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {subtotal >= 80000 && (
                <motion.div
                  className="vdx-promo-unlocked"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                >
                  <Tag size={18} />
                  <span>Promo gratis ongkir aktif. Kamu hemat Rp12.000.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              key={`${activeCategory}-${query}`}
              className="vdx-menu-grid"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {filteredMenus.length === 0 ? (
                <motion.div
                  className="vdx-empty-menu"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Search size={30} />
                  <h3>Menu tidak ditemukan</h3>
                  <p>Coba kata kunci lain atau pilih kategori Semua.</p>
                </motion.div>
              ) : (
                filteredMenus.map((item) => (
                  <MenuCard key={item.id} item={item} onAdd={handleAdd} />
                ))
              )}
            </motion.div>
          </div>

          <aside className="vdx-cart-desktop">
            <CartPanel
              cartItems={cartItems}
              subtotal={subtotal}
              serviceFee={serviceFee}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
              onUpdateQty={updateQty}
              onRemove={handleRemove}
            />
          </aside>
        </section>
      </main>

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            type="button"
            className="vdx-mobile-cart-button"
            onClick={() => setMobileCartOpen(true)}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 26 }}
          >
            <span>{totalItems} item</span>
            <strong>{formatRp(total)}</strong>
            <ShoppingBasket size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileCartOpen && (
          <>
            <motion.div
              className="vdx-cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileCartOpen(false)}
            />

            <motion.div
              className="vdx-cart-drawer"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              exit={{ y: "110%" }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <CartPanel
                cartItems={cartItems}
                subtotal={subtotal}
                serviceFee={serviceFee}
                deliveryFee={deliveryFee}
                discount={discount}
                total={total}
                onUpdateQty={updateQty}
                onRemove={handleRemove}
                onClose={() => setMobileCartOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuCard({ item, onAdd }) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    onAdd(item);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 900);
  }

  return (
    <motion.article
      className="vdx-menu-card"
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      layout
    >
      <div className="vdx-menu-image">
        <img src={item.image} alt={item.name} />

        <span className="vdx-menu-badge">{item.badge}</span>

        <span className="vdx-menu-rating">
          <Star size={14} fill="currentColor" />
          {item.rating}
        </span>
      </div>

      <div className="vdx-menu-body">
        <div className="vdx-menu-title">
          <h3>{item.name}</h3>
          <span>{item.category}</span>
        </div>

        <p>{item.desc}</p>

        <div className="vdx-menu-info">
          <small>
            <Clock3 size={14} />
            {item.time}
          </small>

          <small>
            <Flame size={14} />
            Fresh cooked
          </small>
        </div>

        <div className="vdx-menu-bottom">
          <div>
            <strong>{formatRp(item.price)}</strong>
            {item.oldPrice && <small>{formatRp(item.oldPrice)}</small>}
          </div>

          <button
            type="button"
            className={added ? "added" : ""}
            onClick={handleClick}
          >
            {added ? (
              "Ditambah"
            ) : (
              <>
                <Plus size={17} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function CartPanel({
  cartItems,
  subtotal,
  serviceFee,
  deliveryFee,
  discount,
  total,
  onUpdateQty,
  onRemove,
  onClose,
}) {
  return (
    <div className="vdx-cart-panel">
      <div className="vdx-cart-head">
        <div>
          <span>Keranjang</span>
          <h3>Pesanan Kamu</h3>
        </div>

        {onClose && (
          <button type="button" onClick={onClose}>
            <X size={20} />
          </button>
        )}
      </div>

      <div className="vdx-delivery-progress">
        <div>
          <span>Gratis ongkir</span>
          <strong>
            {subtotal >= 80000 ? "Aktif" : `${formatRp(80000 - subtotal)} lagi`}
          </strong>
        </div>

        <div className="vdx-progress-track">
          <span style={{ width: `${Math.min((subtotal / 80000) * 100, 100)}%` }} />
        </div>
      </div>

      <div className="vdx-cart-items">
        {cartItems.length === 0 ? (
          <div className="vdx-cart-empty">
            <ShoppingBasket size={34} />
            <h4>Keranjang kosong</h4>
            <p>Tambahkan menu dulu untuk lanjut checkout.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {cartItems.map((item) => {
              const id = getItemId(item);
              const name = getItemName(item);
              const price = getItemPrice(item);
              const qty = getItemQty(item);

              return (
                <motion.div
                  key={id}
                  className="vdx-cart-item"
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                >
                  <div className="vdx-cart-item-top">
                    <div>
                      <h4>{name}</h4>
                      <p>{formatRp(price)} / item</p>
                    </div>

                    <button type="button" onClick={() => onRemove(item)}>
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="vdx-cart-item-bottom">
                    <div className="vdx-cart-qty">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(id, qty - 1)}
                      >
                        <Minus size={14} />
                      </button>

                      <span>{qty}</span>

                      <button
                        type="button"
                        onClick={() => onUpdateQty(id, qty + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <strong>{formatRp(price * qty)}</strong>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      <div className="vdx-cart-summary">
        <div className="vdx-summary-row">
          <span>Subtotal</span>
          <strong>{formatRp(subtotal)}</strong>
        </div>

        <div className="vdx-summary-row">
          <span>Ongkir</span>
          <strong>{discount > 0 ? "Gratis" : formatRp(deliveryFee)}</strong>
        </div>

        <div className="vdx-summary-row">
          <span>Biaya layanan</span>
          <strong>{formatRp(serviceFee)}</strong>
        </div>

        {discount > 0 && (
          <div className="vdx-summary-row discount">
            <span>Diskon</span>
            <strong>-{formatRp(discount)}</strong>
          </div>
        )}

        <div className="vdx-total-row">
          <span>Total</span>
          <strong>{formatRp(total)}</strong>
        </div>

        <Link
          to="/checkout"
          className={`vdx-checkout-btn ${
            cartItems.length === 0 ? "disabled" : ""
          }`}
          onClick={onClose}
        >
          Checkout Sekarang
          <ShoppingBag size={18} />
        </Link>

        <p>Pembayaran aman dan pesanan langsung diproses vendor.</p>
      </div>
    </div>
  );
}