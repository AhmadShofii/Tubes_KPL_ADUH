import { useState } from "react";
import AddressSection from "./components/AddressSection";
import DeliverySchedule from "./components/DeliverySchedule";
import PaymentSummary from "./components/PaymentSummary";
import { initialCartItems, DELIVERY_FEE, SERVICE_FEE } from "../keranjang/data/cartData";

// Data dummy alamat
const DEFAULT_ADDRESS = {
  label: "Rumah Utama",
  street: "Jl. Senopati No. 45, Kebayoran Baru",
  city: "Jakarta Selatan, 12110",
};

/**
 * CheckoutPage — komponen utama halaman checkout.
 * Bisa menerima props cartItems, deliveryFee, serviceFee dari parent/context.
 * Jika tidak diberikan, fallback ke data dummy.
 */
export default function CheckoutPage({
  cartItems = initialCartItems,
  deliveryFee = DELIVERY_FEE,
  serviceFee = SERVICE_FEE,
}) {
  const [address] = useState(DEFAULT_ADDRESS);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("now");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  function handleConfirm() {
    setConfirmed(true);
    // Integrasikan dengan API / navigasi di sini
    alert(`Pesanan dikonfirmasi!\nCatatan: ${note || "-"}`);
  }

  return (
    <div className="min-h-screen bg-[#FDFCF0]">
      {/* Navbar minimal */}
      <header className="bg-[#FDFCF0] border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <span className="font-bold text-xl text-[#1A2E1A]">Foodora</span>
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-[#1A2E1A]">Home</a>
          <a href="#" className="hover:text-[#1A2E1A]">Promos</a>
          <a href="#" className="hover:text-[#1A2E1A]">History</a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1A2E1A]">Checkout</h1>
          <p className="text-gray-500 text-sm mt-1">Review and complete your premium culinary order.</p>
        </div>

        {/* Grid layout: kiri (detail) | kanan (summary sticky) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* ── Kolom Kiri ── */}
          <div className="space-y-5">

            {/* Alamat */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <AddressSection
                address={address}
                onChangeAddress={() => alert("Fitur ubah alamat")}
                onAddNew={() => alert("Fitur tambah alamat baru")}
              />
            </section>

            {/* Jadwal Pengiriman */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5">
              <DeliverySchedule
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onDateChange={setSelectedDate}
                onSlotChange={setSelectedSlot}
              />
            </section>

            {/* Catatan Pengiriman */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#1A2E1A] font-semibold text-sm uppercase tracking-wide">
                {/* ≡ icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                Notes Field
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Tolong sambalnya dipisah, atau titip di lobi saja ya."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:border-[#1A2E1A] transition-colors"
              />
            </section>
          </div>

          {/* ── Kolom Kanan (Sticky) ── */}
          <aside className="lg:sticky lg:top-24">
            <PaymentSummary
              items={cartItems}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              onConfirm={handleConfirm}
            />
          </aside>
        </div>

        {/* Mobile: tombol bayar full-width di bawah */}
        <div className="lg:hidden mt-6">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#1A2E1A] hover:bg-[#243d24] text-white font-semibold py-4 rounded-xl text-base transition-all active:scale-[0.98]"
          >
            Bayar Sekarang
          </button>
        </div>
      </main>
    </div>
  );
}
