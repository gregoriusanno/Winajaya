require("dotenv").config();

const express = require("express");
const cors = require("cors");
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

// middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // izinkan request tanpa origin (contoh: Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    query: req.query,
    params: req.params,
  });
  next();
});

// routes
app.use("/api", routes);

// ✅ Database connection (once, not per request)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
    await sequelize.sync();
    console.log("Models synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// ⚡ Export app for Vercel (no app.listen here)
module.exports = app;

// ✅ For local dev only, run with `node index.js`
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}
