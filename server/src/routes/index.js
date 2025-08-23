const express = require("express");
const router = express.Router();
// const mainRouter = require("./routes");
const authRoute = require("./authRoute");
const absensiRoute = require("./absensiRoutes");
const suratLemburRoute = require("./suratLembur");
const validationRoute = require("./validationRoutes");
const KaryawanRoute = require("./userRoute");

// Debug middleware untuk semua requests
router.use((req, res, next) => {
  console.log("Incoming Request:", {
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
  });
  next();
});
router.use("/auth", authRoute);
router.use("/absensi", absensiRoute);
router.use("/izinlembur", suratLemburRoute);
router.use("/validation", validationRoute);
router.use("/karyawan", KaryawanRoute);

module.exports = router;
