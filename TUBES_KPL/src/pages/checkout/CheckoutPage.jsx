import { useState } from 'react';
import Navbar from './Navbar';
import AddressSection from './AddressSection';
import DeliveryTimeSection from './DeliveryTimeSection';
import NotesSection from './NotesSection';
import OrderSummary from './OrderSummary';

const CheckoutPage = () => {
  // State untuk menyimpan data pilihan pengguna
  const [selectedDate, setSelectedDate] = useState('24');
  const [selectedSlot, setSelectedSlot] = useState('now');
  const [notes, setNotes] = useState('');

  return (
    <div className="min-h-screen bg-[#F9F9F6] font-sans pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-500 text-sm">Review and complete your premium culinary order.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Kolom Kiri: Form & Pengaturan */}
          <div className="w-full lg:w-[60%] xl:w-2/3">
            <AddressSection />
            
            <DeliveryTimeSection 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />

            <NotesSection 
              notes={notes} 
              setNotes={setNotes} 
            />
          </div>

          {/* Kolom Kanan: Ringkasan Belanja */}
          <div className="w-full lg:w-[40%] xl:w-1/3">
            <OrderSummary />
          </div>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;