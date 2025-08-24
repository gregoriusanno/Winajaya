require("dotenv").config();

const cors = require("cors");
const express = require("express");
const path = require("path");

// Import your database and routes
const sequelize = require("../src/config/database");
const routes = require("../src/routes");

const app = express();

// ✅ Allowed origins untuk monorepo setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "https://winajaya-nqf7.vercel.app",
  "capacitor://localhost",
  "http://localhost",
  "https://winajaya.vercel.app",
];

// ✅ CORS configuration
const corsOptions = {
  origin: allowedOrigins,
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

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Debug logs
app.use((req, res, next) => {
  console.log("📢 ORIGIN:", req.headers.origin);
  console.log("📢 METHOD:", req.method, "PATH:", req.path);
  next();
});

// ✅ Health check
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

// ✅ 404 handler
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "API route not found",
    path: req.path,
    availableRoutes: ["/api", "/api/auth/login"], // sesuaikan
  });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// ✅ Init DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected.");
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync();
      console.log("✅ Models synchronized.");
    }
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
})();

// ✅ Export untuk Vercel
module.exports = app;
