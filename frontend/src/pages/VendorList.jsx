import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiMapPin,
  FiNavigation,
  FiRefreshCw,
  FiSearch,
  FiSliders,
  FiTruck,
  FiX,
  FiZap,
} from "react-icons/fi";

import VendorCard from "../components/VendorCard";
import "../styles/vendor.css";
import { INITIAL_VENDORS } from "../data/vendorData";

function parseVendorPrice(value) {
  if (!value) return 0;

  const text = String(value).toLowerCase();
  const numberOnly = Number(text.replace(/[^\d]/g, ""));

  if (text.includes("rb") || text.includes("k")) {
    return numberOnly * 1000;
  }

  return numberOnly;
}

function formatRupiah(value) {
  if (!value) return "Rp 0";
  return "Rp " + Number(value).toLocaleString("id-ID");
}

const budgetPresets = [
  { label: "25rb", value: "25000" },
  { label: "50rb", value: "50000" },
  { label: "75rb", value: "75000" },
  { label: "100rb", value: "100000" },
];

const sortOptions = [
  "Recommended",
  "Highest Rating",
  "Fastest Delivery",
  "Lowest Price",
];

const tagFilters = ["Top Rated", "Fastest Delivery", "Low Delivery Fee"];

function VendorList() {
  const [priceFilter, setPriceFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [activeSort, setActiveSort] = useState("Top Rated");
  const [currentPage, setCurrentPage] = useState(1);
  const [minRating, setMinRating] = useState("");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recommended");

  const displayedVendors = useMemo(() => {
    return INITIAL_VENDORS.filter((vendor) => {
      if (priceFilter && vendor.priceLvl !== priceFilter) return false;

      if (minRating && vendor.rate < parseFloat(minRating)) return false;

      if (budgetFilter) {
        const userBudget = Number(budgetFilter);
        const vendorPrice = parseVendorPrice(vendor.startPrice);

        if (vendorPrice > userBudget) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === "Highest Rating" || activeSort === "Top Rated") {
        return b.rate - a.rate;
      }

      if (selectedSort === "Lowest Price") {
        return parseVendorPrice(a.startPrice) - parseVendorPrice(b.startPrice);
      }

      if (
        selectedSort === "Fastest Delivery" ||
        activeSort === "Fastest Delivery"
      ) {
        return parseInt(a.time) - parseInt(b.time);
      }

      if (activeSort === "Low Delivery Fee") {
        return parseFloat(a.dist) - parseFloat(b.dist);
      }

      return a.id - b.id;
    });
  }, [priceFilter, budgetFilter, minRating, selectedSort, activeSort]);

  const averageRating = useMemo(() => {
    const total = INITIAL_VENDORS.reduce((sum, vendor) => sum + vendor.rate, 0);
    return (total / INITIAL_VENDORS.length).toFixed(1);
  }, []);

  const fastestDelivery = useMemo(() => {
    const fastest = INITIAL_VENDORS.reduce((best, vendor) => {
      return parseInt(vendor.time) < parseInt(best.time) ? vendor : best;
    }, INITIAL_VENDORS[0]);

    return fastest.time;
  }, []);

  function resetAllFilters() {
    setPriceFilter("");
    setBudgetFilter("");
    setIsOpenNow(true);
    setMinRating("");
    setActiveSort("Top Rated");
    setSelectedSort("Recommended");
    setCurrentPage(1);
  }

  const heroStats = [
    { icon: <FiAward />, value: `${averageRating}/5`, label: "Rata-rata rating" },
    { icon: <FiTruck />, value: `${fastestDelivery} min`, label: "Pengiriman tercepat" },
    { icon: <FiZap />, value: `${displayedVendors.length}`, label: "Vendor cocok" },
  ];

  return (
    <motion.div
      className="vendor-list-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="global-container">
        <header className="list-title-section vendor-pro-hero">
          <motion.div
            className="vendor-ambient vendor-ambient-one"
            animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="vendor-ambient vendor-ambient-two"
            animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="vendor-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="vendor-pro-badge">
              <FiZap /> FOODORA VENDOR FINDER
            </span>

            <h1>
              Cari vendor makanan jadi lebih <span>hidup</span>.
            </h1>

            <p>
              Temukan vendor terbaik sesuai lokasi, rating, waktu pengiriman,
              dan budget kamu dengan tampilan yang lebih fresh dan interaktif.
            </p>

            <div className="hero-chip-row">
              {["Realtime filter", "Budget friendly", "Fast delivery"].map(
                (item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + index * 0.08 }}
                  >
                    {item}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            className="vendor-hero-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="hero-panel-orbit">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              />
              <FiMapPin />
            </div>

            <div>
              <span className="hero-panel-label">Smart Budget Finder</span>
              <h3>Rekomendasi pas di kantong</h3>
              <p>Pilih budget, rating, dan tipe harga. Hasilnya langsung bergerak.</p>
            </div>
          </motion.div>
        </header>

        <motion.div
          className="vendor-stats-row"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {heroStats.map((item) => (
            <motion.div
              className="vendor-stat-card"
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div>{item.icon}</div>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <main className="list-main-layout">
          <motion.aside
            className="filters-sidebar vendor-sidebar-pro"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div className="filter-header-row pro-filter-head">
              <div>
                <span>FILTER</span>
                <h3>Cari Vendor</h3>
              </div>

              <motion.button
                className="reset-btn pro-reset-btn"
                onClick={resetAllFilters}
                whileTap={{ scale: 0.94 }}
              >
                <FiRefreshCw />
                Reset
              </motion.button>
            </div>

            <div className="filter-block">
              <label>LOCATION</label>

              <div className="loc-box pro-location-box">
                <FiMapPin />

                <input type="text" defaultValue="Jakarta Selatan" />

                <FiNavigation
                  className="nav-icon-blue"
                  style={{ cursor: "pointer" }}
                  onClick={() => alert("Cari Lokasi")}
                />
              </div>
            </div>

            <motion.div
              className="filter-block budget-pro-card"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              <div className="budget-pro-glow"></div>

              <div className="budget-pro-top">
                <div className="budget-pro-icon">
                  <FiDollarSign />
                </div>

                <div>
                  <label>BUDGET USER</label>
                  <h4>Masukkan Budget</h4>
                </div>
              </div>

              <div className="budget-pro-input">
                <span>Rp</span>

                <input
                  type="number"
                  placeholder="Contoh: 50000"
                  value={budgetFilter}
                  onChange={(e) => {
                    setBudgetFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <AnimatePresence>
                  {budgetFilter && (
                    <motion.button
                      type="button"
                      onClick={() => setBudgetFilter("")}
                      aria-label="Hapus budget"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                    >
                      <FiX />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {budgetFilter && (
                  <motion.p
                    className="budget-pro-note"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    Maksimal harga mulai dari{" "}
                    <strong>{formatRupiah(budgetFilter)}</strong>
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="budget-pro-presets">
                {budgetPresets.map((item) => (
                  <motion.button
                    key={item.value}
                    type="button"
                    className={budgetFilter === item.value ? "active" : ""}
                    onClick={() => {
                      setBudgetFilter(item.value);
                      setCurrentPage(1);
                    }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    ≤ {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <div className="filter-block">
              <label>PRICE RANGE</label>

              <div className="price-toggle-group">
                {["$", "$$", "$$$"].map((p) => (
                  <motion.button
                    key={p}
                    className={priceFilter === p ? "active" : ""}
                    onClick={() => {
                      setPriceFilter(priceFilter === p ? "" : p);
                      setCurrentPage(1);
                    }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    {p}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="filter-block">
              <label>MINIMUM RATING</label>

              <div className="rating-options-sidebar">
                <label className="rating-row">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === "4.0"}
                    onChange={() => {
                      setMinRating("4.0");
                      setCurrentPage(1);
                    }}
                  />

                  <span>⭐ 4.0 & above</span>
                </label>

                <label className="rating-row">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === "3.0"}
                    onChange={() => {
                      setMinRating("3.0");
                      setCurrentPage(1);
                    }}
                  />

                  <span>⭐ 3.0 & above</span>
                </label>
              </div>
            </div>

            <div className="filter-block open-row">
              <label>Open Now</label>

              <div
                className={`switch-v ${isOpenNow ? "on" : ""}`}
                onClick={() => setIsOpenNow(!isOpenNow)}
              >
                <div className="knob" />
              </div>
            </div>
          </motion.aside>

          <section className="vendor-results">
            <motion.div
              className="results-toolbar pro-results-toolbar"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              <div>
                <span className="result-kicker">HASIL PENCARIAN</span>
                <h2>{displayedVendors.length} vendor tersedia</h2>
              </div>

              <div className="tag-filters">
                {tagFilters.map((tag) => (
                  <motion.button
                    key={tag}
                    className={`tag-btn pro-tag-btn ${
                      activeSort === tag ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveSort(tag);

                      if (tag === "Top Rated") {
                        setSelectedSort("Highest Rating");
                      }

                      if (tag === "Fastest Delivery") {
                        setSelectedSort("Fastest Delivery");
                      }

                      if (tag === "Low Delivery Fee") {
                        setSelectedSort("Recommended");
                      }
                    }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>

              <div
                className="sort-box pro-sort-box"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <FiSliders />

                <span>
                  Sort by: <strong>{selectedSort} ▾</strong>
                </span>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      className="pro-sort-dropdown"
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      {sortOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          className={selectedSort === opt ? "active" : ""}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSort(opt);
                            setActiveSort("");
                            setIsSortOpen(false);
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <AnimatePresence>
              {budgetFilter && (
                <motion.div
                  className="budget-pro-result"
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <FiDollarSign />

                    <span>
                      Budget kamu <strong>{formatRupiah(budgetFilter)}</strong>
                    </span>
                  </div>

                  <p>
                    Ditemukan <strong>{displayedVendors.length}</strong> vendor
                    sesuai budget. Pilih yang paling pas buat kamu.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="v-grid-layout">
              <AnimatePresence mode="popLayout">
                {displayedVendors.length > 0 ? (
                  displayedVendors.map((vendor, index) => (
                    <motion.div
                      key={vendor.id}
                      className="vendor-card-motion"
                      layout
                      initial={{ opacity: 0, scale: 0.94, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: 18 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.06,
                        ease: "easeOut",
                      }}
                    >
                      <VendorCard v={vendor} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="vendor-pro-empty"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                  >
                    <div>
                      <FiSearch />
                    </div>

                    <h3>Tidak ada vendor yang cocok</h3>

                    <p>
                      Coba naikkan budget atau reset filter untuk menampilkan
                      semua vendor.
                    </p>

                    <button type="button" onClick={resetAllFilters}>
                      Reset Filter
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="v-pagination">
              <button
                className="p-arrow"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <FiChevronLeft />
              </button>

              {[1, 2, 3, "...", 8].map((num, idx) =>
                num === "..." ? (
                  <span key={idx}>...</span>
                ) : (
                  <button
                    key={idx}
                    className={`p-num ${currentPage === num ? "active" : ""}`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                className="p-arrow"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 8))}
              >
                <FiChevronRight />
              </button>
            </div>
          </section>
        </main>
      </div>

      <footer className="v-footer">
        <div className="global-container">
          <div className="v-footer-grid">
            <div className="v-f-col brand-info">
              <h2 className="v-f-logo">Foodora</h2>

              <p>
                Celebrating Indonesia's culinary heritage by connecting urban
                foodies with authentic dishes.
              </p>
            </div>

            <div className="v-f-col">
              <h4>EXPLORE</h4>

              <ul>
                <li>About Us</li>
                <li>Partner with Us</li>
                <li>Help Center</li>
              </ul>
            </div>

            <div className="v-f-col">
              <h4>LEGAL</h4>

              <ul>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Contact</li>
              </ul>
            </div>

            <div className="v-f-col">
              <h4>DOWNLOAD OUR APP</h4>

              <div className="v-app-badges">
                <div className="v-app-btn" onClick={() => alert("App Store")}>
                  App Store
                </div>

                <div
                  className="v-app-btn"
                  onClick={() => alert("Google Play")}
                >
                  Google Play
                </div>
              </div>
            </div>
          </div>

          <div className="v-f-bottom">
            <p>© 2026 Foodora Indonesia. Fresh Heritage, Delivered.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default VendorList;