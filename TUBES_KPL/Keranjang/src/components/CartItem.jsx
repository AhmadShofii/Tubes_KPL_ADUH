import './CartItem.css'

function formatRp(num) {
  return 'Rp ' + num.toLocaleString('id-ID')
}

export default function CartItem({ item, onUpdateQty, onDelete }) {
  return (
    <div className="cart-item-card">
      <div
        className="item-img"
        style={{ background: item.bg, color: item.color }}
        aria-hidden="true"
      >
        <span>{item.emoji}</span>
      </div>

      <div className="item-body">
        <div className="item-top">
          <div className="item-info">
            <span className="item-name">{item.name}</span>
            <span className="item-desc">{item.desc}</span>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDelete(item.id)}
            aria-label={`Hapus ${item.name}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>

        <div className="item-bottom">
          <span className="item-price">{formatRp(item.price)}</span>
          <div className="qty-ctrl">
            <button
              className="qty-btn"
              onClick={() => onUpdateQty(item.id, item.qty - 1)}
              aria-label="Kurangi"
            >−</button>
            <span className="qty-val">{item.qty}</span>
            <button
              className="qty-btn"
              onClick={() => onUpdateQty(item.id, item.qty + 1)}
              aria-label="Tambah"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
