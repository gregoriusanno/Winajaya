const db = require('../config/database');

const absensiController = {
  getKaryawan: async (req, res) => {
    try {
      const [karyawan] = await db.query('SELECT * FROM users');
      res.json({
        status: 'success',
        data: karyawan
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Gagal mengambil data karyawan'
      });
    }
  },

  // Tambahan untuk get by ID jika diperlukan
  getKaryawanById: async (req, res) => {
    try {
      const [karyawan] = await db.query('SELECT * FROM karyawan WHERE id = ?', [req.params.id]);
      
      if (karyawan.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Karyawan tidak ditemukan'
        });
      }

      res.json({
        status: 'success',
        data: karyawan[0]
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Gagal mengambil data karyawan'
      });
    }
  }
};

module.exports = absensiController;