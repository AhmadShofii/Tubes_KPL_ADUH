export function getLocalDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function generateBookingDates(totalDays = 30, startDate = new Date()) {
  const dates = [];

  for (let i = 0; i < totalDays; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

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

export function getFirstAvailableDate(bookingDates, bookedDates) {
  return bookingDates.find((date) => !bookedDates.includes(date.value)) || null;
}

export function buildPesananPayload({
  user,
  paymentMethod,
  selectedDate,
  cartItems,
}) {
  return {
    id_user: user.id_user,
    metode_pembayaran: paymentMethod,
    tanggal_booking: selectedDate,
    items: cartItems.map((item) => ({
      id_menu: item.id_menu || item.id,
      jumlah: item.qty || item.jumlah || 1,
    })),
  };
}