import { motion } from "framer-motion";
import Footer from "../components/Footer";

import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiMapPin,
} from "react-icons/fi";

import "../styles/history.css";

function History() {
  return (
    <>
      <section className="history-page">

        {/* HEADER */}
        <motion.div
          className="history-header"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <span className="history-badge">
            <FiClock />
            Estimated Arrival: 25 mins
          </span>

          <h1>
            Order #FD2456789
          </h1>

          <p>
            Ordered on 24 October 2024
          </p>

        </motion.div>

        {/* ORDER CARD */}
        <motion.div
          className="order-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="order-top">

            <div>
              <h2>Nasi Goreng Wagyu</h2>
              <p>2x Item • Extra Sambal</p>
            </div>

            <h3>Rp 130.000</h3>

          </div>

          {/* PROGRESS */}
          <div className="progress-box">

            <div className="progress-step active">
              <FiCheckCircle />
              <span>Dibuat</span>
            </div>

            <div className="progress-step active">
              <FiCheckCircle />
              <span>Dikonfirmasi</span>
            </div>

            <div className="progress-step active">
              <FiCheckCircle />
              <span>Dimasak</span>
            </div>

            <div className="progress-step current">
              <FiTruck />
              <span>Dikirim</span>
            </div>

            <div className="progress-step">
              <FiMapPin />
              <span>Selesai</span>
            </div>

          </div>

        </motion.div>

        {/* MAP */}
        <motion.div
          className="map-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <iframe
            title="map"
            src="https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>

        </motion.div>

      </section>

      <Footer />
    </>
  );
}

export default History;