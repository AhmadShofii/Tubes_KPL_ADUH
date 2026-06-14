import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  Loader2,
  MapPin,
  MessageSquareText,
  Minus,
  Plus,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  Wallet,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { createPesanan, getBookedDates } from "../api/authApi";
import "../features/checkout/styles/checkout.css";

const DELIVERY_FEE = 12000;
const SERVICE_FEE = 2000;

const paymentMethods = [
  {
    id: "QRIS",
    name: "QRIS",
    desc: "Scan semua e-wallet",
    icon: QrCode,
  },
  {
    id: "DANA",
    name: "DANA",
    desc: "Bayar via DANA",
    icon: Smartphone,
  },
  {
    id: "GoPay",
    name: "GoPay",
    desc: "Bayar via GoPay",
    icon: Wallet,
  },
  {
    id: "Bank Transfer",
    name: "Bank Transfer",
    desc: "Virtual account",
    icon: CreditCard,
  },
];

const deliverySlots = [
  "Sekarang",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "18:00 - 19:00",
];

function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

function getItemId(item) {
  return item.id || item.id_menu;
}

function getItemName(item) {
  return item.name || item.nama_menu || "Menu Foodora";
}

function getItemPrice(item) {
  return Number(item.price || item.harga || 0);
}

function getItemQty(item) {
  return Number(item.qty || item.jumlah || 1);
}

function getItemImage(item) {
  return (
    item.image ||
    item.img ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=900&auto=format&fit=crop"
  );
}

function getLocalDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function generateBookingDates(totalDays = 30) {
  const dates = [];

  for (let i = 0; i < totalDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    dates.push({
      value: getLocalDateValue(date),
      label: date.toLocaleDateString("id-ID", {
        weekday: "short",
      }),
      day: date.toLocaleDateString("id-ID", {
        day: "2-digit",
      }),
      month: date.toLocaleDateString("id-ID", {
        month: "short",
      }),
    });
  }

  return dates;
}

function createPaymentData({ orderId, total, paymentMethod, selectedDate }) {
  return JSON.stringify({
    app: "Foodora",
    orderId,
    method: paymentMethod,
    total,
    tanggal_booking: selectedDate,
    status: "Menunggu Pembayaran",
  });
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, updateQty } = useCart();

  const [address, setAddress] = useState(
    "Jl. Kemang Raya No. 12, Jakarta Selatan"
  );
  const [receiverName, setReceiverName] = useState("Indra");
  const [phone, setPhone] = useState("081234567890");
  const [deliverySlot, setDeliverySlot] = useState("Sekarang");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateLoading, setDateLoading] = useState(false);

  const bookingDates = useMemo(() => generateBookingDates(30), []);

  useEffect(() => {
    async function loadBookedDates() {
      setDateLoading(true);

      try {
        const result = await getBookedDates();
        const dates = result.data || [];

        setBookedDates(dates);

        const availableDate = bookingDates.find(
          (date) => !dates.includes(date.value)
        );

        if (availableDate) {
          setSelectedDate(availableDate.value);
        }
      } catch (error) {
        console.error("Gagal mengambil tanggal booking:", error);
        setMessage("Gagal mengambil tanggal booking.");
      } finally {
        setDateLoading(false);
      }
    }

    loadBookedDates();
  }, [bookingDates]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + getItemPrice(item) * getItemQty(item);
    }, 0);
  }, [cartItems]);

  const itemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + getItemQty(item), 0);
  }, [cartItems]);

  const freeDelivery = subtotal >= 80000;
  const discount = freeDelivery ? DELIVERY_FEE : 0;
  const total = Math.max(subtotal + DELIVERY_FEE + SERVICE_FEE - discount, 0);

  async function handleSubmitOrder() {
    setMessage("");

    if (cartItems.length === 0) {
      setMessage("Keranjang masih kosong.");
      return;
    }

    if (!selectedDate) {
      setMessage("Pilih tanggal booking terlebih dahulu.");
      return;
    }

    if (bookedDates.includes(selectedDate)) {
      setMessage("Tanggal tersebut sudah dibooking. Pilih tanggal lain.");
      return;
    }

    const savedUser = localStorage.getItem("foodora_user");

    if (!savedUser) {
      setMessage("Silakan login terlebih dahulu.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(savedUser);

      if (!user?.id_user) {
        localStorage.removeItem("foodora_user");
        setMessage("Sesi login tidak valid. Silakan login ulang.");
        navigate("/login");
        return;
      }

      const payload = {
        id_user: user.id_user,
        metode_pembayaran: paymentMethod,
        tanggal_booking: selectedDate,
        items: cartItems.map((item) => ({
          id_menu: item.id_menu || item.id,
          jumlah: item.qty || item.jumlah || 1,
        })),
      };

      const result = await createPesanan(payload);

      const orderId = result.data.id_pesanan;

      const paymentData = createPaymentData({
        orderId,
        total,
        paymentMethod,
        selectedDate,
      });

      const qrUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=" +
        encodeURIComponent(paymentData);

      navigate("/payment-qris", {
        state: {
          orderId,
          total,
          paymentMethod,
          qrUrl,
          selectedDate,
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage(error.message || "Gagal membuat pesanan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cox-page">
      <main className="cox-container">
        <motion.header
          className="cox-hero"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, ease: "easeOut" }}
        >
          <div className="cox-hero-left">
            <Link to="/keranjang" className="cox-back-link">
              <ArrowLeft size={17} />
              Kembali ke Keranjang
            </Link>

            <span className="cox-hero-badge">
              <ShieldCheck size={16} />
              Secure Checkout
            </span>

            <h1>Checkout Pesanan</h1>

            <p>
              Pilih tanggal booking, review alamat, pilih jadwal, cek ringkasan
              pesanan, lalu selesaikan pembayaran dengan aman.
            </p>
          </div>

          <motion.div
            className="cox-hero-card"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Total Bayar</span>
            <strong>{formatRp(total)}</strong>
            <p>{itemCount} item siap diproses</p>
          </motion.div>
        </motion.header>

        <motion.section
          className="cox-stepper"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {[
            { icon: CalendarDays, label: "Tanggal" },
            { icon: MapPin, label: "Alamat" },
            { icon: CreditCard, label: "Pembayaran" },
            { icon: Check, label: "Selesai" },
          ].map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.label}
                className="cox-step"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <div>
                  <Icon size={18} />
                </div>

                <span>{step.label}</span>

                {index < 3 && <i />}
              </motion.div>
            );
          })}
        </motion.section>

        {message && <div className="message error">{message}</div>}

        <section className="cox-layout">
          <div className="cox-left">
            <motion.section
              className="cox-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42 }}
            >
              <div className="cox-card-head">
                <div>
                  <span>STEP 1</span>
                  <h2>Tanggal Booking</h2>
                </div>

                <CalendarDays size={22} />
              </div>

              <div className="cox-booking-date">
                <div className="cox-booking-title">
                  <CalendarDays size={20} />

                  <div>
                    <h3>Pilih Tanggal Pesanan</h3>
                    <p>
                      Tanggal yang sudah dibooking akan terkunci dan tidak bisa
                      dipilih.
                    </p>
                  </div>
                </div>

                {dateLoading ? (
                  <div className="cox-date-loading">
                    Memuat tanggal booking...
                  </div>
                ) : (
                  <div className="cox-date-grid">
                    {bookingDates.map((date) => {
                      const isBooked = bookedDates.includes(date.value);
                      const isActive = selectedDate === date.value;

                      return (
                        <button
                          key={date.value}
                          type="button"
                          className={[
                            "cox-date-card",
                            isActive ? "active" : "",
                            isBooked ? "disabled" : "",
                          ].join(" ")}
                          disabled={isBooked}
                          onClick={() => setSelectedDate(date.value)}
                        >
                          <span>{date.label}</span>
                          <strong>{date.day}</strong>
                          <small>{date.month}</small>

                          {isBooked && <em>Booked</em>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.section>

            <motion.section
              className="cox-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.08 }}
            >
              <div className="cox-card-head">
                <div>
                  <span>STEP 2</span>
                  <h2>Alamat Pengiriman</h2>
                </div>

                <MapPin size={22} />
              </div>

              <div className="cox-form-grid">
                <label className="cox-field">
                  <span>Nama Penerima</span>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(event) => setReceiverName(event.target.value)}
                  />
                </label>

                <label className="cox-field">
                  <span>Nomor HP</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </label>

                <label className="cox-field full">
                  <span>Alamat Lengkap</span>
                  <textarea
                    rows="3"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </label>
              </div>
            </motion.section>

            <motion.section
              className="cox-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.16 }}
            >
              <div className="cox-card-head">
                <div>
                  <span>STEP 3</span>
                  <h2>Jadwal Pengiriman</h2>
                </div>

                <Truck size={22} />
              </div>

              <div className="cox-slot-grid">
                {deliverySlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={deliverySlot === slot ? "active" : ""}
                    onClick={() => setDeliverySlot(slot)}
                  >
                    <Clock3 size={17} />
                    {slot}
                  </button>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="cox-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.24 }}
            >
              <div className="cox-card-head">
                <div>
                  <span>STEP 4</span>
                  <h2>Metode Pembayaran</h2>
                </div>

                <CreditCard size={22} />
              </div>

              <div className="cox-payment-grid">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const active = paymentMethod === method.id;

                  return (
                    <motion.button
                      key={method.id}
                      type="button"
                      className={active ? "active" : ""}
                      onClick={() => setPaymentMethod(method.id)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Icon size={21} />

                      <strong>{method.name}</strong>
                      <span>{method.desc}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              className="cox-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.32 }}
            >
              <div className="cox-card-head">
                <div>
                  <span>CATATAN</span>
                  <h2>Catatan Tambahan</h2>
                </div>

                <MessageSquareText size={22} />
              </div>

              <label className="cox-field full">
                <span>Catatan untuk vendor</span>
                <textarea
                  rows="4"
                  placeholder="Contoh: jangan terlalu pedas, sendok dipisah, dll."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </label>
            </motion.section>

            <motion.button
              type="button"
              className="cox-submit"
              onClick={handleSubmitOrder}
              disabled={loading || cartItems.length === 0}
              whileHover={loading || cartItems.length === 0 ? {} : { y: -3 }}
              whileTap={
                loading || cartItems.length === 0 ? {} : { scale: 0.98 }
              }
            >
              {loading ? (
                <>
                  <Loader2 className="cox-spin" size={20} />
                  Memproses Pesanan...
                </>
              ) : (
                <>
                  Buat Pesanan
                  <ChevronRight size={20} />
                </>
              )}
            </motion.button>
          </div>

          <motion.aside
            className="cox-summary"
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.48, delay: 0.16 }}
          >
            <div className="cox-summary-head">
              <div>
                <span>ORDER SUMMARY</span>
                <h2>Ringkasan Pesanan</h2>
              </div>

              <ShoppingBag size={23} />
            </div>

            {selectedDate && (
              <div className="cox-selected-booking">
                <CalendarDays size={18} />
                <div>
                  <span>Tanggal Booking</span>
                  <strong>
                    {new Date(selectedDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </strong>
                </div>
              </div>
            )}

            <div className="cox-summary-items">
              {cartItems.length === 0 ? (
                <div className="cox-empty-summary">
                  <ShoppingBag size={34} />
                  <h3>Keranjang Kosong</h3>
                  <p>Tambahkan menu dulu sebelum checkout.</p>
                  <Link to="/vendor-detail">Lihat Menu</Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => {
                    const id = getItemId(item);
                    const name = getItemName(item);
                    const price = getItemPrice(item);
                    const qty = getItemQty(item);
                    const image = getItemImage(item);

                    return (
                      <motion.div
                        key={id}
                        className="cox-summary-item"
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <img src={image} alt={name} />

                        <div className="cox-summary-item-copy">
                          <h4>{name}</h4>
                          <p>{formatRp(price)} / item</p>

                          <div className="cox-mini-qty">
                            <button
                              type="button"
                              onClick={() => updateQty(id, qty - 1)}
                            >
                              <Minus size={13} />
                            </button>

                            <span>{qty}</span>

                            <button
                              type="button"
                              onClick={() => updateQty(id, qty + 1)}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>

                        <strong>{formatRp(price * qty)}</strong>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            <div className="cox-price-box">
              <div>
                <span>Subtotal</span>
                <strong>{formatRp(subtotal)}</strong>
              </div>

              <div>
                <span>Ongkos Kirim</span>
                <strong>{formatRp(DELIVERY_FEE)}</strong>
              </div>

              <div>
                <span>Biaya Layanan</span>
                <strong>{formatRp(SERVICE_FEE)}</strong>
              </div>

              {discount > 0 && (
                <div className="discount">
                  <span>Diskon Ongkir</span>
                  <strong>- {formatRp(discount)}</strong>
                </div>
              )}
            </div>

            <div className="cox-total">
              <span>Total</span>

              <motion.strong
                key={total}
                initial={{ opacity: 0.7, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {formatRp(total)}
              </motion.strong>
            </div>

            <div className="cox-safe-note">
              <ShieldCheck size={18} />
              <p>
                Pesanan kamu aman. Vendor akan memproses setelah pembayaran
                dikonfirmasi.
              </p>
            </div>
          </motion.aside>
        </section>
      </main>
    </div>
  );
}