import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "../Design/AnimatedButton";
import Check from "../../assets/images/check.svg";
import axios from "axios";

const TreatmentDetailModal = ({
  isOpen,
  onClose,
  treatment,
  description,
  isStarted,
  duration,
  onStart,
  onCancel,
  treatmentId,
  brand,
  color,
  shoesPhotos,
  onFinish,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 150; // Anda bisa mengubah nilai ini

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0); // Reset to first image when modal opens
    }
  }, [isOpen]);

  // Auto-swipe functionality
  useEffect(() => {
    let interval;
    if (isOpen && shoesPhotos && shoesPhotos.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === shoesPhotos.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Ganti gambar setiap 5 detik
    }
    return () => clearInterval(interval);
  }, [isOpen, shoesPhotos]);

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50; // Jarak swipe minimal untuk dianggap sebagai gesture

    if (swipeDistance > swipeThreshold) {
      // Swipe right (previous image)
      handlePrevImage();
    } else if (swipeDistance < -swipeThreshold) {
      // Swipe left (next image)
      handleNextImage();
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? shoesPhotos.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === shoesPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = async () => {
    try {
      // Akan memanggil API untuk memulai timer di backend
      await axios.put(
        `https://api.katsikat.id/order-details/${treatmentId}`,
        {
          status: "on_progress",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Treatment ${treatmentId} status updated to 'on_progress'.`);
      await onStart(treatmentId); // Panggil fungsi onStart asli untuk memulai timer
      onFinish(); // Panggil fungsi onFinish dari parent untuk refresh data
      onClose(); // Tutup modal setelah selesai
    } catch (error) {
      console.error("Error starting treatment and updating status:", error);
    }
  };

  const handleCancel = async () => {
    try {
      // Akan memanggil API untuk mengupdate status menjadi not_yet
      await axios.put(
        `https://api.katsikat.id/order-details/${treatmentId}`,
        {
          status: "not_yet",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Treatment ${treatmentId} status updated to 'not_yet'.`);
      await onCancel(treatmentId); // Panggil fungsi onCancel asli untuk menghapus timer
      onFinish(); // Panggil fungsi onFinish dari parent untuk refresh data
      onClose(); // Tutup modal setelah selesai
    } catch (error) {
      console.error("Error canceling treatment and updating status:", error);
    }
  };

  const handleFinishTreatment = async () => {
    try {
      await axios.put(
        `https://api.katsikat.id/order-details/${treatmentId}`,
        {
          status: "pengeringan",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Treatment ${treatmentId} status updated to 'pengeringan'.`);
      await onCancel(treatmentId); // Tambahkan panggilan ini untuk membersihkan timer
      onFinish(); // Panggil fungsi onFinish dari parent untuk refresh data
      onClose(); // Tutup modal setelah selesai
    } catch (error) {
      console.error("Error updating treatment status:", error);
      // Handle error, maybe show a notification to the user
    }
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
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
          <div className="flex items-center justify-center min-h-screen px-10 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              className="fixed inset-0 bg-black transition-opacity z-[101]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0, ease: "easeInOut" }}
              aria-hidden="true"
              onClick={onClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <motion.div
              className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg w-full z-[102]"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#5096FC] to-[#7BD1FD] px-6 py-3">
                <h3 className="text-lg font-semibold text-white">
                  Detail Treatment
                </h3>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                {/* Image Slider Section */}
                {shoesPhotos && shoesPhotos.length > 0 && (
                  <div
                    className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center mb-4 cursor-grab"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img
                      src={shoesPhotos[currentImageIndex]?.url_photo}
                      alt={`Shoes Photo ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 flex space-x-1">
                      {shoesPhotos.map((_, idx) => (
                        <span
                          key={idx}
                          className={`block w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                        ></span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="text-base font-semibold mb-2">{treatment}</h4>
                  {brand && color && (
                    <p className="text-xs text-gray-600 mb-1">
                      Brand: {brand} | Color: {color}
                    </p>
                  )}
                  <p className="text-xs text-gray-600">
                    Description:{" "}
                    {description && description.length > MAX_DESCRIPTION_LENGTH ? (
                      <>
                        {showFullDescription
                          ? description
                          : `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`}
                        <button
                          onClick={handleToggleDescription}
                          className="text-blue-500 hover:underline ml-1"
                        >
                          {showFullDescription ? "Less" : "More..."}
                        </button>
                      </>
                    ) : (
                      description
                    )}
                  </p>
                </div>

                <div className="flex gap-2">
                  {!isStarted ? (
                    <AnimatedButton
                      onClick={handleStart}
                      className="w-full px-4 py-2 bg-[#57AEFF] text-white rounded-xl hover:bg-[#4499e9] transition-colors"
                    >
                      Mulai Sekarang
                    </AnimatedButton>
                  ) : (
                    <>
                      <div className="flex-1 px-4 py-2 bg-[#E6EFF9] text-[#2E7CF6] rounded-xl font-semibold text-center">
                        {formatDuration(duration)}
                      </div>
                      <AnimatedButton
                        onClick={handleCancel}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={handleFinishTreatment}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      >
                        <img
                          src={Check}
                          alt="Check Icon"
                          className="w-5 h-5"
                        />
                      </AnimatedButton>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TreatmentDetailModal;
