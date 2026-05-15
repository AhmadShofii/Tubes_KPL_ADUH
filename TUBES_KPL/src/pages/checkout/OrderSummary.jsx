
const OrderSummary = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Items List */}
      <div className="space-y-6 mb-8">
        <div className="flex gap-4">
          <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=100&q=80" alt="Nasi Goreng" className="w-14 h-14 rounded-lg object-cover" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-800 text-sm w-3/4">Special Nasi Goreng</h4>
              <span className="text-sm font-medium text-gray-800 text-right">Rp<br/>45.000</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Qty: 1 • Extra Telur</p>
          </div>
        </div>

        <div className="flex gap-4">
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=100&q=80" alt="Sate Ayam" className="w-14 h-14 rounded-lg object-cover" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-800 text-sm">Sate Ayam Madura</h4>
              <span className="text-sm font-medium text-gray-800">Rp 38.000</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Qty: 10 Skewers</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 space-y-4 mb-6 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="text-gray-800">Rp 83.000</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Delivery Fee</span>
          <span className="text-gray-800">Rp 12.000</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Service Fee</span>
          <span className="text-gray-800">Rp 2.000</span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-[#0D4A22] font-bold text-lg">Total</span>
          <span className="text-[#0D4A22] font-bold text-2xl">Rp 97.000</span>
        </div>
      </div>

      <button className="w-full bg-[#0D4A22] hover:bg-[#083317] text-white font-medium py-4 rounded-full transition-colors mb-4">
        Buat Pesanan
      </button>

      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
        Secure Checkout with 256-bit SSL
      </div>
    </div>
  );
};

export default OrderSummary;