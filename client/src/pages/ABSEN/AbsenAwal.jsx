import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import absenImage from "../../assets/images/absen.png";
import absenSound from "../../assets/sound/absen.mp3"; // Import sound file
import { FaMedkit, FaCalendarDay, FaUserClock } from "react-icons/fa";
import AnimatedButton from "../../components/Design/AnimatedButton";

const Absensi = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [showIzinModal, setShowIzinModal] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const [alasanIzin, setAlasanIzin] = useState("");
  const [error, setError] = useState("");
  const [kategoriIzin, setKategoriIzin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadyAbsent, setIsAlreadyAbsent] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  // Tambahkan state untuk audio
  const [audio] = useState(new Audio(absenSound));

  const kategoriOptions = [
    { value: "sakit", label: "Sakit", icon: <FaMedkit /> },
    { value: "libur_bersama", label: "Libur Bersama", icon: <FaCalendarDay /> },
    {
      value: "keperluan_pribadi",
      label: "Keperluan Pribadi",
      icon: <FaUserClock />,
    },
  ];

  // Fungsi untuk memainkan suara dengan volume yang diatur
  const playAbsenSound = async () => {
    try {
      const audio = new Audio(absenSound);
      audio.volume = 0.7; // Set ke 70%

      // Tambahkan event listener untuk debugging
      audio.addEventListener("play", () => {
        console.log("Audio mulai diputar");
      });

      audio.addEventListener("error", (e) => {
        console.error("Error audio:", e);
      });

      // Coba mainkan audio dengan await
      try {
        await audio.play();
        console.log("Sound effect berhasil diputar");
      } catch (playError) {
        console.error("Gagal memutar sound:", playError);
      }
    } catch (error) {
      console.error("Error setup audio:", error);
    }
  };

  // Handle modal animation
  useEffect(() => {
    if (showIzinModal) {
      setTimeout(() => {
        setShowModalContent(true);
      }, 100);
    } else {
      setShowModalContent(false);
    }
  }, [showIzinModal]);

  // Koordinat outlet
  // const OUTLET_LOCATION = {
  //   lat: -6.9401128, // Latitude outlet Katsikat
  //   lng: 106.9447146, // Longitude outlet Katsikat
  // };

  const OUTLET_LOCATION = [
    {
      lat: -7.930945915386587,
      lng: 112.62689965351042,
    },
    {
      lat: -6.796001,
      lng: 111.896492,
    },
    {
      lat: -6.797187209031785,
      lng: 111.87774215825094,
    },
  ];

  const ALLOWED_RADIUS = 1500; // Radius dalam meter

  // Fungsi untuk menghitung jarak antara dua koordinat (dalam meter)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // radius bumi dalam meter
    const toRad = (deg) => deg * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // jarak dalam meter
  };

  // Fungsi untuk mengecek lokasi user
  const checkLocation = () => {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject("Browser Anda tidak mendukung geolocation.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          console.log("Lokasi user:", { lat: userLat, lng: userLng });

          setUserLocation({ lat: userLat, lng: userLng });

          // Cek jarak ke semua outlet
          const isWithinRadius = OUTLET_LOCATION.some((outlet) => {
            const distance = calculateDistance(
              userLat,
              userLng,
              outlet.lat,
              outlet.lng
            );
            console.log(
              `Jarak ke outlet (${outlet.lat}, ${outlet.lng}): ${distance} meter`
            );
            return distance <= ALLOWED_RADIUS;
          });

          if (isWithinRadius) {
            resolve(true);
          } else {
            reject(
              `Anda harus berada dalam radius ${ALLOWED_RADIUS} meter dari salah satu outlet untuk melakukan absensi!`
            );
          }
        },
        (error) => {
          reject(
            "Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan."
          );
        }
      );
    });
  };

  // Fungsi untuk mengecek apakah waktu saat ini dalam rentang yang diizinkan
  const isWithinAllowedTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes; // Konversi ke menit

    // Rentang waktu pagi (08:00 - 08:30)
    const morningStart = 8 * 60; // 08:00
    const morningEnd = 15 * 60 + 30; // 08:30

    // Rentang waktu sore (16:00 - 16:30)
    const eveningStart = 16 * 60; // 16:00
    const eveningEnd = 24 * 60; // 01:00

    return (
      (currentTime >= morningStart && currentTime <= morningEnd) ||
      (currentTime >= eveningStart && currentTime <= eveningEnd)
    );
  };

  // Handle absensi hadir
  const handleHadir = async () => {
    console.log("Tombol Saya Hadir diklik");
    setError("");
    setIsLoading(true);
    try {
      // Ambil data user
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");

      if (!userData) {
        console.log("userData tidak ditemukan di localStorage");
        setError("Data user tidak ditemukan. Silakan login ulang.");
        setIsLoading(false);
        return;
      }
      const user = JSON.parse(userData);
      const employee_id = parseInt(user.userId);
      // Ambil waktu sekarang
      const now = new Date();
      const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const clock_in = now.toTimeString().slice(0, 8);
      if (!employee_id || isNaN(employee_id)) {
        console.log("employee_id tidak valid:", employee_id);
        setError("ID user tidak valid.");
        setIsLoading(false);
        return;
      }
      console.log("Kirim absen hadir dengan:", {
        employee_id,
        date,
        clock_in,
      });
      // Kirim POST ke absents
      const res = await fetch(
        "http://localhost:3002/api/absensi/insertAbsensi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: employee_id,
            clockIn: clock_in,
            clockOut: null,
            duration: null,
            dateWork: date,
            salaryDay: null,
            statusLembur: null,
            validasiLembur: null,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        sessionStorage.setItem("fromPresent", "true");
        localStorage.setItem("workStartTime", new Date().toISOString());
        localStorage.setItem("currentAbsentId", data.data.userId);
        navigate("/loginSuccess");
      } else {
        setError("Gagal menyimpan data kehadiran.");
      }
    } catch (err) {
      setError("Gagal mengirim data kehadiran.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        setEmployeeId(user.userId);
        console.log("UserId didapat:", user.userId);
      } else {
        setError("Data user tidak ditemukan. Silakan login ulang.");
        setIsAlreadyAbsent(true);
        console.log("userData tidak ditemukan di localStorage");
      }
    } catch (e) {
      setError("Gagal membaca data user.");
      setIsAlreadyAbsent(true);
      console.log("Error parsing userData:", e);
    }
  }, []);

  // Cleanup audio saat komponen unmount
  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-white px-10 sm:px-0">
      <div className="w-full sm:w-[380px] p-8 sm:p-8 my-auto bg-white rounded-3xl outline outline-2 outline-[#EEF1F7]">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <img src={absenImage} alt="Absen" className="w-32 h-32" />
        </div>

        {/* Title & Description */}
        <h1 className="font-bebas text-2xl text-gray-800 tracking-wide text-center mb-3">
          Konfirmasi kehadiran!
        </h1>
        <p className="font-montserrat text-sm text-gray-800 tracking-wide text-center mb-3">
          Pastikan Anda berada dalam radius 10 meter dari outlet!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <AnimatedButton
            onClick={() => {
              handleHadir();
            }}
            className="font-semibold w-full py-3 px-4 rounded-xl text-sm"
            variant="red"
            disabled={isAlreadyAbsent || isLoading}
          >
            Saya Hadir
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Absensi;
