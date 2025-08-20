import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AnimatedButton from "../../components/Design/AnimatedButton";

const LoginKaryawan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loginUrl = "http://localhost:3002/api/auth/login";
      console.log("Attempting login to:", loginUrl);
      console.log("Login payload:", {
        email: formData.email,
        password: formData.password,
      });

      const response = await axios.post(
        loginUrl,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.user.userId);
      const res = await axios.get(
        `http://localhost:3002/api/absensi/user/${response.data.user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${response.data?.token}`,
          },
        }
      );
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);

        const userData = { ...response.data.user };
        console.log("USER", response.data.user);

        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("userData berhasil disimpan ke localStorage:", userData);
        console.log(res.data?.data.role);
        if (res.data?.data.role == "Admin") {
          navigate("/Dashboard");
        } else {
          navigate("/absensi");
        }
      } else {
        setError("Token tidak ditemukan dalam response");
        console.error("Response structure:", response.data);
      }
    } catch (error) {
      console.error("Error login:", error);
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      if (error.response?.status === 404) {
        setError("URL login tidak ditemukan. Mohon periksa koneksi.");
      } else {
        setError(
          error.response?.data?.message || "Terjadi kesalahan saat login"
        );
      }
    }

    sessionStorage.clear();

    // sessionStorage.removeItem("fromIzin");
    // sessionStorage.removeItem("fromPresent");
    // sessionStorage.removeItem("previousPage");
  };

  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center bg-white px-10 sm:px-0 overflow-y-auto">
      <div className="w-full sm:w-[380px] p-6 sm:p-8 my-auto bg-white rounded-3xl p-4 opacity-100 outline outline-2 outline-[#EEF1F7]">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bebas font-normal text-gray-800 tracking-wide">
            Masuk akun karyawan
          </h2>
          <p className="mt-2 text-xs text-gray-600 px-1 font-montserrat">
            Silakan masukkan data Anda di bawah ini untuk mengakses akun Anda!
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-montserrat">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">@</span>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full pl-12 pr-3 py-3 sm:py-3.5 border border-gray-200 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base placeholder:text-sm font-montserrat"
              placeholder="Masukan Email"
              value={formData.email}
              onChange={handleChange}
              required
              inputMode="email"
              autoCapitalize="none"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              className="placeholder:text-sm block w-full pl-12 pr-3 py-3 sm:py-3.5 border border-gray-200 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base font-montserrat"
              placeholder="Masukan Kata Sandi"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <AnimatedButton
            type="submit"
            className="w-full h-[40px] py-3 sm:py-3.5 px-4 mt-2 bg-gradient-to-r from-[#ffe2e5] to-[#ff5568] text-white rounded-xl opacity-100 font-montserrat font-semibold flex items-center justify-center text-sm"
          >
            Masuk
          </AnimatedButton>
        </form>
      </div>
    </div>
  );
};

export default LoginKaryawan;
