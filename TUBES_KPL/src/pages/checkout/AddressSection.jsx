
const AddressSection = () => {
  return (
    <div className="mb-8">
      {/* Active Address Box */}
      <div className="bg-[#F4F7F2] border border-[#0D4A22] rounded-lg p-5 flex items-start gap-4 mb-4 relative">
        <div className="mt-1">
          <svg className="w-6 h-6 text-[#0D4A22]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#0D4A22] mb-1">Rumah Utama</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Jl. Senopati No. 45, Kebayoran Baru<br />
            Jakarta Selatan, 12110
          </p>
        </div>
        <button className="text-[#0D4A22] font-medium text-sm hover:underline">
          Ubah
        </button>
      </div>

      {/* Add New Address Button */}
      <button className="w-full py-3 border border-dashed border-[#A8BCA1] text-gray-500 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Alamat Baru
      </button>
    </div>
  );
};

export default AddressSection;