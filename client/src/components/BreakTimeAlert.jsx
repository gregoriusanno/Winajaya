import { useState, useEffect } from 'react';

const BreakTimeAlert = () => {
  const [showBreakWarning, setShowBreakWarning] = useState(false);
  const [showReturnWarning, setShowReturnWarning] = useState(false);
  const [breakCountdown, setBreakCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [returnCountdown, setReturnCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // ... tambahkan logika countdown yang sudah ada ...

  return (
    <>
      {showBreakWarning && (
        <div className="mb-2 bg-yellow-100 border border-yellow-400 rounded-3xl p-4 shadow-sm mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bebas text-yellow-700">
                Waktu Istirahat Akan Tiba
              </h2>
              <p className="text-yellow-600 text-sm">
                Waktu istirahat akan dimulai dalam:
              </p>
              <p className="text-yellow-600 text-sm mt-1">
                {breakCountdown.hours} Jam, {breakCountdown.minutes} Menit,
                dan {breakCountdown.seconds} Detik
              </p>
            </div>
          </div>
        </div>
      )}

      {showReturnWarning && (
        <div className="mb-2 bg-green-100 border border-green-400 rounded-3xl p-4 shadow-sm mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bebas text-green-700">
                Waktu Istirahat
              </h2>
              <p className="text-green-600 text-sm">
                Waktu kembali bekerja dalam:
              </p>
              <p className="text-green-600 text-sm mt-1">
                {returnCountdown.hours} Jam, {returnCountdown.minutes}{" "}
                Menit, dan {returnCountdown.seconds} Detik
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BreakTimeAlert; 