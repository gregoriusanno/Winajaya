import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import Header from "../../components/Com Header/Header";
import WorkTimeAlert from "../../components/WorkTimeAlert";
import BreakTimeAlert from "../../components/BreakTimeAlert";
import AnimatedButton from "../../components/Design/AnimatedButton";
import workImage from "../../assets/images/work.png";

// Konfigurasi axios interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Accept"] = "application/json";
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const BerandaTeknisi = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedEstimasi, setSelectedEstimasi] = useState("regular");
  const [antrianData, setAntrianData] = useState(null);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [antrianTreatment, setAntrianTreatment] = useState([]);
  const [dateRange, setDateRange] = useState(() => {
    const savedRange = localStorage.getItem("dateRange");
    if (savedRange) {
      return JSON.parse(savedRange);
    }
    const today = new Date().toISOString().split("T")[0];
    return {
      startDate: today,
      endDate: today,
    };
  });
  const [tempDateRange, setTempDateRange] = useState(() => {
    const savedRange = localStorage.getItem("dateRange");
    if (savedRange) {
      return JSON.parse(savedRange);
    }
    const today = new Date().toISOString().split("T")[0];
    return {
      startDate: today,
      endDate: today,
    };
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSwitchRoleModal, setShowSwitchRoleModal] = useState(false);
  const [showOvertimeWarning, setShowOvertimeWarning] = useState(false);
  const [canTakeOvertime, setCanTakeOvertime] = useState(false);
  const [workDuration, setWorkDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showBreakWarning, setShowBreakWarning] = useState(false);
  const [showReturnWarning, setShowReturnWarning] = useState(false);
  const [breakCountdown, setBreakCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [returnCountdown, setReturnCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentTime, setCurrentTime] = useState("");
  const [isFromIzin, setIsFromIzin] = useState(false);
  const [isFromPresent, setIsFromPresent] = useState(false);
  const [countRegular, setCountRegular] = useState(0);
  const [countSameDay, setCountSameDay] = useState(0);
  const [countNextDay, setCountNextDay] = useState(0);

  // Fungsi untuk mendapatkan waktu WIB
  const getJakartaTime = () => {
    const date = new Date();
    return new Date(date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  };

  // Fungsi untuk mengecek waktu istirahat
  const checkBreakTime = () => {
    const jakartaTime = getJakartaTime();

    // Hanya log saat pertama kali komponen dimount atau saat debug
    // console.log('Current Jakarta time:', format(jakartaTime, 'HH:mm:ss'));

    // Set target times
    const breakTime = setHours(setMinutes(setSeconds(jakartaTime, 0), 0), 12); // 12:00:00
    const warningTime = setHours(
      setMinutes(setSeconds(jakartaTime, 0), 45),
      11
    ); // 11:45:00
    const returnTime = setHours(setMinutes(setSeconds(jakartaTime, 0), 0), 13); // 13:00:00

    // Hitung countdown ke waktu istirahat
    if (jakartaTime < breakTime) {
      const diff = breakTime.getTime() - jakartaTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setBreakCountdown({ hours, minutes, seconds });
    }

    // Hitung countdown ke waktu kembali
    if (jakartaTime >= breakTime && jakartaTime < returnTime) {
      const diff = returnTime.getTime() - jakartaTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setReturnCountdown({ hours, minutes, seconds });
    }

    // Tampilkan peringatan 15 menit sebelum istirahat
    if (jakartaTime >= warningTime && jakartaTime < breakTime) {
      setShowBreakWarning(true);
      setShowReturnWarning(false);
      // console.log('Break warning shown');
    }
    // Tampilkan peringatan selama waktu istirahat
    else if (jakartaTime >= breakTime && jakartaTime < returnTime) {
      setShowBreakWarning(false);
      setShowReturnWarning(true);
      // console.log('Return warning shown');
    }
    // Sembunyikan semua peringatan
    else {
      setShowBreakWarning(false);
      setShowReturnWarning(false);
    }
  };

  // Jalankan pengecekan waktu istirahat setiap detik
  useEffect(() => {
    checkBreakTime();
    const interval = setInterval(checkBreakTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk memformat tanggal ke format database (YYYY-MM-DD)
  const formatDateForDB = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Fungsi untuk memfilter data berdasarkan rentang tanggal
  const filterByDateRange = (data) => {
    return data.filter((item) => {
      const dueDate = new Date(item.due_date).toISOString().split("T")[0];
      const startDate = formatDateForDB(dateRange.startDate);
      const endDate = formatDateForDB(dateRange.endDate);

      return dueDate >= startDate && dueDate <= endDate;
    });
  };

  // Handle perubahan input tanggal dengan auto-refresh
  const handleDateInputChange = async (e) => {
    const { name, value } = e.target;
    const formattedValue = formatDateForDB(value);

    const newRange = {
      ...dateRange,
      [name]: formattedValue,
    };

    // Validasi rentang
    if (name === "startDate" && formattedValue > dateRange.endDate) {
      newRange.endDate = formattedValue;
    } else if (name === "endDate" && formattedValue < dateRange.startDate) {
      newRange.startDate = formattedValue;
    }

    setDateRange(newRange);
    localStorage.setItem("dateRange", JSON.stringify(newRange));
    fetchAntrianData(newRange);
  };

  // Update fetchAntrianData untuk menggunakan axios dengan interceptor
  const fetchAntrianData = async (range = dateRange) => {
    try {
      // const params = {
      //   search: "",
      //   startDate: formatDateForDB(range.startDate),
      //   endDate: formatDateForDB(range.endDate),
      //   pageSize: 1000, // Ambil semua data untuk perhitungan
      //   page: 1, // Halaman pertama
      // };
      // const response = await axios.get(`https://api.katsikat.id/orders`, {
      //   params,
      // });
      // // Log untuk debugging
      // console.log("Token:", localStorage.getItem("token"));
      // console.log("Request Headers:", response.config.headers);
      // console.log("Response:", response.data);
      // if (response.data && response.data.data && response.data.data.orders) {
      //   // Ensure response.data.data.orders is always an array
      //   const rawOrders = response.data.data.orders;
      //   const ordersArray = Array.isArray(rawOrders) ? rawOrders : [];
      //   setAntrianData({
      //     total: ordersArray.length,
      //   });
      //   setFetchedOrders(ordersArray); // Set raw fetched orders here
      // } else {
      //   setFetchedOrders([]); // Clear fetchedOrders
      //   setAntrianTreatment([]);
      //   setCountRegular(0);
      //   setCountSameDay(0);
      //   setCountNextDay(0);
      //   setAntrianData({ total: 0 });
      // }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        console.error("Token tidak valid atau expired");
        // Redirect ke login jika token expired
        navigate("/login");
      }
      setFetchedOrders([]);
      setAntrianTreatment([]);
      setCountRegular(0);
      setCountSameDay(0);
      setCountNextDay(0);
      setAntrianData({ total: 0 });
    }
  };

  useEffect(() => {
    console.log("Page reloaded");
  }, []);

  useEffect(() => {
    // Cek izin dan present seperti sebelumnya
    const fromIzin = sessionStorage.getItem("fromIzin");
    if (fromIzin === "true") setIsFromIzin(true);
    const fromPresent = sessionStorage.getItem("fromPresent");
    if (fromPresent === "true") setIsFromPresent(true);
  }, []);

  useEffect(() => {
    console.log("fetchedOrders at useEffect start:", fetchedOrders);
    // Flatten order_details to get all individual treatments with order info
    const allTreatments = fetchedOrders
      .filter((order) => order && typeof order === "object") // Pastikan tidak ada order null/undefined atau non-objek
      .flatMap((order) => {
        // Pastikan orderDetails adalah array, default ke array kosong jika order.order_details undefined atau bukan array
        const orderDetails = Array.isArray(order?.order_details)
          ? order.order_details
          : [];

        // Sekarang filter keluar setiap detail null/undefined atau non-objek dari array yang valid
        const filteredDetails = orderDetails.filter(
          (detail) => detail && typeof detail === "object"
        );

        return filteredDetails.map((detail) => ({ ...detail, order: order }));
      });
    console.log("All treatments (flattened) in BerandaTeknisi:", allTreatments);

    // Filter for "not_yet" status for counts and display
    const allNotYetTreatments = allTreatments.filter(
      (item) => item.status === "not_yet"
    );
    console.log(
      "All 'not_yet' treatments in BerandaTeknisi:",
      allNotYetTreatments
    );

    // Calculate total counts for each estimasi from not_yet treatments
    const regularCount = allNotYetTreatments.filter(
      (item) => item.process_time?.toLowerCase() === "regular"
    ).length;
    const sameDayCount = allNotYetTreatments.filter(
      (item) => item.process_time?.toLowerCase() === "same_day"
    ).length;
    const nextDayCount = allNotYetTreatments.filter(
      (item) => item.process_time?.toLowerCase() === "next_day"
    ).length;

    setCountRegular(regularCount);
    setCountSameDay(sameDayCount);
    setCountNextDay(nextDayCount);

    console.log(
      "Counts - Regular:",
      regularCount,
      "Same Day:",
      sameDayCount,
      "Next Day:",
      nextDayCount
    );

    // Filter data for display based on selected estimasi
    const processTimeMap = {
      regular: "regular",
      sameDay: "same_day",
      nextDay: "next_day",
    };
    const currentProcessTime = processTimeMap[selectedEstimasi];

    const filteredForDisplay = allNotYetTreatments.filter(
      (item) => item.process_time?.toLowerCase() === currentProcessTime
    );
    setAntrianTreatment(filteredForDisplay); // Set the filtered data to antrianTreatment
  }, [fetchedOrders, selectedEstimasi]);

  // Debug state changes
  useEffect(() => {
    console.log("Current antrianData:", antrianData);
  }, [antrianData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Tambahkan useEffect untuk memantau perubahan dateRange
  useEffect(() => {
    fetchAntrianData(dateRange);
  }, [dateRange]);

  // Tambahkan useEffect untuk mengambil data user
  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
      console.log("User data loaded:", parsedUserData);
    }
  }, []);

  const handleLogoutConfirm = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    navigate("/absenakhir");
    setShowLogoutModal(false);
  };

  const handleSwitchRoleConfirm = () => {
    navigate("/kurir/transport");
    setShowSwitchRoleModal(false);
  };

  // Tambahkan fungsi untuk update waktu
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("id-ID", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    });
    setCurrentTime(timeString);
  };

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-white font-montserrat">
      {/* <Header /> */}

      {/* Main Content dengan overflow scroll */}
      <main className="flex-1 overflow-y-auto pb-10">
        <div className="mx-auto px-4 md:px-10 pt-10 pb-6">
          <div className="max-w-[390px] md:max-w-none mx-auto mt-[50px]">
            <WorkTimeAlert />

            {/* Detail Antrian Card dengan Button Buka Antrian */}
            <div className="mb-2 bg-white rounded-3xl p-4 mt-4 opacity-100 outline outline-2 outline-[#EEF1F7]">
              <h2 className="text-2xl font-bebas mb-2">
                Anda Sedang Dalam Jam Kerja!
              </h2>

              <div className="flex justify-center mb-6">
                <img src={workImage} alt="Work" className="w-32 h-32" />
              </div>

              <AnimatedButton
                type="submit"
                onClick={handleLogoutConfirm}
                className="w-full h-[40px] py-3 sm:py-3.5 px-4 mt-2 bg-gradient-to-r from-[#ffe2e5] to-[#ff5568] text-white rounded-xl opacity-100 font-montserrat font-semibold flex items-center justify-center text-sm"
              >
                KELUAR/LOGOUT
              </AnimatedButton>
            </div>
          </div>
        </div>
      </main>

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout Confirmation"
        message="Are you sure you want to logout? Logging out is recommended when work hours are finished."
      />
    </div>
  );
};

export default BerandaTeknisi;
