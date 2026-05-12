import { Clock, Zap, UtensilsCrossed, Moon } from "lucide-react";

const DATES = (() => {
  const days = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      date: d.getDate(),
      day: days[d.getDay()],
      isToday: i === 0,
    };
  });
})();

const TIME_SLOTS = [
  {
    id: "now",
    label: "Kirim Sekarang",
    sub: "Estimasi 25 – 35 min",
    icon: Zap,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
  },
  {
    id: "lunch",
    label: "Makan Siang",
    sub: "12:00 – 13:00",
    icon: UtensilsCrossed,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-50",
  },
  {
    id: "dinner",
    label: "Makan Malam",
    sub: "18:30 – 19:30",
    icon: Moon,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-50",
  },
];

/**
 * DeliverySchedule — pilih tanggal dan slot waktu pengiriman.
 * Props:
 *   selectedDate: number (index)
 *   selectedSlot: string (id)
 *   onDateChange: (index) => void
 *   onSlotChange: (id) => void
 */
export default function DeliverySchedule({
  selectedDate,
  selectedSlot,
  onDateChange,
  onSlotChange,
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-[#1A2E1A] font-semibold text-sm uppercase tracking-wide">
        <Clock size={16} />
        Waktu Pengiriman
      </div>

      {/* Pilih Tanggal */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Pilih Tanggal</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {DATES.map((d, i) => (
            <button
              key={i}
              onClick={() => onDateChange(i)}
              className={`flex flex-col items-center min-w-[52px] rounded-xl py-2 px-1 border-2 transition-all text-xs font-medium ${
                selectedDate === i
                  ? "border-[#1A2E1A] bg-[#1A2E1A] text-white"
                  : "border-gray-200 text-gray-600 hover:border-[#1A2E1A]"
              }`}
            >
              {d.isToday && (
                <span className={`text-[9px] font-bold mb-0.5 ${selectedDate === i ? "text-green-300" : "text-[#1A2E1A]"}`}>
                  HARI INI
                </span>
              )}
              <span className="text-base font-bold leading-none">{d.date}</span>
              <span className="mt-0.5">{d.day}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pilih Slot Waktu */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Pilih Slot Waktu</p>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => {
            const Icon = slot.icon;
            const isSelected = selectedSlot === slot.id;
            return (
              <button
                key={slot.id}
                onClick={() => onSlotChange(slot.id)}
                className={`relative flex flex-col items-center gap-2 rounded-xl border-2 py-4 px-2 transition-all ${
                  isSelected
                    ? "border-[#1A2E1A] bg-[#f0f5f0]"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-[#1A2E1A] rounded-full flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${slot.iconBg}`}>
                  <Icon size={20} className={slot.iconColor} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-800">{slot.label}</p>
                  <p className="text-[10px] text-gray-500">{slot.sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
