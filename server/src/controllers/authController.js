const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug request
    console.log("=== Login Attempt ===");
    console.log("Request body:", req.body);

    // Validasi input
    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({
        success: false,
        message: "Email dan password harus diisi",
      });
    }

    // Cari user
    console.log("Searching for user with email:", email);
    const user = await User.findOne({
      where: { email },
      logging: console.log, // Log query SQL
    });

    // Debug user result
    console.log("User query result:", {
      found: !!user,
      userData: user
        ? {
            id: user.userId,
            email: user.email,
            hasPassword: !!user.password,
          }
        : null,
    });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // Debug password check
    console.log("Password comparison:", {
      inputPassword: password,
      hashedPassword: user.password,
      passwordExists: !!user.password,
    });

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isValidPassword);

    if (!isValidPassword) {
      console.log("Invalid password");
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    console.log("Login successful, sending response");

    return res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      message: `Terjadi kesalahan server: ${error.message}`,
    });
  }
};

module.exports = { login };
