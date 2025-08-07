const dashboard = () => {
    
    
    return (
    <>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-6xl p-6 rounded shadow">
        {/* Judul */}
        <h1 className="text-3xl font-bold mb-6">Rekap Absen Karyawan</h1>

        {/* Search & Filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari Nama"
            className="flex-1 min-w-[200px] border p-2 rounded"
          />
          <input
            type="date"
            className="border p-2 rounded"
          />
          <select className="border p-2 rounded">
            <option value="">Status</option>
            <option value="valid">Lembur Harian</option>
            <option value="valid">Lembur Tanggal Merah</option>
            <option value="invalid">Tidak Lembur</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Filter
          </button>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto border border-blue-500">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Clock In</th>
                <th className="border px-4 py-2">Clock Out</th>
                <th className="border px-4 py-2">Duration</th>
                <th className="border px-4 py-2">Note</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Validation</th>
              </tr>
            </thead>
            <tbody>
              {/* Contoh data dummy */}
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">Budi</td>
                <td className="border px-4 py-2">08:00</td>
                <td className="border px-4 py-2">17:00</td>
                <td className="border px-4 py-2">9 jam</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2 text-green-600">Tidak Lembur</td>
                <td className="border px-4 py-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                </td>
              </tr>
              {/* Tambahkan baris lain sesuai data */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
    </>
);
    

};
export default dashboard;