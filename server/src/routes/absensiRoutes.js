const express = require("express");
const router = express.Router();

const {
  getAbensi,
  getAbsensiTable,
  getUser,
  getUserById,
  insertAbensi,
} = require("../controllers/absensiController");

router.get("/getAllAbsensi", getAbensi);
router.get("/getAbsensiTable", getAbsensiTable);
router.get("/user", getUser);
router.get("/user/:id", getUserById);
router.get("/insertAbensi", insertAbensi);

module.exports = router;
