import { MapPin, ChevronRight } from "lucide-react";

/**
 * AddressSection — menampilkan alamat pengiriman aktif dan tombol ubah.
 * Props:
 *   address: { label, street, city }
 *   onChangeAddress: () => void
 *   onAddNew: () => void
 */
export default function AddressSection({ address, onChangeAddress, onAddNew }) {
  return (
    <div className="space-y-3">
      {/* Alamat aktif */}
      <div className="flex items-start justify-between border-2 border-[#1A2E1A] rounded-xl p-4 bg-[#f0f5f0]">
        <div className="flex gap-3">
          <MapPin size={20} className="text-[#1A2E1A] mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-[#1A2E1A] text-sm">{address.label}</p>
            <p className="text-gray-600 text-sm">{address.street}</p>
            <p className="text-gray-600 text-sm">{address.city}</p>
          </div>
        </div>
        <button
          onClick={onChangeAddress}
          className="text-[#1A2E1A] text-sm font-semibold hover:underline shrink-0 ml-4"
        >
          Ubah
        </button>
      </div>

      {/* Tambah alamat baru */}
      <button
        onClick={onAddNew}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-3 text-gray-500 text-sm hover:border-[#1A2E1A] hover:text-[#1A2E1A] transition-colors"
      >
        <MapPin size={16} />
        Tambah Alamat Baru
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
