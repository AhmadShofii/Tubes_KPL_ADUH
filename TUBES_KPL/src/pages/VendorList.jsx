import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FiMapPin, FiNavigation, FiChevronLeft, FiChevronRight, 
  FiSearch, FiShoppingCart 
} from "react-icons/fi";

// Import Komponen, CSS, dan DATA JS yang sudah dipisah
import VendorCard from "../components/VendorCard"; 
import "../styles/vendor.css"; 
import { INITIAL_VENDORS } from "../data/vendorData"; 

function VendorList() {
  // STATE MANAGEMENT UNTUK INTERAKSI
  const [priceFilter, setPriceFilter] = useState(""); 
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [activeSort, setActiveSort] = useState("Top Rated");
  const [currentPage, setCurrentPage] = useState(1);
  const [minRating, setMinRating] = useState("");
  
  // STATE UNTUK DROPDOWN SORT BY
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recommended");

  // === LOGIKA FILTER & SORTING ===
  const displayedVendors = INITIAL_VENDORS.filter(vendor => {
    if (priceFilter && vendor.priceLvl !== priceFilter) return false;
    if (minRating && vendor.rate < parseFloat(minRating)) return false;
    return true;
  }).sort((a, b) => {
    if (selectedSort === "Highest Rating" || activeSort === "Top Rated") return b.rate - a.rate;
    if (selectedSort === "Lowest Price") return parseInt(a.startPrice) - parseInt(b.startPrice);
    if (selectedSort === "Fastest Delivery" || activeSort === "Fastest Delivery") return parseInt(a.time) - parseInt(b.time);
    return a.id - b.id; 
  });

  // FUNGSI ANIMASI (PAGE TRANSITION)
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      className="vendor-list-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="global-container">
          <div className="nav-inner">
            <Link to="/" className="logo-link" style={{ marginLeft: "-3px" }}>
              <span className="logo">Foodora</span>
            </Link>

            <div className="nav-links-desktop">
              <Link to="/beranda">Home</Link>
              <Link to="/promo">Promos</Link>
              <Link to="/history">History</Link>
            </div>

            <div className="nav-search-extended">
              <FiSearch className="search-icon-inside" />
              <input type="text" placeholder="Search flavors..." />
            </div>

            <div className="nav-right">
              <div className="icon-group-v">
                <div className="icon-item" onClick={() => alert("Keranjang")}>
                  <FiShoppingCart className="nav-icon" />
                </div>
                <div className="icon-item" onClick={() => alert("Lokasi")}>
                  <FiMapPin className="nav-icon" />
                </div>
              </div>
              <div className="auth-btns">
                <button className="login-btn" onClick={() => alert("Login")}>Login</button>
                <button className="register-btn" onClick={() => alert("Register")}>Register</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="global-container">
        <header className="list-title-section">
          <h1>Authentic Indonesian Flavors</h1>
          <p>Discover 24 high-quality vendors near your location in Jakarta.</p>
        </header>

        <main className="list-main-layout">
          {/* SIDEBAR */}
          <aside className="filters-sidebar">
            <div className="filter-header-row">
              <h3>Filters</h3>
              <button 
                className="reset-btn" 
                onClick={() => {
                  setPriceFilter("");
                  setIsOpenNow(false);
                  setMinRating("");
                  setActiveSort("Recommended");
                  setSelectedSort("Recommended");
                }}
              >
                Reset All
              </button>
            </div>

            <div className="filter-block">
              <label>LOCATION</label>
              <div className="loc-box">
                <input type="text" defaultValue="Jakarta Selatan" />
                <FiNavigation className="nav-icon-blue" style={{cursor: "pointer"}} onClick={() => alert("Cari Lokasi")} />
              </div>
            </div>

            <div className="filter-block">
              <label>PRICE RANGE</label>
              <div className="price-toggle-group">
                {["$", "$$", "$$$"].map(p => (
                  <button 
                    key={p} 
                    className={priceFilter === p ? "active" : ""} 
                    onClick={() => setPriceFilter(priceFilter === p ? "" : p)}
                  >
                    {p}
                  </button>
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
                    onChange={() => setMinRating("4.0")}
                  /> 
                  <span>⭐ 4.0 & above</span>
                </label>
                <label className="rating-row">
                  <input 
                    type="radio" 
                    name="rating" 
                    checked={minRating === "3.0"}
                    onChange={() => setMinRating("3.0")}
                  /> 
                  <span>⭐ 3.0 & above</span>
                </label>
              </div>
            </div>

            <div className="filter-block open-row">
              <label>Open Now</label>
              <div className={`switch-v ${isOpenNow ? "on" : ""}`} onClick={() => setIsOpenNow(!isOpenNow)}>
                <div className="knob" />
              </div>
            </div>
          </aside>

          {/* RESULTS */}
          <section className="vendor-results">
            <div className="results-toolbar">
              <div className="tag-filters">
                {["Top Rated", "Fastest Delivery", "Low Delivery Fee"].map(tag => (
                  <button 
                    key={tag}
                    className={`tag-btn ${activeSort === tag ? "active" : ""}`}
                    onClick={() => {
                      setActiveSort(tag);
                      if(tag === "Top Rated") setSelectedSort("Highest Rating");
                      if(tag === "Fastest Delivery") setSelectedSort("Fastest Delivery");
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              {/* DROPDOWN SORT BY */}
              <div 
                className="sort-box" 
                style={{ position: "relative", cursor: "pointer", userSelect: "none" }} 
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                Sort by: <strong>{selectedSort} ▾</strong>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        marginTop: "8px",
                        background: "white",
                        border: "1px solid rgba(0,0,0,0.05)",
                        borderRadius: "12px",
                        padding: "8px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        zIndex: 50,
                        minWidth: "170px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px"
                      }}
                    >
                      {["Recommended", "Highest Rating", "Fastest Delivery", "Lowest Price"].map((opt) => (
                        <div 
                          key={opt}
                          onClick={(e) => {
                            e.stopPropagation(); 
                            setSelectedSort(opt);
                            setActiveSort(""); 
                            setIsSortOpen(false);
                          }}
                          style={{
                            padding: "10px 12px",
                            borderRadius: "8px",
                            color: selectedSort === opt ? "#0f5d23" : "#717171",
                            fontWeight: selectedSort === opt ? "700" : "500",
                            background: selectedSort === opt ? "#f8f9f5" : "transparent",
                            transition: "0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9f5"}
                          onMouseLeave={(e) => e.currentTarget.style.background = selectedSort === opt ? "#f8f9f5" : "transparent"}
                        >
                          {opt}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="v-grid-layout">
              <AnimatePresence>
                {displayedVendors.length > 0 ? (
                  displayedVendors.map(vendor => (
                    <motion.div 
                      key={vendor.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VendorCard v={vendor} />
                    </motion.div>
                  ))
                ) : (
                  <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0", color: "#888" }}>
                    Tidak ada vendor yang cocok dengan filter kamu.
                  </p>
                )}
              </AnimatePresence>
            </div>

            {/* PAGINATION */}
            <div className="v-pagination">
              <button 
                className="p-arrow" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <FiChevronLeft />
              </button>
              
              {[1, 2, 3, '...', 8].map((num, idx) => (
                num === '...' ? (
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
              ))}

              <button 
                className="p-arrow" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, 8))}
              >
                <FiChevronRight />
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="v-footer">
        <div className="global-container">
          <div className="v-footer-grid">
            <div className="v-f-col brand-info">
              <h2 className="v-f-logo">Foodora</h2>
              <p>Celebrating Indonesia's culinary heritage by connecting urban foodies with authentic dishes.</p>
            </div>
            <div className="v-f-col">
              <h4>EXPLORE</h4>
              <ul><li>About Us</li><li>Partner with Us</li><li>Help Center</li></ul>
            </div>
            <div className="v-f-col">
              <h4>LEGAL</h4>
              <ul><li>Terms of Service</li><li>Privacy Policy</li><li>Contact</li></ul>
            </div>
            <div className="v-f-col">
              <h4>DOWNLOAD OUR APP</h4>
              <div className="v-app-badges">
                <div className="v-app-btn" onClick={() => alert("App Store")}>App Store</div>
                <div className="v-app-btn" onClick={() => alert("Google Play")}>Google Play</div>
              </div>
            </div>
          </div>
          <div className="v-f-bottom"><p>© 2026 Foodora Indonesia. Fresh Heritage, Delivered.</p></div>
        </div>
      </footer>
    </motion.div>
  );
}

export default VendorList;