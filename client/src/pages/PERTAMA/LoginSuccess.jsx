import { useNavigate } from "react-router-dom";
import AnimatedButton from "../../components/Design/AnimatedButton";
import LordIcon from "../../components/Design/LordIcon";

const LoginSuccess = () => {
  const navigate = useNavigate();

  // Data dummy untuk treatment (nantinya akan diganti dengan data dari database)
  const treatmentData = {
    count: 2,
    date: "Selasa, 25 Juni 2024",
  };

  const handleContinue = () => {
    navigate("/pilih-role");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-white px-10 sm:px-0">
      <div className="w-full sm:w-[380px] p-8 sm:p-8 my-auto bg-white rounded-3xl outline outline-2 outline-[#EEF1F7]">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <LordIcon
            src="https://cdn.lordicon.com/dhmavvpz.json"
            trigger="loop"
            style={{ width: "120px", height: "120px" }}
          />
        </div>

        {/* Success Message */}
        <h1 className="font-bebas text-2xl text-gray-800 tracking-wide text-center mb-3">
          Berhasil Absen
        </h1>

        {/* Welcome Message */}
        <p className="font-montserrat text-sm text-gray-600 text-center mb-8">
          Semoga harimu menyenangkan! Tetap fokus dan berikan yang terbaik!
        </p>

        {/* Continue Button */}
        <AnimatedButton
          type="button"
          onClick={handleContinue}
          className="h-[40px] w-full py-3.5 px-4 rounded-xl font-montserrat flex items-center justify-center font-semibold"
          variant="blue"
        >
          Lanjutkan
        </AnimatedButton>
      </div>
    </div>
  );
};

export default LoginSuccess;
