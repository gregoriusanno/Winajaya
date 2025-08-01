const db = require("../models");
const { Op } = require("sequelize");

const getAbsenReport = async (req, res) => {
  try {
    const { userId, month, year } = req.query;

    // Dapatkan tanggal awal dan akhir bulan
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Ambil data absen
    const absenData = await db.Absent.findAll({
      include: [{
        model: db.User,
        where: { id: userId },
        attributes: ['name']
      }],
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [['date', 'ASC']],
    });

    // Format data untuk response
    const formattedData = absenData.map(absen => ({
      date: absen.date,
      clockIn: absen.clock_in,
      clockOut: absen.clock_out,
      status: absen.status
    }));

    res.json({
      success: true,
      data: formattedData
    });

  } catch (error) {
    console.error('Error getting absen report:', error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data absen"
    });
  }
};

module.exports = {
  getAbsenReport
};