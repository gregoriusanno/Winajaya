const db = require("../config/database");

const UserController = {
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

module.exports = UserController;
