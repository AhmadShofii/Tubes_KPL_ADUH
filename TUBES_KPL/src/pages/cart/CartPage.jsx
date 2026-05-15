import { useState } from 'react';
import Navbar from './Navbar';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

const CartPage = () => {
  // State data keranjang (hanya menyimpan data mentah, tanpa elemen UI)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Paket B (Nasi Ayam Bakar)',
      description: 'Ayam Bakar Madu, Nasi Putih, Lalapan, Sambal Terasi',
      price: 45000,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Air Mineral (600ml)',
      description: 'Kemasan botol dingin',
      price: 6000,
      quantity: 2,
    }
  ]);

  const shippingFee = 12000;
  const serviceFee = 2000;

  // Fungsi mengubah jumlah barang
  const handleUpdateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  // Fungsi menghapus barang
  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Kalkulasi total harga
  const isCartEmpty = cartItems.length === 0;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (isCartEmpty ? 0 : shippingFee + serviceFee);

  
  return (
    <div className="min-h-screen bg-[#F7F8F3] font-sans text-gray-800 pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sisi Kiri: List Produk */}
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#124B24] mb-2">Keranjang Saya</h1>
              <p className="text-gray-500 text-sm">Periksa kembali pesanan Anda sebelum melanjutkan ke pembayaran.</p>
            </div>

            <div className="space-y-4">
              {isCartEmpty ? (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                  <p className="text-gray-500">Keranjang Anda kosong.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onUpdateQuantity={handleUpdateQuantity} 
                    onRemove={handleRemoveItem} 
                  />
                ))
              )}
            </div>

            <button className="w-full mt-6 py-4 border-2 border-dashed border-[#C3CBB7] rounded-xl text-[#124B24] font-medium flex items-center justify-center gap-2 hover:bg-[#EAF0DF] hover:border-[#124B24] transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8"></path>
              </svg>
              Tambah Menu Lainnya
            </button>
          </div>

          {/* Sisi Kanan: Summary */}
          <div className="w-full lg:w-1/3">
            <OrderSummary 
              totalItems={totalItems}
              subtotal={subtotal}
              shippingFee={shippingFee}
              serviceFee={serviceFee}
              total={total}
              isCartEmpty={isCartEmpty}
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default CartPage;