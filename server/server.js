require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sequelize = require("./src/config/database");
const routes = require("./src/routes");

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://winajaya.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Root & health check
app.get("/", (req, res) => {
  res.send("🚀 Backend is live on Railway!");
});

app.get("/api", (req, res) => {
  res.json({
    message: "🚀 API is running",
    time: new Date().toISOString(),
  });
});

// Routes
app.use("/api", routes);

// Error handler
app.use((err, req, res, next) => {
  console.error("💥 Error:", err);
  res.status(500).json({ error: err.message });
});

// DB init
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync();
      console.log("✅ Models synced");
    }
  } catch (error) {
    console.error("❌ Database error:", error);
  }
})();

// 👉 Always listen (important for Railway)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
