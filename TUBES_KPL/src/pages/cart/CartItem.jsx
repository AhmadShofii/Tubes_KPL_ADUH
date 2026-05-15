// Fungsi helper untuk format mata uang
const formatRp = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  // Menentukan gambar/ikon berdasarkan ID produk agar state utama tetap bersih dari elemen UI
  const renderImage = () => {
    if (item.id === 1) {
      return (
        <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
          <span className="text-[#51b882] text-5xl font-bold font-serif opacity-90 drop-shadow-md">B</span>
        </div>
      );
    }
    if (item.id === 2) {
      return (
        <div className="w-full h-full bg-[#0a1128] flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-[#4d8b9e] bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] shadow-[0_0_15px_rgba(77,139,158,0.5)]"></div>
        </div>
      );
    }
    return <div className="w-full h-full bg-gray-200"></div>;
  };

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 border border-gray-100 relative">
      
      {/* Gambar Produk */}
      <div className="w-24 h-24 rounded-xl flex-shrink-0 overflow-hidden">
        {renderImage()}
      </div>

      {/* Detail Produk */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="pr-8">
          <h3 className="text-gray-800 font-semibold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-[#A2422E] font-medium">{formatRp(item.price)}</span>
          
          {/* Kontrol Kuantitas */}
          <div className="flex items-center bg-[#F2F4EC] rounded-full border border-gray-200/50">
            <button 
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition"
              aria-label="Kurangi jumlah" // Tambahkan ini
              className="..."
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"></path></svg>
            </button>
            <span className="w-6 text-center text-sm font-semibold text-gray-800">{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition"
              aria-label="Tambah jumlah" // Tambahkan ini
              className="..."
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tombol Hapus */}
      <button 
        onClick={() => onRemove(item.id)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition p-1"
        aria-label="Hapus"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>

    </div>
  );
};

export default CartItem;