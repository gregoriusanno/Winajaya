import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import LordIcon from "./Design/LordIcon";
import AnimatedButton from "./Design/AnimatedButton";
import WhatsAppFormatter from "./WhatsAppMessage/WhatsAppFormatter";

const AntrianKurirContent = ({
  filteredAntrian,
  type,
  searchQuery,
  handleWhatsApp,
  handleStartDelivery,
  handleCancelDelivery,
  handleCompleteDelivery,
  loading = false,
  activeDeliveryId, // pastikan prop ini diterima
}) => {
  const [copiedId, setCopiedId] = useState(null);

  const getButtonText = (type) => {
    return type === "pickup" ? "Mulai Penjemputan" : "Mulai Pengantaran";
  };

  const getWhatsAppMessage = (type) => {
    if (type === "pickup") {
      return encodeURIComponent(WhatsAppFormatter.formatStartDeliveryMessage("pickup"));
    } else {
      return encodeURIComponent(WhatsAppFormatter.formatStartDeliveryMessage("delivery"));
    }
  };

  const handleCopyAddress = (id, address) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000); // Reset setelah 2 detik
  };

  return (
    <div className="max-w-[390px] md:max-w-none mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Memuat data...
          </div>
        ) : filteredAntrian.length > 0 ? (
          filteredAntrian.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl p-4 outline outline-1 outline-[#C1C1C1]"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-lg md:text-xl truncate">
                  {item.customerName}
                </p>
                <div className="flex items-start gap-2 mt-2">
                  <p className="text-sm md:text-base text-gray-600 line-clamp-2 flex-1">
                    {item.address}
                  </p>
                  <button
                    onClick={() => handleCopyAddress(item.id, item.address)}
                    className="mt-1 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Salin alamat"
                  >
                    {copiedId === item.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                      </svg>
                    )}
                  </button>
                </div>
                {item.googleMapsUrl && item.googleMapsUrl !== '-' ? (
                  <a
                    href={item.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                  >
                    Buka di Google Maps
                  </a>
                ) : (
                  <span className="text-sm text-gray-500 mt-1 inline-block">
                    Link Google Maps tidak tersedia
                  </span>
                )}
                <p className="text-sm text-gray-500 mt-2 font-bold">
                  Time Request:{" "}
                  {format(item.requestTime, "HH:mm", { locale: id })}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <AnimatedButton
                  onClick={() =>
                    handleWhatsApp(item.phone, getWhatsAppMessage(type))
                  }
                  className="w-[41px] h-[41px] rounded-2xl flex items-center justify-center text-white outline outline-1 outline-[#2ca58d]"
                  title="WhatsApp"
                >
                  <LordIcon
                    src="https://cdn.lordicon.com/vyyhrdzw.json"
                    trigger="loop"
                    colors="primary:#ffffff,secondary:#ffffff"
                    size={23}
                    style={{ width: "35px", height: "35px" }}
                  />
                </AnimatedButton>
                {item.id === activeDeliveryId ? (
                  <>
                    <AnimatedButton
                      title="Gagal"
                      onClick={() => handleCancelDelivery(item.id)}
                      className="flex-1 h-[41px] rounded-xl flex items-center justify-center text-sm font-semibold text-red-500 opacity-100 outline outline-1 outline-red-500"
                    >
                      Gagal
                    </AnimatedButton>
                    <AnimatedButton
                      title="Selesai"
                      variant="green"
                      onClick={() => handleCompleteDelivery(item.id)}
                      className="flex-1 h-[41px] rounded-xl flex items-center justify-center text-sm font-semibold"
                    >
                      Selesai
                    </AnimatedButton>
                  </>
                ) : (
                  <AnimatedButton
                    onClick={() => handleStartDelivery(item.id)}
                    variant="green"
                    className="flex-1 h-[41px] rounded-xl flex items-center justify-center text-sm"
                  >
                    {getButtonText(type)}
                  </AnimatedButton>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            {searchQuery.trim() !== ""
              ? "Tidak ada data yang sesuai dengan pencarian"
              : `Tidak ada antrian ${type === 'pickup' ? 'penjemputan' : 'pengantaran'} untuk saat ini. Fitur sedang dalam pengembangan!`}
          </div>
        )}
      </div>
    </div>
  );
};

export default AntrianKurirContent;
