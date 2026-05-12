import { Lock } from "lucide-react";
import { formatRupiah } from "../../keranjang/utils/formatRupiah";

/**
 * PaymentSummary — ringkasan pesanan + tombol konfirmasi.
 * Props:
 *   items: [{ id, name, description, price, qty, color, letter }]
 *   deliveryFee: number
 *   serviceFee: number
 *   onConfirm: () => void
 */
export default function PaymentSummary({ items, deliveryFee, serviceFee, onConfirm }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
      <h2 className="font-bold text-lg text-[#1A2E1A]">Order Summary</h2>

      {/* Daftar item */}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            {/* Avatar item */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: item.color }}
            >
              {item.letter}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 leading-tight">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.qty}</p>
            </div>
            <p className="text-sm font-semibold text-gray-800 shrink-0">
              {formatRupiah(item.price * item.qty)}
            </p>
          </li>
        ))}
      </ul>

      <hr className="border-gray-100" />

      {/* Rincian biaya */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>{formatRupiah(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Service Fee</span>
          <span>{formatRupiah(serviceFee)}</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-800">Total</span>
        <span className="font-bold text-xl text-[#B23B15]">{formatRupiah(total)}</span>
      </div>

      {/* Tombol konfirmasi */}
      <button
        onClick={onConfirm}
        className="w-full bg-[#1A2E1A] hover:bg-[#243d24] active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl transition-all"
      >
        Buat Pesanan
      </button>

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <Lock size={12} />
        Secure Checkout with 256-bit SSL
      </div>
    </div>
  );
}
