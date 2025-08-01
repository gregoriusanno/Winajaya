import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "../Design/AnimatedButton";
import axios from "axios";


const QualityCheckModal = ({ isOpen, onClose, type, onSubmit, dataItem }) => {
  const [reason, setReason] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const handleSubmit = async () => {
    console.log("Submitting quality check:");
    console.log("dataItem:", dataItem);

    if (!dataItem?.id) {
      setErrorMsg("ID order detail tidak ditemukan.");
      return;
    }

    if (type === "not_yet") {
      const result = await onSubmit({
        description: reason,
        status: "not_yet",
      });

      if (result.success) {
        onClose();
      } else {
        setErrorMsg(result.message);
      }

    } else {
      if (!deliveryOption) {
        setErrorMsg("Pilih metode pengambilan terlebih dahulu.");
        return;
      }

      const payload = {
        pickup_method: deliveryOption,
        delivery_date: deliveryOption === "delivery" ? deliveryDate : null,
        delivery_time: deliveryOption === "delivery" ? deliveryTime : null,
        courier_id: null,
        delivery_status: deliveryOption === "delivery" ? "scheduled" : null,
        status: "siap",
      };

      console.log("Payload for update:", payload);

      const result = await onSubmit(payload);

      if (result.success) {
        onClose();
      } else {
        setErrorMsg(result.message);
      }
    }
  };

  const handleUpdateOrderDetail = async (data) => {
    try {
      const res = await axios.put(
        `https://api.katsikat.id/order-details/${dataItem.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Berhasil update:", res.data);
      return { success: true };
    } catch (err) {
      console.error("Gagal update:", err);
      const msg =
        err?.response?.data?.message || "Gagal menyimpan data.";
      return { success: false, message: msg };
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 pl-10 pr-10">
            {/* Background overlay dengan animasi fade */}
            <motion.div
              className="fixed inset-0 bg-black transition-opacity z-[101]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0, ease: "easeInOut" }}
              aria-hidden="true"
              onClick={onClose}
            />

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal content dengan animasi */}
            <motion.div
              className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg w-full z-[102]"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#5096FC] to-[#7BD1FD] px-6 py-3">
                <h3 className="text-lg font-semibold text-white">
                  {type === "not_yet"
                    ? "Tidak Lolos Quality Check"
                    : "Lolos Quality Check"}
                </h3>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                {type === "not_yet" ? (
                  // Form untuk Tidak Lolos
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Berikan alasan tidak lolos quality check:
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-sm"
                      rows="4"
                      placeholder="Alasan akan dibaca oleh pihak teknisi yang mengerjakan item ini..."
                    />
                  </div>
                ) : (
                  // Form untuk Lolos
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Pilih metode pengambilan:
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <AnimatedButton
                          className={`cursor-pointer p-4 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${deliveryOption === "pickup"
                            ? "bg-[#57AEFF] text-white"
                            : "bg-[#E6EFF9] text-gray-600"
                            }`}
                          onClick={() => setDeliveryOption("pickup")}
                        >
                          <animated-icons
                            src="https://animatedicons.co/get-icon?name=Person%20Arrives&style=minimalistic&token=6e09845f-509a-4b0a-a8b0-c47e168ad977"
                            trigger="loop"
                            attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":0.88,"defaultColours":{"group-1":"#536DFEFF","group-2":"#000000FF","background":"#FFFFFF00"}}'
                            height="40"
                            width="40"
                          ></animated-icons>
                          <span className="text-sm font-medium">
                            Ambil di Outlet
                          </span>
                        </AnimatedButton>

                        <AnimatedButton
                          className={`cursor-pointer p-4 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${deliveryOption === "delivery"
                            ? "bg-[#57AEFF] text-white"
                            : "bg-[#E6EFF9] text-gray-600"
                            }`}
                          onClick={() => setDeliveryOption("delivery")}
                        >
                          <animated-icons
                            src="https://animatedicons.co/get-icon?name=Fast%20Delivery&style=minimalistic&token=d5afb04f-d10f-4540-bf0a-27e0b4e06ce8"
                            trigger="loop"
                            attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000FF","group-2":"#5096FCFF","background":"#E6EFF9FF"}}'
                            height="40"
                            width="40"
                          ></animated-icons>
                          <span className="text-sm font-medium">
                            Lakukan Pengiriman
                          </span>
                        </AnimatedButton>
                      </div>
                    </div>

                    {deliveryOption === "delivery" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pilih tanggal pengiriman:
                          </label>
                          <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57AEFF]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pilih waktu pengiriman:
                          </label>
                          <input
                            type="time"
                            value={deliveryTime}
                            onChange={(e) => setDeliveryTime(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57AEFF]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
                {errorMsg && (
                  <div className="text-red-500 text-sm font-medium">
                    ⚠ {errorMsg}
                  </div>
                )}
                <AnimatedButton
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-black opacity-100 outline outline-1 outline-black font-semibold"
                >
                  Batal
                </AnimatedButton>
                <AnimatedButton
                  onClick={handleSubmit}
                  variant="blue"
                  disabled={
                    (type === "not_yet" && !reason) ||
                    (type === "siap" && !deliveryOption) ||
                    (deliveryOption === "delivery" &&
                      (!deliveryDate || !deliveryTime))
                  }
                  className={`px-4 py-2 rounded-lg text-white transition-colors ${(type === "not_yet" && reason) ||
                    (type === "siap" &&
                      deliveryOption &&
                      (deliveryOption === "pickup" ||
                        (deliveryDate && deliveryTime)))
                    ? "bg-[#57AEFF] hover:bg-[#4a91d8]"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  Konfirmasi
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QualityCheckModal;
