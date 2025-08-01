// Data dummy antrian kurir (antar jemput)
const dummyKurirAntrianData = [
  // Penjemputan (pickup)
  {
    id: 1,
    customerName: "Andi Pratama",
    address: "Jl. Melati No. 1, Jakarta Selatan",
    phone: "081234567891",
    requestTime: new Date(Date.now()),
    googleMapsUrl: "https://maps.google.com/?q=-6.200000,106.816666",
    status: "pending",
    type: "pickup"
  },
  {
    id: 2,
    customerName: "Budi Santoso",
    address: "Jl. Mawar No. 2, Jakarta Barat",
    phone: "081234567892",
    requestTime: new Date(Date.now() + 1 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.210000,106.820000",
    status: "pending",
    type: "pickup"
  },
  {
    id: 3,
    customerName: "Citra Dewi",
    address: "Jl. Anggrek No. 3, Jakarta Timur",
    phone: "081234567893",
    requestTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.220000,106.830000",
    status: "pending",
    type: "pickup"
  },
  {
    id: 4,
    customerName: "Dedi Kurniawan",
    address: "Jl. Kenanga No. 4, Jakarta Utara",
    phone: "081234567894",
    requestTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.230000,106.840000",
    status: "pending",
    type: "pickup"
  },
  {
    id: 5,
    customerName: "Eka Putri",
    address: "Jl. Dahlia No. 5, Jakarta Pusat",
    phone: "081234567895",
    requestTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.240000,106.850000",
    status: "pending",
    type: "pickup"
  },
  // Pengantaran (delivery)
  {
    id: 6,
    customerName: "Fajar Hidayat",
    address: "Jl. Flamboyan No. 6, Jakarta Selatan",
    phone: "081234567896",
    requestTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.250000,106.860000",
    status: "pending",
    type: "delivery"
  },
  {
    id: 7,
    customerName: "Gita Sari",
    address: "Jl. Teratai No. 7, Jakarta Barat",
    phone: "081234567897",
    requestTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.260000,106.870000",
    status: "pending",
    type: "delivery"
  },
  {
    id: 8,
    customerName: "Hendra Wijaya",
    address: "Jl. Kamboja No. 8, Jakarta Timur",
    phone: "081234567898",
    requestTime: new Date(Date.now() + 7 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.270000,106.880000",
    status: "pending",
    type: "delivery"
  },
  {
    id: 9,
    customerName: "Intan Permata",
    address: "Jl. Bougenville No. 9, Jakarta Utara",
    phone: "081234567899",
    requestTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.280000,106.890000",
    status: "pending",
    type: "delivery"
  },
  {
    id: 10,
    customerName: "Joko Susilo",
    address: "Jl. Sawo No. 10, Jakarta Pusat",
    phone: "081234567900",
    requestTime: new Date(Date.now() + 9 * 60 * 60 * 1000),
    googleMapsUrl: "https://maps.google.com/?q=-6.290000,106.900000",
    status: "pending",
    type: "delivery"
  }
];

export default dummyKurirAntrianData; 