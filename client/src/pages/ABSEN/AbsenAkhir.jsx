import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../../components/Design/AnimatedButton";
import clockImage from "../../assets/images/clock.png";

const AbsenAkhir = () => {
  const navigate = useNavigate();
  const [workDuration, setWorkDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [deskripsi, setDeskripsi] = useState("");
  const [error, setError] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const startTime = localStorage.getItem("workStartTime");

    if (!startTime) {
      console.log("Tidak ada waktu mulai kerja yang tersimpan");
      return;
    }

    const start = new Date(startTime);

    const updateDuration = () => {
      const end = new Date();
      const duration = end - start;

      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((duration % (1000 * 60)) / 1000);

      setWorkDuration({ hours, minutes, seconds });
    };

    // Update pertama kali saat komponen mount
    updateDuration();

    // Update setiap detik
    const timer = setInterval(updateDuration, 1000);

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(timer);
  }, []);

  // Effect untuk setup kamera

  const handleSelesaiKerja = async () => {
    // Validasi deskripsi
    const wordCount = deskripsi.trim().split(/\s+/).length;
    if (wordCount < 3) {
      setError("Deskripsi harus minimal 3 kata!");
      return;
    }

    setError("");
    const currentAbsentId = localStorage.getItem("currentAbsentId");
    const token = localStorage.getItem("token");

    console.log("Debug Absen Pulang: Token =", token);
    console.log("Debug Absen Pulang: currentAbsentId =", currentAbsentId);

    if (!currentAbsentId || !token) {
      setError("Data absensi atau token tidak ditemukan. Silakan coba lagi.");
      return;
    }

    const now = new Date();
    const clock_out = now.toTimeString().slice(0, 8);

    try {
      const res = await fetch(``, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clock_out,
          description: deskripsi, // Sertakan deskripsi evaluasi harian
        }),
      });

      const data = await res.json();

      if (data.success && data.statusCode === 200) {
        // Hapus data terkait absensi dari localStorage/sessionStorage
        localStorage.removeItem("workStartTime");
        localStorage.removeItem("currentAbsentId"); // Hapus ID absensi
        localStorage.removeItem("token"); // Hapus token saat berhasil absen pulang
        localStorage.removeItem("userData"); // Hapus userData saat berhasil absen pulang
        sessionStorage.removeItem("fromPresent");
        sessionStorage.removeItem("fromIzin");
        // Arahkan ke halaman login (root path)
        navigate("/");
      } else {
        setError(data.message || "Gagal absen pulang.");
      }
    } catch (err) {
      console.error("Error absen pulang:", err);
      setError("Gagal mengirim data absen pulang. Periksa koneksi internet.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      
      <div className="max-w-[390px] w-full flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <img src={clockImage} alt="Clock" className="w-32 h-32" />
        </div>
        {/* Teks Terima Kasih */}
        <h2 className="text-3xl sm:text-3xl font-bebas font-normal text-gray-800 tracking-wide mb-2 mt-4">
          TERIMA KASIH
        </h2>

        {/* Pesan */}
        <p className="font-montserrat text-sm text-gray-600 text-center mb-6 max-w-xs">
          Kerja bagus! Terima kasih telah menyelesaikan pekerjaan anda selama,
        </p>

        {/* Durasi Kerja dengan detik */}
        <div className="bg-white rounded-2xl p-2 w-full mb-6 max-w-xs outline outline-2 outline-[#EEF1F7]">
          <p className="font-montserrat text-lg text-center text-gray-800">
            {workDuration.hours} Jam {workDuration.minutes} Menit{" "}
            {workDuration.seconds} Detik
          </p>
        </div>

        {/* Button Selesai */}
        <AnimatedButton
          onClick={handleSelesaiKerja}
          variant="red"
          className="max-w-xs w-full py-3 px-6 font-montserrat font-semibold rounded-2xl text-sm"
        >
          Absen Pulang
        </AnimatedButton>
      </div>
    </div>
  );
};

export default AbsenAkhir;
