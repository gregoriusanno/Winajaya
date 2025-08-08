const express = require("express");
const router = express.Router();

const {
  getAbensi,
  getAbsensiTable,
  getUser,
  getUserById,
} = require("../controllers/absensiController");

router.get("/getAllAbsensi", getAbensi);
router.get("/getAbsensiTable", getAbsensiTable);
router.get("/user", getUser);
router.get("/user/:id", getUserById);

module.exports = router;
