const db = require("../config/database");

const Controller = {
  updateValidation: async (req, res) => {
    try {
      const [user] = await db.query(
        `
            UPDATE 

            
            `
      );
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {}
  },
};

module.exports = absensiController;
