const { CourierTransport } = require('../models');

const courierController = {
  createTransportRecord: async (req, res) => {
    try {
      const { odoStart, odoEnd, totalFuelCost } = req.body;
      const userId = req.user?.id || 1;

      // Validasi input
      if (!odoStart || !odoEnd || !totalFuelCost) {
        return res.status(400).json({
          status: 'error',
          message: 'Semua data harus diisi'
        });
      }

      const transport = await CourierTransport.create({
        user_id: userId,
        odo_start: parseInt(odoStart),
        odo_end: parseInt(odoEnd),
        total_fuel_cost: totalFuelCost
      });

      return res.json({
        status: 'success',
        message: 'Data transportasi berhasil disimpan',
        data: transport
      });
    } catch (error) {
      console.error('Detailed error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Gagal menyimpan data transportasi',
        details: error.message
      });
    }
  }
};

module.exports = courierController; 