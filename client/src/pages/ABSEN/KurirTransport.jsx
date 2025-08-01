import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FuelCalculationModal from "../../components/FuelCalculationModal";
import AnimatedButton from "../../components/Design/AnimatedButton";
// import imageCompression from "browser-image-compression";

const KurirTransport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    odoStart: "",
    odoEnd: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [photos, setPhotos] = useState({
    odoStart: null,
    odoEnd: null
  });
  const [previews, setPreviews] = useState({
    odoStart: null,
    odoEnd: null
  });
  const [selectedPreview, setSelectedPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setError("");
    }
  };

  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 2) {
      setError("Harap upload 2 foto sekaligus (ODO Mulai dan ODO Selesai)");
      return;
    }

    setError("");

    // Opsi kompresi
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920, // opsional, bisa diatur sesuai kebutuhan
      useWebWorker: true,
    };

    // Kompres kedua file
    // try {
    //   const compressedFiles = await Promise.all(
    //     files.map(file => imageCompression(file, options))
    //   );

    //   // Tambahkan log keberhasilan kompresi
    //   console.log("Foto berhasil di-compress:", compressedFiles.map(f => ({ name: f.name, size: f.size })));

    //   compressedFiles.forEach((file, index) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setPreviews(prev => ({
    //         ...prev,
    //         [index === 0 ? 'odoStart' : 'odoEnd']: reader.result
    //       }));
    //     };
    //     reader.readAsDataURL(file);

    //     setPhotos(prev => ({
    //       ...prev,
    //       [index === 0 ? 'odoStart' : 'odoEnd']: file
    //     }));
    //   });
    // } catch (err) {
    //   setError("Gagal mengompres foto, silakan coba lagi.");
    // }
  };

  const handleSubmit = () => {
    // Validasi input
    if (!formData.odoStart.trim() || !formData.odoEnd.trim()) {
      setError("Semua field harus diisi");
      return;
    }

    if (!photos.odoStart || !photos.odoEnd) {
      setError("Harap upload foto ODO Mulai dan ODO Selesai");
      return;
    }

    const odoStartNum = parseInt(formData.odoStart);
    const odoEndNum = parseInt(formData.odoEnd);

    if (isNaN(odoStartNum) || isNaN(odoEndNum)) {
      setError("ODO Mulai dan ODO Selesai harus berupa angka");
      return;
    }

    if (odoStartNum >= odoEndNum) {
      setError("ODO Selesai harus lebih besar dari ODO Mulai");
      return;
    }

    // Jika semua validasi berhasil
    setError("");
    setShowModal(true);
  };

  const handleConfirm = async (fuelCost) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('odoStart', formData.odoStart);
      formData.append('odoEnd', formData.odoEnd);
      formData.append('totalFuelCost', fuelCost);
      formData.append('odoStartPhoto', photos.odoStart);
      formData.append('odoEndPhoto', photos.odoEnd);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/kurir/transport`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        navigate("/kurir/next-page");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(
        error.response?.data?.message || "Terjadi kesalahan saat menyimpan data"
      );
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleEditPhoto = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => ({
            ...prev,
            [type]: reader.result
          }));
          setPhotos(prev => ({
            ...prev,
            [type]: file
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="h-screen overflow-y-auto bg-white p-4 pb-2 h-auto pb-20 flex flex-col items-center">
      <div className="max-w-md mx-auto h-max pb-20">

        <h1 className="text-3xl font-bebas text-center mb-2 mt-10">
          Pendataan Biaya Transportasi
        </h1>

        <p className="font-montserrat text-center text-gray-600 mb-4 max-w-xs mx-auto text-sm">
          Data pada ODO Meter harus sesuai dengan bukti yang akan diupload setelahnya!
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-4 max-w-xs font-montserrat text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4 p-4 max-w-xs mx-auto overflow-y-auto h-auto pb-14">
          <div>
            <label className="block font-montserrat text-sm text-gray-600 mb-2 font-semibold">
              ODO Mulai
            </label>
            <input
              type="text"
              name="odoStart"
              value={formData.odoStart}
              onChange={handleInputChange}
              className="h-10 w-full p-3 rounded-xl font-montserrat outline outline-1 outline-gray-200 placeholder:text-sm"
              placeholder="Masukkan jarak mulai"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block font-montserrat text-sm text-gray-600 mb-2 font-semibold mt-6">
              ODO Selesai
            </label>
            <input
              type="text"
              name="odoEnd"
              value={formData.odoEnd}
              onChange={handleInputChange}
              className="h-10 w-full p-3 rounded-xl outline outline-1 outline-gray-200 placeholder:text-sm font-montserrat"
              placeholder="Masukkan jarak selesai"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block font-montserrat text-sm text-gray-600 mb-2 font-semibold mt-6">
              Foto ODO Mulai & Selesai
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="odoPhotos"
              multiple
              required
            />
            <label
              htmlFor="odoPhotos"
              className="block w-full border-2 border-dashed border-[#5096FC] rounded-xl cursor-pointer hover:border-blue-400 transition-colors p-4"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Preview ODO Start */}
                <div className="relative h-[100px]">
                  {previews.odoStart ? (
                    <>
                      <img
                        src={previews.odoStart}
                        alt="ODO Start Preview"
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => setSelectedPreview(previews.odoStart)}
                      />
                      <button
                        variant-="blue"
                        onClick={() => handleEditPhoto('odoStart')}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full rounded-lg outline outline-1 outline-gray-200 p-2 font-montserrat">
                      <span className="text-gray-500 text-sm text-center">
                        Foto ODO Mulai
                      </span>
                    </div>
                  )}
                </div>

                {/* Preview ODO End */}
                <div className="relative h-[100px]">
                  {previews.odoEnd ? (
                    <>
                      <img
                        src={previews.odoEnd}
                        alt="ODO End Preview"
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => setSelectedPreview(previews.odoEnd)}
                      />
                      <button
                        onClick={() => handleEditPhoto('odoEnd')}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full rounded-lg outline outline-1 outline-gray-200 p-2 font-montserrat">
                      <span className="text-gray-500 text-sm text-center">
                        Foto ODO Selesai
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4 font-montserrat">
                Silahkan upload 2 foto sekaligus
                (ODO Mulai & Selesai)
              </p>
            </label>
          </div>

          <AnimatedButton
            onClick={handleSubmit}
            variant="blue"
            disabled={loading || !photos.odoStart || !photos.odoEnd}
            className={`h-10 w-full py-3 mt-6 font-montserrat text-center text-sm flex items-center justify-center ${
              (loading || !photos.odoStart || !photos.odoEnd) ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90"
            }`}
          >
            {loading ? "Menyimpan..." : "Selanjutnya"}
          </AnimatedButton>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
          <div className="max-w-3xl max-h-[80vh] bg-white rounded-3xl overflow-hidden outline outline-2 outline-white">
            <img
              src={selectedPreview}
              alt="Preview"
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="p-4 bg-white flex justify-center">
              <AnimatedButton
                variant="blue"
                onClick={() => setSelectedPreview(null)}
                className="px-6 py-2"
              >
                Tutup
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}

      <FuelCalculationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        data={formData}
      />
    </div>
  );
};

export default KurirTransport;
