const express = require("express");
const router = express.Router();

const {
  getAbensibyUserId,
  getAbsensiTable,
  getUser,
  getUserById,
  insertAbensi,
  updateAbsensi,
} = require("../controllers/absensiController");

router.get("/getAbsensibyId/:id", getAbensibyUserId);
router.get("/getAbsensiTable", getAbsensiTable);
router.get("/user", getUser);
router.get("/user/:id", getUserById);
router.post("/insertAbsensi", insertAbensi);
router.post("/updateAbsensi", updateAbsensi);

module.exports = router;
