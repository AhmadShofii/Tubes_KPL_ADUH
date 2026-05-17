import { ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function MenuCard({ item, onAddToCart }) {
  return (
    <article className="group flex flex-col gap-4 rounded-[22px] border border-[#ECECE3] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.10)] sm:flex-row sm:items-center">
      <div className="h-32 w-full flex-shrink-0 overflow-hidden rounded-[18px] bg-[#EEF0E8] sm:h-28 sm:w-28">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] font-bold leading-tight text-[#07552B]">
              {item.name}
            </h3>

            {item.badge && (
              <span className="rounded-full bg-[#DFF3DF] px-2.5 py-1 text-[10px] font-bold text-[#1F7A37]">
                {item.badge}
              </span>
            )}
          </div>

          <p className="max-w-2xl text-[13px] leading-5 text-[#667064]">
            {item.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[17px] font-extrabold text-[#D95F36]">
              {formatRupiah(item.price)}
            </span>

            {item.originalPrice && (
              <span className="text-[13px] font-medium text-[#A5ABA2] line-through">
                {formatRupiah(item.originalPrice)}
              </span>
            )}
          </div>

          <motion.button
            type="button"
            onClick={() => onAddToCart(item)}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#07552B] px-4 text-[13px] font-bold text-white shadow-[0_10px_20px_rgba(7,85,43,0.20)] transition-all duration-300 hover:bg-[#064822] hover:shadow-[0_14px_24px_rgba(7,85,43,0.28)] sm:w-auto sm:min-w-[132px]"
          >
            <ShoppingBasket size={15} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </article>
  );
}