const db = require("../config/database");

const SuratLemburController = {
  getSuratLembur: async (req, res) => {
    try {
      const [user] = await db.query(
        `
          SELECT * FROM surat_lembur 
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
  insertSuratLembur: async (req, res) => {
    const { userId, dateLembur, reason } = req.body;

    try {
      const [result] = await db.query(
        `INSERT INTO surat_lembur (userId, dateLembur, reason)
       VALUES (:userId, :dateLembur, :reason)`,
        {
          replacements: {
            userId: userId || null,
            dateLembur: dateLembur || null,
            reason: reason || null,
          },
          type: db.QueryTypes.INSERT,
        }
      );

      res.json({
        status: "success",
        message: "Surat lembur berhasil disimpan",
        data: result,
      });
    } catch (error) {
      console.error(error); // debug error detail
      res.status(500).json({
        status: "error",
        message: error.message || "Gagal insert surat lembur",
      });
    }
  },
};

module.exports = SuratLemburController;
