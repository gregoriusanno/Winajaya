require("dotenv").config();

const cors = require("cors");
const express = require("express");
const path = require("path");

const sequelize = require("./src/config/database");
const routes = require("./src/routes");

const allowedOrigins = [
  "http://192.168.100.17:5173",
  "http://localhost:5173",
  "http://192.168.100.17:3002",
  "capacitor://localhost",
  "http://localhost",
  "https://winajaya-nqf7.vercel.app", // backend (Vercel)
  "https://winajaya.vercel.app", // frontend (Vercel)
];

const app = express();

// ✅ CORS config - FIXED
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

// ✅ Apply CORS BEFORE other middleware
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// ✅ Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// ✅ Routes
app.use("/api", routes);

// ✅ Root route for health check
app.get("/", (req, res) => {
  res.json({ message: "API is running", timestamp: new Date().toISOString() });
});

// Database initialization
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established.");
    await sequelize.sync();
    console.log("✅ Models synchronized.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}
