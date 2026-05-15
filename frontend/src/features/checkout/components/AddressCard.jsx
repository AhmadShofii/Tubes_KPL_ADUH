import { useState } from 'react'
import './AddressCard.css'

const addresses = [
  {
    id: 1,
    label: 'Rumah Utama',
    detail: 'Jl. Senopati No. 45, Kebayoran Baru',
    city: 'Jakarta Selatan, 12110',
  },
]

export default function AddressCard() {
  const [selected, setSelected] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [newAddr, setNewAddr] = useState({ label: '', detail: '', city: '' })
  const [list, setList] = useState(addresses)

  function handleAdd(e) {
    e.preventDefault()
    if (!newAddr.label || !newAddr.detail) return
    setList(prev => [...prev, { id: Date.now(), ...newAddr }])
    setNewAddr({ label: '', detail: '', city: '' })
    setShowAdd(false)
    setSelected(list.length)
  }

  return (
    <div className="section-card">
      <div className="section-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <circle cx="12" cy="10" r="3"/>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
        Alamat Pengiriman
      </div>

      <div className="address-list">
        {list.map((addr, idx) => (
          <div
            key={addr.id}
            className={`address-item ${selected === idx ? 'active' : ''}`}
            onClick={() => setSelected(idx)}
          >
            <div className="address-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div className="address-body">
              <span className="address-label">{addr.label}</span>
              <span className="address-detail">{addr.detail}</span>
              <span className="address-city">{addr.city}</span>
            </div>
            <button
              className="ubah-btn"
              onClick={e => { e.stopPropagation(); setSelected(idx) }}
            >
              Ubah
            </button>
          </div>
        ))}
      </div>

      {showAdd ? (
        <form className="add-addr-form" onSubmit={handleAdd}>
          <input
            className="addr-input"
            placeholder="Label (misal: Kantor)"
            value={newAddr.label}
            onChange={e => setNewAddr(p => ({ ...p, label: e.target.value }))}
          />
          <input
            className="addr-input"
            placeholder="Alamat lengkap"
            value={newAddr.detail}
            onChange={e => setNewAddr(p => ({ ...p, detail: e.target.value }))}
          />
          <input
            className="addr-input"
            placeholder="Kota, Kode Pos"
            value={newAddr.city}
            onChange={e => setNewAddr(p => ({ ...p, city: e.target.value }))}
          />
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => setShowAdd(false)}>Batal</button>
            <button type="submit" className="save-btn">Simpan</button>
          </div>
        </form>
      ) : (
        <button className="add-addr-btn" onClick={() => setShowAdd(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <circle cx="12" cy="10" r="3"/>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
          Tambah Alamat Baru
        </button>
      )}
    </div>
  )
}
