import { Tag, ChevronRight } from "lucide-react";
import { formatRupiah } from "../utils/formatRupiah";
import { DELIVERY_FEE, SERVICE_FEE } from "../data/cartData";

/**
 * OrderSummary — ringkasan total pesanan di sidebar kanan.
 *
 * Props:
 *  - cartItems: array item di keranjang
 */
export default function OrderSummary({ cartItems }) {
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#1A2E1A]">Ringkasan Pesanan</h2>

      {/* Rincian Biaya */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal ({totalQty} item)</span>
          <span className="font-medium text-gray-700">
            {formatRupiah(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Ongkos Kirim</span>
          <span className="font-medium text-gray-700">
            {formatRupiah(DELIVERY_FEE)}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Biaya Layanan</span>
          <span className="font-medium text-gray-700">
            {formatRupiah(SERVICE_FEE)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#1A2E1A] text-base">Total</span>
          <span className="font-bold text-[#B23B15] text-xl">
            {formatRupiah(total)}
          </span>
        </div>
      </div>

      {/* Voucher Banner */}
      <button className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <Tag size={18} className="text-[#1A2E1A]" />
          <span className="text-sm text-gray-600">
            Hemat {formatRupiah(5000)} dengan voucher
          </span>
        </div>
        <ChevronRight size={18} className="text-gray-400" />
      </button>

      {/* Checkout Button */}
      <button
        className="w-full bg-[#1A2E1A] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#2d4a2d] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={cartItems.length === 0}
      >
        Lanjut ke Checkout
      </button>

      <p className="text-center text-xs text-gray-400 leading-relaxed">
        Dengan menekan tombol, Anda setuju dengan{" "}
        <a href="#" className="underline hover:text-[#1A2E1A]">
          Syarat &amp; Ketentuan
        </a>{" "}
        kami.
      </p>
    </div>
  );
}
