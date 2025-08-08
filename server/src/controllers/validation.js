const db = require("../config/database");

const ValidationController = {
  updateValidationApproved: async (req, res) => {
    try {
      const [user] = await db.query(
        `
          UPDATE absensi
          SET validasiLembur = TRUE, validation_status = ‘APPROVED’
          WHERE absensiId = 1;
        `
      );
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Gagal Approved",
      });
    }
  },
  updateValidationRejected: async (req, res) => {
    try {
      const [user] = await db.query(
        `
          UPDATE absensi
          SET validasiLembur = TRUE, validation_status = 'REJECTED', duration='08:00:00'
          WHERE absensiId = 1;
        `
      );
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Gagal Rejected",
      });
    }
  },
};

module.exports = ValidationController;
