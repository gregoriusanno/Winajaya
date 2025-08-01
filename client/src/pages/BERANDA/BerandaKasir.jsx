import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Com Header/Header";
import WorkTimeAlert from "../../components/WorkTimeAlert";
import BreakTimeAlert from "../../components/BreakTimeAlert";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import AnimatedButton from "../../components/Design/AnimatedButton";

const BerandaKasir = () => {
  const navigate = useNavigate();
  const [selectedEstimasi, setSelectedEstimasi] = useState("regular");
  const [antrianData, setAntrianData] = useState({
    regular: 0,
    same_day: 0,
    next_day: 0,
  });
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
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSwitchRoleModal, setShowSwitchRoleModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [isFromIzin, setIsFromIzin] = useState(false);
  const [isFromPresent, setIsFromPresent] = useState(false);

  // Fungsi untuk memformat tanggal ke format database (YYYY-MM-DD)
  const formatDateForDB = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Fungsi untuk mengambil data antrian dari API dan menghitung jumlahnya
  const fetchAntrianCounts = async (range) => {
    try {
      const params = {
        search: "",
        startDate: formatDateForDB(range.startDate),
        endDate: formatDateForDB(range.endDate),
        pageSize: 1000, // Ambil semua data untuk perhitungan
        page: 1,
      };

      const response = await axios.get(`https://api.katsikat.id/orders`, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.data && response.data.data.orders) {
        const rawOrders = response.data.data.orders;
        const ordersArray = Array.isArray(rawOrders) ? rawOrders : [];
        setFetchedOrders(ordersArray);
        console.log("Fetched orders:", ordersArray);

      } else {
        setFetchedOrders([]);
        setAntrianData({ regular: 0, same_day: 0, next_day: 0 });
      }
    } catch (error) {
      console.error("Error fetching cashier orders:", error);
      if (error.response?.status === 401) {
        console.error("Token tidak valid atau expired");
        navigate("/login");
      }
      setFetchedOrders([]);
      setAntrianData({ regular: 0, same_day: 0, next_day: 0 });
    }
  };

  // Handle perubahan input tanggal
  const handleDateInputChange = async (e) => {
    const { name, value } = e.target;
    const formattedValue = formatDateForDB(value);

    const newRange = {
      ...dateRange,
      [name]: formattedValue,
    };

    if (name === "startDate" && formattedValue > dateRange.endDate) {
      newRange.endDate = formattedValue;
    } else if (name === "endDate" && formattedValue < dateRange.startDate) {
      newRange.startDate = formattedValue;
    }

    setDateRange(newRange);
    localStorage.setItem("dateRange", JSON.stringify(newRange));
    fetchAntrianCounts(newRange); // Panggil fetchAntrianCounts saat tanggal berubah
  };

  useEffect(() => {
    // Panggil fetchAntrianCounts saat komponen pertama kali dimuat atau dateRange berubah
    fetchAntrianCounts(dateRange);

    // Cek izin dan present seperti sebelumnya
    const fromIzin = sessionStorage.getItem("fromIzin");
    if (fromIzin === "true") setIsFromIzin(true);
    const fromPresent = sessionStorage.getItem("fromPresent");
    if (fromPresent === "true") setIsFromPresent(true);
  }, [dateRange]); // Tambahkan dateRange sebagai dependency

  // New useEffect to process fetchedOrders and update counts
  useEffect(() => {
    if (fetchedOrders.length > 0) {
      const allTreatments = fetchedOrders.flatMap((order) => {
        const orderDetails = Array.isArray(order?.order_details)
          ? order.order_details
          : [];
        return orderDetails.map((detail) => ({ ...detail, order: order }));
      });

      // Filter for "pengeringan" or "siap" status
      const relevantTreatments = allTreatments.filter(
        (item) => item.status === "pengeringan" || item.status === "siap"
      );

      // Hitung jumlah antrian berdasarkan process_time dari data yang relevan
      const regular = relevantTreatments.filter(
        (item) => item.process_time?.toLowerCase() === "regular"
      ).length;
      const same_day = relevantTreatments.filter(
        (item) => item.process_time?.toLowerCase() === "same_day"
      ).length;
      const next_day = relevantTreatments.filter(
        (item) => item.process_time?.toLowerCase() === "next_day"
      ).length;

      setAntrianData({ regular, same_day, next_day });
    } else {
      setAntrianData({ regular: 0, same_day: 0, next_day: 0 });
    }
  }, [fetchedOrders]); // Depend on fetchedOrders to re-calculate counts

  const handleLogoutConfirm = () => {
    // Implementasi log out
  };

  const handleSwitchRoleConfirm = () => {
    // Implementasi switch role
  };

  const handleOpenQueue = () => {
    console.log("handleOpenQueue called. Current selectedEstimasi:", selectedEstimasi);
    // Gunakan selectedEstimasi sebagai format estimasi untuk navigasi
    const estimasiFormat = selectedEstimasi;

    navigate(`/berandakasir/antriankasir/${estimasiFormat}`, {
      state: {
        dateRange,
        estimasi: selectedEstimasi,
      },
    });
  };

  // Tambahkan fungsi untuk handle quick date selection
  const handleQuickDateSelect = (type) => {
    const today = new Date();
    let newStartDate, newEndDate;

    switch (type) {
      case "today":
        newStartDate = new Date(today);
        newEndDate = new Date(today);
        break;
      case "yesterday":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 1);
        newEndDate = new Date(newStartDate);
        break;
      case "tomorrow":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() + 1);
        newEndDate = new Date(newStartDate);
        break;
      default:
        return;
    }

    const formattedStartDate = formatDateForDB(newStartDate);
    const formattedEndDate = formatDateForDB(newEndDate);

    const newRange = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    setDateRange(newRange);
    localStorage.setItem("dateRange", JSON.stringify(newRange));
  };

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden font-montserrat">
      <Header
        title="CASHIER DASHBOARD"
        showLogoutButton={true}
        onLogoutClick={() => setShowLogoutModal(true)}
        showSwitchRole={true}
        onSwitchRoleClick={() => setShowSwitchRoleModal(true)}
        currentTime={currentTime}
      />

      {/* Main Content dengan overflow scroll */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto px-4 md:px-10 pt-10 pb-6">
          <div className="max-w-[390px] md:max-w-none mx-auto mt-[50px]">
            <WorkTimeAlert />
            <BreakTimeAlert />

            {/* Date Range Card */}
            <div className="mb-2 rounded-3xl p-4 outline outline-2 outline-[#EEF1F7]">
              <h2 className="text-2xl font-bebas mb-2">Rentang waktu</h2>

              {/* Quick Date Selection Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <AnimatedButton
                  onClick={() => handleQuickDateSelect("yesterday")}
                  className="h-[35px] rounded-xl flex items-center justify-center text-sm font-semibold bg-[#E6EFF9] text-[#2E7CF6] hover:bg-[#65B7FF] hover:text-white transition-all"
                >
                  Kemarin
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => handleQuickDateSelect("today")}
                  className="h-[35px] rounded-xl flex items-center justify-center text-sm font-semibold bg-[#E6EFF9] text-[#2E7CF6] hover:bg-[#65B7FF] hover:text-white transition-all"
                >
                  Hari Ini
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => handleQuickDateSelect("tomorrow")}
                  className="h-[35px] rounded-xl flex items-center justify-center text-sm font-semibold bg-[#E6EFF9] text-[#2E7CF6] hover:bg-[#65B7FF] hover:text-white transition-all"
                >
                  Besok
                </AnimatedButton>
              </div>

              {/* Existing Date Range Inputs */}
              <div className="grid grid-cols-2 gap-4 font-montserrat">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Dari tanggal
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={handleDateInputChange}
                    max={dateRange.endDate}
                    className="bg-[#E6EFF9] text-gray-600 shadow shadow-white opacity-100 outline outline-1 outline-white w-full p-2 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Sampai tanggal
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateInputChange}
                    min={dateRange.startDate}
                    className="bg-[#E6EFF9] text-gray-600 shadow shadow-white opacity-100 outline outline-1 outline-white w-full p-2 rounded-xl font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Quality Check Queue Details Card */}
            <div className="mb-2 rounded-3xl p-4 mt-4 outline outline-2 outline-[#EEF1F7]">
              <h2 className="text-2xl font-bebas mb-2">
                Antrean Pemeriksaan Kualitas
              </h2>
              <div className="grid grid-cols-3 gap-2 font-['Montserrat']">
                <AnimatedButton
                  className={`${
                    selectedEstimasi === "regular"
                      ? "bg-[#65B7FF] text-white"
                      : "bg-[#E6EFF9] text-[#909FB1]"
                  } p-4 rounded-2xl cursor-pointer hover:bg-opacity-90 transition-all`}
                  onClick={() => setSelectedEstimasi("regular")}
                >
                  <h3
                    className={
                      selectedEstimasi === "regular"
                        ? "text-white"
                        : "text-gray-600"
                    }
                  >
                    Regular
                  </h3>
                  <p className="text-3xl font-bold">
                    {antrianData ? antrianData.regular : 0}
                  </p>
                </AnimatedButton>

                <AnimatedButton
                  className={`${
                    selectedEstimasi === "same_day"
                      ? "bg-[#65B7FF] text-white"
                      : "bg-[#E6EFF9] text-[#909FB1]"
                  } p-4 rounded-2xl cursor-pointer hover:bg-opacity-90 transition-all`}
                  onClick={() => setSelectedEstimasi("same_day")}
                >
                  <h3
                    className={
                      selectedEstimasi === "same_day"
                        ? "text-white"
                        : "text-gray-600"
                    }
                  >
                    Same Day
                  </h3>
                  <p className="text-3xl font-bold">
                    {antrianData ? antrianData.same_day : 0}
                  </p>
                </AnimatedButton>

                <AnimatedButton
                  className={`${
                    selectedEstimasi === "next_day"
                      ? "bg-[#65B7FF] text-white"
                      : "bg-[#E6EFF9] text-[#909FB1]"
                  } p-4 rounded-2xl cursor-pointer hover:bg-opacity-90 transition-all`}
                  onClick={() => setSelectedEstimasi("next_day")}
                >
                  <h3
                    className={
                      selectedEstimasi === "next_day"
                        ? "text-white"
                        : "text-gray-600"
                    }
                  >
                    Next Day
                  </h3>
                  <p className="text-3xl font-bold">
                    {antrianData ? antrianData.next_day : 0}
                  </p>
                </AnimatedButton>
              </div>

              {/* Tambahkan total antrian */}
              <div className="mt-4 text-center outline outline-2 outline-[#EEF1F7] rounded-3xl p-2">
                <p className="text-sm text-gray-600">
                  Total Antrian:{" "}
                  {antrianData
                    ? antrianData.regular +
                      antrianData.same_day +
                      antrianData.next_day
                    : 0}
                </p>
              </div>

              {/* Open Queue Button */}
              <AnimatedButton
                onClick={handleOpenQueue}
                variant={
                  isFromIzin ? "disabled" : isFromPresent ? "blue" : "default"
                }
                className="w-full h-[35px] mt-4 py-3 flex items-center justify-center"
                disabled={isFromIzin}
              >
                {isFromIzin ? "Anda sedang izin" : "Buka Antrian"}
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

      <ConfirmationModal
        isOpen={showSwitchRoleModal}
        onClose={() => setShowSwitchRoleModal(false)}
        onConfirm={handleSwitchRoleConfirm}
        title="Switch Role Confirmation"
        message="Are you sure you want to switch to courier page?"
      />
    </div>
  );
};

export default BerandaKasir;
