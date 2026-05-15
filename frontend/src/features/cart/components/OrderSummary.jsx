import { useState } from "react";
import { Link } from "react-router-dom";
import { Tag, ChevronRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./OrderSummary.css";

function formatRp(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

const DELIVERY_FEE = 12000;
const SERVICE_FEE = 2000;
const VOUCHER_DISCOUNT = 5000;

export default function OrderSummary({ cartItems }) {
  const [voucherApplied, setVoucherApplied] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = voucherApplied ? VOUCHER_DISCOUNT : 0;
  const total = Math.max(
    subtotal + DELIVERY_FEE + SERVICE_FEE - discount,
    0
  );

  return (
    <aside className="order-summary-card">
      <h2>Ringkasan Pesanan</h2>

      <div className="summary-detail-list">
        <div className="summary-detail-row">
          <span>Subtotal ({itemCount} item)</span>

          <motion.strong
            key={subtotal}
            initial={{ opacity: 0.6, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            {formatRp(subtotal)}
          </motion.strong>
        </div>

        <div className="summary-detail-row">
          <span>Ongkos Kirim</span>
          <strong>{formatRp(DELIVERY_FEE)}</strong>
        </div>

        <div className="summary-detail-row">
          <span>Biaya Layanan</span>
          <strong>{formatRp(SERVICE_FEE)}</strong>
        </div>

        <AnimatePresence>
          {voucherApplied && (
            <motion.div
              className="summary-detail-row discount-row"
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span>Diskon Voucher</span>
              <strong>- {formatRp(VOUCHER_DISCOUNT)}</strong>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="summary-total-row">
        <span>Total</span>

        <motion.strong
          key={total}
          initial={{ opacity: 0.7, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {formatRp(total)}
        </motion.strong>
      </div>

      <motion.button
        type="button"
        className={`voucher-box ${voucherApplied ? "voucher-active" : ""}`}
        onClick={() => setVoucherApplied((prev) => !prev)}
        aria-pressed={voucherApplied}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="voucher-content">
          <motion.div
            className="voucher-icon"
            animate={{
              rotate: voucherApplied ? 0 : -8,
              scale: voucherApplied ? 1.08 : 1,
            }}
            transition={{ duration: 0.25 }}
          >
            {voucherApplied ? <Check size={18} /> : <Tag size={18} />}
          </motion.div>

          <span>
            {voucherApplied
              ? "Voucher berhasil diterapkan"
              : "Hemat Rp 5.000 dengan voucher"}
          </span>
        </div>

        <ChevronRight size={18} />
      </motion.button>

      <motion.div
        whileHover={cartItems.length > 0 ? { y: -2 } : {}}
        whileTap={cartItems.length > 0 ? { scale: 0.98 } : {}}
      >
        <Link
          to="/checkout"
          className={`checkout-link ${
            cartItems.length === 0 ? "checkout-disabled" : ""
          }`}
        >
          Lanjut ke Checkout
        </Link>
      </motion.div>

      <p className="summary-terms">
        Dengan menekan tombol, Anda setuju dengan{" "}
        <a href="#">Syarat &amp; Ketentuan</a> kami.
      </p>
    </aside>
  );
}