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
  
  const OUTLET_LOCATION = {
    lat: -7.9888889, // Latitude outlet Katsikat
    lng: 112.6838822, // Longitude outlet Katsikat
  };

  const ALLOWED_RADIUS = 10; // Radius dalam meter

  // Fungsi untuk menghitung jarak antara dua koordinat (dalam meter)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radius bumi dalam meter
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Jarak dalam meter
  };

  // Fungsi untuk mengecek lokasi user
  const checkLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          console.log("Lokasi user:", { lat: userLat, lng: userLng });

          setUserLocation({ lat: userLat, lng: userLng });

          // Hitung jarak ke outlet
          const distance = calculateDistance(
            userLat,
            userLng,
            OUTLET_LOCATION.lat,
            OUTLET_LOCATION.lng
          );

          console.log("Jarak ke outlet:", distance, "meter");

          if (distance <= ALLOWED_RADIUS) {
            // User dalam radius yang diizinkan
            navigate("/loginSuccess");
          } else {
            setError(
              "Anda harus berada dalam radius 10 meter dari outlet untuk melakukan absensi!"
            );
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan."
          );
        }
      );
    } else {
      setError("Browser Anda tidak mendukung geolocation.");
    }
  };

  // Handle absensi hadir
  const handleHadir = async () => {
    console.log("Tombol Saya Hadir diklik");
    setError("");
    setIsLoading(true);
    try {
      // Ambil data user
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      if (!userData) {
        console.log('userData tidak ditemukan di localStorage');
        setError('Data user tidak ditemukan. Silakan login ulang.');
        setIsLoading(false);
        return;
      }
      const user = JSON.parse(userData);
      const employee_id = parseInt(user.id);
      const branch_id = user.branch_id ? parseInt(user.branch_id) : 1;
      // Ambil waktu sekarang
      const now = new Date();
      const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const clock_in = now.toTimeString().slice(0, 8); // HH:mm:ss
      if (!employee_id || isNaN(employee_id)) {
        console.log('employee_id tidak valid:', employee_id);
        setError('ID user tidak valid.');
        setIsLoading(false);
        return;
      }
      console.log('Kirim absen hadir dengan:', { employee_id, branch_id, date, clock_in });
      // Kirim POST ke absents
      const res = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          employee_id,
          branch_id,
          date,
          clock_in,
          status: 'Present',
          description: 'Regular Absent'
        })
      });
      const data = await res.json();
      if (data.success && data.statusCode === 200) {
        // Sukses absen hadir
        // Set session storage untuk tracking alur login
        sessionStorage.setItem('fromPresent', 'true');
        // Simpan waktu mulai kerja
        localStorage.setItem("workStartTime", new Date().toISOString());
        localStorage.setItem("currentAbsentId", data.data.id);
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

  // Ambil employeeId dari localStorage saat mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setEmployeeId(user.id);
        console.log('employeeId didapat:', user.id);
      } else {
        setError('Data user tidak ditemukan. Silakan login ulang.');
        setIsAlreadyAbsent(true);
        console.log('userData tidak ditemukan di localStorage');
      }
    } catch (e) {
      setError('Gagal membaca data user.');
      setIsAlreadyAbsent(true);
      console.log('Error parsing userData:', e);
    }
  }, []);

  // Cek absen hanya jika employeeId sudah ada
  /*
  useEffect(() => {
    console.log('useEffect cek absen jalan, employeeId:', employeeId);
    if (!employeeId) return;
    const checkAbsen = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://api.katsikat.id/check-today?employee_id=${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        console.log('Hasil API check-today:', data);
        if (data.data && data.data.isTodayAbsent) {
          setError("Anda sudah absen hari ini.");
          setIsAlreadyAbsent(true);
        } else {
          setIsAlreadyAbsent(false);
        }
      } catch (err) {
        setError("Gagal cek status absen.");
        console.log('Error fetch check-today:', err);
      } finally {
        setIsLoading(false);
      }
    };
    checkAbsen();
  }, [employeeId]);
  */

  // Handle submit izin
  const handleSubmitIzin = async () => {
    if (!kategoriIzin) {
      setError("Mohon pilih kategori izin");
      return;
    }
    if (kategoriIzin !== "keperluan_pribadi" && !alasanIzin.trim()) {
      setError("Mohon isi alasan izin/libur");
      return;
    }
    if (!employeeId) {
      setError('Data user tidak ditemukan. Silakan login ulang.');
      return;
    }
    setIsLoading(true);
    setError("");

    // Ambil waktu sekarang
    const now = new Date();
    const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const clock_in = now.toTimeString().slice(0, 8); // HH:mm:ss

    // Mapping status
    let status = "";
    if (kategoriIzin === "sakit") status = "Sick";
    else if (kategoriIzin === "libur_bersama") status = "Libur Bersama";
    else if (kategoriIzin === "keperluan_pribadi") status = "Keperluan Pribadi";

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://api.katsikat.id/permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          date,
          description: alasanIzin,
          clock_in,
          employee_id: employeeId
        })
      });
      const data = await res.json();
      if (data.success && data.statusCode === 200) {
        navigate("/izin-success");
      } else {
        setError("Gagal menyimpan data izin.");
      }
    } catch (err) {
      setError("Gagal mengirim data izin.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle modal close dengan animasi
  const handleCloseModal = () => {
    setShowModalContent(false);
    setTimeout(() => {
      setShowIzinModal(false);
    }, 300);
  };

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
            onClick={() => setShowIzinModal(true)}
            className="font-semibold w-full py-3 px-4 rounded-xl text-sm"
            variant="grey"
            disabled={isAlreadyAbsent || isLoading}
          >
          Form Lembur
          </AnimatedButton>
          <AnimatedButton
            onClick={() => { console.log('onClick AnimatedButton'); handleHadir(); }}
            className="font-semibold w-full py-3 px-4 rounded-xl text-sm"
            variant="red"
            disabled={isAlreadyAbsent || isLoading}
          >
            Saya Hadir
          </AnimatedButton>
        </div>

        {/* Modal */}
        {showIzinModal && (
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center p-4 z-50
              ${showModalContent ? "bg-opacity-60" : "bg-opacity-0"}`}
          >
            <div
              className={`bg-[#F8FCFF] rounded-3xl p-6 w-full max-w-[320px] mx-4 sm:mx-auto transform transition-all duration-300
                ${
                  showModalContent
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-full scale-150"
                }`}
            >
              <h2 className="font-bebas text-2xl mb-4 text-center">
              ALASAN LEMBUR
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <select
                  value={kategoriIzin}
                  onChange={(e) => setKategoriIzin(e.target.value)}
                  className="w-full h-[50px] p-3 bg-[#F8FCFF] text-gray-600 font-montserrat rounded-xl text-sm outline outline-2 outline-[#EEF1F7]"
                >
                  <option value="">Pilih Kategori Lembur</option>
                  {kategoriOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Jika kategori izin adalah keperluan pribadi, maka tidak perlu isi alasan */}
              {kategoriIzin !== "keperluan_pribadi" && (
                <div>
                  <textarea
                    value={alasanIzin}
                    onChange={(e) => setAlasanIzin(e.target.value)}
                    // jka kategori izin adalah libur bersama, maka placeholder menjadi "Berikan alasan libur bersama..."
                    // jka kategori izin adalah sakit, maka placeholder menjadi "Berikan alasan sakit..." atau "Berikan alasan sakit..."
                    // jka kategori izin adalah keperluan pribadi, maka placeholder menjadi "Berikan alasan keperluan pribadi..."
                    placeholder={
                      kategoriIzin === "libur_bersama"
                        ? "Jelaskan kegiatan libur bersama..."
                        : kategoriIzin === "sakit"
                        ? "Jelaskan sakit apa yang anda alami..."
                        : "Pilih alasan izin diatas!"
                    }
                    className="w-full h-24 p-3 rounded-2xl mb-4 font-montserrat resize-none bg-[#F8FCFF] outline outline-2 outline-[#EEF1F7] placeholder: text-sm"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <AnimatedButton
                  onClick={handleCloseModal}
                  className="flex-1 py-3 px-4 rounded-xl text-sm hover:bg-gray-200 transition-colors font-semibold"
                  variant="grey"
                  disabled={isLoading}
                >
                  Batal
                </AnimatedButton>
                <AnimatedButton
                  onClick={handleSubmitIzin}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold"
                  variant="red"
                  disabled={isLoading}
                >
                  {isLoading ? "Mengirim..." : "Kirim"}
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Absensi;
