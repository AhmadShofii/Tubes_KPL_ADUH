const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

function getAllowedOrigins() {
  const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

  return origin
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function applySecurityMiddleware(app) {
  app.use(helmet());

  app.use(
    cors({
      origin(origin, callback) {
        const allowedOrigins = getAllowedOrigins();

        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Origin tidak diizinkan oleh CORS."));
      },
      credentials: true,
    })
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        message: "Terlalu banyak request. Coba lagi nanti.",
      },
    })
  );
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Coba lagi nanti.",
  },
});

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak permintaan OTP. Coba lagi nanti.",
  },
});

module.exports = {
  applySecurityMiddleware,
  authLimiter,
  otpLimiter,
};