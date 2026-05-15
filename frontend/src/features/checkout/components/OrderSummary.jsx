import FoodIcon from './FoodIcon'
import './OrderSummary.css'

function formatRp(num) {
  return 'Rp ' + num.toLocaleString('id-ID')
}

export default function OrderSummary({ items, subtotal, deliveryFee, serviceFee, total }) {
  return (
    <aside className="order-summary">
      <h2 className="summary-title">Order Summary</h2>

      {/* Item list dengan gambar mini */}
      <div className="summary-items">
        {items.map(item => (
          <div key={item.id} className="summary-item">
            <FoodIcon size={44} />
            <div className="summary-item-info">
              <span className="summary-item-name">{item.name}</span>
              <span className="summary-item-desc">{item.desc}</span>
            </div>
            <span className="summary-item-price">{formatRp(item.price)}</span>
          </div>
        ))}
      </div>

      <div className="summary-divider" />

      {/* Kalkulasi */}
      <div className="summary-rows">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatRp(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>{formatRp(deliveryFee)}</span>
        </div>
        <div className="summary-row">
          <span>Service Fee</span>
          <span>{formatRp(serviceFee)}</span>
        </div>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span className="total-amount">{formatRp(total)}</span>
      </div>

      <button className="order-btn">Buat Pesanan</button>

      <div className="secure-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Secure Checkout with 256-bit SSL
      </div>
    </aside>
  )
}
