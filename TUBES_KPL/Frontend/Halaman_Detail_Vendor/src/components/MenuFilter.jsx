import { categories } from "../data/menuItems";

export default function MenuFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === cat
              ? "bg-[#1A2E1A] text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:border-[#1A2E1A] hover:text-[#1A2E1A]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
