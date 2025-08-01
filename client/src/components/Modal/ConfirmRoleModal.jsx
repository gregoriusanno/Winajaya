import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../Design/AnimatedButton";

const ConfirmRoleModal = ({ isOpen, onClose, selectedRole }) => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getRoleName = (role) => {
    switch (role) {
      case "teknisi":
        return "Teknisi";
      case "kasir":
        return "Inspektur";
      case "kurir":
        return "Kurir";
      default:
        return "";
    }
  };

  const handleConfirm = () => {
    switch (selectedRole) {
      case "teknisi":
        navigate("/berandateknisi");
        break;
      case "kasir":
        navigate("/berandakasir");
        break;
      case "kurir":
        navigate("/berandakurir");
        break;
      default:
        break;
    }
    onClose();
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
        className={`bg-white rounded-2xl p-6 w-[90%] max-w-md transform transition-all duration-300
          ${
            showModal
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-full scale-150"
          }`}
      >
        <h2 className="text-2xl font-bebas text-center mb-4">
          Konfirmasi Peran
        </h2>
        <p className="text-center mb-6 font-montserrat text-sm">
          Anda telah memilih peran sebagai{" "}
          <span className="font-bold">{getRoleName(selectedRole)}</span>. Apakah
          Anda yakin dengan pilihan ini?
        </p>
        <div className="flex gap-4">
          <AnimatedButton
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-xl text-sm items-center justify-center"
            variant="grey"
          >
            Batal
          </AnimatedButton>
          <AnimatedButton
            onClick={handleConfirm}
            className="flex-1 py-2 px-4 rounded-xl text-sm items-center justify-center"
            variant="blue"
          >
            Lanjutkan
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRoleModal;
