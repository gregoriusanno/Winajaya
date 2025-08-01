import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedButton from '../Design/AnimatedButton';

const NavigationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { 
      name: 'Daftar Kehadiran', 
      path: '/cekabsen',
      icon: "/src/assets/images/calender.png"
    },
    { 
      name: 'Penghasilan & Slip Gaji', 
      path: '/cekgaji',
      icon: "/src/assets/images/salary.png"
    },
    { 
      name: 'Kontrol Kinerja & SP', 
      path: '/kontrolkerja',
      icon: "/src/assets/images/chart.png"
    },
    
  ];

  const handleNavigate = (path) => {
    // Simpan halaman asal sebelum navigasi
    const currentPath = window.location.pathname;
    sessionStorage.setItem('previousPage', currentPath);
    
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 pl-10 pr-10">
            {/* Background overlay dengan animasi fade */}
            <motion.div 
              className="fixed inset-0 bg-black transition-opacity z-[101]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0, ease: "easeInOut"}}
              aria-hidden="true"
              onClick={onClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal content dengan animasi */}
            <motion.div 
              className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg w-full outline outline-2 outline-white z-[102]"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="bg-[#F8FCFF] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-1 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-2xl font-bebas mb-4">
                      Analisis Kinerja
                    </h3>
                    <div className="flex flex-col gap-3">
                      {menuItems.map((item) => (
                        <AnimatedButton 
                          key={item.path}
                          onClick={() => handleNavigate(item.path)}
                          className="h-[45px] w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-montserrat text-sm outline outline-1 outline-[#B6B6B6] flex items-center justify-start"
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.icon}
                              alt={item.name}
                              className="w-6 h-6"
                            />
                            {item.name}
                          </div>
                        </AnimatedButton>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#F8FCFF] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <AnimatedButton 
                  type="button"
                  onClick={onClose}
                  variant="black"
                  className="mb-2 w-full h-[45px] inline-flex justify-center items-center rounded-xl px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm font-montserrat"
                >
                  Tutup
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationModal; 