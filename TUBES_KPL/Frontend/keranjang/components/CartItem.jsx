import { Trash2, Plus, Minus } from "lucide-react";
import { formatRupiah } from "../utils/formatRupiah";

/**
 * CartItem — komponen untuk satu baris item di keranjang.
 *
 * Props:
 *  - item: object { id, name, description, price, qty, color, letter }
 *  - onIncreaseQuantity: fn(id)
 *  - onDecreaseQuantity: fn(id)
 *  - onRemoveItem: fn(id)
 */
export default function CartItem({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}) {
  return (
    <div className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div
        className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-3xl font-black"
        style={{ backgroundColor: item.color }}
        aria-hidden="true"
      >
        {item.letter}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[#1A2E1A] text-base leading-tight">
            {item.name}
          </h3>
          {/* Tombol Hapus */}
          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 p-1 rounded-lg hover:bg-red-50"
            aria-label={`Hapus ${item.name} dari keranjang`}
          >
            <Trash2 size={18} />
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-0.5 mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[#B23B15] font-bold text-base">
            {formatRupiah(item.price)}
          </span>

          {/* Quantity Counter */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-1.5">
            <button
              onClick={() => onDecreaseQuantity(item.id)}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-red-400 hover:text-red-400 transition-colors"
              aria-label="Kurangi jumlah"
            >
              <Minus size={14} />
            </button>
            <span className="text-[#1A2E1A] font-bold text-base w-5 text-center">
              {item.qty}
            </span>
            <button
              onClick={() => onIncreaseQuantity(item.id)}
              className="w-7 h-7 rounded-full bg-[#1A2E1A] flex items-center justify-center text-white hover:bg-[#2d4a2d] transition-colors"
              aria-label="Tambah jumlah"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
