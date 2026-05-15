
import { Link } from 'react-router-dom';

const formatRp = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

const OrderSummary = ({ totalItems, subtotal, shippingFee, serviceFee, total, isCartEmpty }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

      <div className="space-y-4 mb-6 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal ({totalItems} item)</span>
          <span className="text-gray-800 font-medium">{formatRp(subtotal)}</span>
        </div>
        {!isCartEmpty && (
          <>
            <div className="flex justify-between text-gray-500">
              <span>Ongkos Kirim</span>
              <span className="text-gray-800 font-medium">{formatRp(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Biaya Layanan</span>
              <span className="text-gray-800 font-medium">{formatRp(serviceFee)}</span>
            </div>
          </>
        )}
      </div>

      <div className="border-t border-gray-100 pt-5 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[#124B24] font-bold text-lg">Total</span>
          <span className="text-[#A2422E] font-bold text-2xl">{formatRp(total)}</span>
        </div>
      </div>

      {/* Promo / Voucher Section */}
      <button className="w-full bg-[#EAF0DF] border border-[#d3e0c0] rounded-xl p-3 flex items-center justify-between text-left mb-6 hover:bg-[#dfe8d0] transition group">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-[#124B24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          <span className="text-sm font-medium text-[#2d593c]">Hemat Rp 5.000 dengan voucher</span>
        </div>
        <svg className="w-4 h-4 text-[#124B24] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      {/* Action Button */}
      <Link 
        to={isCartEmpty ? '#' : '/checkout'}
        className={`w-full block text-center ${isCartEmpty ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#053610] hover:bg-[#0a4d1a] shadow-md'} text-white font-medium py-3.5 rounded-xl transition`}
      >
        Lanjut ke Checkout
      </Link>

      <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed px-4">
        Dengan menekan tombol, Anda setuju dengan <a href="#" className="underline hover:text-gray-600">Syarat & Ketentuan</a> kami.
      </p>
    </div>
  );
};

export default OrderSummary;