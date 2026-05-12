import { X, Plus, Minus, ShoppingBasket, Tag } from "lucide-react";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp");
}

const DELIVERY_FEE = 12000;
const SERVICE_FEE = 2000;
const PROMO_CODE = "AMANDAFRESH";

export default function CartSidebar({ cartItems, onUpdateQty, onClose, isMobileOpen }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discountedDelivery = 0;
  const total = subtotal + discountedDelivery + SERVICE_FEE;
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky md:top-20 right-0 z-50
          w-80 md:w-full
          bg-white rounded-2xl shadow-xl
          flex flex-col
          transition-transform duration-300
          md:translate-x-0 md:max-h-[calc(100vh-6rem)]
          ${isMobileOpen ? "translate-x-0 top-0 h-full" : "translate-x-full top-0 h-full"}
          md:h-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBasket size={20} className="text-[#1A2E1A]" />
            <span className="font-bold text-[#1A2E1A] text-lg">Cart</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{itemCount} Items</span>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-full hover:bg-gray-100"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <ShoppingBasket size={40} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                {/* Qty Controls */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded-full bg-[#1A2E1A] text-white flex items-center justify-center hover:bg-[#2d4a2d] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                  <span className="text-sm font-bold text-[#1A2E1A] w-6 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1A2E1A] leading-tight">
                    {item.name}
                  </p>
                  {item.note && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>
                  )}
                </div>

                {/* Price */}
                <span className="text-sm font-bold text-[#1A2E1A] whitespace-nowrap">
                  {formatRupiah(item.price * item.qty)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Cost Breakdown */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-400">
                  {formatRupiah(DELIVERY_FEE)}
                </span>
                <span className="text-green-600 font-semibold">Rp 0</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Service Fee</span>
              <span>{formatRupiah(SERVICE_FEE)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#1A2E1A] text-base pt-2 border-t border-gray-100">
              <span>Total</span>
              <span className="text-[#B23B15]">{formatRupiah(total)}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-[#B23B15] text-white py-3 rounded-xl font-semibold text-base hover:bg-[#9a3212] active:scale-95 transition-all flex items-center justify-center gap-2 mt-2">
              Checkout Now →
            </button>

            <p className="text-center text-xs text-gray-400 uppercase tracking-wider">
              Taxes included in total
            </p>

            {/* Promo Banner */}
            <div className="bg-[#1A2E1A] text-white rounded-xl p-3 flex items-center gap-3 mt-2">
              <Tag size={18} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Free Delivery applied!</p>
                <p className="text-xs opacity-70">Promo code: {PROMO_CODE}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
