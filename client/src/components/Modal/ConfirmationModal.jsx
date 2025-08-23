import { useEffect, useState } from "react";
import AnimatedButton from "../Design/AnimatedButton";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fungsi untuk memainkan suara

  // Modifikasi handler untuk onConfirm
  const handleConfirm = async () => {
    try {
      onConfirm();
    } catch (error) {
      console.error("Error saat memainkan suara dan konfirmasi:", error);
      onConfirm();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShowOverlay(true);
      setTimeout(() => {
        setShowModal(true);
      }, 100);
    } else {
      setShowModal(false);
      setTimeout(() => {
        setShowOverlay(false);
      }, 300);
    }
  }, [isOpen]);

  if (!showOverlay) return null;

  return (
    <div
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50
        ${showOverlay ? "bg-opacity-70" : "bg-opacity-0"}`}
    >
      <div
        className={`bg-white rounded-3xl p-4 rounded-2xl p-6 w-[90%] max-w-md transform transition-all duration-300
          ${
            showModal
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-full scale-150"
          }`}
      >
        <h3 className="text-2xl font-bebas mb-4">{title}</h3>
        <p className="text-gray-600 mb-6 font-montserrat">{message}</p>
        <div className="flex justify-end gap-3">
          <AnimatedButton
            onClick={onClose}
            variant="grey"
            className="px-4 py-2 font-montserrat"
          >
            Batal
          </AnimatedButton>
          <AnimatedButton
            onClick={handleConfirm}
            variant="blue"
            className="px-4 py-2 font-montserrat"
          >
            Ya
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
