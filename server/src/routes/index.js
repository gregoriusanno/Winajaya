const express = require("express");
const router = express.Router();
const orderDetailRoutes = require("./orderDetailRoute");
const authRoute = require("./authRoute");
const karyawanRoute = require("./karyawanRoute");
const courierRoute = require("./courierRoute");

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

router.use("/", authRoute);
router.use("/", karyawanRoute);
router.use("/kurir", courierRoute);

module.exports = router;
