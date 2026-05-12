import { Star, MapPin, Clock, Info } from "lucide-react";

export default function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="relative rounded-3xl overflow-hidden h-[200px] md:h-[240px] shadow-lg">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#B23B15] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Partner
                </span>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star size={14} fill="#FFC107" stroke="#FFC107" />
                  <span className="text-sm font-bold">4.8</span>
                  <span className="text-xs opacity-80">(500+ ratings)</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                Dapur Ananda
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>20-30 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>1.2 km</span>
                </div>
                <div className="flex items-center gap-1">
                  <Info size={14} />
                  <span>Indonesian Heritage</span>
                </div>
              </div>
            </div>

            <button className="bg-white text-[#1A2E1A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Info size={16} />
              Store Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
