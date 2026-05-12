import { ShoppingBasket } from "lucide-react";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp");
}

export default function MenuCard({ item, onAddToCart }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      {/* Image / Placeholder */}
      <div
        className="w-24 h-24 md:w-28 md:h-28 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-4xl font-black"
        style={{ backgroundColor: item.color }}
      >
        {item.letter}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <h3 className="font-bold text-[#1A2E1A] text-base leading-tight">
            {item.name}
          </h3>
          {item.badge && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#B23B15] font-bold text-base">
              {formatRupiah(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                {formatRupiah(item.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center gap-2 bg-[#1A2E1A] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#2d4a2d] active:scale-95 transition-all"
          >
            <ShoppingBasket size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
