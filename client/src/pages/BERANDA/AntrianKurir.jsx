import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AntrianHeader from "../../components/Header Antrian/AntrianHeader";
import AntrianKurirContent from "../../components/AntrianKurirContent";
import WhatsAppFormatter from "../../components/WhatsAppMessage/WhatsAppFormatter";
import {
  getKurirAntrianData,
  updateOrderStatus,
} from "../../services/kurirService";

const AntrianKurir = () => {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { dateRange } = location.state || {};

  const [antrianData, setAntrianData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filteredAntrian, setFilteredAntrian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDeliveryId, setActiveDeliveryId] = useState(() => {
    // Ambil dari sessionStorage jika ada
    return sessionStorage.getItem('activeDeliveryId') || null;
  });
  const [notification, setNotification] = useState("");
  const [deliveryStartTime, setDeliveryStartTime] = useState({});

  // Refetch antrian data
  const fetchAntrianData = async () => {
    setLoading(true);
    try {
      const currentDateRange = dateRange || {
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
      };
      const data = await getKurirAntrianData(currentDateRange);
      setAntrianData(data);
      setFilteredAntrian(data);
    } catch (error) {
      setAntrianData([]);
      setFilteredAntrian([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAntrianData();
  }, [type, dateRange]);

  // Cek apakah activeDeliveryId masih ada di data antrian setelah data di-load
  useEffect(() => {
    if (activeDeliveryId && antrianData.length > 0) {
      const found = antrianData.some(item => String(item.id) === String(activeDeliveryId));
      if (!found) {
        setActiveDeliveryId(null);
        sessionStorage.removeItem('activeDeliveryId');
      }
    }
  }, [antrianData, activeDeliveryId]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter data berdasarkan pencarian
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setFilteredAntrian(antrianData);
    } else {
      const searchLower = debouncedSearch.toLowerCase();
      const filtered = antrianData.filter(
        (item) =>
          item.customerName.toLowerCase().includes(searchLower) ||
          item.address.toLowerCase().includes(searchLower)
      );
      setFilteredAntrian(filtered);
    }
  }, [debouncedSearch, antrianData]);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Fungsi untuk memformat nomor telepon ke format internasional (awalan 62)
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    // Hapus semua karakter non-digit
    let cleaned = phone.replace(/\D/g, "");
    // Jika diawali 0, ganti dengan 62
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.slice(1);
    }
    // Jika sudah diawali 62, biarkan
    // Jika sudah diawali 8, tambahkan 62 di depan
    if (cleaned.startsWith("8")) {
      cleaned = "62" + cleaned;
    }
    return cleaned;
  };

  const handleWhatsApp = (phone, message) => {
    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone) return;
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
      message
    )}`;

    // Buka WhatsApp di tab baru tanpa mengganggu state aplikasi
    const whatsappWindow = window.open(url, "_blank", "noopener,noreferrer");

    // Fokus kembali ke aplikasi setelah membuka WhatsApp
    if (whatsappWindow) {
      setTimeout(() => {
        window.focus();
      }, 1000);
    }
  };

  const handleStartDelivery = (id) => {
    setActiveDeliveryId(id);
    sessionStorage.setItem('activeDeliveryId', id); // Simpan ke sessionStorage
    setDeliveryStartTime((prev) => ({
      ...prev,
      [id]: new Date(),
    }));

    // Kirim WhatsApp ke customer
    const item = antrianData.find((item) => item.id === id);
    if (item) {
      const message = WhatsAppFormatter.formatStartDeliveryMessage(type);
      // Langsung buka WhatsApp tanpa delay
      handleWhatsApp(item.phone, message);
    }

    setNotification(
      `${type === "pickup" ? "Pick up" : "Delivery"} dimulai untuk ${
        item?.customerName || "customer"
      }`
    );
  };

  const handleCancelDelivery = async (id) => {
    const confirmCancel = window.confirm(
      "Apakah Anda yakin ingin membatalkan pengantaran ini?"
    );
    if (!confirmCancel) return;

    try {
      const item = antrianData.find((item) => item.id === id);
      if (!item) return;

      let deliveryDateStr = item.delivery_date;
      if (!deliveryDateStr && item.requestTime) {
        deliveryDateStr = item.requestTime instanceof Date
          ? item.requestTime.toISOString().split("T")[0]
          : String(item.requestTime).split("T")[0];
      }
      if (!deliveryDateStr) return;

      const currentDate = new Date(deliveryDateStr);
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDate = currentDate.toISOString().split("T")[0];

      const response = await fetch(`https://api.katsikat.id/order-details/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ delivery_date: nextDate })
      });
      const result = await response.json();
      if (response.status === 200 && result.success) {
        await fetchAntrianData();
        setActiveDeliveryId(null);
        sessionStorage.removeItem('activeDeliveryId'); // Hapus dari sessionStorage
        setDeliveryStartTime((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      }

      const message = WhatsAppFormatter.formatCancelDeliveryMessage(
        type,
        nextDate
      );
      handleWhatsApp(item.phone, message);

      setNotification(
        `${type === "pickup" ? "Pick up" : "Delivery"} dibatalkan dan dijadwalkan ulang untuk besok`
      );
    } catch (error) {
      console.error("Error cancelling delivery:", error);
      setNotification("Gagal membatalkan pengantaran. Silakan coba lagi.");
    }
  };

  const handleCompleteDelivery = async (id) => {
    const confirmComplete = window.confirm(
      "Apakah Anda yakin pengantaran ini telah selesai?"
    );
    if (!confirmComplete) return;

    try {
      const response = await fetch(`https://api.katsikat.id/order-details/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: 'done', delivery_status: 'delivered' })
      });
      const result = await response.json();
      if (response.status === 200 && result.success) {
        await fetchAntrianData();
        setActiveDeliveryId(null);
        sessionStorage.removeItem('activeDeliveryId'); // Hapus dari sessionStorage
        setDeliveryStartTime((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      }

      const item = antrianData.find((item) => item.id === id);
      const startTime = deliveryStartTime[id];
      const endTime = new Date();

      if (item) {
        const message = WhatsAppFormatter.formatCompletedMessage(type);
        handleWhatsApp(item.phone, message);
      }

      const duration = startTime
        ? Math.round((endTime - startTime) / 1000 / 60)
        : 0;
      setNotification(
        `${type === "pickup" ? "Pick up" : "Delivery"} selesai${
          duration > 0 ? ` dalam ${duration} menit` : ""
        }`
      );
    } catch (error) {
      console.error("Error completing delivery:", error);
      setNotification("Gagal menyelesaikan pengantaran. Silakan coba lagi.");
    }
  };

  // Fungsi untuk mendapatkan durasi pengantaran
  const getDeliveryDuration = (id) => {
    const startTime = deliveryStartTime[id];
    if (!startTime) return "";

    const now = new Date();
    const duration = Math.round((now - startTime) / 1000 / 60);
    return duration > 0 ? `${duration} menit` : "Baru saja";
  };

  return (
    <div className="h-screen overflow-y-auto bg-white font-montserrat">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-10 bg-white">
        <AntrianHeader />
        <div className="mx-auto px-4 py-4 pr-4 pl-4 md:px-10 flex flex-col gap-4 w-full md:max-w-none bg-white shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bebas">
              {type === "pickup" ? "Pick Up" : "Delivery"}
            </h1>
            <div className="flex-1 max-w-md ml-4">
              <input
                type="text"
                placeholder="Cari nama atau alamat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white outline outline-1 outline-[#C1C1C1] text-gray-700 placeholder-gray-400 placeholder:text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 md:px-10 pt-[140px] pb-24 h-[100dvh] overflow-y-auto">
        <AntrianKurirContent
          filteredAntrian={filteredAntrian}
          type={type}
          searchQuery={searchQuery}
          handleWhatsApp={handleWhatsApp}
          handleStartDelivery={handleStartDelivery}
          handleCancelDelivery={handleCancelDelivery}
          handleCompleteDelivery={handleCompleteDelivery}
          loading={loading}
          activeDeliveryId={activeDeliveryId}
          getDeliveryDuration={getDeliveryDuration}
        />
      </main>
    </div>
  );
};

export default AntrianKurir;
