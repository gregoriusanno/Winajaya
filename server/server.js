require("dotenv").config();

const cors = require("cors");
const express = require("express");
const path = require("path");

// Import your database and routes
const sequelize = require("./src/config/database");
const routes = require("./src/routes");

const app = express();

// ✅ Allowed origins untuk monorepo setup
const allowedOrigins = [
  // Local development
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "https://winajaya-nqf7.vercel.app", // Domain utama Vercel

  // Mobile/Capacitor
  "capacitor://localhost",
  "http://localhost",
];

// ✅ CORS configuration
const corsOptions = {
  origin: "https://winajaya.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Cache-Control",
  ],
  optionsSuccessStatus: 200,
};

// ✅ Apply CORS
app.use(cors(corsOptions));

// ✅ Explicit preflight handler
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  console.log("📋 Preflight OPTIONS for:", req.path, "from:", origin);

  if (!origin || allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept, Origin"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.status(200).end();
  } else {
    res.status(403).json({ error: "CORS not allowed" });
  }
});

// ✅ Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Request logging
app.use((req, res, next) => {
  console.log(`🌐 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(`📍 Origin: ${req.headers.origin || "none"}`);
  console.log(
    `🔐 Authorization: ${req.headers.authorization ? "present" : "none"}`
  );
  next();
});

// ✅ Health check - penting untuk monorepo
app.get("/api", (req, res) => {
  res.json({
    message: "🚀 API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    cors: "enabled",
    allowedOrigins: allowedOrigins,
  });
});

// ✅ API routes
app.use("/api", routes);

// ✅ 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "API route not found",
    path: req.path,
    availableRoutes: ["/api", "/api/auth/login"], // sesuaikan dengan routes Anda
  });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err);

  if (err.message.includes("CORS")) {
    return res.status(403).json({
      error: "CORS Error",
      message: err.message,
    });
  }

  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// ✅ Database initialization
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established.");

    // Hanya sync di development, di production sebaiknya gunakan migrations
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync();
      console.log("✅ Models synchronized.");
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

// Export untuk Vercel
module.exports = app;

// Local development server
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
  });
}
