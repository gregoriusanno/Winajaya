// Simulasi penyimpanan data backend
const dummyTimerApi = {
  // Helper untuk mengambil data dari sessionStorage
  _getTimers() {
    const timers = sessionStorage.getItem('activeTimers');
    return timers ? JSON.parse(timers) : {};
  },

  // Helper untuk menyimpan data ke sessionStorage
  _saveTimers(timers) {
    sessionStorage.setItem('activeTimers', JSON.stringify(timers));
  },

  // Memulai timer baru
  startTreatment: async (treatmentId) => {
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const startTime = new Date().toISOString();
    const timers = dummyTimerApi._getTimers();
    
    timers[treatmentId] = {
      treatmentId,
      startTime
    };
    
    dummyTimerApi._saveTimers(timers);
    return { startTime };
  },

  // Mengambil semua timer aktif
  getActiveTimers: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const timers = dummyTimerApi._getTimers();
    return Object.values(timers);
  },

  // Menghentikan timer spesifik
  stopTreatment: async (treatmentId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const timers = dummyTimerApi._getTimers();
    delete timers[treatmentId];
    dummyTimerApi._saveTimers(timers);
    
    return { success: true };
  },

  // Menghapus semua timer (saat logout)
  clearAllTimers: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    sessionStorage.removeItem('activeTimers');
    return { success: true };
  }
};

export default dummyTimerApi; 