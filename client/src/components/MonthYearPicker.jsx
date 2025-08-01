const MonthYearPicker = ({ month, year, onMonthChange, onYearChange }) => {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const years = Array.from(
    { length: 5 }, 
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-1">Bulan</label>
        <select
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {months.map((monthName, index) => (
            <option key={index + 1} value={index + 1}>
              {monthName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-1">Tahun</label>
        <select
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthYearPicker; 