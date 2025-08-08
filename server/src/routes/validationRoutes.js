const express = require("express");
const router = express.Router();
const {
  updateValidationApproved,
  updateValidationRejected,
} = require("../controllers/validation");

router.post("/Approve", updateValidationApproved);
router.post("/Reject", updateValidationRejected);

module.exports = router;
