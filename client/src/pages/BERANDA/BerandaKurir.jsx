import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Com Header/Header";
import WorkTimeAlert from "../../components/WorkTimeAlert";
import BreakTimeAlert from "../../components/BreakTimeAlert";
import AnimatedButton from "../../components/Design/AnimatedButton";
import { getKurirAntrianData } from "../../services/kurirService";

const BerandaKurir = () => {
  const navigate = useNavigate();
  const [selectedEstimasi, setSelectedEstimasi] = useState("pickup");
  const [antrianData, setAntrianData] = useState(null);
  const [antrianTransport, setAntrianTransport] = useState([]);
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
  const [isFromIzin, setIsFromIzin] = useState(false);
  const [isFromPresent, setIsFromPresent] = useState(false);
  const [countRegular, setCountRegular] = useState(0);
  const [countSameDay, setCountSameDay] = useState(0);
  const [countNextDay, setCountNextDay] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk memformat tanggal ke format database (YYYY-MM-DD)
  const formatDateForDB = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Handle perubahan input tanggal
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
  };

  useEffect(() => {
    const fetchAntrianData = async () => {
      setLoading(true);
      try {
        const data = await getKurirAntrianData(dateRange);
        
        console.log('Beranda Kurir - Raw data:', data);
        console.log('Beranda Kurir - Data delivery_status counts:', {
          scheduled: data.filter(item => item.delivery_status === 'scheduled').length,
          ongoing: data.filter(item => item.delivery_status === 'ongoing').length,
          completed: data.filter(item => item.delivery_status === 'completed').length,
          pending: data.filter(item => item.delivery_status === 'pending').length
        });
        console.log('Beranda Kurir - Data pickup_method counts:', {
          pickup: data.filter(item => item.pickup_method === 'pickup').length,
          delivery: data.filter(item => item.pickup_method === 'delivery').length
        });
        
        // Hitung jumlah antrian pickup dan delivery dari data API
        const pickup = data.filter((item) => item.pickup_method === "pickup").length;
        const delivery = data.filter((item) => item.pickup_method === "delivery").length;
        
        console.log('Beranda Kurir - Final counts:', { pickup, delivery });
        console.log('Beranda Kurir - Verification:', {
          totalData: data.length,
          scheduledData: data.filter(item => item.delivery_status === 'scheduled').length,
          pickupMethodPickup: data.filter(item => item.pickup_method === 'pickup').length,
          pickupMethodDelivery: data.filter(item => item.pickup_method === 'delivery').length,
          scheduledAndPickup: data.filter(item => item.delivery_status === 'scheduled' && item.pickup_method === 'pickup').length,
          scheduledAndDelivery: data.filter(item => item.delivery_status === 'scheduled' && item.pickup_method === 'delivery').length,
          calculatedPickup: pickup,
          calculatedDelivery: delivery
        });
        
        setAntrianData({ pickup, delivery });
      } catch (error) {
        console.error('Error fetching antrian data:', error);
        if (error.response?.status === 401) {
          console.error('Token tidak valid atau expired');
          navigate('/login');
        }
        setAntrianData({ pickup: 0, delivery: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchAntrianData();
    
    // Cek izin dan present seperti sebelumnya
    const fromIzin = sessionStorage.getItem("fromIzin");
    if (fromIzin === "true") setIsFromIzin(true);
    const fromPresent = sessionStorage.getItem("fromPresent");
    if (fromPresent === "true") setIsFromPresent(true);
  }, [dateRange]);

  // Filter antrian berdasarkan tipe
  const filterTransport = async (type) => {
    setSelectedEstimasi(type);
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
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-white font-montserrat">
      <Header />
      <main className="flex-1 overflow-y-auto pb-10">
        <div className="mx-auto px-4 md:px-10 pt-10 pb-6">
          <div className="max-w-[390px] md:max-w-none mx-auto mt-[50px]">
            <WorkTimeAlert />
            <BreakTimeAlert />

            {/* Date Range Picker */}
            <div className="mb-2 bg-white rounded-3xl p-4 mt-4 opacity-100 outline outline-2 outline-[#EEF1F7]">
              <h2 className="text-2xl font-bebas mb-3">Rentang Waktu</h2>

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

              <div className="grid grid-cols-2 gap-4 font-montserrat">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Dari Tanggal
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
                    Sampai Tanggal
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

            {/* Detail Antrian Card */}
            <div className="mb-2 bg-white rounded-3xl p-4 mt-4 opacity-100 outline outline-2 outline-[#EEF1F7]">
              <h2 className="text-2xl font-bebas mb-2">
                Antrian antar & jemput
              </h2>

              <div className="grid grid-cols-2 gap-2 font-['Montserrat']">
                <AnimatedButton
                  className={`${
                    selectedEstimasi === "pickup"
                      ? "bg-[#65B7FF] text-white"
                      : "bg-[#E6EFF9] text-[#909FB1]"
                  } p-4 rounded-2xl cursor-pointer hover:bg-opacity-90 transition-all`}
                  onClick={() => filterTransport("pickup")}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <h3
                      className={
                        selectedEstimasi === "pickup"
                          ? "text-white"
                          : "text-gray-600"
                      }
                    >
                      Pick Up
                    </h3>
                  </div>
                  <p className="text-3xl font-bold">
                    {loading ? "..." : antrianData?.pickup || 0}
                  </p>
                </AnimatedButton>
                <AnimatedButton
                  className={`${
                    selectedEstimasi === "delivery"
                      ? "bg-[#65B7FF] text-white"
                      : "bg-[#E6EFF9] text-[#909FB1]"
                  } p-4 rounded-2xl cursor-pointer hover:bg-opacity-90 transition-all`}
                  onClick={() => filterTransport("delivery")}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <h3
                      className={
                        selectedEstimasi === "delivery"
                          ? "text-white"
                          : "text-gray-600"
                      }
                    >
                      Delivery
                    </h3>
                  </div>
                  <p className="text-3xl font-bold">
                    {loading ? "..." : antrianData?.delivery || 0}
                  </p>
                </AnimatedButton>
              </div>
              {/* Total Antrian ala kasir */}
              <div className="mt-4 text-center outline outline-2 outline-[#EEF1F7] rounded-3xl p-2 mb-4">
                <p className="text-sm text-gray-600">
                  Total Antrian:{" "}
                  {loading ? "..." : antrianData ? antrianData.pickup + antrianData.delivery : 0}
                </p>
              </div>

              {/* Button Buka Antrian */}
              <AnimatedButton
                onClick={() => navigate(`/kurir/${selectedEstimasi}`, { state: { dateRange } })}
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
    </div>
  );
};

export default BerandaKurir;
