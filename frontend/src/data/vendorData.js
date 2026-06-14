import nasiGorengImg from "../assets/images/nasi-goreng.png";
import rendangImg from "../assets/images/rendang.png";
import sateImg from "../assets/images/sate.png";

// File ini khusus untuk menyimpan data, logika mentah, atau konstanta
export const INITIAL_VENDORS = [
  {
    id: 1,
    name: "Warung Heritage Solo",
    tag: "Authentic Javanese • Rice Dishes",
    priceLvl: "$$",
    rate: 4.9,
    reviews: "1.2k+",
    time: "25-35",
    dist: "1.8",
    startPrice: "45k",
    img: rendangImg,
  },
  {
    id: 2,
    name: "Sate Khas Senayan",
    tag: "Grilled Meat • Indonesian Classics",
    priceLvl: "$$$",
    rate: 4.7,
    reviews: "850",
    time: "15-25",
    dist: "0.9",
    startPrice: "72k",
    img: sateImg,
  },
  {
    id: 3,
    name: "Salad Nusantara",
    tag: "Healthy • Vegetarian Options",
    priceLvl: "$",
    rate: 4.8,
    reviews: "500+",
    time: "20-30",
    dist: "3.2",
    startPrice: "28k",
    isPromo: true,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Nasi Goreng Kambing",
    tag: "Street Food • Spicy",
    priceLvl: "$",
    rate: 4.5,
    reviews: "2.4k",
    time: "10-20",
    dist: "0.5",
    startPrice: "35k",
    img: nasiGorengImg,
  },
];