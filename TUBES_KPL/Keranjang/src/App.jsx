import { useState } from 'react'
import Navbar from './components/Navbar'
import CartItem from './components/CartItem'
import OrderSummary from './components/OrderSummary'
import './App.css'

// Data awal keranjang (sesuai gambar)
const initialCart = [
  {
    id: 1,
    name: 'Paket B (Nasi Ayam Bakar)',
    desc: 'Ayam Bakar Madu, Nasi Putih, Lalapan, Sambal Terasi',
    price: 45000,
    qty: 1,
    emoji: 'B',
    bg: '#1a3a2a',
    color: '#4ade80',
  },
  {
    id: 2,
    name: 'Air Mineral (600ml)',
    desc: 'Kemasan botol dingin',
    price: 6000,
    qty: 2,
    emoji: '●',
    bg: '#0a1a2a',
    color: '#38bdf8',
  },
]

export default function App() {
  const [cartItems, setCartItems] = useState(initialCart)

  function handleUpdateQty(id, qty) {
    if (qty <= 0) {
      setCartItems(prev => prev.filter(i => i.id !== id))
    } else {
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
    }
  }

  function handleDelete(id) {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="app">
      <Navbar cartCount={totalItems} />

      <main className="main">
        <div className="container">
          {/* Page header */}
          <div className="page-header">
            <h1 className="page-title">Keranjang Saya</h1>
            <p className="page-sub">Periksa kembali pesanan Anda sebelum melanjutkan ke pembayaran.</p>
          </div>

          <div className="content-layout">
            {/* Kiri: daftar item */}
            <div className="cart-list-col">
              {cartItems.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c5c5b5" strokeWidth="1.5" width="56" height="56">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <p>Keranjang kamu kosong</p>
                  <a href="#" className="back-link">← Kembali ke menu</a>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map(item => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQty={handleUpdateQty}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>

                  <button className="add-more-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="16"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                    Tambah Menu Lainnya
                  </button>
                </>
              )}
            </div>

            {/* Kanan: ringkasan */}
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      </main>
    </div>
  )
}
