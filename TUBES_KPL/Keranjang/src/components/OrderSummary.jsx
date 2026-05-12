import { useState } from 'react'
import './OrderSummary.css'

function formatRp(num) {
  return 'Rp ' + num.toLocaleString('id-ID')
}

const DELIVERY_FEE = 12000
const SERVICE_FEE = 2000

export default function OrderSummary({ cartItems }) {
  const [voucherApplied, setVoucherApplied] = useState(false)

  const itemCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE

  return (
    <aside className="order-summary">
      <h2 className="summary-title">Ringkasan Pesanan</h2>

      <div className="summary-rows">
        <div className="summary-row">
          <span>Subtotal ({itemCount} item)</span>
          <span>{formatRp(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Ongkos Kirim</span>
          <span>{formatRp(DELIVERY_FEE)}</span>
        </div>
        <div className="summary-row">
          <span>Biaya Layanan</span>
          <span>{formatRp(SERVICE_FEE)}</span>
        </div>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span className="total-amount">{formatRp(total)}</span>
      </div>

      {/* Voucher */}
      <button
        className={`voucher-btn ${voucherApplied ? 'applied' : ''}`}
        onClick={() => setVoucherApplied(!voucherApplied)}
        aria-pressed={voucherApplied}
      >
        <div className="voucher-left">
          {voucherApplied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#1A2E1A" strokeWidth="2.5" width="18" height="18">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#1A2E1A" strokeWidth="2" width="18" height="18">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          )}
          <span>{voucherApplied ? 'Voucher diterapkan!' : 'Hemat Rp 5.000 dengan voucher'}</span>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="#1A2E1A" strokeWidth="2" width="16" height="16">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      <button className="checkout-btn" disabled={cartItems.length === 0}>
        Lanjut ke Checkout
      </button>

      <p className="terms-note">
        Dengan menekan tombol, Anda setuju dengan{' '}
        <a href="#" className="terms-link">Syarat &amp; Ketentuan</a> kami.
      </p>
    </aside>
  )
}
