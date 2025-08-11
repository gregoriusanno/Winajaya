const db = require("../config/database");

const absensiController = {
  getUser: async (req, res) => {
    try {
      const [user] = await db.query("SELECT * FROM users");
      console.log(user);
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      console.error(error);
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
      const [table] = await db.query(
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
        LEFT JOIN surat_lembur sl ON sl.userId = a.userId
        ORDER BY 
        a.validasiLembur ASC,
        a.dateWork = CURDATE() DESC,
        a.dateWork DESC;
        `
      );
      res.json({
        status: "success",
        data: table,
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
      const id = db.escape(req.params.id);
      const [user] = await db.query(`SELECT * FROM users WHERE userId = ${id}`);

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
  insertAbensi: async (req, res) => {
    const {
      userId,
      clockIn,
      clockOut,
      duration,
      dateWork,
      salaryDay,
      statusLembur,
      validasiLembur,
    } = req.body;
    try {
      const [result] = await db.query(
        `INSERT INTO absensi 
          (userId, clockIn, clockOut, duration, dateWork, salaryDay, statusLembur, validasiLembur)
        VALUES (:userId, :clockIn, :clockOut, :duration, :dateWork, :salaryDay, :statusLembur, :validasiLembur)`,
        {
          replacements: {
            userId: userId || null,
            clockIn: clockIn || null,
            clockOut: clockOut || null,
            duration: duration || null,
            dateWork: dateWork || null,
            salaryDay: salaryDay || null,
            statusLembur: statusLembur || null,
            validasiLembur: validasiLembur || null,
          },
          type: db.QueryTypes.INSERT,
        }
      );
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      console.error(error); // biar kelihatan error detail di console
      res.status(500).json({
        status: "error",
        message: error.message || "Gagal menyimpan data absensi",
      });
    }
  },
};

module.exports = absensiController;
