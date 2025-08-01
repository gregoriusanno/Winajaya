const WhatsAppFormatter = {
  getGreeting: () => {
    const jakartaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const hour = new Date(jakartaTime).getHours();

    if (hour >= 5 && hour < 11) return 'Pagi';
    if (hour >= 11 && hour < 15) return 'Siang';
    if (hour >= 15 && hour < 18) return 'Sore';
    return 'Malam';
  },

  formatStartDeliveryMessage: (type) => {
    const message = type === 'pickup' ? 'Menjemput' : 'Mengantar';
    const greeting = WhatsAppFormatter.getGreeting();
    
    return `Halo kak, Selamat ${greeting}!%0A%0ASaya driver Katsikat yang akan ${message} item kakak.%0A%0ADurasi pengantaran mungkin sedikit lebih lama menyesuaikan lokasi driver saat ini.%0A%0AMohon ditunggu ya kak, Terima kasih!`;
  },

  formatCompletionMessage: () => {
    return `Halo kak!%0A%0ASetelah item diterima, kakak dapat memberikan review pada halaman Google milik Katsikat yaa...%0Ahttps://g.co/kgs/fXUqxG4%0A%0ATerima kasih, selamat digunakan kembali!%0A%0ASalam,%0A[Tim Katsikat]`;
  },

  formatInitialMessage: () => {
    const greeting = WhatsAppFormatter.getGreeting();
    return `Halo kak, Selamat ${greeting}! Saya driver dari Katsikat!`;
  },

  formatCancelMessage: () => {
    return `Mohon maaf kak, pengantaran dibatalkan karena kendala teknis.%0A%0AKami akan mengirimkan driver lain untuk melayani kakak.%0A%0ATerima kasih atas pengertiannya 🙏`;
  },

  formatDelayMessage: () => {
    return `Mohon maaf kak, pengantaran akan sedikit terlambat karena kendala di jalan.%0A%0AMohon kesediaannya untuk menunggu sebentar ya kak.%0A%0ATerima kasih 🙏`;
  },

  formatArrivalMessage: () => {
    return `Halo kak, saya sudah sampai di lokasi.%0A%0AMohon ditunggu sebentar ya kak 🙏`;
  }
};

export default WhatsAppFormatter; 