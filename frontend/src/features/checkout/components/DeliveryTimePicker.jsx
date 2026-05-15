import FoodIcon from './FoodIcon'
import './DeliveryTimePicker.css'

// Generate 7 hari mulai hari ini
function getDates() {
  const days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return {
      date: d.getDate(),
      day: days[d.getDay()],
      month: months[d.getMonth()],
      isToday: i === 0,
    }
  })
}

const TIME_SLOTS = [
  {
    id: 0,
    label: 'Kirim Sekarang',
    sub: 'Estimasi 25 - 35 min',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#fbbf24" stroke="#fbbf24"/>
      </svg>
    ),
  },
  {
    id: 1,
    label: 'Makan Siang',
    sub: '12:00 - 13:00',
    icon: <FoodIcon size={48} />,
  },
  {
    id: 2,
    label: 'Makan Malam',
    sub: '18:30 - 19:30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" width="28" height="28">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#e0e7ff" stroke="#6366f1"/>
      </svg>
    ),
  },
]

export default function DeliveryTimePicker({ selectedDate, onSelectDate, selectedSlot, onSelectSlot }) {
  const dates = getDates()

  return (
    <div className="section-card">
      <div className="section-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        Waktu Pengiriman
      </div>

      {/* Date slider */}
      <p className="picker-sub">Pilih Tanggal</p>
      <div className="date-slider">
        {dates.map((d, i) => (
          <button
            key={i}
            className={`date-card ${selectedDate === i ? 'active' : ''}`}
            onClick={() => onSelectDate(i)}
          >
            {d.isToday && <span className="today-tag">HARI INI</span>}
            {!d.isToday && <span className="besok-tag">BESOK</span>}
            <span className="date-num">{d.date}</span>
            <span className="date-day">{d.day}</span>
          </button>
        ))}
      </div>

      {/* Time slots */}
      <p className="picker-sub" style={{ marginTop: 20 }}>Pilih Slot Waktu</p>
      <div className="slot-grid">
        {TIME_SLOTS.map(slot => (
          <button
            key={slot.id}
            className={`slot-card ${selectedSlot === slot.id ? 'active' : ''}`}
            onClick={() => onSelectSlot(slot.id)}
          >
            {selectedSlot === slot.id && (
              <span className="slot-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1A2E1A" strokeWidth="3" width="12" height="12">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
            )}
            <div className="slot-icon">{slot.icon}</div>
            <span className="slot-label">{slot.label}</span>
            <span className="slot-sub">{slot.sub}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
