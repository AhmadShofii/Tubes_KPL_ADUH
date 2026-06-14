// frontend/src/features/checkout/components/DeliveryTimePicker.jsx

const dateOptions = [
  {
    label: "Hari Ini",
    date: "2026-05-28",
    day: "Rab",
  },
  {
    label: "Besok",
    date: "2026-05-29",
    day: "Kam",
  },
  {
    label: "30 Mei",
    date: "2026-05-30",
    day: "Jum",
  },
  {
    label: "31 Mei",
    date: "2026-05-31",
    day: "Sab",
  },
  {
    label: "01 Juni",
    date: "2026-06-01",
    day: "Min",
  },
];

const timeSlots = [
  "09.00 - 11.00",
  "11.00 - 13.00",
  "13.00 - 15.00",
  "15.00 - 17.00",
  "17.00 - 19.00",
];

export default function DeliveryTimePicker({
  selectedDate,
  onSelectDate,
  selectedSlot,
  onSelectSlot,
  bookedDates = [],
}) {
  const activeDate = dateOptions[selectedDate];

  const isDateBooked = (date) => {
    return bookedDates.includes(date);
  };

  const activeDateIsBooked = activeDate ? isDateBooked(activeDate.date) : false;

  return (
    <section className="checkout-card">
      <div className="checkout-card-header">
        <div>
          <h2>Waktu Pengiriman</h2>
          <p>Pilih tanggal dan jam pengiriman pesanan kamu.</p>
        </div>
      </div>

      <div className="delivery-date-list">
        {dateOptions.map((item, index) => {
          const booked = isDateBooked(item.date);
          const active = selectedDate === index;

          return (
            <button
              key={item.date}
              type="button"
              disabled={booked}
              onClick={() => {
                if (!booked) {
                  onSelectDate(index);
                  onSelectSlot(0);
                }
              }}
              className={`delivery-date-btn ${active ? "active" : ""} ${
                booked ? "booked" : ""
              }`}
            >
              <span>{item.day}</span>
              <strong>{item.label}</strong>
              <small>{booked ? "Sudah dibooking" : item.date}</small>
            </button>
          );
        })}
      </div>

      <div className="delivery-slot-list">
        {timeSlots.map((slot, index) => (
          <button
            key={slot}
            type="button"
            disabled={activeDateIsBooked}
            onClick={() => onSelectSlot(index)}
            className={`delivery-slot-btn ${
              selectedSlot === index ? "active" : ""
            } ${activeDateIsBooked ? "disabled" : ""}`}
          >
            {slot}
          </button>
        ))}
      </div>
    </section>
  );
}