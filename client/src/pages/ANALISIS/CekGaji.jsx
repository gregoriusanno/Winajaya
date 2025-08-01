import { useState, useEffect } from "react";
import Header from "../../components/Com Header/Header";
import { useNavigate } from "react-router-dom";
import LordIcon from "../../components/Design/LordIcon";
import AnimatedButton from "../../components/Design/AnimatedButton";

const CekGaji = ({
  hideBackButton,
  hideTitle,
  className = "pt-24",
  wrapperMode,
}) => {
  const navigate = useNavigate();
  const [gajiData, setGajiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchGajiData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dummyData = {
        pendapatan: {
          gajiPokok: 2500000,
          bonus: Math.floor(Math.random() * 600000),
          biayaTransport: 330188,
        },
        potongan: {
          totalAlpha: 3,
          totalIzin: 2,
          gajiPerHari: 2500000 / 22,
          potonganAlpha: 0,
          potonganIzin: 0,
        },
        totalPendapatan: 0,
      };

      dummyData.potongan.potonganAlpha =
        dummyData.potongan.totalAlpha * (dummyData.potongan.gajiPerHari * 1.3);
      dummyData.potongan.potonganIzin =
        dummyData.potongan.totalIzin * dummyData.potongan.gajiPerHari;

      dummyData.totalPendapatan =
        dummyData.pendapatan.gajiPokok +
        dummyData.pendapatan.bonus +
        dummyData.pendapatan.biayaTransport -
        (dummyData.potongan.potonganAlpha + dummyData.potongan.potonganIzin);

      setGajiData(dummyData);
    } catch (error) {
      console.error("Error fetching gaji data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGajiData();
  }, [month, year]); // Refetch when month/year changes

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBack = () => {
    const previousPage = sessionStorage.getItem("previousPage");

    // Default ke beranda teknisi jika tidak ada previous page
    if (!previousPage) {
      navigate("/berandateknisi");
      return;
    }

    // Navigasi ke halaman sebelumnya berdasarkan path yang tersimpan
    switch (previousPage) {
      case "/berandakurir":
        navigate("/berandakurir");
        break;
      case "/berandakasir":
        navigate("/berandakasir");
        break;
      case "/berandateknisi":
        navigate("/berandateknisi");
        break;
      default:
        navigate("/berandateknisi");
    }
  };

  const handleSetCurrentDate = () => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
  };

  const getMonthName = (monthNumber) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return months[monthNumber - 1];
  };

  const handleDownloadSlip = () => {
    // Simulasi download file
    alert("Mengunduh slip gaji...");
  };

  // Validasi bulan dan tahun berjalan
  const isFutureMonth =
    year > new Date().getFullYear() ||
    (year === new Date().getFullYear() && month > new Date().getMonth() + 1);

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-white font-montserrat">
      <Header />
      <main
        className={`${className} px-4 md:px-10 pb-10 flex-1 overflow-y-auto`}
      >
        {!hideBackButton && (
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBack}
              className="p-2 bg-white rounded-full w-[41px] h-[41px] flex items-center justify-center outline outline-2 outline-[#EEF1F7]"
              title="Kembali"
            >
              <LordIcon
                src="https://cdn.lordicon.com/jeuxydnh.json"
                trigger="loop"
                colors="primary:#57AEFF"
                style={{ width: 41, height: 41 }}
              />
            </button>
            {!hideTitle && (
              <h1 className="text-2xl font-bebas">Penghasilan & Slip Gaji</h1>
            )}
          </div>
        )}

        {/* Rentang Waktu */}
        <div className="mb-4 bg-white rounded-3xl p-4 mt-4 outline outline-2 outline-[#EEF1F7]">
          <h2 className="text-2xl font-bebas mb-3">Rentang Waktu</h2>
          <div className="flex gap-2">
            <input
              type="month"
              value={`${year}-${month < 10 ? "0" + month : month}`}
              onChange={(e) => {
                const [selectedYear, selectedMonth] = e.target.value.split("-");
                setYear(parseInt(selectedYear));
                setMonth(parseInt(selectedMonth));
              }}
              className="flex-1 bg-gray-100 text-gray-600 outline outline-2 outline-[#EEF1F7] w-full p-2 rounded-xl font-semibold"
            />
            <AnimatedButton
              onClick={handleSetCurrentDate}
              variant="blue"
              className="px-4 rounded-xl font-semibold"
            >
              Sekarang
            </AnimatedButton>
          </div>
        </div>

        {/* Validasi bulan/tahun berjalan */}
        {isFutureMonth ? (
          <div className="mb-4 bg-yellow-100 text-yellow-800 rounded-3xl p-4 mt-4 outline outline-2 outline-[#EEF1F7] text-center font-semibold">
            Data atau informasi untuk bulan dan tahun tersebut belum tersedia.
            Mohon menunggu hingga admin melakukan update informasinya.
          </div>
        ) : (
          <>
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <>
                {/* Bagian 1: Total Pendapatan */}
                <div className="mb-4 bg-white rounded-3xl p-4 outline outline-2 outline-[#EEF1F7]">
                  <h2 className="text-2xl font-bebas mb-3">Total Pendapatan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-xl outline outline-2 outline-[#EEF1F7]">
                      <div className="text-sm text-gray-600">Gaji Pokok</div>
                      <div className="text-2xl font-semibold text-[#2E7CF6]">
                        {formatCurrency(gajiData.pendapatan.gajiPokok)}
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl outline outline-2 outline-[#EEF1F7]">
                      <div className="text-sm text-gray-600">Bonus</div>
                      <div className="text-2xl font-semibold text-[#2E7CF6]">
                        {formatCurrency(gajiData.pendapatan.bonus)}
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl outline outline-2 outline-[#EEF1F7]">
                      <div className="text-sm text-gray-600">Biaya Transport</div>
                      <div className="text-2xl font-semibold text-[#2E7CF6]">
                        {formatCurrency(gajiData.pendapatan.biayaTransport)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bagian 2: Potongan Bulanan */}
                <div className="mb-4 bg-white rounded-3xl p-4 outline outline-2 outline-[#EEF1F7]">
                  <h2 className="text-2xl font-bebas mb-3">Potongan Bulanan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-100 p-4 rounded-xl outline outline-2 outline-[#EEF1F7]">
                      <div className="text-sm text-gray-600">
                        Potongan Alpha ({gajiData.potongan.totalAlpha} hari)
                      </div>
                      <div className="text-2xl font-semibold text-red-600">
                        {formatCurrency(gajiData.potongan.potonganAlpha)}
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl outline outline-2 outline-[#EEF1F7]">
                      <div className="text-sm text-gray-600">
                        Potongan Izin ({gajiData.potongan.totalIzin} hari)
                      </div>
                      <div className="text-2xl font-semibold text-red-600">
                        {formatCurrency(gajiData.potongan.potonganIzin)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl outline outline-2 outline-[#EEF1F7]">
                    <div className="text-sm text-gray-600">Total Potongan</div>
                    <div className="text-2xl font-semibold text-red-600">
                      {formatCurrency(
                        gajiData.potongan.potonganAlpha +
                          gajiData.potongan.potonganIzin
                      )}
                    </div>
                  </div>
                </div>

                {/* Bagian 3: Grand Total */}
                <div className="bg-white rounded-3xl p-4 outline outline-2 outline-[#EEF1F7]">
                  <h2 className="text-2xl font-bebas mb-3">
                    Total Gaji Bulan Ini
                  </h2>
                  <div className="bg-gray-100 p-4 rounded-xl outline outline-2 outline-[#EEF1F7]">
                    <div className="text-sm text-gray-600">Grand Total</div>
                    <div className="text-2xl font-semibold text-blue-600">
                      {formatCurrency(gajiData.totalPendapatan)}
                    </div>
                  </div>
                </div>

                {/* Setelah Grand Total, tambahkan section Slip Gaji */}
                <div className="mt-4 bg-white rounded-3xl p-4 outline outline-2 outline-[#EEF1F7]">
                  <h2 className="text-2xl font-bebas mb-3">Slip Gaji</h2>
                  <div className="bg-gray-100 p-4 rounded-xl outline outline-2 outline-[#EEF1F7]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <animated-icons
                          src="https://animatedicons.co/get-icon?name=Pdf&style=minimalistic&token=d5afb04f-d10f-4540-bf0a-27e0b4e06ce8"
                          trigger="loop"
                          attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#5096FCFF","background":"#FFFFFF"}}'
                          height="40"
                          width="40"
                        ></animated-icons>
                        <div>
                          <div className="font-semibold text-gray-800">
                            Slip Gaji {getMonthName(month)} {year}
                          </div>
                          <div className="text-sm text-gray-500">
                            PDF • 245 KB
                          </div>
                        </div>
                      </div>
                      <AnimatedButton
                        onClick={handleDownloadSlip}
                        variant="blue"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl ml-2"
                      >
                        <span>Unduh</span>
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CekGaji;
