import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ClockGroup = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const location = useLocation();

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
    <div className="flex items-center gap-2 px-4 py-2 rounded-full h-[41px] font-bebas text-xl text-white">
    </div>
  );
};

export default ClockGroup; 