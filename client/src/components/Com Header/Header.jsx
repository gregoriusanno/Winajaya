import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmationModal from "../Modal/ConfirmationModal";
import NavigationModal from "../Modal/NavigationModal";
import LogoutButton from "./LogoutButton";
import UserName from "./UserName";
// import SwitchButton from "./SwitchButton";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData] = useState(JSON.parse(localStorage.getItem("user")));
  const [showNavModal, setShowNavModal] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("userData");

    const fromIzin = sessionStorage.getItem("fromIzin");
    const fromPresent = sessionStorage.getItem("fromPresent");

    if (location.pathname === "/berandakurir") {
      navigate("/kurir/transport");
    } else if (fromIzin === "true") {
      navigate("/");
    } else {
      navigate("/absenakhir");
    }

    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 bg-white font-montserrat">
        <div className="mx-auto px-4 py-4 md:px-10">
          <div className="flex flex-col gap-2">
            {/* Row 1: Logout & Clock */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <LogoutButton onClick={() => setShowLogoutModal(true)} />
              </div>

              {/* Jika dibuka di halaman analsis kinerja, maka tidak ada user name */}
              {location.pathname === "/analisis-kinerja" ? null : (
                <UserName
                  name={userData?.name}
                  isOpen={isOpen}
                  setOpen={setOpen}
                  onToggle={(toggled) => {
                    if (toggled) {
                      setShowNavModal(true);
                    } else {
                      setShowNavModal(false);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar?"
      />

      <NavigationModal
        isOpen={showNavModal}
        onClose={() => {
          setShowNavModal(false);
          setOpen(false);
        }}
      />
    </>
  );
};

export default Header;
