import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";
import AntrianHeader from "../../components/Header Antrian/AntrianHeader";
import LoadingDots from "../../components/Design/LoadingDots";
import AnimatedButton from "../../components/Design/AnimatedButton";
import FilterAndSearch from "../../components/Header Antrian/FilterAndSearch";
import QualityCheckModal from "../../components/Modal/QualityCheckModal";

const AntrianKasir = () => {
  const { estimasi } = useParams();
  const location = useLocation();
  const { dateRange } = location.state || {};
  const navigate = useNavigate();

  const [antrianData, setAntrianData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("cleaning");
  const [cleaningCount, setCleaningCount] = useState(0);
  const [repairCount, setRepairCount] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filteredAntrian, setFilteredAntrian] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showQCModal, setShowQCModal] = useState(false);
  const [selectedQCType, setSelectedQCType] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [notifModal, setNotifModal] = useState({ open: false, message: "" });

  // Fungsi untuk memformat tanggal ke format database (YYYY-MM-DD)
  const formatDateForDB = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Definisi kategori Cleaning dan Repair
  const isCleaning = (typeService) =>
    [
      "Deep Clean",
      "Outside Clean",
      "3 Deep Package",
      "Deep Clean Extra",
      "Garansi cuci",
      "Medium Koper",
      "2 Deep Clean 50rb",
    ].includes(typeService);
  const isRepair = (typeService) =>
    [
      "Reglue Minor (<10%)",
      "Reglue (15%-25%)",
      "Reglue (25%-50%)",
      "Reglue (50%-75%)",
      "Reglue (75%-100%)",
      "Reglue (Extra)",
      "Repaint Upper & Deep Clean",
      "Repaint Upper Leather",
      "Un-Yellowing",
      "Reglue (100%)",
      "Repaint Upper Canvas High Top",
      "Repaint",
      "Insole Repair",
      "Repaint Midsole",
      "Repaint Upper Special",
      "Repair Leather",
      "Outsole Repair 130",
      "Claim Garansi Reglue",
      "Full Reglue",
      "Repaint canvas low",
    ].includes(typeService);

  // Fungsi untuk mengambil data antrian dari API
  const fetchAntrianData = async () => {
    try {
      const formattedStartDate = formatDateForDB(dateRange.startDate);
      const formattedEndDate = formatDateForDB(dateRange.endDate);

      const params = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        pageSize: 1000, // Ambil semua data untuk perhitungan
        page: 1, // Halaman pertama
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

        // Flatten order_details into a single array of treatments
        const allTreatments = ordersArray.flatMap((order) => {
          const orderDetails = Array.isArray(order?.order_details)
            ? order.order_details
            : [];
          return orderDetails.map((detail) => ({ ...detail, order: order }));
        });

        // Filter for "pengeringan" or "siap" status and selected estimasi
        const processTimeMap = {
          regular: "regular",
          same_day: "same_day", // Perhatikan ini, harus sama dengan yang di BerandaKasir
          next_day: "next_day",
        };
        const currentProcessTime = processTimeMap[estimasi];

        const filteredByStatusAndEstimasi = allTreatments.filter(
          (item) =>
            (item.status === "pengeringan" || item.status === "siap") &&
            item.process_time?.toLowerCase() === currentProcessTime
        );

        setAntrianData(filteredByStatusAndEstimasi); // Data dasar untuk filter cleaning/repair
      } else {
        setAntrianData([]);
      }
    } catch (error) {
      console.error("Error fetching cashier orders:", error);
      if (error.response?.status === 401) {
        console.error("Token tidak valid atau expired");
        navigate("/login");
      }
      setAntrianData([]);
    }
  };

  // Effect untuk memanggil fetchAntrianData
  useEffect(() => {
    if (dateRange && dateRange.startDate && dateRange.endDate && estimasi) {
      fetchAntrianData();
    }
  }, [dateRange, estimasi, searchQuery]); // Tambahkan dependencies

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter data berdasarkan pencarian dan selectedFilter (cleaning/repair)
  useEffect(() => {
    let currentFiltered = antrianData; // Start with data already filtered by status and estimasi

    if (debouncedSearch.trim() !== "") {
      const searchLower = debouncedSearch.toLowerCase();
      currentFiltered = currentFiltered.filter(
        (item) =>
          item.order?.customer?.name?.toLowerCase().includes(searchLower) ||
          item.treatment?.name?.toLowerCase().includes(searchLower)
      );
    }

    // Apply cleaning/repair filter
    let finalDisplayData = [];
    if (selectedFilter === "cleaning") {
      finalDisplayData = currentFiltered.filter((item) =>
        isCleaning(item.treatment?.type_service)
      );
    } else if (selectedFilter === "repair") {
      finalDisplayData = currentFiltered.filter((item) =>
        isRepair(item.treatment?.type_service)
      );
    } else {
      finalDisplayData = currentFiltered; // If "all" or other, show all from currentFiltered (after search)
    }

    setFilteredAntrian(finalDisplayData);

    // Update counts for cleaning and repair based on the base antrianData
    setCleaningCount(
      antrianData.filter((item) => isCleaning(item.treatment?.type_service))
        .length
    );
    setRepairCount(
      antrianData.filter((item) => isRepair(item.treatment?.type_service))
        .length
    );
  }, [debouncedSearch, antrianData, selectedFilter]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const getThumbnailUrl = (originalUrl) => {
    // Jika menggunakan Cloudinary
    if (originalUrl.includes("cloudinary")) {
      return originalUrl.replace("/upload/", "/upload/w_200,h_200,c_fill/");
    }
    // Jika menggunakan ImageKit
    if (originalUrl.includes("imagekit")) {
      return originalUrl + "?tr=w-200,h-200";
    }
    // Jika tidak menggunakan CDN, gunakan URL original
    return originalUrl;
  };

  const handleStatusUpdate = async (id, status) => {
    setSelectedItemId(id);
    setSelectedQCType(status);
    setShowQCModal(true);
  };

  const handleQCSubmit = async (result) => {
    try {
      // Step 1: Tidak perlu POST ke /qualityControl lagi

      // Step 2: PATCH status treatment (gunakan API yang benar)
      const updateData = result;

      await axios.put(
        `https://api.katsikat.id/order-details/${selectedItemId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh data setelah update
      fetchAntrianData(); // Panggil fetchAntrianData untuk memuat ulang data terbaru
      setNotifModal({
        open: true,
        message: `Status item diperbarui menjadi ${result.status}`,
      });

      setShowQCModal(false);
      setSelectedQCType(null);
      setSelectedItemId(null);
    } catch (error) {
      console.error("Error processing QC:", error);
      setNotifModal({ open: true, message: "Error updating status." });
    }
  };

  const handleOpenQueue = () => {
    // Konversi format estimasi jika diperlukan
    const estimasiFormat = estimasi; // estimasi sudah sesuai dari useParams

    navigate(`/berandakasir/antriankasir/${estimasiFormat}`, {
      state: {
        dateRange,
        estimasi: estimasiFormat,
      },
    });
  };

  return (
    <div className="h-screen overflow-y-auto font-montserrat">
      {/* Header - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white">
        <AntrianHeader />
        <FilterAndSearch
          estimasi={estimasi}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
          cleaningCount={cleaningCount}
          repairCount={repairCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 md:px-10 pt-[220px] pb-24 h-[100dvh] overflow-y-auto">
        <div className="max-w-[390px] md:max-w-none mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAntrian.length > 0 ? (
              filteredAntrian.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 outline outline-1 outline-[#C1C1C1] relative"
                >
                  {/* Badge status untuk QC */}
                  {item.status === "siap" && (
                    <div className="absolute top-4 right-4 bg-[#2E7CF6] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Lolos QC
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-[100px] h-[100px] min-w-[100px] bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer"
                      onClick={() => {
                        if (item.shoes_photos && item.shoes_photos.length > 0) {
                          setSelectedImage(item.shoes_photos[0].url_photo);
                          setShowModal(true);
                        }
                      }}
                    >
                      {imageLoading && <LoadingDots />}
                      {item.shoes_photos && item.shoes_photos.length > 0 ? (
                        <img
                          src={getThumbnailUrl(item.shoes_photos[0].url_photo)}
                          alt="Shoes"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onLoad={() => setImageLoading(false)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-md md:text-base truncate">
                        {item.order?.customer?.name || "No Name"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 truncate">
                        {item.item?.brand || "No Item"} (
                        {item.treatment?.name || "No Treatment"})
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2 text-[#AA3328]">
                        {item.description}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mt-2 font-bold">
                        {format(new Date(item.due_date), "EEEE, dd MMMM yyyy", {
                          locale: id,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <AnimatedButton
                      onClick={() => handleStatusUpdate(item.id, "not_yet")}
                      className={`flex-1 h-[35px] rounded-xl flex items-center justify-center text-sm font-semibold
                        ${
                          item.status === "not_yet"
                            ? "bg-[#2E7CF6] text-white"
                            : item.status === "siap"
                            ? "bg-[blue-100] text-white cursor-not-allowed"
                            : "bg-[#FFEEEE] text-[#E55050] hover:bg-blue-50"
                        }
                      `}
                      disabled={item.status === "siap"}
                    >
                      Tidak Lolos
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => handleStatusUpdate(item.id, "siap")}
                      className={`flex-1 h-[35px] rounded-xl flex items-center justify-center text-sm font-semibold
                        ${
                          item.status === "siap"
                            ? "bg-[#2E7CF6] text-white"
                            : item.status === "not_yet"
                            ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                            : "bg-[#E6EFF9] text-[#2E7CF6] hover:bg-blue-50"
                        }
                      `}
                      disabled={item.status === "not_yet"}
                    >
                      Lolos
                    </AnimatedButton>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                {searchQuery.trim() !== ""
                  ? "No items found matching your search"
                  : `Tidak ada antrian untuk kategori ${selectedFilter}`}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Image Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={() => {
                setShowModal(false);
                setSelectedImage(null);
              }}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-4 bg-white flex justify-center">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedImage(null);
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quality Check Modal */}
      <QualityCheckModal
        isOpen={showQCModal}
        onClose={() => {
          setShowQCModal(false);
          setSelectedQCType(null);
          setSelectedItemId(null);
        }}
        type={selectedQCType}
        onSubmit={handleQCSubmit}
        dataItem={{ id: selectedItemId }}
      />

      {/* Notifikasi Modal */}
      {notifModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xs text-center">
            <div className="text-[#2E7CF6] font-bold text-lg mb-2">
              Notifikasi
            </div>
            <div className="text-gray-700 mb-4">{notifModal.message}</div>
            <button
              className="px-6 py-2 bg-[#2E7CF6] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => setNotifModal({ open: false, message: "" })}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AntrianKasir;
