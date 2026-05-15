import { useState } from "react";
import AddressCard from "../features/checkout/components/AddressCard";
import DeliveryTimePicker from "../features/checkout/components/DeliveryTimePicker";
import NotesField from "../features/checkout/components/NotesField";
import OrderSummary from "../features/checkout/components/OrderSummary";
import "../features/checkout/styles/checkout.css";

// Data dummy pesanan
const orderItems = [
  {
    id: 3,
    name: 'Special Nasi Goreng',
    desc: 'Qty: 1 • Extra Telur',
    price: 45000,
    qty: 1,
    emoji: '🍳',
    bg: '#2a1a0a',
    color: '#fbbf24',
  },
  {
    id: 4,
    name: 'Sate Ayam Madura',
    desc: 'Qty: 10 Skewers',
    price: 38000,
    qty: 1,
    emoji: '🍢',
    bg: '#2a1a0a',
    color: '#f97316',
  },
]

const DELIVERY_FEE = 12000
const SERVICE_FEE = 2000

export default function App() {
  const [notes, setNotes] = useState('')
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(0)

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE

  return (
    <div className="app">
      <main className="main">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Checkout</h1>
            <p className="page-sub">Review and complete your premium culinary order.</p>
          </div>

          <div className="content-layout">
            {/* Kiri: form checkout */}
            <div className="checkout-col">
              <AddressCard />

              <DeliveryTimePicker
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />

              <NotesField value={notes} onChange={setNotes} />
            </div>

            {/* Kanan: ringkasan */}
            <OrderSummary
              items={orderItems}
              subtotal={subtotal}
              deliveryFee={DELIVERY_FEE}
              serviceFee={SERVICE_FEE}
              total={total}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
