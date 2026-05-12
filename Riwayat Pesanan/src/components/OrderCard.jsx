function OrderCard({ image, name, price, status }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center mb-5">
      <div className="flex gap-4 items-center">
        <img
          src={image}
          alt="food"
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div>
          <h2 className="font-bold text-xl">{name}</h2>
          <p className="text-red-500 font-semibold">Rp {price}</p>
          <p className="text-green-600">{status}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="border border-green-600 px-4 py-2 rounded-lg">
          Pesan Lagi
        </button>

        <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
          Lihat
        </button>
      </div>
    </div>
  );
}

export default OrderCard;