import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, ShieldCheck, Tag } from "lucide-react";

function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

const DELIVERY_FEE = 12000;
const SERVICE_FEE = 2000;
const VOUCHER_DISCOUNT = 5000;

export default function OrderSummary({ cartItems = [] }) {
  const [voucherApplied, setVoucherApplied] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => {
    return sum + Number(item.qty || item.jumlah || 1);
  }, 0);

  const subtotal = cartItems.reduce((sum, item) => {
    return (
      sum +
      Number(item.price || item.harga || 0) *
        Number(item.qty || item.jumlah || 1)
    );
  }, 0);

  const discount =
    voucherApplied && cartItems.length > 0 ? VOUCHER_DISCOUNT : 0;

  const total = Math.max(subtotal + DELIVERY_FEE + SERVICE_FEE - discount, 0);

  return (
    <aside className="cart-summary">
      <div className="cart-summary-head">
        <div>
          <span>ORDER SUMMARY</span>
          <h2>Ringkasan Pesanan</h2>
        </div>

        <div className="cart-summary-icon">
          <ShieldCheck size={22} />
        </div>
      </div>

      <div className="cart-summary-items">
        {cartItems.length === 0 ? (
          <div className="cart-summary-empty">Belum ada item di keranjang.</div>
        ) : (
          cartItems.slice(0, 3).map((item) => {
            const name = item.name || item.nama_menu || "Menu";
            const qty = Number(item.qty || item.jumlah || 1);
            const price = Number(item.price || item.harga || 0);

            return (
              <div className="cart-summary-mini" key={item.id || item.id_menu}>
                <span>{qty}x</span>
                <p>{name}</p>
                <strong>{formatRp(price * qty)}</strong>
              </div>
            );
          })
        )}
      </div>

      <div className="cart-summary-rows">
        <div>
          <span>Subtotal ({itemCount} item)</span>
          <strong>{formatRp(subtotal)}</strong>
        </div>

        <div>
          <span>Ongkos Kirim</span>
          <strong>{formatRp(DELIVERY_FEE)}</strong>
        </div>

        <div>
          <span>Biaya Layanan</span>
          <strong>{formatRp(SERVICE_FEE)}</strong>
        </div>

        <AnimatePresence>
          {discount > 0 && (
            <motion.div
              className="discount"
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
            >
              <span>Diskon Voucher</span>
              <strong>- {formatRp(discount)}</strong>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        className={`cart-voucher ${voucherApplied ? "active" : ""}`}
        onClick={() => setVoucherApplied((prev) => !prev)}
        disabled={cartItems.length === 0}
      >
        <div>
          <span>
            {voucherApplied ? <Check size={17} /> : <Tag size={17} />}
          </span>

          <p>
            {voucherApplied
              ? "Voucher berhasil dipakai"
              : "Pakai voucher hemat Rp5.000"}
          </p>
        </div>

        <ChevronRight size={18} />
      </button>

      <div className="cart-total">
        <span>Total</span>

        <motion.strong
          key={total}
          initial={{ opacity: 0.65, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {formatRp(total)}
        </motion.strong>
      </div>

      <motion.div
        whileHover={cartItems.length > 0 ? { y: -3 } : {}}
        whileTap={cartItems.length > 0 ? { scale: 0.98 } : {}}
      >
        <Link
          to="/checkout"
          className={`cart-checkout ${cartItems.length === 0 ? "disabled" : ""}`}
        >
          Lanjut ke Checkout
        </Link>
      </motion.div>

      <p className="cart-terms">
        Pembayaran aman. Harga sudah termasuk estimasi biaya layanan Foodora.
      </p>
    </aside>
  );
}