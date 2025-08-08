const { User, Branch } = require("../models");
const { successResponse, errorResponse } = require("../helpers/responseHelper");

class KaryawanController {
  static async getKaryawan(req, res) {
    try {
      const karyawan = await User.findAll({
        include: [
          {
            model: Branch,
            as: "branch",
            attributes: ["name"],
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });
      return res.json(successResponse(karyawan));
    } catch (error) {
      return res
        .status(500)
        .json(errorResponse(error.message || "Gagal mengambil data karyawan"));
    }
  }
  static async getKaryawanById(req, res) {
    try {
      const karyawan = await User.findByPk(req.params.id, {
        include: [
          {
            model: Branch,
            as: "branch",
            attributes: ["name"],
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });

      if (!karyawan) {
        return res.status(404).json(errorResponse("Karyawan tidak ditemukan"));
      }

      return res.json(successResponse(karyawan));
    } catch (error) {
      return res
        .status(500)
        .json(errorResponse(error.message || "Gagal mengambil data karyawan"));
    }
  }
}

module.exports = KaryawanController;
