const db = require("../config/database");

const absensiController = {
  getUser: async (req, res) => {
    try {
      const [user] = await db.query("SELECT * FROM users");
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Gagal mengambil data karyawan",
      });
    }
  },
  getAbensi: async (req, res) => {
    try {
      const [user] = await db.query("SELECT * FROM absensi");
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Gagal mengambil data absensi",
      });
    }
  },

  getAbsensiTable: async (req, res) => {
    try {
      const [user] = await db.query(
        `
        SELECT 
          a.absensiId,
          u.name,
          a.clockIn,
          a.clockOut,
          a.duration,
          sl.reason,
          a.statusLembur
        FROM absensi a
        LEFT JOIN users u ON u.userId = a.userId
        LEFT JOIN surat_lembur sl ON sl.userId = a.userId;
        `
      );
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Gagal mengambil data tabel",
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const [user] = await db.query("SELECT * FROM karyawan WHERE id = ?", [
        req.params.id,
      ]);

      if (user.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "User tidak ditemukan",
        });
      }
      res.json({
        status: "success",
        data: user[0],
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Gagal mengambil data karyawan",
      });
    }
  },
};

module.exports = absensiController;
