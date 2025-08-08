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
};

module.exports = SuratLemburController;
