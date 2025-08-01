// Simulasi storage backend menggunakan localStorage untuk sementara
const timerService = {
  // Menyimpan waktu mulai treatment
  startTreatmentTimer: async (treatmentId) => {
    const startTime = new Date().toISOString();
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simpan di localStorage (temporary, akan diganti dengan BE nanti)
    const timers = JSON.parse(localStorage.getItem('treatment_timers') || '{}');
    timers[treatmentId] = startTime;
    localStorage.setItem('treatment_timers', JSON.stringify(timers));
    
    return startTime;
  },

  // Mengambil waktu mulai treatment
  getTreatmentTimer: async (treatmentId) => {
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const timers = JSON.parse(localStorage.getItem('treatment_timers') || '{}');
    return timers[treatmentId];
  },

  // Menghapus timer treatment
  deleteTreatmentTimer: async (treatmentId) => {
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const timers = JSON.parse(localStorage.getItem('treatment_timers') || '{}');
    delete timers[treatmentId];
    localStorage.setItem('treatment_timers', JSON.stringify(timers));
  },

  // Menghapus semua timer saat logout
  clearAllTimers: async () => {
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem('treatment_timers');
  }
};

export default timerService; 