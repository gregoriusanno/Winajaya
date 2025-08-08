const express = require("express");
const router = express.Router();

const { getSuratLembur } = require("../controllers/SuratLembur");

router.get("/suratlembur", getSuratLembur);

module.exports = router;
