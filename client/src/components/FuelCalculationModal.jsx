import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "./Design/AnimatedButton";

const FuelCalculationModal = ({ isOpen, onClose, onConfirm, data }) => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowOverlay(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        setShowModal(true);
      }, 100);
    } else {
      setShowModal(false);
      document.body.style.overflow = "auto";
      setTimeout(() => {
        setShowOverlay(false);
      }, 300);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!showOverlay) return null;

  const distance = data.odoEnd - data.odoStart;
  const fuelUsage = distance / 45; // Liter
  const fuelCost = fuelUsage * 10000; // Rupiah

  const handleConfirm = () => {
    onConfirm(fuelCost);
    onClose();
    navigate("/absenakhir");
  };

  return (
    <div
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 overflow-y-auto
        ${showOverlay ? "bg-opacity-50" : "bg-opacity-0"}`}
    >
      <div
        className={`bg-white rounded-2xl p-6 w-[80%] max-w-md transform transition-all duration-300 my-8]
          ${
            showModal
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-full scale-150"
          }`}
      >
        <h3 className="font-bebas text-2xl mb-4">Ringkasan Penggunaan BBM</h3>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 font-montserrat">ODO Mulai:</span>
            <span className="text-sm font-medium font-montserrat">
              {data.odoStart} km
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 font-montserrat">ODO Selesai:</span>
            <span className="text-sm font-medium font-montserrat">
              {data.odoEnd} km
            </span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-sm text-gray-600 font-montserrat">Jarak Tempuh:</span>
            <span className="text-sm font-medium font-montserrat">{distance} km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 font-montserrat">
              Penggunaan Bensin:
            </span>
            <span className="text-sm font-medium font-montserrat">
              {fuelUsage.toFixed(2)} liter
            </span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-sm text-gray-600 font-montserrat">
              Harga Pertalite:
            </span>
            <span className="text-sm font-montserrat">Rp 10.000/liter</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 font-montserrat">Biaya Bensin:</span>
            <span className="text-sm font-bold font-montserrat">
              Rp {fuelCost.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <AnimatedButton
            onClick={onClose}
            variant="grey"
            className="px-4 py-2 rounded-lg"
          >
            Batal
          </AnimatedButton>
          <AnimatedButton
            onClick={handleConfirm}
            variant="blue"
            className="px-4 py-2 rounded-lg"
          >
            Kirim
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default FuelCalculationModal;
