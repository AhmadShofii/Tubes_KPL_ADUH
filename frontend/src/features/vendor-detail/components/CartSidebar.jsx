// frontend/src/features/vendor-detail/components/CartSidebar.jsx

import {
  X,
  Plus,
  Minus,
  ShoppingBasket,
  Tag,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

const DELIVERY_FEE = 12000;
const SERVICE_FEE = 2000;
const PROMO_CODE = "ANANDAFRESH";

export default function CartSidebar({
  cartItems,
  onUpdateQty,
  onClose,
  isMobileOpen,
}) {
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + Number(item.price || item.harga || 0) * Number(item.qty || 1);
  }, 0);

  const itemCount = cartItems.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const total = subtotal + SERVICE_FEE;

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="vendor-cart-overlay"
            onClick={onClose}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <aside
        className={`vendor-cart-sidebar vendor-cart-sidebar-pro ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="vendor-cart-header">
          <div>
            <div className="vendor-cart-title">
              <ShoppingBasket size={20} />
              <h3>Cart</h3>
            </div>

            <p>
              {itemCount} {itemCount === 1 ? "item" : "items"} selected
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="vendor-cart-close-btn"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="vendor-cart-free-progress">
          <div className="vendor-cart-free-top">
            <span>Free delivery progress</span>
            <strong>{subtotal >= 80000 ? "Unlock" : formatRupiah(80000 - subtotal)}</strong>
          </div>
          <div className="vendor-cart-progress-line">
            <span style={{ width: `${Math.min((subtotal / 80000) * 100, 100)}%` }} />
          </div>
        </div>

        <div className="vendor-cart-items">
          {cartItems.length === 0 ? (
            <div className="vendor-cart-empty">
              <motion.div
                animate={{ y: [0, -7, 0], rotate: [0, -4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShoppingBasket size={30} />
              </motion.div>

              <h4>Cart masih kosong</h4>
              <p>Pilih menu favoritmu untuk mulai checkout.</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <motion.div
                  className="vendor-cart-item"
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 24, scale: 0.96 }}
                >
                  <div className="vendor-cart-item-top">
                    <div>
                      <h4>{item.name || item.nama_menu}</h4>

                      <p>{item.description || item.desc || "Menu pilihan"}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, 0)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="vendor-cart-item-bottom">
                    <div className="vendor-cart-qty">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <motion.span
                        key={item.qty}
                        initial={{ scale: 0.75 }}
                        animate={{ scale: 1 }}
                      >
                        {item.qty}
                      </motion.span>

                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <strong>
                      {formatRupiah(
                        Number(item.price || item.harga || 0) *
                          Number(item.qty || 1)
                      )}
                    </strong>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="vendor-cart-summary">
            <div className="vendor-promo-banner vendor-promo-banner-top">
              <div>
                <Sparkles size={18} />
              </div>

              <section>
                <h4>Free Delivery applied!</h4>
                <p>Promo code: {PROMO_CODE}</p>
              </section>
            </div>

            <div className="vendor-cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatRupiah(subtotal)}</strong>
            </div>

            <div className="vendor-cart-summary-row">
              <span>Delivery Fee</span>

              <div className="vendor-delivery-free">
                <small>{formatRupiah(DELIVERY_FEE)}</small>
                <strong>Rp0</strong>
              </div>
            </div>

            <div className="vendor-cart-summary-row">
              <span>Service Fee</span>
              <strong>{formatRupiah(SERVICE_FEE)}</strong>
            </div>

            <div className="vendor-cart-total">
              <span>Total</span>
              <strong>{formatRupiah(total)}</strong>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="vendor-checkout-btn"
            >
              Checkout Now →
            </Link>

            <p className="vendor-tax-note">Taxes included in total</p>

            <div className="vendor-promo-banner">
              <div>
                <Tag size={18} />
              </div>

              <section>
                <h4>Extra Sambal Gratis</h4>
                <p>Untuk setiap pembelian paket nasi.</p>
              </section>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}