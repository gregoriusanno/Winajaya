const bcrypt = require("bcryptjs");
const db = require("../config/database");

const registerUser = async (req, res) => {
  const { nama, email, password, role } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES (:name, :email, :password, :role)`,
      {
        replacements: {
          name: nama || null,
          email: email || null,
          password: hashedPassword || null,
          role: "Karyawan",
        },
        type: db.QueryTypes.INSERT,
      }
    );

    res.json({
      status: "success",
      data: {
        id: result,
        nama,
        email,
        role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message || "Gagal menyimpan data user",
    });
  }
};

module.exports = { registerUser };
