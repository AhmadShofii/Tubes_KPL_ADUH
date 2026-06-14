function formatRp(num) {
  return "Rp " + Number(num || 0).toLocaleString("id-ID");
}

export default function OrderSummary({
  items = [],
  subtotal = 0,
  deliveryFee = 0,
  serviceFee = 0,
  total = 0,
}) {
  return (
    <aside className="order-summary checkout-summary-pro">
      <div className="summary-head-pro">
        <div>
          <span>ORDER SUMMARY</span>
          <h2 className="summary-title">Ringkasan Pesanan</h2>
        </div>
        <strong>{items.length}</strong>
      </div>

      <div className="summary-items">
        {items.length === 0 ? (
          <div className="summary-empty summary-empty-pro">
            <p>Belum ada item di keranjang.</p>
          </div>
        ) : (
          items.map((item) => {
            const itemName = item.name || item.nama_menu || "Menu";
            const itemQty = item.qty || item.jumlah || 1;
            const itemPrice = item.price || item.harga || 0;

            return (
              <div className="summary-item summary-item-pro" key={item.id || item.id_menu}>
                <div className="summary-item-thumb">
                  {item.image ? <img src={item.image} alt={itemName} /> : <span>{itemName.charAt(0)}</span>}
                </div>

                <div className="summary-item-copy">
                  <h4>{itemName}</h4>
                  <p>{itemQty}x item</p>
                </div>

                <strong>{formatRp(itemPrice * itemQty)}</strong>
              </div>
            );
          })
        )}
      </div>

      <div className="summary-rows">
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{formatRp(subtotal)}</strong>
        </div>

        <div className="summary-row">
          <span>Ongkos Kirim</span>
          <strong>{formatRp(deliveryFee)}</strong>
        </div>

        <div className="summary-row">
          <span>Biaya Layanan</span>
          <strong>{formatRp(serviceFee)}</strong>
        </div>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <strong>{formatRp(total)}</strong>
      </div>

      <p className="summary-note summary-note-pro">
        Pilih metode pembayaran di sebelah kiri, lalu tekan tombol{" "}
        <strong>Buat Pesanan</strong>. Transaksi kamu diamankan oleh Foodora.
      </p>
    </aside>
  );
}