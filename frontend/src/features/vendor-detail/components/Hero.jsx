import {
  Star,
  MapPin,
  Clock3,
  Info,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";

const heroContainer = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <motion.section
      className="group relative h-[250px] overflow-hidden rounded-[30px] shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:h-[270px] lg:h-[290px]"
      variants={heroContainer}
      initial="hidden"
      animate="show"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white sm:p-7 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              variants={heroItem}
              className="mb-3 flex flex-wrap items-center gap-2"
            >
              <span className="rounded-full bg-[#E56B49] px-3.5 py-1.5 text-[13px] font-bold text-white shadow-sm">
                Partner
              </span>

              <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 backdrop-blur-md">
                <Star
                  size={15}
                  className="text-[#FFD76A]"
                  fill="currentColor"
                />
                <span className="text-[14px] font-bold">4.8</span>
                <span className="text-[13px] font-medium text-white/90">
                  (500+ ratings)
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mb-3 text-[30px] font-extrabold leading-none tracking-tight text-white sm:text-[36px] lg:text-[42px]"
            >
              Dapur Ananda
            </motion.h1>

            <motion.div
              variants={heroItem}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-semibold text-white/95 sm:text-[15px]"
            >
              <div className="flex items-center gap-1.5">
                <Clock3 size={16} />
                <span>20–30 min</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>1.2 km</span>
              </div>

              <div className="flex items-center gap-1.5">
                <UtensilsCrossed size={16} />
                <span>Indonesian Heritage</span>
              </div>
            </motion.div>
          </div>

          <motion.button
            variants={heroItem}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="inline-flex h-14 w-fit items-center justify-center gap-2 rounded-2xl bg-white px-6 text-[15px] font-bold text-[#184D2C] shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-[#F5F5EE]"
          >
            <Info size={19} />
            <span>Store Info</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}