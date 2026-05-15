
const DeliveryTimeSection = ({ selectedDate, setSelectedDate, selectedSlot, setSelectedSlot }) => {
  const dates = [
    { id: '24', label: 'HARI INI', date: '24', day: 'SEN' },
    { id: '25', label: 'BESOK', date: '25', day: 'SEL' },
    { id: '26', label: '', date: '26', day: 'RAB' },
    { id: '27', label: '', date: '27', day: 'KAM' },
    { id: '28', label: '', date: '28', day: 'JUM' },
    { id: '29', label: '', date: '29', day: 'SAB' },
    { id: '30', label: '', date: '30', day: 'MIN' },
  ];

  const timeSlots = [
    { 
      id: 'now', 
      title: 'Kirim Sekarang', 
      desc: 'Estimasi 25 - 35 min',
      icon: <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg></div>
    },
    { 
      id: 'lunch', 
      title: 'Makan Siang', 
      desc: '12:00 - 13:00',
      icon: <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-3"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg></div>
    },
    { 
      id: 'dinner', 
      title: 'Makan Malam', 
      desc: '18:30 - 19:30',
      icon: <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mb-3"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg></div>
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-[#0D4A22]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 className="font-bold text-gray-800 tracking-wide text-sm">WAKTU PENGIRIMAN</h3>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <p className="text-gray-600 text-sm mb-3">Pilih Tanggal</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDate(d.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-[72px] h-[84px] rounded-xl border ${
                selectedDate === d.id 
                  ? 'border-[#0D4A22] bg-[#F4F7F2] text-[#0D4A22]' 
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              } transition-colors`}
            >
              {d.label && <span className="text-[10px] font-bold mb-1">{d.label}</span>}
              <span className={`text-xl font-bold leading-none ${selectedDate === d.id ? 'text-[#0D4A22]' : 'text-gray-800'}`}>{d.date}</span>
              <span className="text-xs mt-1">{d.day}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selector */}
      <div>
        <p className="text-gray-600 text-sm mb-3">Pilih Slot Waktu</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot.id)}
              className={`relative flex flex-col items-center justify-center p-5 rounded-xl border ${
                selectedSlot === slot.id 
                  ? 'border-[#0D4A22] bg-[#F4F7F2]' 
                  : 'border-gray-200 hover:border-gray-300'
              } transition-colors`}
            >
              {selectedSlot === slot.id && (
                <div className="absolute top-3 right-3 text-[#0D4A22]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
              )}
              {slot.icon}
              <span className="font-semibold text-gray-800 mb-1">{slot.title}</span>
              <span className="text-xs text-gray-500">{slot.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryTimeSection;