import { categories } from "../data/menuItems";

export default function MenuFilter({
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex justify-end">
      <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-[#ECEDE7] p-1.5 shadow-sm">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-[#07552B] text-white shadow-[0_8px_18px_rgba(7,85,43,0.24)]"
                  : "text-[#596257] hover:bg-white hover:text-[#07552B]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}