import { useEffect, useState } from "react";
import AnimatedButton from "../Design/AnimatedButton";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50
        ${showOverlay ? "bg-opacity-70" : "bg-opacity-0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl p-6 w-[90%] max-w-md transform transition-all duration-300
          ${
            showModal
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-full scale-150"
          }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
