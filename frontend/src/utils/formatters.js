export function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

export function formatTanggal(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}