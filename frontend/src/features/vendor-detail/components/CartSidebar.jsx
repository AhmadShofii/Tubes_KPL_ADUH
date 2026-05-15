import {
  X,
  Plus,
  Minus,
  ShoppingBasket,
  Tag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

const DELIVERY_FEE = 12000;
const SERVICE_FEE = 2000;
const PROMO_CODE = "AMANDAFRESH";

export default function CartSidebar({
  cartItems,
  onUpdateQty,
  onClose,
  isMobileOpen,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discountedDelivery = 0;
  const total = subtotal + discountedDelivery + SERVICE_FEE;
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Cart Container */}
      <aside
        className={`
          fixed right-0 top-0 z-50 flex h-full w-[92%] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out
          lg:static lg:h-auto lg:w-full lg:max-w-none lg:translate-x-0 lg:rounded-[24px] lg:border lg:border-[#ECECE3] lg:shadow-[0_14px_34px_rgba(0,0,0,0.08)]
          ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECECE3] px-5 py-5">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBasket size={20} className="text-[#184D2C]" />
              <h3 className="text-lg font-bold text-[#184D2C]">Cart</h3>
            </div>

            <p className="mt-1 text-sm text-[#7B8178]">
              {itemCount} {itemCount === 1 ? "item" : "items"} selected
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#697066] transition hover:bg-[#F2F3EC] hover:text-[#184D2C] lg:hidden"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {cartItems.length === 0 ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-3xl bg-[#F8F8F1] px-5 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <ShoppingBasket size={28} className="text-[#B9BEB5]" />
              </div>

              <p className="text-sm font-semibold text-[#184D2C]">
                Cart masih kosong
              </p>

              <p className="mt-1 text-sm leading-relaxed text-[#7B8178]">
                Pilih menu favoritmu untuk mulai checkout.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#ECECE3] bg-[#FCFCF8] p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold leading-snug text-[#184D2C]">
                      {item.name}
                    </h4>

                    {item.note && (
                      <p className="mt-1 text-xs text-[#8A9086]">
                        {item.note}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.id, 0)}
                    className="rounded-full p-1.5 text-[#A7AAA3] transition hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  {/* Quantity Control */}
                  <div className="inline-flex items-center rounded-full border border-[#DDE1D6] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[#184D2C] transition hover:bg-[#EEF3E8]"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="min-w-8 text-center text-sm font-bold text-[#184D2C]">
                      {item.qty}
                    </span>

                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-[#084D17] text-white transition hover:bg-[#063D12]"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-[#184D2C]">
                    {formatRupiah(item.price * item.qty)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#ECECE3] bg-white px-5 py-5">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-[#697066]">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-[#697066]">
                <span>Delivery Fee</span>

                <div className="flex items-center gap-2">
                  <span className="text-[#A7AAA3] line-through">
                    {formatRupiah(DELIVERY_FEE)}
                  </span>
                  <span className="font-semibold text-[#1F7A37]">Rp0</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[#697066]">
                <span>Service Fee</span>
                <span>{formatRupiah(SERVICE_FEE)}</span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#ECECE3] pt-4">
                <span className="text-base font-bold text-[#184D2C]">
                  Total
                </span>
                <span className="text-lg font-bold text-[#D95F36]">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-[#D95F36] px-5 py-4 text-sm font-bold text-white shadow-[0_14px_26px_rgba(217,95,54,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9542F] active:translate-y-0"
            >
              Checkout Now →
            </Link>

            <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-[#A1A69D]">
              Taxes included in total
            </p>

            {/* Promo Banner */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#184D2C] px-4 py-4 text-white shadow-md">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                <Tag size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold">Free Delivery applied!</p>
                <p className="mt-0.5 text-xs text-white/75">
                  Promo code: {PROMO_CODE}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}