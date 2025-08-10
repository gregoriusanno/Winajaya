const express = require("express");
const router = express.Router();

const {
  getSuratLembur,
  insertSuratLembur,
} = require("../controllers/SuratLembur");

router.get("/suratlembur", getSuratLembur);
router.get("/insertsuratlembur", insertSuratLembur);

module.exports = router;
