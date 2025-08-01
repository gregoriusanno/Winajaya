import { useState, useEffect } from "react";
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import LordIcon from "./Design/LordIcon";

const WorkTimeAlert = () => {
  const [showOvertimeWarning, setShowOvertimeWarning] = useState(false);
  const [canTakeOvertime, setCanTakeOvertime] = useState(false);
  const [workDuration, setWorkDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fungsi untuk mengecek jam kerja
  const checkWorkHours = () => {
    const workStartTime = localStorage.getItem("workStartTime");
    if (!workStartTime) return;

    const startTime = parseISO(workStartTime);
    const now = new Date();

    const hoursWorked = differenceInHours(now, startTime);
    const minutesWorked = differenceInMinutes(now, startTime) % 60;
    const secondsWorked = differenceInSeconds(now, startTime) % 60;

    setWorkDuration({
      hours: hoursWorked,
      minutes: minutesWorked,
      seconds: secondsWorked,
    });

    if (hoursWorked >= 8) {
      setShowOvertimeWarning(true);
      const totalMinutesWorked = differenceInMinutes(now, startTime);
      const canTake = totalMinutesWorked <= 8 * 60 + 30;
      setCanTakeOvertime(canTake);
    }
  };

  // Fungsi untuk menangani klik tombol ambil lembur
  const handleTakeOvertime = () => {
    setShowOvertimeWarning(false);
    setTimeout(() => {
      setShowOvertimeWarning(true);
    }, 60 * 60 * 1000);
  };

  useEffect(() => {
    checkWorkHours();
    const interval = setInterval(checkWorkHours, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!showOvertimeWarning) return null;

  return (
    <div className="mb-4 bg-red-100 rounded-3xl p-4 mt-4 outline outline-2 outline-red-400">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bebas text-red-700">
            Peringatan Jam Kerja
            <LordIcon
              src="https://cdn.lordicon.com/zjuyeglr.json"
              trigger="loop"
              state="loop-oscillate"
              style={{ width: "25px", height: "25px", marginLeft: "5px", paddingTop: "3px"}}
            />
          </h2>
          <p className="text-red-600 text-sm">
            Anda telah bekerja lebih dari 8 jam. Total jam kerja,{" "}
            {workDuration.hours} Jam, {workDuration.minutes} Menit, dan{" "}
            {workDuration.seconds} Detik. Silakan Absen Selesai!
          </p>
        </div>
        {canTakeOvertime && (
          <button
            onClick={handleTakeOvertime}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors"
          >
            Ambil Lembur
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkTimeAlert;
