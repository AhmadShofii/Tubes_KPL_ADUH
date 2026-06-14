import { categories } from "../data/menuItems";

export default function MenuFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="vendor-menu-filter">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={activeCategory === category ? "active" : ""}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}