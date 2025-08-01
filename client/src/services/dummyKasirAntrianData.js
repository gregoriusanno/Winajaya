// Data dummy antrian kasir
const imageLinks = [
  "https://images.unsplash.com/photo-1738951878919-a4484dc75adc?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738951878885-407c329b80eb?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738959142469-f32cfac8233d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26?q=80&w=3145&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1578314921455-34dd4626b38d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1676821666381-c0456feeeb07?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1688468069415-ffb6336656f9?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1658043521335-998c9fae1a03?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1586268150522-f6235b308a04?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1680204101678-01741d4d4a2a?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const dummyKasirAntrianData = [
  {
    name: "Jodik Yap",
    treatment_type: "cleaning",
    note: "Sepatu sneakers putih kotor. Butuh deep cleaning khusus untuk mesh.",
    due_date: "Saturday, 19 April 2025",
    image_url: "https://images.unsplash.com/photo-1738951878919-a4484dc75adc?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "passed",
    process_time: "regular"
  },
  {
    name: "Budi Santoso",
    treatment_type: "repair",
    note: "Sol sepatu lepas, perlu dijahit ulang.",
    due_date: "Monday, 21 April 2025",
    image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800",
    status: "belum dipilih",
    process_time: "next_day"
  },
  {
    name: "Rina Marlina",
    treatment_type: "cleaning",
    note: "Sepatu canvas terkena noda kopi.",
    due_date: "Tuesday, 22 April 2025",
    image_url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800",
    status: "belum dipilih",
    process_time: "same_day"
  },
  {
    name: "Andi Wijaya",
    treatment_type: "repair",
    note: "Jahitan sepatu formal terlepas di bagian samping.",
    due_date: "Wednesday, 23 April 2025",
    image_url: "https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=800",
    status: "belum dipilih",
    process_time: "regular"
  },
  {
    name: "Dewi Lestari",
    treatment_type: "cleaning",
    note: "Sepatu anak penuh debu setelah bermain di taman.",
    due_date: "Thursday, 24 April 2025",
    image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800",
    status: "belum dipilih",
    process_time: "next_day"
  },
  {
    name: "Agus Pratama",
    treatment_type: "repair",
    note: "Hak sepatu heels patah, perlu diganti baru.",
    due_date: "Friday, 25 April 2025",
    image_url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800",
    status: "belum dipilih",
    process_time: "same_day"
  },
  {
    name: "Linda Sari",
    treatment_type: "cleaning",
    note: "Sepatu lari terkena lumpur setelah hujan.",
    due_date: "Saturday, 26 April 2025",
    image_url: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800",
    status: "failed",
    process_time: "regular"
  },
  {
    name: "Yusuf Maulana",
    treatment_type: "repair",
    note: "Sepatu boot sobek di bagian depan.",
    due_date: "Sunday, 27 April 2025",
    image_url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800",
    status: "belum dipilih",
    process_time: "regular"
  },
  // Tambahan data baru
  {
    name: "Siti Aminah",
    treatment_type: "cleaning",
    note: "Sepatu putih menguning, ingin whitening ulang.",
    due_date: "Monday, 28 April 2025",
    image_url: "https://images.unsplash.com/photo-1738951878885-407c329b80eb?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "belum dipilih",
    process_time: "same_day"
  },
  {
    name: "Fajar Hidayat",
    treatment_type: "repair",
    note: "Sepatu sneakers Adidas, lem outsole lepas.",
    due_date: "Tuesday, 29 April 2025",
    image_url: "https://images.unsplash.com/photo-1738959142469-f32cfac8233d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "belum dipilih",
    process_time: "next_day"
  },
  {
    name: "Citra Dewi",
    treatment_type: "cleaning",
    note: "Sepatu kulit ingin dibersihkan dan dipoles.",
    due_date: "Wednesday, 30 April 2025",
    image_url: "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26?q=80&w=3145&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "belum dipilih",
    process_time: "regular"
  },
  {
    name: "Gita Sari",
    treatment_type: "repair",
    note: "Sepatu wedges bagian depan rusak.",
    due_date: "Thursday, 1 May 2025",
    image_url: "https://images.unsplash.com/photo-1578314921455-34dd4626b38d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "belum dipilih",
    process_time: "same_day"
  },
  {
    name: "Hendra Wijaya",
    treatment_type: "cleaning",
    note: "Sepatu hiking kotor setelah naik gunung.",
    due_date: "Friday, 2 May 2025",
    image_url: "https://images.unsplash.com/photo-1676821666381-c0456feeeb07?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "belum dipilih",
    process_time: "next_day"
  },
  {
    name: "Intan Permata",
    treatment_type: "repair",
    note: "Sepatu boots kulit, resleting macet.",
    due_date: "Saturday, 3 May 2025",
    image_url: "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "belum dipilih",
    process_time: "regular"
  },
  {
    name: "Joko Susilo",
    treatment_type: "cleaning",
    note: "Sepatu basket ingin dicuci dan dihilangkan bau.",
    due_date: "Sunday, 4 May 2025",
    image_url: "https://images.unsplash.com/photo-1688468069415-ffb6336656f9?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "belum dipilih",
    process_time: "same_day"
  },
  {
    name: "Eka Putri",
    treatment_type: "repair",
    note: "Sepatu flat shoes, sol tipis dan perlu diganti.",
    due_date: "Monday, 5 May 2025",
    image_url: "https://images.unsplash.com/photo-1658043521335-998c9fae1a03?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "belum dipilih",
    process_time: "next_day"
  }
];

dummyKasirAntrianData.forEach((item, idx) => {
  item.image_url = imageLinks[idx % imageLinks.length];
});

export default dummyKasirAntrianData; 