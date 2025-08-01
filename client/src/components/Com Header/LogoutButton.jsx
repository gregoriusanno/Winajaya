import { useState } from "react";
import Modal from "../Modal/SwitchModal";
import SwitchRole from "./SwitchRole";
import AnimatedButton from "../Design/AnimatedButton";

const LogoutButton = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTitleByPath = () => {
    const path = location.pathname;

    if (path.includes("berandakasir")) {
      return "Kasir";
    } else if (path.includes("berandakurir")) {
      return "Kurir";
    } else if (path.includes("berandateknisi")) {
      return "Teknisi";
    }
    return null;
  };

  const title = getTitleByPath();

  // Jika title tidak ada judul page, return null
  if (!title) return null;

  return (
    <>
      <div className="w-full h-[41px] p-4 rounded-full flex items-center justify-center bg-white transition-all shadow-2xl shadow-white opacity-100 gap-1 font-bebas text-xl text-[#3F3F3F] outline outline-2 outline-[#EEF1F7]">
        <AnimatedButton onClick={onClick} className="flex items-center gap-2">
          <animated-icons
            src="https://animatedicons.co/get-icon?name=exit&style=minimalistic&token=6e09845f-509a-4b0a-a8b0-c47e168ad977"
            trigger="loop"
            attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":2.5,"defaultColours":{"group-1":"#FD8087FF","group-2":"#FF4954FF","background":"#FFFFFF00"}}'
            height="20"
            width="20"
            style={{ transform: "scaleX(-1)" }} // Membalik secara horizontal
          ></animated-icons>
        </AnimatedButton>
        <span className="font-bebas text-xl text-[#EEF1F7]">|</span>
        <AnimatedButton
          onClick={() => setIsModalOpen(true)}
          className="text-xl"
        >
          {title}
        </AnimatedButton>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Pilih peran anda"
      >
        <div className="mt-4 mb-2">
          <SwitchRole />
        </div>
      </Modal>
    </>
  );
};

export default LogoutButton;
